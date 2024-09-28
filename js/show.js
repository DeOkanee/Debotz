document.addEventListener("DOMContentLoaded", function() {
    const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
    
    dropdownToggles.forEach(function(dropdownToggle) {
        dropdownToggle.addEventListener("click", function(event) {
            event.preventDefault(); // Mencegah link melakukan navigasi
            const dropdownMenu = this.nextElementSibling; // Mengambil dropdown yang sesuai
            
            // Toggle tampilan dropdown
            dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
        });
    });

    // Menutup dropdown jika mengklik di luar dropdown
    document.addEventListener("click", function(event) {
        dropdownToggles.forEach(function(dropdownToggle) {
            const dropdownMenu = dropdownToggle.nextElementSibling;

            if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.style.display = "none"; // Sembunyikan dropdown
            }
        });
    });
});
