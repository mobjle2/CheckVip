import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ⚠️ BẮT BUỘC LOGOUT KHI LOAD (F5 LÀ PHẢI LOGIN LẠI)
await signOut(auth);

// LOGIN
window.login = async function () {
  const email = email.value.trim();
  const password = document.getElementById("password").value.trim();
  const err = document.getElementById("loginError");
  err.textContent = "";

  if (!email || !password) {
    err.textContent = "❌ Nhập đủ email và mật khẩu";
    return;
  }

  try {
    const u = await signInWithEmailAndPassword(auth, email, password);
    const uid = u.user.uid;

    const snap = await getDoc(doc(db, "admins", uid));
    if (!snap.exists() || snap.data().role !== "admin") {
      await signOut(auth);
      err.textContent = "❌ Không phải admin";
      return;
    }

    loginBox.style.display = "none";
    app.style.display = "block";

  } catch {
    err.textContent = "❌ Sai email hoặc mật khẩu";
  }
};

// LOGOUT
window.logout = async function () {
  await signOut(auth);
  location.reload();
};
