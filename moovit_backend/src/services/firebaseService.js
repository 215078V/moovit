const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = require('../../serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE,
});

const db = admin.database();

module.exports = db;
