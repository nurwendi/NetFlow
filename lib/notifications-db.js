import fs from 'fs';
import path from 'path';
import { getMikrotikClient } from './mikrotik.js';

// Adjust path if needed effectively
const DATA_DIR = path.join(process.cwd(), 'data');
const NOTIFICATIONS_FILE = path.join(DATA_DIR, 'notifications.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Ensure file exists
if (!fs.existsSync(NOTIFICATIONS_FILE)) {
    fs.writeFileSync(NOTIFICATIONS_FILE, '[]');
}

export async function getNotifications() {
    try {
        if (fs.existsSync(NOTIFICATIONS_FILE)) {
            const data = fs.readFileSync(NOTIFICATIONS_FILE, 'utf8');
            return JSON.parse(data);
        }
        return [];
    } catch (error) {
        console.error('Error reading notifications:', error);
        return [];
    }
}

export async function saveNotifications(notifications) {
    try {
        fs.writeFileSync(NOTIFICATIONS_FILE, JSON.stringify(notifications, null, 2));
        return true;
    } catch (error) {
        console.error('Error saving notifications:', error);
        return false;
    }
}

export async function syncNotifications() {
    try {
        const client = await getMikrotikClient();

        // Fetch logs (get enough to cover recent events)
        const logs = await client.write('/log/print', []);

        // Filter and process Mikrotik logs
        const newLogs = logs
            .reverse() // Newest first
            .map(log => {
                const message = log.message;

                // STRICT Regex for <pppoe-user>: connected/disconnected
                const pppoeMatch = message.match(/^<pppoe-(.+?)>:\s*(connected|disconnected)$/);

                if (!pppoeMatch) return null;

                const username = pppoeMatch[1];
                const status = pppoeMatch[2];

                // Format clean message for display/legacy
                const cleanMessage = `${username} : ${status}`;

                return {
                    '.id': log['.id'],
                    'time': log.time,
                    'topics': log.topics,
                    'message': cleanMessage,
                    'username': username,
                    'status': status
                };
            })
            .filter(item => item !== null); // Remove all filtered/ignored items

        // Merge with existing logs
        const currentNotifications = await getNotifications();

        // Deduplication: Content-based signature
        const existingSignatures = new Set(currentNotifications.map(n =>
            `${n.time}|${n.message}`
        ));

        const uniqueNewLogs = newLogs.filter(log => {
            const signature = `${log.time}|${log.message}`;

            if (existingSignatures.has(signature)) return false;

            // Fallback ID check
            if (currentNotifications.some(n => n['.id'] === log['.id'])) return false;

            existingSignatures.add(signature);
            return true;
        });

        if (uniqueNewLogs.length > 0) {
            console.log(`[Sync] Found ${uniqueNewLogs.length} new notification logs.`);

            // Add new logs to the beginning
            const updatedNotifications = [...uniqueNewLogs, ...currentNotifications];

            // Limit history to LAST 100 lines as requested
            const finalNotifications = updatedNotifications.slice(0, 100);

            await saveNotifications(finalNotifications);
            return uniqueNewLogs.length;
        }

        return 0;

    } catch (error) {
        console.error('Error syncing notifications:', error);
        return 0;
    }
}
