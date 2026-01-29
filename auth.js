import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const loginBox = document.getElementById("loginBox");
const app = document.getElementById("app");

// LOGIN
window.login = async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Nhập email và mật khẩu");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    alert("Sai email hoặc mật khẩu");
  }
};

// LOGOUT
window.logout = async () => {
  await signOut(auth);
};

// AUTO CHECK LOGIN (CỰC KỲ QUAN TRỌNG)
onAuthStateChanged(auth, (user) => {
  if (user) {
    loginBox.style.display = "none";
    app.style.display = "block";
  } else {
    loginBox.style.display = "block";
    app.style.display = "none";
  }
});
