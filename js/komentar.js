import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

// Konfigurasi Firebase Anda
const firebaseConfig = {
    apiKey: "AIzaSyCTqd8AyojtVwyzWpnCWT2UJknEHEm3_Tk",
    authDomain: "debotz-1752a.firebaseapp.com",
    projectId: "debotz-1752a",
    storageBucket: "debotz-1752a.appspot.com",
    messagingSenderId: "652148256733",
    appId: "1:652148256733:web:de3c060cd18cef6e8b1034",
    measurementId: "G-0TBXQXBMBR"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Fungsi untuk menambahkan komentar ke Firebase
export function addComment(parentId = null) {
    const username = document.getElementById('username').value; // Untuk komentar utama
    const commentText = document.getElementById('commentText').value;

    // Validasi input untuk komentar utama dan balasan
    if (username === '' || commentText === '') {
        alert('Harap isi nama dan komentar agar pengguna lain mengetahui siapa yang membalas komentar!');
        return;
    }

    // Mendapatkan referensi ke lokasi komentar atau balasan
    const commentRef = ref(database, parentId ? `comments/${parentId}/replies/${Date.now()}` : `comments/${Date.now()}`);

    set(commentRef, {
        username: username,
        text: commentText,
        timestamp: new Date().toISOString()
    })
    .then(() => {
        // Setelah berhasil disimpan, tampilkan komentar
        displayComments();
    })
    .catch((error) => {
        console.error("Error writing new comment to Firebase Database", error);
    });

    // Reset input setelah menambah komentar
    if (parentId === null) {
        document.getElementById('username').value = '';
        document.getElementById('commentText').value = '';
    } else {
        const replyInput = document.getElementById(`replyText-${parentId}`);
        const replyUsernameInput = document.getElementById(`replyUsername-${parentId}`);
        if (replyInput && replyUsernameInput) {
            replyInput.value = ''; // Reset input balasan jika ada
            replyUsernameInput.value = ''; // Reset input username balasan
        }
    }
}

// Fungsi untuk menampilkan komentar dari Firebase
export function displayComments() {
    const commentList = document.getElementById('commentList');
    commentList.innerHTML = ''; // Mengosongkan daftar komentar

    const commentRef = ref(database, 'comments');
    onValue(commentRef, (snapshot) => {
        const comments = snapshot.val();
        if (comments) {
            for (let id in comments) {
                let comment = comments[id];
                let commentDiv = document.createElement('div');
                commentDiv.classList.add('comment');

                // Menampilkan komentar utama
                commentDiv.innerHTML = `
                    <h4>${comment.username}</h4>
                    <p>${comment.text}</p>
                    <p><small>${new Date(comment.timestamp).toLocaleString()}</small></p>
                    <button onclick="showReplyForm('${id}', '${comment.username}')">Balas</button>
                    <div id="replyForm-${id}" style="display: none;">
                        <p>Membalas: <strong>${comment.username}</strong></p>
                        <input type="text" id="replyUsername-${id}" placeholder="Nama Anda" required>
                        <input type="text" id="replyText-${id}" placeholder="Tulis balasan..." required>
                        <button onclick="addReply('${id}')">Kirim Balasan</button>
                    </div>
                    <div id="replies-${id}"></div>
                `;

                // Menampilkan balasan jika ada
                const repliesDiv = document.getElementById(`replies-${id}`);
                if (comment.replies && repliesDiv) {
                    for (let replyId in comment.replies) {
                        let reply = comment.replies[replyId];
                        let replyDiv = document.createElement('div');
                        replyDiv.classList.add('reply');
                        replyDiv.innerHTML = `
                            <h5>${reply.username}</h5>
                            <p>${reply.text}</p>
                            <p><small>${new Date(reply.timestamp).toLocaleString()}</small></p>
                        `;
                        repliesDiv.appendChild(replyDiv);
                    }
                }

                commentList.appendChild(commentDiv);
            }
        } else {
            commentList.innerHTML = '<p>Tidak ada komentar yang tersedia.</p>';
        }
    });
}

// Fungsi untuk menampilkan form balasan
window.showReplyForm = function(commentId, username) {
    const replyForm = document.getElementById(`replyForm-${commentId}`);
    if (replyForm) {
        replyForm.style.display = replyForm.style.display === 'none' ? 'block' : 'none';
    }
}

// Fungsi untuk menambahkan balasan
window.addReply = function(commentId) {
    const replyUsername = document.getElementById(`replyUsername-${commentId}`).value; // Mengambil nama pengguna untuk balasan
    const replyText = document.getElementById(`replyText-${commentId}`).value;

    // Validasi input balasan
    if (replyUsername === '' || replyText === '') {
        alert('Harap isi nama dan balasan agar pengguna lain mengetahui siapa yang membalas komentar!');
        return;
    }

    const replyRef = ref(database, `comments/${commentId}/replies/${Date.now()}`);

    set(replyRef, {
        username: replyUsername,
        text: replyText,
        timestamp: new Date().toISOString()
    })
    .then(() => {
        displayComments(); // Tampilkan komentar dan balasan yang terbaru
    })
    .catch((error) => {
        console.error("Error writing new reply to Firebase Database", error);
    });

    // Reset input setelah menambah balasan
    document.getElementById(`replyUsername-${commentId}`).value = '';
    document.getElementById(`replyText-${commentId}`).value = '';
}

// Tampilkan komentar saat halaman dimuat
window.onload = displayComments;

// Mengekspos fungsi addComment ke objek window
window.addComment = addComment;
