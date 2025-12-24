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
