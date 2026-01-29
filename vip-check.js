import { db } from "./firebase.js";
import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.checkVip = async function () {
  const input = uidCheck.value.trim();
  if (!input) return;

  const key = input.toUpperCase().replace(/[^A-Z0-9]/g,"");
  result.innerHTML = "⏳ Đang kiểm tra...";

  // 1️⃣ Firestore
  try {
    const snap = await getDoc(doc(db, "vip", key));
    if (snap.exists()) {
      const v = snap.data();
      result.innerHTML = `✅ ${v.vip}<br>CHIP: ${v.chip}<br>🔥 Firestore`;
      return;
    }
  } catch {}

  // 2️⃣ Local data.js
  if (typeof checkVipLocal === "function") {
    const local = checkVipLocal(key);
    if (local) {
      result.innerHTML = `✅ ${local.vip}<br>CHIP: ${local.chip}<br>📦 Local`;
      return;
    }
  }

  result.innerHTML = "❌ Không tìm thấy VIP";
};
