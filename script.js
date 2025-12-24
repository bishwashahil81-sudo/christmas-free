const statusText = document.querySelector("#statusText");
const cells = document.querySelectorAll(".cell");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;

// 1. GAME LOGIC
cells.forEach(cell => cell.addEventListener("click", cellClicked));
restartBtn.addEventListener("click", restartGame);

function cellClicked() {
    const cellIndex = this.getAttribute("data-index");
    if (options[cellIndex] != "" || !running) return;
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        if (options[condition[0]] == "" || options[condition[1]] == "" || options[condition[2]] == "") continue;
        if (options[condition[0]] == options[condition[1]] && options[condition[1]] == options[condition[2]]) {
            roundWon = true; break;
        }
    }
    if (roundWon) { statusText.textContent = `${currentPlayer} Wins! 🎉`; running = false; }
    else if (!options.includes("")) { statusText.textContent = `Draw! 🤝`; running = false; }
    else { changePlayer(); }
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `Player X's Turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}

// 2. SNOW & MUSIC (Same as before)
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
for(let i=0; i<70; i++) particles.push(new Snowflake());
function animate() { ctx.clearRect(0,0,canvas.width,canvas.height); particles.forEach(p=>{p.update();p.draw();}); requestAnimationFrame(animate); }
animate();

const audio = new Audio('./bgm.mp3');
audio.loop = true;
document.getElementById('musicToggle').addEventListener('click', function() {
    if (audio.paused) { audio.play(); this.innerText = "Music ON 🔊"; }
    else { audio.pause(); this.innerText = "Music OFF 🔇"; }
});

