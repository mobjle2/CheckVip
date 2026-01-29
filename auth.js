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

const loginBox = document.getElementById("loginBox");
const appBox = document.getElementById("app");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const loginMsg = document.getElementById("loginMsg");

loginBtn.addEventListener("click", login);
logoutBtn.addEventListener("click", logout);

// LOGIN
async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    loginMsg.innerText = "❌ Nhập đủ email & password";
    return;
  }

  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const uid = res.user.uid;

    // kiểm tra admin trong Firestore
    const adminRef = doc(db, "admins", uid);
    const snap = await getDoc(adminRef);

    if (!snap.exists() || snap.data().role !== "admin") {
      await signOut(auth);
      loginMsg.innerText = "❌ Không có quyền admin";
      return;
    }

  } catch (err) {
    loginMsg.innerText = "❌ Sai email hoặc mật khẩu";
  }
}

// LOGOUT
function logout() {
  signOut(auth);
}

// THEO DÕI LOGIN
onAuthStateChanged(auth, (user) => {
  if (user) {
    loginBox.classList.add("hidden");
    appBox.classList.remove("hidden");
  } else {
    appBox.classList.add("hidden");
    loginBox.classList.remove("hidden");
  }
});
