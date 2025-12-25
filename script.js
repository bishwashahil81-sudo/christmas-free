// MUSIC
function startMusic() {
  document.getElementById("bgm").play();
}

// TIC TAC TOE
let currentSymbol = "❌";

function playCell(cell) {
  if (cell.textContent !== "") return;
  cell.textContent = currentSymbol;
  currentSymbol = currentSymbol === "❌" ? "⭕" : "❌";
}

function resetGame() {
  document.querySelectorAll(".cell").forEach(cell => {
    cell.textContent = "";
  });
  currentSymbol = "❌";
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
