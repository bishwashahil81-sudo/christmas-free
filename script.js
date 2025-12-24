/* BACKGROUND */
const backgrounds = ["vibe1.jpg","vibe2.jpg","vibe3.jpg"];
let bgIndex = 0;
setInterval(()=>{
  bgIndex=(bgIndex+1)%backgrounds.length;
  document.querySelector(".background-container").style.backgroundImage =
    `url(${backgrounds[bgIndex]})`;
},15000);

/* LOADER */
window.onload = ()=> document.getElementById("loader").style.display="none";

/* MUSIC */
const bgm=document.getElementById("bgm");
let started=false;
musicToggle.onclick=()=>{
  if(!started){
    bgm.volume=0.5;
    bgm.play();
    started=true;
    musicToggle.textContent="🔇 Mute";
  }else{
    bgm.paused?bgm.play():bgm.pause();
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
shareBtn.onclick=()=>{
  navigator.share?.({title:"Christmas 2025",url:location.href});
};

/* NOTES */
giftBtn.onclick=()=>noteText.classList.add("fade");

/* GAME */
let board=Array(9).fill(null);
let gameOver=false;
const cells=document.querySelectorAll(".cell");

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
  return [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
  .some(c=>c.every(i=>board[i]===p));
}

function win(){
  gameOver=true;
  winOverlay.style.display="flex";
  navigator.vibrate?.([200,100,200]);
}

function resetGame(){
  board=Array(9).fill(null);
  gameOver=false;
  cells.forEach(c=>{
    c.textContent="";
    c.className="cell";
  });
  winOverlay.style.display="none";
}

/* SNOW */
const canvas=document.getElementById("snow"),ctx=canvas.getContext("2d");
function resize(){canvas.width=innerWidth;canvas.height=innerHeight}
resize();onresize=resize;

let wind=0;
setInterval(()=>wind=(Math.random()-0.5)*2,3000);

const snow=Array.from({length:120},()=>({
  x:Math.random()*canvas.width,
  y:Math.random()*canvas.height,
  r:Math.random()*2+1,
  s:Math.random()+0.5
}));

(function snowAnim(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  snow.forEach(f=>{
    ctx.beginPath();
    ctx.arc(f.x,f.y,f.r,0,Math.PI*2);
    ctx.fillStyle="#fff";
    ctx.fill();
    f.y+=f.s*2;
    f.x+=wind;
    if(f.y>canvas.height){f.y=-5;f.x=Math.random()*canvas.width;}
  });
  requestAnimationFrame(snowAnim);
})();
/* 🌟 STARS + AURORA + GIFTS */
const fx = document.getElementById("effects");
const fctx = fx.getContext("2d");

function fxResize(){
  fx.width = innerWidth;
  fx.height = innerHeight;
}
fxResize();
addEventListener("resize", fxResize);

/* Stars */
const stars = Array.from({length: 60}, () => ({
  x: Math.random() * fx.width,
  y: Math.random() * fx.height,
  r: Math.random() * 1.5 + 0.5,
  s: Math.random() * 0.6 + 0.2
}));

/* Gifts (spawn on win) */
let gifts = [];
function spawnGifts(){
  gifts = Array.from({length: 18}, () => ({
    x: Math.random() * fx.width,
    y: -20,
    s: Math.random() * 2 + 1,
    r: Math.random() * Math.PI
  }));
}

/* Aurora */
let auroraOffset = 0;

function effectsLoop(){
  fctx.clearRect(0,0,fx.width,fx.height);

  /* Aurora */
  auroraOffset += 0.3;
  const grad = fctx.createLinearGradient(0,0,fx.width,0);
  grad.addColorStop(0,"rgba(0,255,150,0)");
  grad.addColorStop(0.5,"rgba(0,255,150,0.12)");
  grad.addColorStop(1,"rgba(0,255,150,0)");
  fctx.fillStyle = grad;
  fctx.fillRect(-fx.width/2 + auroraOffset,0,fx.width*2,fx.height);

  /* Stars */
  stars.forEach(st=>{
    fctx.beginPath();
    fctx.arc(st.x, st.y, st.r, 0, Math.PI*2);
    fctx.fillStyle = "rgba(255,230,150,0.8)";
    fctx.shadowBlur = 10;
    fctx.shadowColor = "rgba(255,230,150,0.8)";
    fctx.fill();
    st.y += st.s;
    if(st.y > fx.height){
      st.y = -5;
      st.x = Math.random() * fx.width;
    }
  });

  /* Gifts */
  gifts.forEach(g=>{
    fctx.save();
    fctx.translate(g.x, g.y);
    fctx.rotate(g.r);
    fctx.fillStyle = "red";
    fctx.fillRect(-6,-6,12,12);
    fctx.fillStyle = "gold";
    fctx.fillRect(-2,-8,4,16);
    fctx.restore();
    g.y += g.s;
  });

  requestAnimationFrame(effectsLoop);
}
effectsLoop();
