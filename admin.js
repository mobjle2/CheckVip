import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc, getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// LOGIN
window.login = function () {
  signInWithEmailAndPassword(auth, email.value, pass.value)
    .then(() => location.href = "dashboard.html")
    .catch(() => alert("❌ Sai email hoặc mật khẩu"));
};

// CHẶN USER KHÔNG PHẢI ADMIN
onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  const ref = doc(db, "admins", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    alert("❌ Không có quyền admin");
    signOut(auth);
    location.href = "admin.html";
  }
});
