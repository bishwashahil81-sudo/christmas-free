/* ================= LOADER ================= */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
});

/* ================= MUSIC (MOBILE SAFE) ================= */
const bgm = document.getElementById("bgm");
const musicToggle = document.getElementById("musicToggle");
let musicOn = false;

musicToggle.onclick = async () => {
  try {
    if (!musicOn) {
      bgm.volume = 0.6;
      await bgm.play();
      musicOn = true;
      musicToggle.textContent = "🔇 Mute";
    } else {
      bgm.pause();
      musicOn = false;
      musicToggle.textContent = "🎵 Music";
    }
  } catch {
    alert("Tap again to enable music 🎵");
  }
};

/* ================= NAV ================= */
document.querySelectorAll("[data-section]").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
    document.getElementById(btn.dataset.section).classList.add("active");
  };
});

/* ================= SHARE ================= */
const shareBtn = document.getElementById("shareBtn");
shareBtn.onclick = async () => {
  const url = location.href;
  if (navigator.share) {
    await navigator.share({ title: "Christmas 2025 🎄", url });
  } else {
    await navigator.clipboard.writeText(url);
    alert("Link copied 🎄");
  }
};

/* ================= TIC TAC TOE ================= */
let board = Array(9).fill(null);
let gameOver = false;
const cells = document.querySelectorAll(".cell");
const winOverlay = document.getElementById("winOverlay");

cells.forEach(c => c.onclick = () => {
  if (gameOver) return;
  const i = c.dataset.i;
  if (board[i]) return;
  place(i, "X");
  setTimeout(() => !gameOver && robotMove(), 600);
});

function place(i, p) {
  board[i] = p;
  cells[i].textContent = p;
  cells[i].classList.add(p);
  if (checkWin(p)) win();
}

function robotMove() {
  const i = board.findIndex(v => !v);
  if (i !== -1) place(i, "O");
}

function checkWin(p) {
  return [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ].some(c => c.every(i => board[i] === p));
}

function win() {
  if (gameOver) return;
  gameOver = true;

  winOverlay.style.display = "flex";
  navigator.vibrate?.([200,100,200,100,300]);
  spawnGifts();
}

function resetGame() {
  board.fill(null);
  gameOver = false;
  cells.forEach(c => {
    c.textContent = "";
    c.classList.remove("X", "O");
  });
  winOverlay.style.display = "none";
}

/* ================= SNOW ================= */
const snowCanvas = document.getElementById("snow");
const sctx = snowCanvas.getContext("2d");

function resizeSnow() {
  snowCanvas.width = innerWidth;
  snowCanvas.height = innerHeight;
}
resizeSnow();
addEventListener("resize", resizeSnow);

const flakes = Array.from({ length: 120 }, () => ({
  x: Math.random() * innerWidth,
  y: Math.random() * innerHeight,
  r: Math.random() * 2 + 1,
  s: Math.random() + 0.5
}));

(function snowLoop() {
  sctx.clearRect(0,0,snowCanvas.width,snowCanvas.height);
  flakes.forEach(f => {
    sctx.beginPath();
    sctx.arc(f.x, f.y, f.r, 0, Math.PI*2);
    sctx.fillStyle = "#fff";
    sctx.fill();
    f.y += f.s * 2;
    if (f.y > innerHeight) {
      f.y = -5;
      f.x = Math.random() * innerWidth;
    }
  });
  requestAnimationFrame(snowLoop);
})();

/* ================= STARS + AURORA + GIFTS ================= */
const fx = document.getElementById("effects");
const fctx = fx.getContext("2d");

function resizeFX() {
  fx.width = innerWidth;
  fx.height = innerHeight;
}
resizeFX();
addEventListener("resize", resizeFX);

/* Stars */
const stars = Array.from({ length: 60 }, () => ({
  x: Math.random() * fx.width,
  y: Math.random() * fx.height,
  s: Math.random() + 0.3
}));

/* Gifts */
let gifts = [];
function spawnGifts() {
  gifts = Array.from({ length: 20 }, () => ({
    x: Math.random() * fx.width,
    y: -20,
    s: Math.random() * 2 + 1
  }));
}

(function effectsLoop() {
  fctx.clearRect(0,0,fx.width,fx.height);

  /* Aurora */
  const g = fctx.createLinearGradient(0,0,fx.width,0);
  g.addColorStop(0,"rgba(0,255,150,0)");
  g.addColorStop(0.5,"rgba(0,255,150,0.25)");
  g.addColorStop(1,"rgba(0,255,150,0)");
  fctx.fillStyle = g;
  fctx.fillRect(0,0,fx.width,fx.height);

  /* Stars */
  stars.forEach(s => {
    fctx.beginPath();
    fctx.arc(s.x, s.y, 2, 0, Math.PI*2);
    fctx.fillStyle = "rgba(255,230,150,0.8)";
    fctx.shadowBlur = 10;
    fctx.shadowColor = "rgba(255
