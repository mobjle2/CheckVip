const ADMIN_EMAIL = "iktrungnguyen@gmail.com";
const ADMIN_PASS = "12345";

const params = new URLSearchParams(location.search);
const isAdmin = params.get("u") === "ADMIN";

window.addEventListener("load", () => {
  if (!isAdmin) return;
  document.getElementById("loginOverlay").style.display = "flex";
});

window.adminLogin = function () {
  const email = document.getElementById("adminEmail").value.trim();
  const pass = document.getElementById("adminPass").value.trim();
  const err = document.getElementById("loginError");

  if (email === ADMIN_EMAIL && pass === ADMIN_PASS) {
    sessionStorage.setItem("ADMIN_LOGIN", "1");
    document.getElementById("loginOverlay").style.display = "none";
  } else {
    err.innerText = "Sai email hoặc mật khẩu";
    err.style.display = "block";
  }
};

window.adminLogout = function () {
  sessionStorage.removeItem("ADMIN_LOGIN");
  location.reload();
};
