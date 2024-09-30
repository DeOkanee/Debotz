// Import Firebase functions
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCTqd8AyojtVwyzWpnCWT2UJknEHEm3_Tk",
    authDomain: "debotz-1752a.firebaseapp.com",
    projectId: "debotz-1752a",
    storageBucket: "debotz-1752a.appspot.com",
    messagingSenderId: "652148256733",
    appId: "1:652148256733:web:de3c060cd18cef6e8b1034",
    measurementId: "G-0TBXQXBMBR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Fungsi untuk menambahkan komentar ke Firebase
function addComment() {
    const username = document.getElementById('username').value;
    const commentText = document.getElementById('commentText').value;

    if (username === '' || commentText === '') {
        alert('Harap isi nama dan komentar!');
        return;
    }

    const commentRef = ref(database, 'comments/' + Date.now()); // Menggunakan timestamp sebagai ID unik
    set(commentRef, {
        username: username,
        text: commentText,
        timestamp: new Date().toISOString()
    });

    document.getElementById('username').value = '';
    document.getElementById('commentText').value = '';
}

// Fungsi untuk menampilkan komentar dari Firebase
function displayComments() {
    const commentList = document.getElementById('commentList');
    commentList.innerHTML = ''; // Mengosongkan daftar komentar

    const commentRef = ref(database, 'comments');
    onValue(commentRef, (snapshot) => {
        const comments = snapshot.val();
        commentList.innerHTML = ''; // Bersihkan tampilan sebelumnya

        for (let id in comments) {
            let comment = comments[id];
            let commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');

            commentDiv.innerHTML = `
                <h4>${comment.username}</h4>
                <p>${comment.text}</p>
                <p><small>${new Date(comment.timestamp).toLocaleString()}</small></p>
            `;

            commentList.appendChild(commentDiv);
        }
    });
}

// Tampilkan komentar saat halaman dimuat
window.onload = displayComments;
