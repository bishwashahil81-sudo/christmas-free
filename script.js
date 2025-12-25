// 1. LOADER & MUSIC
window.onload = () => { setTimeout(() => document.getElementById('loader').style.display = 'none', 1000); };
const audio = new Audio('music.mp3'); audio.loop = true;
document.getElementById('musicToggle').onclick = function() {
    audio.paused ? (audio.play(), this.innerText = "Music ON 🔊") : (audio.pause(), this.innerText = "Music OFF 🔇");
};

function showSection(id) {
    document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

// 2. ROBOT TIC-TAC-TOE
const boardElement = document.getElementById("board");
let cells = Array(9).fill("");
let running = true;

function createBoard() {
    boardElement.innerHTML = "";
    cells.forEach((val, i) => {
        const div = document.createElement("div");
        div.className = `cell ${val === "X" ? "x-player" : val === "O" ? "o-player" : ""}`;
        div.textContent = val;
        div.onclick = () => playerMove(i);
        boardElement.appendChild(div);
    });
}

function playerMove(i) {
    if (cells[i] || !running) return;
    cells[i] = "X"; createBoard();
    if (!checkWinner("X") && cells.includes("")) setTimeout(robotMove, 600);
}

function robotMove() {
    const empty = cells.map((v, i) => v === "" ? i : null).filter(v => v !== null);
    if (empty.length && running) {
        cells[empty[Math.floor(Math.random() * empty.length)]] = "O";
        createBoard(); checkWinner("O");
    }
}

function checkWinner(p) {
    const win = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    if (win.some(a => a.every(i => cells[i] === p))) {
        document.getElementById("winTitle").innerText = p === "X" ? "You Won! 🎉" : "Robot Won! 🤖";
        document.getElementById("winOverlay").style.display = "flex";
        running = false; return true;
    }
    return false;
}

document.getElementById("restartBtn").onclick = resetGame;
function resetGame() { cells.fill(""); running = true; createBoard(); document.getElementById("winOverlay").style.display = "none"; }
createBoard();

// 3. SNOWFALL
const canvas = document.getElementById('snowCanvas'); const ctx = canvas.getContext('2d');
let flakes = [];
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.onresize = resize; resize();
class Flake {
    constructor() { this.reset(); }
    reset() { this.x = Math.random()*canvas.width; this.y = Math.random()*-canvas.height; this.s = Math.random()*2+1; this.v = Math.random()*1+0.5; }
    update() { this.y += this.v; if (this.y > canvas.height) this.reset(); }
    draw() { ctx.fillStyle='white'; ctx.beginPath(); ctx.arc(this.x,this.y,this.s,0,Math.PI*2); ctx.fill(); }
}
for(let i=0; i<70; i++) flakes.push(new Flake());
function anim() { ctx.clearRect(0,0,canvas.width,canvas.height); flakes.forEach(f=>{f.update();f.draw();}); requestAnimationFrame(anim); }
anim();

// 4. NOTES
function getNewNote() {
    const notes = ["JOY TO THE WORLD! ✨", "MERRY CHRISTMAS! ❄️", "A BLESSED NEW YEAR! 🥂"];
    document.getElementById('noteContent').innerText = notes[Math.floor(Math.random() * notes.length)];
}
