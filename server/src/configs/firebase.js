const admin = require('firebase-admin');
const firebaseAdmin = require('./soundcloneFirebaseAdmin.json');

admin.initializeApp({
    credential: admin.credential.cert(firebaseAdmin),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const bucket = admin.storage().bucket();

module.exports = { bucket };