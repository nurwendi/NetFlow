
const { getMikrotikClient } = require('./lib/mikrotik');
const { syncNotifications, getNotifications } = require('./lib/notifications-db');

async function debugSync() {
    console.log('--- Starting Debug Sync ---');
    try {
        const client = await getMikrotikClient();
        console.log('Connected to Mikrotik');

        const logs = await client.write('/log/print', []);
        console.log(`Fetched ${logs.length} logs total.`);

        // Peek at top 5 logs to see structure
        console.log('Sample logs (first 3):', JSON.stringify(logs.slice(0, 3), null, 2));

        // Check specifically for pppoe related logs
        const pppLogs = logs.filter(l => (l.topics || '').includes('ppp') || (l.message || '').includes('pppoe'));
        console.log(`Found ${pppLogs.length} raw PPP-related logs.`);
        if (pppLogs.length > 0) {
            console.log('Sample PPP log:', JSON.stringify(pppLogs[0], null, 2));
        }

        console.log('Running syncNotifications()...');
        const count = await syncNotifications();
        console.log(`syncNotifications returned: ${count} new logs saved.`);

        const saved = await getNotifications();
        console.log(`Total saved notifications in DB: ${saved.length}`);
        if (saved.length > 0) {
            console.log('Top saved notification:', JSON.stringify(saved[0], null, 2));
        }

    } catch (e) {
        console.error('Debug failed:', e);
    }
    process.exit(0);
}

debugSync();
