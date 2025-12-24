/* ---------- BACKGROUNDS ---------- */
const backgrounds = ["vibe1.jpg", "vibe2.jpg", "vibe3.jpg"];
let bgIndex = 0;

/* ---------- LOADER ---------- */
const loader = document.getElementById("loader");
const bgImg = new Image();
bgImg.src = backgrounds[0];
bgImg.onload = () => loader.style.display = "none";

/* ---------- BACKGROUND ROTATION ---------- */
setInterval(() => {
  bgIndex = (bgIndex + 1) % backgrounds.length;
  document.querySelector(".background-container").style.backgroundImage =
    `url(${backgrounds[bgIndex]})`;
}, 15000);

/* ---------- MUSIC (SAFE) ---------- */
const bgm = document.getElementById("bgm");
const musicBtn = document.getElementById("musicToggle");

let musicStarted = false;

musicBtn.addEventListener("click", () => {
  if (!musicStarted) {
    bgm.volume = 0.5;
    bgm.play()
      .then(() => {
        musicStarted = true;
        musicBtn.textContent = "🔇 Mute";
      })
      .catch(err => {
        console.log("Music blocked:", err);
        alert("Tap once more to enable music 🎵");
      });
  } else {
    if (bgm.paused) {
      bgm.play();
      musicBtn.textContent = "🔇 Mute";
    } else {
      bgm.pause();
      musicBtn.textContent = "🎵 Music";
    }
  }
});
/* ---------- NAV ---------- */

*/

doc..en..querySelect("[data-section]").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
    document.getElementById(btn.dataset.section).classList.add("active");
  };
});

/* ---------- SHARE ---------- */
document.getElementById("shareBtn").onclick = () => {
  navigator.share?.({
    title: "Christmas 2025",
    text: "Merry Christmas 🎄",
    url: location.href
  });
};

/* ---------- NOTES ---------- */
const wishes = [
  "Peace & joy this Christmas ❄️",
  "Warm wishes and magic 🎄",
  "Love, light & snowfall ✨"
];
giftBtn.onclick = () => {
  noteText.textContent = wishes[Math.floor(Math.random() * wishes.length)];
};

/* ---------- TIC TAC TOE ---------- */
let board = Array(9).fill(null);
const cells = document.querySelectorAll(".cell");

cells.forEach(cell => cell.onclick = () => {
  const i = cell.dataset.i;
  if (board[i]) return;

  place(i, "X");
  navigator.vibrate?.(30);

  setTimeout(robotMove, 600);
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
  winOverlay.style.display = "flex";
  navigator.vibrate?.([200,100,200,100,300]);
  snowBurst();
}

function resetGame() {
  board.fill(null);
  cells.forEach(c => c.textContent = c.className = "cell");
  winOverlay.style.display = "none";
}

/* ---------- SNOW (DEPTH + WIND) ---------- */
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
window.onresize = resize;

let wind = 0;
setInterval(() => wind = (Math.random() - 0.5) * 2, 3000);

const layers = [
  createSnow(40, 0.4),
  createSnow(80, 0.7),
  createSnow(140, 1.1)
];

function createSnow(count, speed) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    s: speed,
    w: Math.random() * 1.5
  }));
}

function snowBurst() {
  layers.flat().forEach(f => {
    f.y -= Math.random() * 300;
    f.x += (Math.random() - 0.5) * 300;
  });
}

(function animateSnow() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  layers.forEach(layer => {
    layer.forEach(f => {
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();

      f.y += f.s * 2;
      f.x += wind + Math.sin(f.y * 0.01) * f.w;

      if (f.y > canvas.height) {
        f.y = -5;
        f.x = Math.random() * canvas.width;
      }
    });
  });

  requestAnimationFrame(animateSnow);
})();
