// 1. MUSIC LOGIC
const audio = new Audio('./bgm.mp3');
audio.loop = true;
const musicBtn = document.getElementById('musicToggle');

musicBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play().then(() => {
            musicBtn.innerText = "Music ON 🔊";
            musicBtn.style.background = "#28a745";
        });
    } else {
        audio.pause();
        musicBtn.innerText = "Music OFF 🔇";
        musicBtn.style.background = "#ff4d4d";
    }
});

// 2. TIC-TAC-TOE LOGIC
const boardElement = document.getElementById('board');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X"; 

function checkWinner() {
    const winPatterns = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (let p of winPatterns) {
        if (board[p[0]] && board[p[0]] === board[p[1]] && board[p[0]] === board[p[2]]) return board[p[0]];
    }
    return board.includes("") ? null : "Draw";
}

boardElement.addEventListener('click', (e) => {
    const index = e.target.dataset.index;
    if (!index || board[index] !== "" || statusText.innerText.includes("Wins")) return;
    
    board[index] = currentPlayer;
    e.target.innerText = currentPlayer;
    
    let winner = checkWinner();
    if (winner) {
        statusText.innerText = winner === "Draw" ? "It's a Draw! 🤝" : `${winner} Wins! 🎉`;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.innerText = `${currentPlayer}'s Turn`;
    }
});

resetBtn.addEventListener('click', () => {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    statusText.innerText = "Your Turn (X)";
    document.querySelectorAll('.cell').forEach(c => c.innerText = "");
});

// 3. SNOWFALL (Simplified)
const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resize); resize();
class Snowflake {
    constructor() { this.reset(); }
    reset() { this.x = Math.random()*canvas.width; this.y = Math.random()*canvas.height; this.s = Math.random()*3+1; this.v = Math.random()*1+0.5; }
    update() { this.y += this.v; if (this.y > canvas.height) this.y = -10; }
    draw() { ctx.fillStyle='white'; ctx.beginPath(); ctx.arc(this.x,this.y,this.s,0,Math.PI*2); ctx.fill(); }
}
for(let i=0; i<100; i++) particles.push(new Snowflake());
function animate() { ctx.clearRect(0,0,canvas.width,canvas.height); particles.forEach(p=>{p.update();p.draw();}); requestAnimationFrame(animate); }
animate();



