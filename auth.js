import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

window.login = async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorBox = document.getElementById("loginError");

  errorBox.style.display = "none";

  if (!email || !password) {
    errorBox.innerText = "Vui lòng nhập đầy đủ email và mật khẩu";
    errorBox.style.display = "block";
    return;
  }

  try {
    // ✅ BẮT BUỘC session chỉ tồn tại trong tab
    await setPersistence(auth, browserSessionPersistence);

    await signInWithEmailAndPassword(auth, email, password);

    document.getElementById("loginBox").style.display = "none";
    document.getElementById("app").style.display = "block";
  } catch (err) {
    errorBox.innerText = "Sai tài khoản hoặc mật khẩu";
    errorBox.style.display = "block";
  }
};

window.logout = async function () {
  await signOut(auth);
  location.reload();
};
