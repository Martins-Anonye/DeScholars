import { initializeApp } from "firebase/app";
import { getDatabase, ref, update } from "firebase/database";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function updateMultipleFields() {
  const updates = {};

  // Update a field in the 'users' tree
  updates['users/user123/name'] = 'Alice Smith';

  // Update a field in the 'products' tree
  updates['products/productABC/stock'] = 75;

  try {
    await update(ref(db), updates);
    console.log("Both fields updated successfully!");
  } catch (error) {
    console.error("Error updating fields:", error);
  }
}

updateMultipleFields();