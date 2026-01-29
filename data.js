import { auth } from "./firebase.js";
import { onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// HIỆN NÚT ADMIN NẾU ĐÃ LOGIN FIREBASE
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("adminLink").style.display = "block";
  } else {
    document.getElementById("adminLink").style.display = "none";
  }
});

// DEMO CHECK VIP (BẠN GẮN LOGIC CŨ VÀO ĐÂY)
window.checkVip = function () {
  const uid = document.getElementById("uid").value;
  if (!uid) {
    result.innerText = "❌ Vui lòng nhập UID";
    return;
  }

  // TẠM THỜI DEMO
  result.innerText = "✅ UID " + uid + " hợp lệ (demo)";
};
