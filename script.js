// 1. LOADER & MUSIC
window.addEventListener('load', () => {
    setTimeout(() => { 
        document.getElementById('loader').style.opacity = '0';
        setTimeout(() => document.getElementById('loader').style.display = 'none', 500);
    }, 1500);
});

const audio = new Audio('./bgm.mp3'); audio.loop = true;
document.getElementById('musicToggle').addEventListener('click', function() {
    if (audio.paused) { audio.play(); this.innerText = "Music ON 🔊"; }
    else { audio.pause(); this.innerText = "Music OFF 🔇"; }
});

function showSection(id) {
    document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

// 2. ROBOT TIC-TAC-TOE
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("statusText");
const winConditions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let options = ["", "", "", "", "", "", "", "", ""];
let running = true;

cells.forEach(cell => cell.addEventListener("click", function() {
    const index = this.getAttribute("data-index");
    if (options[index] !== "" || !running) return;
    makeMove(this, index, "X");
    if (running && options.includes("")) {
        statusText.textContent = "Robot thinking...";
        setTimeout(robotPlay, 600);
    }
}));

function makeMove(cell, index, player) {
    options[index] = player;
    cell.textContent = player;
    cell.classList.add(player === "X" ? "x-player" : "o-player");
    checkWinner(player);
}

function robotPlay() {
    let available = options.map((v, i) => v === "" ? i : null).filter(v => v !== null);
    if (available.length > 0 && running) {
        let move = available[Math.floor(Math.random() * available.length)];
        makeMove(document.querySelector(`[data-index="${move}"]`), move, "O");
    }
}

function checkWinner(player) {
    let won = winConditions.some(c => options[c[0]] === player && options[c[1]] === player && options[c[2]] === player);
    if (won) {
        running = false;
        if(player === "X") {
            document.getElementById('winTitle').innerText = "You Won! 🎉";
            document.getElementById('winOverlay').style.display = 'flex';
        } else {
            document.getElementById('winTitle').innerText = "Robot Won! 🤖";
            document.getElementById('winOverlay').style.display = 'flex';
        }
        return;
    }
    if (!options.includes("")) { statusText.textContent = "Draw! 🤝"; running = false; return; }
    statusText.textContent = player === "X" ? "Robot's Turn" : "Your Turn (X)";
}

function closeWinPopup() {
    document.getElementById('winOverlay').style.display = 'none';
    document.getElementById("restartBtn").click();
}

document.getElementById("restartBtn").addEventListener("click", () => {
    options.fill("");
    cells.forEach(c => { c.textContent = ""; c.classList.remove("x-player", "o-player"); });
    running = true; statusText.textContent = "Your Turn (X)";
});

// 3. SNOW & NOTES
const canvas = document.getElementById('snowCanvas'); const ctx = canvas.getContext('2d');
let particles = [];
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resize); resize();
class Snowflake {
    constructor() { this.reset(); }
    reset() { this.x = Math.random()*canvas.width; this.y = Math.random()*canvas.height; this.s = Math.random()*2+1; this.v = Math.random()*1+0.5; }
    update() { this.y += this.v; if (this.y > canvas.height) this.y = -10; }
    draw() { ctx.fillStyle='white'; ctx.beginPath(); ctx.arc(this.x,this.y,this.s,0,Math.PI*2); ctx.fill(); }
}
for(let i=0; i<60; i++) particles.push(new Snowflake());
function animate() { ctx.clearRect(0,0,canvas.width,canvas.height); particles.forEach(p=>{p.update();p.draw();}); requestAnimationFrame(animate); }
animate();

function getNewNote() {
    const notesArr = ["JOY TO THE WORLD! ✨", "MERRY CHRISTMAS! ❄️", "A BLESSED NEW YEAR! 🥂"];
    document.getElementById('noteContent').innerText = notesArr[Math.floor(Math.random() * notesArr.length)];
}

