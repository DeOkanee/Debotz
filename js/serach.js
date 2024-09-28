const apps = [
    {
        name: "Adobe Illustrator 2024.v28.0.0.88.x64 Full Version",
        image: "https://res.cloudinary.com/dwpnsfghy/image/upload/v1727442862/ahybaanpbmzsfechffsg.png",
        link: "software/Disain Grafis/Adobe-Illustrator 2024.html",
        date: "Up 9 September 2024",
        shortDescription: "Adobe Illustrator adalah perangkat lunak desain grafis berbasis vektor yang digunakan untuk membuat ilustrasi, logo, dan tipografi.",
        fullDescription: "Dengan alat-alat seperti pensil dan kuas, pengguna dapat menggambar dan mengedit objek dengan presisi tinggi. Fitur seperti lapisan, gradien, dan masking memungkinkan kreasi efek visual yang menarik. Illustrator mendukung berbagai format file, seperti AI dan SVG, menjadikannya pilihan utama bagi desainer grafis dan ilustrator dalam menciptakan karya profesional."
    },
    {
        name: "Adobe Illustrator 2023.v27.7.0.421.x64 Full Version",
        image: "https://res.cloudinary.com/dwpnsfghy/image/upload/v1727442862/ahybaanpbmzsfechffsg.png",
        link: "software/Disain Grafis/Adobe-Illustrator 2024.html",
        date: "Up 9 September 2024",
        shortDescription: "Adobe Illustrator adalah perangkat lunak desain grafis berbasis vektor yang digunakan untuk membuat ilustrasi, logo, dan tipografi.",
        fullDescription: "Dengan alat-alat seperti pensil dan kuas, pengguna dapat menggambar dan mengedit objek dengan presisi tinggi. Fitur seperti lapisan, gradien, dan masking memungkinkan kreasi efek visual yang menarik. Illustrator mendukung berbagai format file, seperti AI dan SVG, menjadikannya pilihan utama bagi desainer grafis dan ilustrator dalam menciptakan karya profesional."
    },
    {
        name: "Adobe Photoshop 2023.v24.7.0 x64 Full Version",
        image: "https://res.cloudinary.com/dwpnsfghy/image/upload/v1727446873/vwibe1mldskbui6pzqzq.png",
        link: "software/Disain Grafis/Adobe-Photoshop 2023.html",
        date: "Up 9 September 2024",
        shortDescription: "Adobe Photoshop adalah perangkat lunak pengolah gambar yang memungkinkan pengguna untuk mengedit foto dan menciptakan desain grafis dengan presisi tinggi.",
        fullDescription: "Dengan alat seperti layers, filters, dan adjustments, pengguna dapat memanipulasi gambar, menghapus objek, dan menambahkan efek visual. Photoshop digunakan oleh fotografer, seniman, dan desainer untuk berbagai proyek, mulai dari penyuntingan foto hingga pembuatan ilustrasi digital, menjadikannya salah satu alat paling populer dalam industri kreatif."
    },
    {
        name: "Adobe Premiere Pro 2023.v23.6.0.65.x64 Full Version",
        image: "https://res.cloudinary.com/dwpnsfghy/image/upload/v1727483951/ctasvv4gzdwged8woccm.png",
        link: "software/Video Editor/Premiere-Pro 2023.html",
        date: "Up 10 September 2024",
        shortDescription: "Adobe Premiere Pro adalah perangkat lunak pengeditan video non-linier yang memungkinkan penggunanya untuk mengedit, mengatur, dan mengolah video secara profesional.",
        fullDescription: "Dengan adopsi sistem non-linier, pengguna dapat memodifikasi video secara bebas tanpa mengganggu bagian lainnya."
    },
    {
        name: "Adobe After Effects 2022.22.6.0. x64 Full Version",
        image: "https://res.cloudinary.com/dwpnsfghy/image/upload/v1727484486/ktofcyn2izmqrnzscscj.png",
        link: "software/Video Editor/After-Effect 2022.html",
        date: "Up 10 September 2024",
        shortDescription: "Adobe After Effects adalah aplikasi perangkat lunak yang digunakan untuk membuat efek visual, grafik gerak, dan pengomposisian video.",
        fullDescription: "Aplikasi ini sering digunakan dalam pascaproduksi film, televisi, dan permainan video."
    },
    {
        name: "Adobe After Effects 2023.23.1.0.83 x64 Full Version",
        image: "https://res.cloudinary.com/dwpnsfghy/image/upload/v1727484486/ktofcyn2izmqrnzscscj.png",
        link: "software/Video Editor/After-Effect 2023.html",
        date: "Up 10 September 2024",
        shortDescription: "Adobe After Effects adalah aplikasi perangkat lunak yang digunakan untuk membuat efek visual, grafik gerak, dan pengomposisian video.",
        fullDescription: "Aplikasi ini sering digunakan dalam pascaproduksi film, televisi, dan permainan video."
    },
    {
        name: "Internet Download Manager (IDM) v6.39 Full Version [Pakai Nama Sendiri]",
        image: "https://res.cloudinary.com/dwpnsfghy/image/upload/v1727485944/wlgnhhpwezffsfbuk0ms.png",
        link: "software/Download Manager/IDM V6.39.html",
        date: "Up 10 September 2024",
        shortDescription: "Internet Download Manager (IDM) adalah perangkat lunak yang dapat digunakan untuk mengunduh file melalui peramban web.",
        fullDescription: "Selain itu, IDM juga mampu memulihkan dan melanjutkan unduhan yang terputus karena koneksi yang bermasalah ataupun saat listrik mati."
    },
    {
        name: "Internet Download Manager (IDM) v6.42 Full Version",
        image: "https://res.cloudinary.com/dwpnsfghy/image/upload/v1727485944/wlgnhhpwezffsfbuk0ms.png",
        link: "software/Download Manager/IDM V6.42.html",
        date: "Up 10 September 2024",
        shortDescription: "Internet Download Manager (IDM) adalah perangkat lunak yang dapat digunakan untuk mengunduh file melalui peramban web.",
        fullDescription: "Selain itu, IDM juga mampu memulihkan dan melanjutkan unduhan yang terputus karena koneksi yang bermasalah ataupun saat listrik mati."
    },
    {
        name: "KMSAuto++ 1.7.9 Multilingual",
        image: "https://res.cloudinary.com/dwpnsfghy/image/upload/v1727486223/gouuns0adajw0f25mfbz.jpg",
        link: "#",
        date: "Up 10 September 2024",
        shortDescription: "KMSAuto Net 2015 v1.4.0 Portable adalah perangkat lunak yang dapat secara otomatis mengaktifkan produk Windows dan Office menggunakan teknologi KMS (Key Management Service).",
        fullDescription: ""
    }
];


function searchApp() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const resultContainer = document.getElementById("resultContainer");

    // Kosongkan hasil sebelumnya
    resultContainer.innerHTML = '';

    // Jika input kosong, tidak ada yang perlu ditampilkan
    if (input === '') {
        return; // Keluar dari fungsi jika input kosong
    }

    // Mencari aplikasi yang sesuai dengan input
    const filteredApps = apps.filter(app => app.name.toLowerCase().includes(input));

    // Menampilkan hasil pencarian
    if (filteredApps.length > 0) {
        filteredApps.forEach(app => {
            const postDiv = createPostElement(app);
            resultContainer.appendChild(postDiv); // Menambahkan postDiv ke resultContainer
        });
    }
}

// Fungsi untuk membuat elemen post
function createPostElement(app) {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");
    
    postDiv.innerHTML = `
        <img src="${app.image}" alt="${app.name}" class="app-icon">
        <h2><a href="${app.link}" class="post-title">${app.name} </a></h2>
        <p class="post-meta">${app.date}</p>
        <p id="short-text">${app.shortDescription}
            <span id="full-text" style="display: none;">${app.fullDescription}</span>
            <a class="toggle-button" onclick="toggleText(event)">Selengkapnya...</a>
        </p>
    `;
    
    return postDiv; // Mengembalikan elemen post yang telah dibuat
}

function toggleText(event) {
    const fullText = event.target.previousElementSibling;
    if (fullText.style.display === "inline") {
        fullText.style.display = "inline"; // Tampilkan teks lengkap
        event.target.textContent = "Sembunyikan..."; // Ubah teks link
    } else {
        fullText.style.display = "none"; // Sembunyikan teks lengkap
        event.target.textContent = "Selengkapnya..."; // Kembali ke teks asli
    }
}
