/* LOADER */
window.onload = () => loader.style.display = "none";

/* MUSIC (MOBILE SAFE) */
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

/* NAV */
document.querySelectorAll("[data-section]").forEach(b=>{
  b.onclick=()=>{
    document.querySelectorAll(".section").forEach(s=>s.classList.remove("active"));
    document.getElementById(b.dataset.section).classList.add("active");
  };
});

/* SHARE */
shareBtn.onclick = async () => {
  const url = location.href;
  if (navigator.share) {
    await navigator.share({ title:"Christmas 2025", url });
  } else {
    await navigator.clipboard.writeText(url);
    alert("Link copied 🎄");
  }
};

/* TIC TAC TOE */
let board = Array(9).fill(null);
let gameOver = false;
const cells = document.querySelectorAll(".cell");

cells.forEach(c=>c.onclick=()=>{
  if(gameOver) return;
  const i=c.dataset.i;
  if(board[i]) return;
  place(i,"X");
  setTimeout(()=>!gameOver&&robotMove(),600);
});

function place(i,p){
  board[i]=p;
  cells[i].textContent=p;
  cells[i].classList.add(p);
  if(checkWin(p)) win();
}

function robotMove(){
  const i=board.findIndex(v=>!v);
  if(i!==-1) place(i,"O");
}
function checkWin(p){
  return [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ].some(c => c.every(i => board[i] === p));
}

function win(){
  if(gameOver) return; // prevent double win
  gameOver = true;

  // Show win overlay
  const overlay = document.getElementById("winOverlay");
  if (overlay) overlay.style.display = "flex";

  // Mobile vibration (safe)
  if (navigator.vibrate) {
    navigator.vibrate([200, 100, 200, 100, 300]);
  }

  // 🎁 Falling gifts (only if function exists)
  if (typeof spawnGifts === "function") {
    spawnGifts();
  }
}
function function (){
  board.fill(null);
  gameOver=false;
  cells.forEach(c=>{
    c.textContent="";
    c.classList.remove("X","O");
  });
  winOverlay.style.display="none";
}

/* SNOW */
const snowCanvas=snow,ctx=snowCanvas.getContext("2d");
function resize(){snowCanvas.width=innerWidth;snowCanvas.height=innerHeight}
resize();onresize=resize;

const flakes=Array.from({length:120},()=>({
  x:Math.random()*innerWidth,
  y:Math.random()*innerHeight,
  r:Math.random()*2+1,
  s:Math.random()+0.5
}));

(function snowAnim(){
  ctx.clearRect(0,0,snowCanvas.width,snowCanvas.height);
  flakes.forEach(f=>{
    ctx.beginPath();
    ctx.arc(f.x,f.y,f.r,0,Math.PI*2);
    ctx.fillStyle="#fff";
    ctx.fill();
    f.y+=f.s*2;
    if(f.y>innerHeight){f.y=-5;f.x=Math.random()*innerWidth;}
  });
  requestAnimationFrame(snowAnim);
})();

/* STARS + AURORA + GIFTS */
const fx = effects, fctx = fx.getContext("2d");
fx.width=innerWidth; fx.height=innerHeight;

const stars=Array.from({length:60},()=>({
  x:Math.random()*fx.width,
  y:Math.random()*fx.height,
  s:Math.random()+0.3
}));

let gifts=[];
function spawnGifts(){
  gifts=Array.from({length:20},()=>({
    x:Math.random()*fx.width,
    y:-20,
    s:Math.random()*2+1
  }));
}

(function effectsLoop(){
  fctx.clearRect(0,0,fx.width,fx.height);

  /* Aurora */
  const g=fctx.createLinearGradient(0,0,fx.width,0);
  g.addColorStop(0,"rgba(0,255,150,0)");
  g.addColorStop(0.5,"rgba(0,255,150,0.3)");
  g.addColorStop(1,"rgba(0,255,150,0)");
  fctx.fillStyle=g;
  fctx.fillRect(0,0,fx.width,fx.height);

  /* Stars */
  stars.forEach(s=>{
    fctx.fillStyle="rgba(255,230,150,0.8)";
    fctx.beginPath();
    fctx.arc(s.x,s.y,2,0,Math.PI*2);
    fctx.fill();
    s.y+=s.s;
    if(s.y>fx.height){s.y=-5;s.x=Math.random()*fx.width;}
  });

/* 🎁 Gifts (emoji) */
gifts.forEach(g => {
  fctx.font = "20px serif";
  fctx.fillText("🎁", g.x, g.y);
  g.y += g.s;
});
