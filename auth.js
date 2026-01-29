import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ======================
   BẮT BUỘC LOGOUT KHI LOAD
====================== */
await signOut(auth);

/* ======================
   LOGIN
====================== */
window.login = async function () {
  const emailInput = document.getElementById("email");
  const passInput  = document.getElementById("password");
  const errorBox   = document.getElementById("loginError");

  const email = emailInput.value.trim();
  const password = passInput.value.trim();

  errorBox.textContent = "";

  if (!email || !password) {
    errorBox.textContent = "❌ Nhập đủ email và mật khẩu";
    return;
  }

  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCred.user.uid;

    // kiểm tra quyền admin
    const adminRef = doc(db, "admins", uid);
    const adminSnap = await getDoc(adminRef);

    if (!adminSnap.exists() || adminSnap.data().role !== "admin") {
      await signOut(auth);
      errorBox.textContent = "❌ Không phải tài khoản admin";
      return;
    }

    // login OK → show app
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("app").style.display = "block";

  } catch (err) {
    console.error(err);
    errorBox.textContent = "❌ Sai email hoặc mật khẩu";
  }
};

/* ======================
   LOGOUT
====================== */
window.logout = async function () {
  await signOut(auth);
  location.reload();
};
