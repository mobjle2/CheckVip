import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 DÁN CẤU HÌNH FIREBASE CỦA BẠN VÀO ĐÂY
const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY",
  authDomain: "mobjle21982.firebaseapp.com",
  projectId: "mobjle21982",
  appId: "PASTE_YOUR_APP_ID"
};

// Khởi tạo Firebase
export const app = initializeApp(firebaseConfig);

// Firebase Auth & Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
