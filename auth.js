import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// luôn logout khi load
await signOut(auth);

window.login = async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("loginError");
  error.textContent = "";

  if (!email || !password) {
    error.textContent = "❌ Nhập đủ email và mật khẩu";
    return;
  }

  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;

    const snap = await getDoc(doc(db, "admins", uid));
    if (!snap.exists()) {
      await signOut(auth);
      error.textContent = "❌ Không phải admin";
      return;
    }

    document.getElementById("loginBox").style.display = "none";
    document.getElementById("app").style.display = "block";

  } catch (e) {
    console.error(e);
    error.textContent = "❌ Sai email hoặc mật khẩu";
  }
};

window.logout = async () => {
  await signOut(auth);
  location.reload();
};
