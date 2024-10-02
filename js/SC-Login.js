// Fungsi untuk menangani respons setelah login dengan Google
function handleCredentialResponse(response) {
    const data = jwt_decode(response.credential); // Dekode token
    // Simpan data pengguna ke localStorage
    localStorage.setItem("userData", JSON.stringify({
        name: data.name,
        email: data.email,
    }));

    // Redirect ke halaman profil setelah login
    window.location.href = "/Profile.html";
}

// Menangani pengiriman form secara manual
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    var Username = this.elements["Username"].value;
    var Email = this.elements["Email"].value;

    // Validasi: Cek jika Username atau Email kosong
    if (!Username || !Email) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });

        Toast.fire({
            icon: 'warning',
            title: 'Data Kosong. Mohon isi data!'
        });

        return; // Hentikan eksekusi lebih lanjut
    }

    console.log("Attempting to log in with:", Username, Email);

    // Tampilkan loading indicator
    Swal.fire({
        title: 'Logging in...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    // Simpan data login manual ke localStorage
    localStorage.setItem("manualUser", JSON.stringify({
        name: Username,
        email: Email
    }));

    // Kirim data ke Google Sheets
    sendDataToGoogleSheet(Username, Email);

    // Tutup loading indicator
    Swal.close();

    // Tampilkan toast sukses
    const ToastSuccess = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
    });

    ToastSuccess.fire({
        icon: "success",
        title: "Signed in successfully",
    }).then(() => {
        // Redirect setelah toast
        window.location.href = "/Disain-Grafis.html";
    });
});

function sendDataToGoogleSheet(Username, Email) {
    const url = "https://script.google.com/macros/s/AKfycby9j139EglEGRYG7hU1SHsHjKgA_wcWjaZTq9OYdZNRqqaruovnHnkFG3qPY7F1Adsh/exec";
    const data = new FormData();
    data.append('Username', Username);
    data.append('Email', Email);

    fetch(url, {
        method: 'POST',
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(result => {
        console.log('Data berhasil dikirim ke Google Sheets:', result);
    })
    .catch(error => {
        console.error('Ada masalah dengan pengiriman data:', error);
    });
}
