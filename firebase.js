// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 CẤU HÌNH FIREBASE (ĐÃ ĐIỀN SẴN)
const firebaseConfig = {
  apiKey: "AIzaSyBjBZJuSzt4JQDXvDyAXztTgo75qv6u5R8",
  authDomain: "mobjle21982.firebaseapp.com",
  projectId: "mobjle21982",
  appId: "1:1034646220657:web:7722953f721845b8e5d0d0"
};

// Khởi tạo Firebase
export const app = initializeApp(firebaseConfig);

// Firebase Authentication & Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
