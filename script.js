// Loading screen
function hideLoading() {
    document.getElementById('loading-screen').style.display = 'none';
}

// Snow animation
const canvas = document.getElementById('snow-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let snowflakes = [];
for (let i = 0; i < 100; i++) {
    snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.5
    });
}

function drawSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snowflakes.forEach(flake => {
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${flake.opacity})`;
        ctx.fill();
        flake.y += flake.speed;
        if (flake.y > canvas.height) {
            flake.y = 0;
            flake.x = Math.random() * canvas.width;
        }
    });
    requestAnimationFrame(drawSnow);
}
drawSnow();

// Music toggle
const music = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
let musicPlaying = false;

function toggleMusic() {
    if (musicPlaying) {
        music.pause();
        musicToggle.textContent = '🎵 Music Off';
    } else {
        music.play();
        musicToggle.textContent = '🎵 Music On';
    }
    musicPlaying = !musicPlaying;
}

// Section switching
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

// Tic-Tac-Toe
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const cells = document.querySelectorAll('.cell');
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

function handleCellClick(e) {
    const index = e.target.dataset.index;
    if (board[index] !== '' || !gameActive || currentPlayer === 'O') return;
    board[index] = 'X';
    e.target.textContent = 'X';
    e.target.classList.add('x');
    checkWinner();
    if (gameActive) {
        currentPlayer = 'O';
        setTimeout(robotMove, 600);
    }
}

function robotMove() {
    // Simple AI: Choose random empty cell
    let available = board.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);
    if (available.length > 0) {
        let move = available[Math.floor(Math.random() * available.length)];
        board[move] = 'O';
        cells[move].textContent = 'O';
        cells[move].classList.add('o');
        checkWinner();
        currentPlayer = 'X';
    }
}

function checkWinner() {
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];
    for (let pattern of winPatterns) {
        if (board[pattern[0]] && board[pattern[0]] === board[pattern[1]] && board[pattern[1]] === board[pattern[2]]) {
            if (board[pattern[0]] === 'X') {
                document.getElementById('win-popup').style.display = 'flex';
            }
            gameActive = false;
            return;
        }
    }
    if (!board.includes('')) {
        gameActive = false; // Tie, but no popup for tie
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
    currentPlayer = 'X';
    gameActive = true;
    document.getElementById('win-popup').style.display = 'none';
}

function closePopup() {
    document.getElementById('win-popup').style.display = 'none';
    resetGame();
}

// Notes
const wishes = [
    "May your holidays be filled with joy and laughter!",
    "Wishing you a season of peace and goodwill.",
    "Here's to new beginnings and happy memories!",
    "May the magic of Christmas fill your heart!",
    "Sending warm wishes for a festive season!"
];

function generateWish() {
    const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
    document.getElementById('wish-text').textContent = randomWish;
}
