import { getDatabase, ref, set, onValue, push, get } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";
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

// Helper function to encode the ID for use in selectors
function encodeId(id) {
    return id.replace(/[/]/g, '_');
}

// Fungsi untuk menambahkan komentar ke Firebase
export function addComment() {
    const username = document.getElementById('username').value;
    const commentText = document.getElementById('commentText').value;

    if (username === '' || commentText === '') {
        alert('Harap isi nama dan komentar agar pengguna lain mengetahui siapa yang membalas komentar!');
        return;
    }

    const commentRef = push(ref(database, 'comments'));

    set(commentRef, {
        username: username,
        text: commentText,
        timestamp: new Date().toISOString(),
        replies: {}
    })
    .then(() => {
        displayComments();
    })
    .catch((error) => {
        console.error("Error writing new comment to Firebase Database", error);
    });

    document.getElementById('username').value = '';
    document.getElementById('commentText').value = '';
}

// Fungsi untuk membuat elemen komentar
function createCommentElement(comment, commentId, level = 0, replyToName = null) {
    let commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    commentDiv.style.marginLeft = `${level * 20}px`;

    const encodedId = encodeId(commentId);

    let replyToHTML = '';
    if (replyToName) {
        replyToHTML = `<p><small>Membalas ke: ${replyToName}</small></p>`;
    }

    commentDiv.innerHTML = `
    <div class="comment-box">
        <h4 class="comment-username">${comment.username}</h4>
        ${replyToHTML}
        <p class="comment-text">${comment.text}</p>
        <p class="comment-timestamp"><small>${new Date(comment.timestamp).toLocaleString()}</small></p>
        <button class="comment-reply-btn" onclick="showReplyForm('${encodedId}', '${comment.username}')">Balas</button>
        <div id="replyForm-${encodedId}" class="reply-form" style="display: none;">
            <input type="text" id="replyUsername-${encodedId}" class="reply-input" placeholder="Nama Anda" required autocomplete="off">
            <input type="text" id="replyText-${encodedId}" class="reply-input" placeholder="Tulis balasan..." required autocomplete="off">
            <button class="reply-submit-btn" onclick="addReply('${commentId}', '${comment.username}')">Kirim Balasan</button>
        </div>
        <div id="replies-${encodedId}" class="replies-container"></div>
    </div>
`;


    return commentDiv;
}

// Fungsi rekursif untuk menampilkan komentar dan balasan
function displayCommentAndReplies(comment, commentId, parentElement, level = 0) {
    const commentElement = createCommentElement(comment, commentId, level, comment.replyTo);
    parentElement.appendChild(commentElement);

    const encodedId = encodeId(commentId);
    const repliesContainer = commentElement.querySelector(`#replies-${encodedId}`);

    if (comment.replies) {
        Object.entries(comment.replies).forEach(([replyId, reply]) => {
            displayCommentAndReplies(reply, `${commentId}/${replyId}`, repliesContainer, level + 1);
        });
    }
}

// Fungsi untuk menampilkan komentar dan balasan dari Firebase
export function displayComments() {
    const commentList = document.getElementById('commentList');
    commentList.innerHTML = '';

    const commentRef = ref(database, 'comments');
    onValue(commentRef, (snapshot) => {
        const comments = snapshot.val();
        if (comments) {
            Object.entries(comments).forEach(([commentId, comment]) => {
                displayCommentAndReplies(comment, commentId, commentList);
            });
        } else {
            commentList.innerHTML = '<p>Tidak ada komentar yang tersedia.</p>';
        }
    });
}

// Fungsi untuk menampilkan form balasan
window.showReplyForm = function(encodedId, replyToName) {
    const replyForm = document.getElementById(`replyForm-${encodedId}`);
    if (replyForm) {
        replyForm.style.display = replyForm.style.display === 'none' ? 'block' : 'none';
        const replyText = document.getElementById(`replyText-${encodedId}`);
        replyText.placeholder = `Balas ke ${replyToName}...`;
    }
}

// Fungsi untuk menambahkan balasan
window.addReply = function(commentId, replyToName) {
    const encodedId = encodeId(commentId);
    const replyUsername = document.getElementById(`replyUsername-${encodedId}`).value;
    const replyText = document.getElementById(`replyText-${encodedId}`).value;

    if (replyUsername === '' || replyText === '') {
        alert('Harap isi nama dan balasan agar pengguna lain mengetahui siapa yang membalas komentar!');
        return;
    }

    const replyRef = push(ref(database, `comments/${commentId.replace(/\//g, '/replies/')}/replies`));

    set(replyRef, {
        username: replyUsername,
        text: replyText,
        timestamp: new Date().toISOString(),
        replies: {},
        replyTo: replyToName
    })
    .then(() => {
        displayComments();
    })
    .catch((error) => {
        console.error("Error writing new reply to Firebase Database", error);
    });

    document.getElementById(`replyUsername-${encodedId}`).value = '';
    document.getElementById(`replyText-${encodedId}`).value = '';
}

// Tampilkan komentar saat halaman dimuat
window.onload = displayComments;

// Mengekspos fungsi addComment ke objek window
window.addComment = addComment;