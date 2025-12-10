
import { getMikrotikClient } from './lib/mikrotik.js';

async function debugLogs() {
    console.log('--- Connecting to Mikrotik ---');
    try {
        const client = await getMikrotikClient();
        console.log('Connected.');

        // Fetch last 50 logs of ANY type
        const logs = await client.write('/log/print', []);
        console.log(`Fetched ${logs.length} logs.`);

        console.log('--- Analyzing Last 20 Logs ---');
        const last20 = logs.slice(-20);

        last20.forEach(log => {
            const message = log.message;
            const topics = log.topics || '';
            const isPpp = topics.includes('ppp') || topics.includes('pppoe');
            const isConnect = message.includes('connected') || message.includes('disconnected') || message.includes('logged in') || message.includes('terminated');

            console.log(`[${topics}] ${message}`);
            console.log(`   -> Topic Match: ${isPpp}`);
            console.log(`   -> Keyword Match: ${isConnect}`);
            console.log(`   -> WOULD BE SAVED: ${isPpp && isConnect}`);
            console.log('-----------------------------------');
        });

    } catch (e) {
        console.error('Error:', e);
    }
    process.exit(0);
}

debugLogs();
