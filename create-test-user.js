
const { createUser } = require('./lib/auth');

async function createTestUser() {
    try {
        console.log('Creating test user tutik...');
        const user = await createUser({
            username: 'tutik',
            password: 'password123',
            role: 'customer',
            fullName: 'Tutik Test User'
        });
        console.log('User created:', user);
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

createTestUser();
