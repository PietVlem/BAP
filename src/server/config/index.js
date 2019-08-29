/*
Import the external libraries:
- dotenv
*/
import dotenv from 'dotenv';

// Activatie the dotenv settings from .env file
dotenv.config();

// Create configuration object
const config = {
    nodeEnvironment: process.env.NODE_ENV,
    nodeHostname: process.env.NODE_SERVER_HOSTNAME,
    nodePort: process.env.NODE_SERVER_PORT,
    mongoDbConnectionstring: process.env.MONGODB_CONNECTION,
    auth: {
        bcrypt: {
            saltWorkFactor: process.env.AUTH_BCRYPT_SALT,
        },
        jwtSecret: process.env.AUTH_JWT_SECRET,
        jwtSession: {
            session: process.env.AUTH_JWT_SESSION,
        },
    },
};

export default config;
