// ===== CONFIG ADMIN =====
const ADMIN_EMAIL = "iktrungnguyen@gmail.com";
const ADMIN_PASS  = "12345"; // đổi theo ý bạn

// ===== CHECK QUERY ?u=ADMIN =====
const params = new URLSearchParams(window.location.search);
const isAdmin = params.get("u") === "ADMIN";

// ===== INIT =====
window.addEventListener("load", () => {
  if (!isAdmin) return;

  const logged = sessionStorage.getItem("ADMIN_LOGIN");
  if (logged !== "1") {
    showLogin();
  }
});

// ===== LOGIN =====
function adminLogin() {
  const email = document.getElementById("adminEmail").value.trim();
  const pass  = document.getElementById("adminPass").value.trim();
  const err   = document.getElementById("loginError");

  if (email === ADMIN_EMAIL && pass === ADMIN_PASS) {
    sessionStorage.setItem("ADMIN_LOGIN", "1");
    hideLogin();
  } else {
    err.style.display = "block";
  }
}

// ===== LOGOUT =====
function adminLogout() {
  sessionStorage.removeItem("ADMIN_LOGIN");
  location.reload();
}

// ===== UI =====
function showLogin() {
  document.getElementById("loginOverlay").style.display = "flex";
}

function hideLogin() {
  document.getElementById("loginOverlay").style.display = "none";
}
