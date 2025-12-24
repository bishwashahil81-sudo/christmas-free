// --- SNOW EFFECT ---
const canvas = document.createElement("canvas");
canvas.className = "snow";
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");
let w, h;
let flakes = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function createFlakes() {
  flakes = Array.from({ length: 120 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 3 + 1,
    speed: Math.random() * 1 + 0.5
  }));
}
createFlakes();

function draw() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  flakes.forEach(f => {
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    ctx.fill();
    f.y += f.speed;
    f.x += Math.sin(f.y * 0.01);
    if (f.y > h) {
      f.y = -5;
      f.x = Math.random() * w;
    }
  });
  requestAnimationFrame(draw);
}
draw();

// --- MUSIC CONTROLS ---
const bgm = new Audio('assets/bgm.mp3');
bgm.loop = true;
bgm.volume = 0.28;
let musicPlaying = false;

function updateMusicButton() {
  const btn = document.getElementById('music-toggle');
  if (!btn) return;
  btn.textContent = musicPlaying ? '🔊 Music ON' : '🔈 Music OFF';
}

function toggleMusic() {
  if (musicPlaying) {
    bgm.pause();
    musicPlaying = false;
  } else {
    bgm.play().catch(() => console.log("User interaction needed"));
    musicPlaying = true;
  }
  updateMusicButton();
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('music-toggle');
  if (btn) btn.addEventListener('click', toggleMusic);
});

// --- TIC-TAC-TOE GAME LOGIC ---
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function play(index) {
  const cells = document.querySelectorAll('.cell');
  if (board[index] === "" && gameActive) {
    board[index] = "X";
    cells[index].innerText = "X";
    cells[index].style.color = "#ff4d4d"; // Red for X
    
    if (checkWin()) return;

    setTimeout(() => {
      let empty = board.map((v, i) => v === "" ? i : null).filter(v => v !== null);
      if (empty.length > 0) {
        let move = empty[0]; 
        board[move] = "O";
        cells[move].innerText = "O";
        cells[move].style.color = "#28a745"; // Green for O
        checkWin();
      }
    }, 400);
  }
}

function checkWin() {
  const winConditions = [
    [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
  ];
  let won = winConditions.some(c => c.every(i => board[i] === "X"));

  if (won || board.filter(x => x !== "").length >= 5) {
    const reward = document.getElementById('reward');
    if(reward) reward.style.display = 'block';
    gameActive = false;
    return true;
  }
  return false;
}

