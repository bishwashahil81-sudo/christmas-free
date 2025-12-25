/* ================= LOADER ================= */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    // Smooth fade out
    loader.style.opacity = "0";
    setTimeout(() => loader.style.display = "none", 500);
  }
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
    console.log("Audio play blocked by browser. User interaction required.");
  }
});

/* ================= NAVIGATION ================= */
document.querySelectorAll("[data-section]").forEach(btn => {
  btn.addEventListener("click", () => {
    // Switch active section
    document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
    const target = document.getElementById(btn.dataset.section);
    if (target) target.classList.add("active");
  });
});

/* ================= SHARE ================= */
const shareBtn = document.getElementById("shareBtn");
shareBtn?.addEventListener("click", async () => {
  const url = location.href;
  if (navigator.share) {
    try {
      await navigator.share({ title: "Merry Christmas 🎄", url });
    } catch (err) { console.log("Share failed", err); }
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
    // Robot moves automatically after 500ms
    setTimeout(() => !gameOver && robotMove(), 500);
  });
});

function place(i, p) {
  board[i] = p;
  cells[i].textContent = p;
  cells[i].classList.add(p);
  if (checkWin(p)) win(p);
}

function robotMove() {
  const empty = board.map((v, i) => v ? null : i).filter(v => v !== null);
  if (!empty.length) return;
  place(empty[Math.floor(Math.random() * empty.length)], "O");
}

function checkWin(p) {
  const patterns = [
    [0,1,2],[3,4,5],[6,7,8], // Rows
    [0,3,6],[1,4,7],[2,5,8], // Cols
    [0,4,8],[2,4,6]          // Diagonals
  ];
  return patterns.some(c => c.every(i => board[i] === p));
}

function win(p) {
  if (gameOver) return;
  gameOver = true;

  // Show the popup
  winOverlay.style.display = "flex";
  
  // Vibration for mobile users
  if (navigator.vibrate) navigator.vibrate([200, 100, 200]);

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
  gifts = []; // Clear winning gifts
}

/* ================= SNOW CANVAS ================= */
const snow = document.getElementById("snow");
const sctx = snow.getContext("2d");

function resizeSnow() {
  snow.width = window.innerWidth;
  snow.height = window.innerHeight;
}
resizeSnow();
window.addEventListener("resize", resizeSnow);

const flakes = Array.from({ length: 120 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
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

/* ================= SPECIAL EFFECTS (GIFTS) ================= */
const fx = document.getElementById("effects");
const fctx = fx.getContext("2d");

function resizeFX() {
  fx.width = window.innerWidth;
  fx.height = window.innerHeight;
}
resizeFX();
window.addEventListener("resize", resizeFX);

let gifts = [];

function spawnGifts() {
  gifts = Array.from({ length: 25 }, () => ({
    x: Math.random() * fx.width,
    y: -50,
    s: Math.random() * 2 + 2,
    img: ["🎁", "🎄", "❄️", "🔔"][Math.floor(Math.random() * 4)]
  }));
}

(function fxLoop() {
  fctx.clearRect(0, 0, fx.width, fx.height);
  gifts.forEach(g => {
    fctx.font = "24px Arial";
    fctx.fillText(g.img, g.x, g.y);
    g.y += g.s;
    if (g.y > fx.height) g.y = -50;
  });
  requestAnimationFrame(fxLoop);
})();

