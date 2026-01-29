import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  doc, getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.login = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
  } catch {
    alert("Sai tài khoản hoặc mật khẩu");
  }
};

onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  const snap = await getDoc(doc(db, "admins", user.uid));
  if (!snap.exists() || snap.data().role !== "admin") {
    alert("Không có quyền admin");
    await signOut(auth);
    return;
  }

  loginBox.style.display = "none";
  app.style.display = "block";
});

window.logout = async () => {
  await signOut(auth);
  location.reload();
};
