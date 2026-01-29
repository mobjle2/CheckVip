import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// LOGIN
window.login = async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorBox = document.getElementById("loginError");
  errorBox.textContent = "";

  if (!email || !password) {
    errorBox.textContent = "❌ Nhập đủ email và mật khẩu";
    return;
  }

  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCred.user.uid;

    // kiểm tra admin trong Firestore
    const ref = doc(db, "admins", uid);
    const snap = await getDoc(ref);

    if (!snap.exists() || snap.data().role !== "admin") {
      await signOut(auth);
      errorBox.textContent = "❌ Không phải tài khoản admin";
      return;
    }

  } catch (err) {
    errorBox.textContent = "❌ Sai email hoặc mật khẩu";
    console.error(err);
  }
};

// AUTO CHECK LOGIN
onAuthStateChanged(auth, (user) => {
  const loginBox = document.getElementById("loginBox");
  const app = document.getElementById("app");

  if (user) {
    loginBox.style.display = "none";
    app.style.display = "block";
  } else {
    loginBox.style.display = "block";
    app.style.display = "none";
  }
});

// LOGOUT
window.logout = async function () {
  await signOut(auth);
};
