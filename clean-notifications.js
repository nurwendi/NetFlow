const fs = require('fs');
const path = require('path');

const NOTIFICATIONS_FILE = path.join(process.cwd(), 'data', 'notifications.json');

console.log('Cleaning notifications data...');
console.log('File:', NOTIFICATIONS_FILE);

// Read current notifications
const data = fs.readFileSync(NOTIFICATIONS_FILE, 'utf8');
const notifications = JSON.parse(data);

console.log('Total notifications before cleaning:', notifications.length);

// Filter out logged in and terminated events
const filtered = notifications.filter(notif => {
    const message = notif.message.toLowerCase();

    // Keep only connected and disconnected
    const isConnected = message.includes('connected') && !message.includes('disconnected');
    const isDisconnected = message.includes('disconnected');

    // Exclude logged in and terminated
    const isLoggedIn = message.includes('logged in');
    const isTerminated = message.includes('terminated');

    if (isLoggedIn || isTerminated) {
        return false; // Remove these
    }

    return isConnected || isDisconnected;
});

console.log('Total notifications after cleaning:', filtered.length);
console.log('Removed:', notifications.length - filtered.length, 'notifications');

// Save cleaned data
fs.writeFileSync(NOTIFICATIONS_FILE, JSON.stringify(filtered, null, 2));

console.log('✅ Notifications cleaned successfully!');
console.log('Only "connected" and "disconnected" events remain.');
