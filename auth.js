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
const app = document.getElementById("app");
const errorBox = document.getElementById("loginError");

window.login = async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  errorBox.style.display = "none";
  errorBox.innerText = "";

  if (!email || !password) {
    showError("Vui lòng nhập đầy đủ email và mật khẩu");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    const adminRef = doc(db, "admins", uid);
    const adminSnap = await getDoc(adminRef);

    if (!adminSnap.exists()) {
      await signOut(auth);
      showError("Tài khoản không có quyền admin");
      return;
    }

    // OK
    loginBox.style.display = "none";
    app.style.display = "block";
  } catch (err) {
    showError("Sai tài khoản hoặc mật khẩu");
  }
};

window.logout = async function () {
  await signOut(auth);
  location.reload();
};

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    loginBox.style.display = "block";
    app.style.display = "none";
    return;
  }

  const adminRef = doc(db, "admins", user.uid);
  const adminSnap = await getDoc(adminRef);

  if (adminSnap.exists()) {
    loginBox.style.display = "none";
    app.style.display = "block";
  } else {
    await signOut(auth);
    showError("Tài khoản không có quyền admin");
  }
});

function showError(msg) {
  errorBox.innerText = msg;
  errorBox.style.display = "block";
}
