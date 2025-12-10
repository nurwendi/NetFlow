
const fs = require('fs');
const path = require('path');
const { RouterOSAPI } = require('node-routeros');

async function debugLogs() {
    console.log('--- Debugging Logs (Standalone) ---');

    // 1. Read Config
    const configFile = path.join(process.cwd(), 'config.json');
    if (!fs.existsSync(configFile)) {
        console.error('Config file not found!');
        return;
    }

    const configRaw = fs.readFileSync(configFile, 'utf8');
    const config = JSON.parse(configRaw);

    let activeConnection = null;
    if (config.activeConnectionId && config.connections) {
        activeConnection = config.connections.find(c => c.id === config.activeConnectionId);
    } else if (config.host) {
        // Legacy fallback
        activeConnection = config;
    }

    if (!activeConnection) {
        console.error('No active connection found in config.');
        return;
    }

    console.log(`Targeting Host: ${activeConnection.host}`);

    // 2. Connect
    const client = new RouterOSAPI({
        host: activeConnection.host,
        user: activeConnection.user,
        password: activeConnection.password,
        port: parseInt(activeConnection.port || 8728),
        keepalive: false,
    });

    try {
        console.log('Connecting...');
        await client.connect();
        console.log('Connected!');

        // 3. Fetch Logs
        const logs = await client.write('/log/print', []);
        console.log(`Fetched ${logs.length} logs total.`);

        // 4. Analyze
        console.log('--- Last 20 Logs ---');
        const last20 = logs.slice(-20);

        last20.forEach(log => {
            const message = (log.message || '').toLowerCase();
            const topics = (log.topics || '').toLowerCase();

            // Notification DB Logic
            const isPppRelated = topics.includes('ppp') || topics.includes('pppoe');
            const isTargetMsg = message.includes('disconnected') ||
                message.includes('terminated') ||
                message.includes('connected') ||
                message.includes('logged in');

            console.log(`LOG: [${topics}] ${message}`);
            if (isPppRelated && isTargetMsg) {
                console.log('   >>> MATCHED FILTER <<<');
            } else {
                if (!isPppRelated) console.log('   (Failed Topic check)');
                if (!isTargetMsg) console.log('   (Failed Keyword check)');
            }
        });

        await client.close();

    } catch (e) {
        console.error('Error:', e);
    }
}

debugLogs();
