// Firebase Configuration for Aleco's Restaurant
const firebaseConfig = {
    apiKey: "AIzaSyBYv-Amq3Hh7LGmz9nhTcDeK1T5BifLaDw",
    authDomain: "alecos-restaurant.firebaseapp.com",
    databaseURL: "https://alecos-restaurant-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "alecos-restaurant",
    storageBucket: "alecos-restaurant.firebasestorage.app",
    messagingSenderId: "975810557780",
    appId: "1:975810557780:web:89c8430d7b4c7cd1e4bac1"
};

// Initialize Firebase (for Firebase 8.10.0 CDN)
let app, auth, database, storage;

function initializeFirebase() {
    try {
        // Check if Firebase is already initialized
        if (!firebase.apps || firebase.apps.length === 0) {
            app = firebase.initializeApp(firebaseConfig);
        } else {
            app = firebase.app();
        }
        auth = firebase.auth();
        database = firebase.database();
        storage = firebase.storage();
        console.log('✅ Firebase initialized successfully');
        return true;
    } catch (error) {
        console.error('❌ Firebase initialization error:', error);
        return false;
    }
}

// Helper functions remain the same...

// Helper function to check if user is logged in
function checkAuth(redirectToLogin = true) {
    return new Promise((resolve) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                resolve(user);
            } else {
                if (redirectToLogin && window.location.pathname.includes('admin')) {
                    window.location.href = 'admin-login.html';
                }
                resolve(null);
            }
        });
    });
}

// MODIFIED: Image upload that supports GitHub URLs
async function uploadImage(file) {
    // If user provides a file, we'll save it to GitHub manually
    // Admin will need to upload to GitHub and paste the URL
    throw new Error('Please upload images to GitHub and paste the URL. Instructions in admin panel.');
}

// NEW: Helper for GitHub image URLs
function getGitHubImageUrl(filename) {
    // Example: https://username.github.io/alecos/images/filename.jpg
    const repo = 'alecos'; // Your repository name
    const username = 'maykelkhouryyammine'; // Your GitHub username
    return `https://${username}.github.io/${repo}/images/${filename}`;
}

// Helper function to get all menu data
async function getMenuData() {
    try {
        const snapshot = await database.ref('menu').once('value');
        return snapshot.val() || {};
    } catch (error) {
        console.error('Error fetching menu data:', error);
        return {};
    }
}

// Helper function to save menu data
async function saveMenuData(menuData) {
    try {
        await database.ref('menu').set(menuData);
        return true;
    } catch (error) {
        console.error('Error saving menu data:', error);
        return false;
    }
}

// Helper function to get a specific category
async function getCategoryData(categoryId) {
    try {
        const snapshot = await database.ref(`menu/${categoryId}`).once('value');
        return snapshot.val();
    } catch (error) {
        console.error('Error fetching category data:', error);
        return null;
    }
}

// Helper function to save a specific category
async function saveCategoryData(categoryId, categoryData) {
    try {
        await database.ref(`menu/${categoryId}`).set(categoryData);
        return true;
    } catch (error) {
        console.error('Error saving category data:', error);
        return false;
    }
}

// Initialize Firebase when script loads
initializeFirebase();
