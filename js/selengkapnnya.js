document.addEventListener('click', function(event) {
    // Cek apakah elemen yang diklik memiliki kelas toggle-button
    if (event.target.classList.contains('toggle-button')) {
        event.preventDefault(); // Mencegah aksi default anchor link
        
        // Ambil elemen full-text terkait
        var fullText = event.target.previousElementSibling;
        
        // Cek apakah teks penuh ditampilkan
        if (fullText.style.display === "none") {
            fullText.style.display = "inline"; // Tampilkan teks penuh
            event.target.innerText = "Tutup"; // Ubah teks tombol
        } else {
            fullText.style.display = "none"; // Sembunyikan teks penuh
            event.target.innerText = "Selengkapnya"; // Kembalikan teks tombol
        }
    }
});
