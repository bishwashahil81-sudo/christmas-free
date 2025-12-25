// MUSIC
function startMusic() {
  document.getElementById("bgm").play();
}

// TIC TAC TOE — PLAYER vs ROBOT
let player = "❌";
let robot = "⭕";
let cells = document.querySelectorAll(".cell");
let gameActive = true;

function playCell(cell) {
  if (!gameActive || cell.textContent !== "") return;

  // Player move
  cell.textContent = player;

  // Robot move after short delay
  setTimeout(robotMove, 400);
}

function robotMove() {
  if (!gameActive) return;

  let emptyCells = Array.from(cells).filter(c => c.textContent === "");
  if (emptyCells.length === 0) return;

  let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  randomCell.textContent = robot;
}

function resetGame() {
  cells.forEach(cell => cell.textContent = "");
  gameActive = true;
}

// SANTA WISH
function sendWish() {
  const reply = document.getElementById("santaReply");
  reply.textContent = "🎅 Ho Ho Ho! I'm on my way!";
}

// BACKGROUND ROTATION
const images = ["vibe1.jpg", "vibe2.jpg", "vibe3.jpg", "vibe4.jpg"];
let index = 0;

setInterval(() => {
  index = (index + 1) % images.length;
  document.body.style.backgroundImage = `url(${images[index]})`;
}, 5000);

// SLEIGH ANIMATION
function moveSleigh() {
  const sleigh = document.getElementById("sleigh");
  sleigh.style.left = "-300px";
  setTimeout(() => {
    sleigh.style.transition = "left 10s linear";
    sleigh.style.left = "110%";
  }, 100);
}

setInterval(moveSleigh, 15000);
