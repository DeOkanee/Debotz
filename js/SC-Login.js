// Konfigurasi Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyDCK8nNkVwczT9Bib51K9SKTpQWJR4GxS8",
    authDomain: "debotz-login.firebaseapp.com",
    projectId: "debotz-login",
    storageBucket: "debotz-login.firebasestorage.app",
    messagingSenderId: "417951071336",
    appId: "1:417951071336:web:af61286be4d2ac86328fdd",
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

// Login dengan Google
document.getElementById("google-login").addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log("User signed in:", user);

            // Simpan data pengguna ke localStorage
            localStorage.setItem("userData", JSON.stringify({
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
            }));

            // Redirect ke halaman profil
            window.location.href = "/Profile.html";
        })
        .catch((error) => {
            console.error("Error during login:", error);
            Swal.fire("Login failed", error.message, "error");
        });
});

// Login manual dengan form
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const Username = this.elements["Username"].value;
    const Email = this.elements["Email"].value;

    if (!Username || !Email) {
        Swal.fire("Error", "Please fill in all fields", "warning");
        return;
    }

    // Simpan data pengguna manual
    localStorage.setItem("manualUser", JSON.stringify({ name: Username, email: Email }));
    window.location.href = "/Disain-Grafis.html";
});
