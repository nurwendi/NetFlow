import { syncNotifications, getNotifications } from './lib/notifications-db.js';

async function main() {
    try {
        console.log('--- Debugging Regex Matches ---');
        const { getMikrotikClient } = await import('./lib/mikrotik.js');
        const client = await getMikrotikClient();
        const logs = await client.write('/log/print', []);

        console.log(`Fetched ${logs.length} logs from Mikrotik.`);
        const pppoeLogs = logs.filter(l => l.message.includes('pppoe') || l.message.includes('authenticated'));

        console.log(`Found ${pppoeLogs.length} logs with 'pppoe' or 'authenticated'. Printing samples:`);
        pppoeLogs.slice(-20).forEach(l => {
            const match = l.message.match(/^<pppoe-(.+?)>:\s*(connected|disconnected)$/);
            console.log(`[${match ? 'MATCH' : 'SKIP'}] ${l.message}`);
        });

    } catch (error) {
        console.error('Debug failed:', error);
    }
}

main();
