/* ================= LOADER ================= */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
});

/* ================= MUSIC (MOBILE SAFE) ================= */
const bgm = document.getElementById("bgm");
const musicToggle = document.getElementById("musicToggle");
let musicOn = false;

musicToggle?.addEventListener("click", async () => {
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
  } catch (e) {
    alert("Tap once more to enable music 🎵");
  }
});

/* ================= NAVIGATION ================= */
document.querySelectorAll("[data-section]").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
    document.getElementById(btn.dataset.section)?.classList.add("active");
  });
});

/* ================= SHARE ================= */
const shareBtn = document.getElementById("shareBtn");
shareBtn?.addEventListener("click", async () => {
  const url = location.href;
  if (navigator.share) {
    await navigator.share({ title: "Merry Christmas 🎄", url });
  } else {
    await navigator.clipboard.writeText(url);
    alert("Link copied 🎁");
  }
});

/* ================= TIC TAC TOE ================= */
let board = Array(9).fill(null);
let gameOver = false;
const cells = document.querySelectorAll(".cell");
const winOverlay = document.getElementById("winOverlay");

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (gameOver) return;
    const i = cell.dataset.i;
    if (board[i]) return;

    place(i, "X");
    setTimeout(() => !gameOver && robotMove(), 500);
  });
});

function place(i, p) {
  board[i] = p;
  cells[i].textContent = p;
  cells[i].classList.add(p);
  if (checkWin(p)) win();
}

function robotMove() {
  const empty = board.map((v, i) => v ? null : i).filter(v => v !== null);
  if (!empty.length) return;
  place(empty[Math.floor(Math.random() * empty.length)], "O");
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
  navigator.vibrate?.([200, 100, 200]);

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
const snow = document.getElementById("snow");
const sctx = snow.getContext("2d");

function resizeSnow() {
  snow.width = innerWidth;
  snow.height = innerHeight;
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
  sctx.clearRect(0, 0, snow.width, snow.height);
  flakes.forEach(f => {
    sctx.beginPath();
    sctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    sctx.fillStyle = "#fff";
    sctx.fill();
    f.y += f.s * 1.5;
    if (f.y > snow.height) {
      f.y = -5;
      f.x = Math.random() * snow.width;
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

const stars = Array.from({ length: 60 }, () => ({
  x: Math.random() * fx.width,
  y: Math.random() * fx.height,
  s: Math.random() + 0.3
}));

let gifts = [];

function spawnGifts() {
  gifts = Array.from({ length: 25 }, () => ({
    x: Math.random() * fx.width,
    y: -20,
