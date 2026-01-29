// ================== CONFIG ADMIN ==================
const ADMIN_EMAIL = "iktrungnguyen@gmail.com";
const ADMIN_PASS  = "12345"; // đổi nếu cần

// ================== DOM ==================
const loginOverlay = document.getElementById("loginOverlay");
const loginError   = document.getElementById("loginError");

// ================== CHECK QUERY ==================
const params = new URLSearchParams(window.location.search);
const isAdmin = params.get("u") === "ADMIN";

// ================== INIT ==================
window.addEventListener("load", () => {
  // Không phải link admin thì bỏ qua
  if (!isAdmin) return;

  // 🔒 Luôn khóa admin khi load
  hideAdminUI();

  // Kiểm tra session
  const logged = sessionStorage.getItem("ADMIN_LOGIN");
  if (logged === "1") {
    showAdminUI();
  } else {
    showLogin();
  }
});

// ================== LOGIN ==================
window.adminLogin = function () {
  const email = document.getElementById("adminEmail").value.trim();
  const pass  = document.getElementById("adminPass").value.trim();

  loginError.style.display = "none";

  if (email === ADMIN_EMAIL && pass === ADMIN_PASS) {
    sessionStorage.setItem("ADMIN_LOGIN", "1");
    hideLogin();
    showAdminUI();
  } else {
    loginError.innerText = "Sai email hoặc mật khẩu";
    loginError.style.display = "block";
  }
};

// ================== LOGOUT ==================
window.adminLogout = function () {
  sessionStorage.removeItem("ADMIN_LOGIN");
  location.reload(); // bắt login lại
};

// ================== UI HELPERS ==================
function showLogin() {
  loginOverlay.style.display = "flex";
}

function hideLogin() {
  loginOverlay.style.display = "none";
}

function hideAdminUI() {
  // Ẩn toàn bộ admin panel khi chưa login
  document.body.classList.add("admin-locked");
}

function showAdminUI() {
  document.body.classList.remove("admin-locked");
}
