 // Sample game data
 const games = [
    { id: 1, title: "Part 1", link: "https://sfl.gl/nmwWbbcn" },
    { id: 2, title: "Part 2", link: "https://sfl.gl/eKo84nj" },
    { id: 3, title: "Part 3", link: "https://sfl.gl/GiObQhtG" },
    { id: 4, title: "Part 4", link: "https://sfl.gl/Y4pW" },
    { id: 5, title: "Part 5", link: "https://sfl.gl/JPeYC" },
    { id: 6, title: "Part 6", link: "https://sfl.gl/OGuLDwH" },
    { id: 7, title: "Part 7", link: "https://sfl.gl/meCVH" },
    { id: 8, title: "Part 8", link: "https://sfl.gl/N6XR" },
    { id: 9, title: "Part 9", link: "https://sfl.gl/N2YSPA4" },
    { id: 10, title: "Part 10", link: "https://sfl.gl/yzfmDY5" },
    { id: 11, title: "Part 11", link: "https://sfl.gl/l1Exxn0B" },
    { id: 12, title: "Part 12", link: "https://sfl.gl/Q1Hz3uUW" },
    { id: 13, title: "Part 13", link: "https://sfl.gl/I23iCYTh" },
    { id: 14, title: "Part 14", link: "https://sfl.gl/FxRTl" },
    { id: 15, title: "Part 15", link: "https://sfl.gl/HupM2" },
];


// Generate game cards
function renderGames(gamesArray) {
    const gameList = document.getElementById('gameList');
    gameList.innerHTML = '';
    
    gamesArray.forEach(game => {
        gameList.innerHTML += `
            <div class="col-md-6 col-lg-4">
                <div class="game-card">
                    <img src="https://res.cloudinary.com/dwpnsfghy/image/upload/v1727686805/re2sslyqvivppsmhbqht.png" style="width:50px; height:50px;" class="game-image mb-3" alt="${game.title}">
                    <h4>${game.title}</h4>
                   
                    <a href="${game.link}" target="_blank" class="btn download-btn">
                        <i class="fas fa-download me-2"></i>Download
                    </a>
                </div>
            </div>
        `;
    });
}

// Search functionality
// Search functionality
document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredGames = games.filter(game => 
        game.title.toLowerCase().includes(searchTerm) // Hanya mencari berdasarkan title karena `desc` tidak ada
    );
    renderGames(filteredGames);
});


// Initial render
renderGames(games);

// Smooth scroll to top
document.querySelector('.back-to-top').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
const filteredGames = games.filter(game => 
    game.title.toLowerCase().includes(searchTerm) || 
    (game.desc && game.desc.toLowerCase().includes(searchTerm))
);
