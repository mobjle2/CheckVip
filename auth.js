import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Nhập đầy đủ email & password");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("app").style.display = "flex";
  } catch (e) {
    alert("Sai tài khoản hoặc mật khẩu");
  }
};

window.logout = async function () {
  await signOut(auth);
  location.reload(); // ÉP LOGIN LẠI
};

/* 🚫 QUAN TRỌNG: KHÔNG auto-login */
document.getElementById("loginBox").style.display = "flex";
document.getElementById("app").style.display = "none";
