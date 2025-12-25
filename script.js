/* START MUSIC */
function startMusic() {
  document.getElementById("bgm").play();
}

/* BACKGROUND ROTATION */
const backgrounds = ["vibe1.jpg", "vibe2.jpg", "vibe3.jpg", "vibe4.jpg"];
let bgIndex = 0;

function rotateBackground() {
  document.body.style.backgroundImage = `url(${backgrounds[bgIndex]})`;
  bgIndex = (bgIndex + 1) % backgrounds.length;
}
rotateBackground();
setInterval(rotateBackground, 8000);

/* SNOW */
for (let i = 0; i < 60; i++) {
  const snow = document.createElement("div");
  snow.className = "snowflake";
  snow.innerHTML = "❄";
  snow.style.left = Math.random() * 100 + "vw";
  snow.style.animationDuration = 5 + Math.random() * 5 + "s";
  snow.style.opacity = Math.random();
  document.body.appendChild(snow);
}

/* STARS */
for (let i = 0; i < 40; i++) {
  const star = document.createElement("div");
  star.className = "star";
  star.innerHTML = "★";
  star.style.top = Math.random() * 100 + "vh";
  star.style.left = Math.random() * 100 + "vw";
  document.body.appendChild(star);
}

/* TIC TAC TOE */
const board = document.getElementById("board");
let cells = Array(9).fill("");
let player = "❌";

function drawBoard() {
  board.innerHTML = "";
  cells.forEach((c, i) => {
    const div = document.createElement("div");
    div.className = "cell";
    div.innerText = c;
    div.onclick = () => {
      if (!cells[i]) {
        cells[i] = player;
        player = player === "❌" ? "⭕" : "❌";
        drawBoard();
      }
    };
    board.appendChild(div);
  });
}
drawBoard();

/* WISH + SAVE */
function sendWish() {
  const wishInput = document.getElementById("wishInput");
  if (!wishInput.value) return;

  localStorage.setItem("santaWish", wishInput.value);

  const replies = [
    "🎅 Ho Ho Ho! I'm on my way!",
    "🎁 Santa has received your wish!",
    "🦌 The reindeers are ready!",
    "❄️ Keep believing in magic!"
  ];

  document.getElementById("santaReply").innerText =
    replies[Math.floor(Math.random() * replies.length)];

  animateSleigh();
}

/* LOAD SAVED WISH */
const savedWish = localStorage.getItem("santaWish");
if (savedWish) {
  document.getElementById("wishInput").value = savedWish;
}

/* SLEIGH ANIMATION */
function animateSleigh() {
  const sleigh = document.getElementById("sleigh");
  sleigh.style.transition = "none";
  sleigh.style.left = "-300px";

  setTimeout(() => {
    sleigh.style.transition = "left 6s linear";
    sleigh.style.left = "110%";
  }, 100);
}
