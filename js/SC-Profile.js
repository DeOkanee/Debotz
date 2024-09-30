document.addEventListener('DOMContentLoaded', function () {
    // Cek data user Google
    var googleUser = JSON.parse(localStorage.getItem("userData"));
    // Cek data user manual
    var manualUser = JSON.parse(localStorage.getItem("manualUser"));

    if (googleUser && googleUser.name && googleUser.email) {
        document.getElementById("user-name").textContent = googleUser.name;
        document.getElementById("user-email").textContent = googleUser.email;
        document.getElementById("login-type").textContent = "Google Login";
        document.getElementById("profile-pic").src = googleUser.picture; // Ganti gambar profil
    } else if (manualUser && manualUser.name && manualUser.email) {
        document.getElementById("user-name").textContent = manualUser.name;
        document.getElementById("user-email").textContent = manualUser.email;
        document.getElementById("login-type").textContent = "Manual Login";
    } else {
        // Jika tidak ada data login, redirect ke halaman login
        window.location.href = "/Login.html";
    }
});

function logout() {
    // Hapus semua data user
    localStorage.removeItem("userData");
    localStorage.removeItem("manualUser");
    // Redirect ke halaman login
    window.location.href = "/Login.html";
}