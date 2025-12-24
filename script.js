// PERSISTENT MUSIC
const audio = new Audio('./bgm.mp3'); audio.loop = true;
document.getElementById('musicToggle').addEventListener('click', function() {
    if (audio.paused) { audio.play(); this.innerText = "Music ON 🔊"; this.style.background = "#28a745"; }
    else { audio.pause(); this.innerText = "Music OFF 🔇"; this.style.background = "rgba(255,255,255,0.1)"; }
});

// SECTION NAVIGATION (No Refresh = Music stays on)
function showSection(id) {
    document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

// TIC-TAC-TOE ROBOT AI
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const winConditions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let options = ["", "", "", "", "", "", "", "", ""];
let running = true;

cells.forEach(cell => cell.addEventListener("click", function() {
    const index = this.getAttribute("data-index");
    if (options[index] !== "" || !running) return;

    options[index] = "X";
    this.textContent = "X";
    if (checkWinner("X")) return;

    if (options.includes("")) {
        statusText.textContent = "Robot thinking...";
        setTimeout(robotPlay, 600);
    }
}));

function robotPlay() {
    let available = options.map((v, i) => v === "" ? i : null).filter(v => v !== null);
    if (available.length > 0 && running) {
        let move = available[Math.floor(Math.random() * available.length)];
        options[move] = "O";
        document.querySelector(`[data-index="${move}"]`).textContent = "O";
        checkWinner("O");
    }
}

function checkWinner(player) {
    let won = winConditions.some(c => options[c[0]] === player && options[c[1]] === player && options[c[2]] === player);
    if (won) {
        statusText.textContent = player === "X" ? "You Won! 🎉" : "Robot Won! 🤖";
        running = false; return true;
    } else if (!options.includes("")) {
        statusText.textContent = "Draw! 🤝"; running = false; return true;
    }
    statusText.textContent = player === "X" ? "Robot's Turn" : "Your Turn (X)";
    return false;
}

document.getElementById("restartBtn").addEventListener("click", () => {
    options.fill(""); cells.forEach(c => c.textContent = "");
    running = true; statusText.textContent = "Your Turn (X)";
});

// SNOW ANIMATION
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

// NOTES LOGIC
const notes = ["WISHING YOU JOY! ✨", "MERRY CHRISTMAS! ❄️", "HAVE A GREAT YEAR! 🥂"];
function getNewNote() { document.getElementById('noteContent').innerText = notes[Math.floor(Math.random() * notes.length)]; }

// Locate your makeMove function and update it to this:
function makeMove(cell, index, player) {
    options[index] = player;
    cell.textContent = player;
    
    // This part adds the glow class based on who played
    if (player === "X") {
        cell.classList.add("x-player");
    } else {
        cell.classList.add("o-player");
    }
    
    checkWinner();
}

// Locate your restartBtn event listener or restart function and update it:
document.getElementById("restartBtn").addEventListener("click", () => {
    options.fill("");
    cells.forEach(cell => {
        cell.textContent = "";
        // This removes the glow so the board is fresh for the next game
        cell.classList.remove("x-player", "o-player");
    });
    running = true;
    statusText.textContent = "Your Turn (X)";
});
