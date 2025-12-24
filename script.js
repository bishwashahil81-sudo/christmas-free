// 1. PERSISTENT MUSIC LOGIC
const audio = new Audio('./bgm.mp3'); 
audio.loop = true;

document.getElementById('musicToggle').addEventListener('click', function() {
    if (audio.paused) { 
        audio.play(); 
        this.innerText = "Music ON 🔊"; 
        this.style.background = "#28a745"; 
    } else { 
        audio.pause(); 
        this.innerText = "Music OFF 🔇"; 
        this.style.background = "rgba(255,255,255,0.1)"; 
    }
});

// 2. SECTION NAVIGATION (Keeps music playing across sections)
function showSection(id) {
    document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

// 3. TIC-TAC-TOE ROBOT AI WITH NEON GLOW
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const winConditions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let options = ["", "", "", "", "", "", "", "", ""];
let running = true;

cells.forEach(cell => cell.addEventListener("click", function() {
    const index = this.getAttribute("data-index");
    if (options[index] !== "" || !running) return;

    // Player Move (X)
    makeMove(this, index, "X");

    // Robot Move (O) - Plays automatically after 0.6 seconds
    if (running && options.includes("")) {
        statusText.textContent = "Robot thinking...";
        setTimeout(robotPlay, 600);
    }
}));

function makeMove(cell, index, player) {
    options[index] = player;
    cell.textContent = player;
    
    // Triggers the Neon Glow CSS classes
    if (player === "X") {
        cell.classList.add("x-player");
    } else {
        cell.classList.add("o-player");
    }
    
    checkWinner(player);
}

function robotPlay() {
    let available = options.map((v, i) => v === "" ? i : null).filter(v => v !== null);
    if (available.length > 0 && running) {
        let moveIndex = available[Math.floor(Math.random() * available.length)];
        let cell = document.querySelector(`[data-index="${moveIndex}"]`);
        
        makeMove(cell, moveIndex, "O");
    }
}

function checkWinner(player) {
    let won = winConditions.some(c => options[c[0]] === player && options[c[1]] === player && options[c[2]] === player);
    
    if (won) {
        statusText.textContent = player === "X" ? "You Won! 🎉" : "Robot Won! 🤖";
        running = false;
        return true;
    } else if (!options.includes("")) {
        statusText.textContent = "Draw! 🤝";
        running = false;
        return true;
    }
    
    statusText.textContent = player === "X" ? "Robot's Turn" : "Your Turn (X)";
    return false;
}

// 4. RESET GAME LOGIC
document.getElementById("restartBtn").addEventListener("click", () => {
    options.fill("");
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x-player", "o-player"); // Clears the glow
    });
    running = true;
    statusText.textContent = "Your Turn (X)";
});

// 5. SNOW ANIMATION
const canvas = document.getElementById('snowCanvas'); 
const ctx = canvas.getContext('2d');
let particles = [];

function resize() { 
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight; 
}
window.addEventListener('resize', resize); 
resize();

class Snowflake {
    constructor() { this.reset(); }
    reset() { 
        this.x = Math.random() * canvas.width; 
        this.y = Math.random() * canvas.height; 
        this.s = Math.random() * 2 + 1; 
        this.v = Math.random() * 1 + 0.5; 
    }
    update() { 
        this.y += this.v; 
        if (this.y > canvas.height) this.y = -10; 
    }
    draw() { 
        ctx.fillStyle = 'white'; 
        ctx.beginPath(); 
        ctx.arc(this.x, this.y, this.s, 0, Math.PI * 2); 
        ctx.fill(); 
    }
}

for(let i = 0; i < 60; i++) particles.push(new Snowflake());

function animate() { 
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    particles.forEach(p => { p.update(); p.draw(); }); 
    requestAnimationFrame(animate); 
}
animate();

// 6. NOTES LOGIC
const holidayNotes = [
    "WISHING YOU JOY! ✨", 
    "MERRY CHRISTMAS! ❄️", 
    "HAVE A GREAT YEAR! 🥂",
    "MAY YOUR DAYS BE BRIGHT! 🌟"
];

function getNewNote() { 
    const randomNote = holidayNotes[Math.floor(Math.random() * holidayNotes.length)];
    document.getElementById('noteContent').innerText = randomNote; 
}

