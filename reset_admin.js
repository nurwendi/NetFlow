
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs'); // Assuming bcryptjs is installed as shown in lib/auth.js

async function resetAdminPassword() {
    const usersFile = path.join(process.cwd(), 'data/users.json');

    if (!fs.existsSync(usersFile)) {
        console.log('Users file not found!');
        return;
    }

    const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
    const adminIndex = users.findIndex(u => u.username === 'admin');

    if (adminIndex === -1) {
        console.log('Admin user not found, creating...');
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash('admin123', salt);
        users.push({
            id: Date.now().toString(),
            username: 'admin',
            passwordHash,
            role: 'admin',
            createdAt: new Date().toISOString()
        });
    } else {
        console.log('Admin user found, updating password to "admin123"...');
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash('admin123', salt);
        users[adminIndex].passwordHash = passwordHash;
    }

    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    console.log('Password reset successfully.');
}

resetAdminPassword();
