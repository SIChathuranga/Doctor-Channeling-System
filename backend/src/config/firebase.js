import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Firebase Admin SDK
// Method 1: Using service account file
// Place serviceAccountKey.json in backend folder and set GOOGLE_APPLICATION_CREDENTIALS

// Method 2: Using environment variables
const serviceAccount = {
    type: 'service_account',
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL
};

try {
    // Check if already initialized
    if (!admin.apps.length) {
        // Try to initialize with credentials file first
        if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
            admin.initializeApp({
                credential: admin.credential.applicationDefault()
            });
        } else {
            // Fall back to environment variables
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
        }
        console.log('✅ Firebase Admin SDK initialized successfully');
    }
} catch (error) {
    console.error('❌ Firebase Admin initialization error:', error.message);
    console.log('⚠️  Running without Firebase. Some features may not work.');
}

// Export Firebase services
export const db = admin.firestore();
export const auth = admin.auth();
export const storage = admin.storage();

export default admin;
