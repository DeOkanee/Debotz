 // Sample game data
 const games = [
    { id: 1, title: "Part 1", link: "#" },
    { id: 2, title: "Part 2", link: "#" },
    { id: 3, title: "Part 3", link: "#" },
    { id: 4, title: "Part 4", link: "#" },
    { id: 5, title: "Part 5", link: "#" },
    { id: 6, title: "Part 6", link: "#" },
    { id: 7, title: "Part 7", link: "#" },
    { id: 8, title: "Part 8", link: "#" },
    { id: 9, title: "Part 9", link: "#" },
    { id: 10, title: "Part 10", link: "#" },
    { id: 11, title: "Part 11", link: "#" },
    { id: 12, title: "Part 12", link: "#" },
    { id: 13, title: "Part 13", link: "#" },
    { id: 14, title: "Part 14", link: "#" },
    { id: 15, title: "Part 15", link: "#" },
];


// Generate game cards
function renderGames(gamesArray) {
    const gameList = document.getElementById('gameList');
    gameList.innerHTML = '';
    
    gamesArray.forEach(game => {
        gameList.innerHTML += `
            <div class="col-md-6 col-lg-4">
                <div class="game-card">
                    <img src="https://res.cloudinary.com/dwpnsfghy/image/upload/v1727583330/blvvp1asve4nlzwpdlkh.png" style="width:60px; height:60px;" class="game-image mb-3" alt="${game.title}">
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
