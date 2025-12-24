/* BACKGROUND */
const backgrounds=["vibe1.jpg","vibe2.jpg","vibe3.jpg"];
let bgIndex=0;
setInterval(()=>{
  bgIndex=(bgIndex+1)%backgrounds.length;
  document.querySelector(".background-container").style.backgroundImage=
  `url(${backgrounds[bgIndex]})`;
},15000);

/* LOADER */
window.onload=()=>loader.style.display="none";

/* MUSIC */
let started=false;
musicToggle.onclick=()=>{
  if(!started){bgm.volume=0.5;bgm.play();started=true}
  else bgm.paused?bgm.play():bgm.pause();
};

/* NAV */
document.querySelectorAll("[data-section]").forEach(b=>{
  b.onclick=()=>{
    document.querySelectorAll(".section").forEach(s=>s.classList.remove("active"));
    document.getElementById(b.dataset.section).classList.add("active");
  };
});

/* GAME */
let board=Array(9).fill(null),gameOver=false;
const cells=document.querySelectorAll(".cell");

cells.forEach(c=>c.onclick=()=>{
  if(gameOver||board[c.dataset.i])return;
  place(c.dataset.i,"X");
  setTimeout(()=>!gameOver&&robot(),600);
});

function place(i,p){
  board[i]=p;
  cells[i].textContent=p;
  cells[i].classList.add(p);
  if(winCheck(p))win();
}
function robot(){
  const i=board.findIndex(v=>!v);
  if(i>-1)place(i,"O");
}
function winCheck(p){
  return[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
  .some(c=>c.every(i=>board[i]===p));
}
function win(){
  gameOver=true;
  winOverlay.style.display="flex";
  navigator.vibrate?.([200,100,200]);
  spawnGifts();
}
function resetGame(){
  board.fill(null);gameOver=false;
  cells.forEach(c=>{c.textContent="";c.className="cell"});
  gifts=[];winOverlay.style.display="none";
}

/* SNOW */
const sc=document.getElementById("snow"),sctx=sc.getContext("2d");
function rs(){sc.width=innerWidth;sc.height=innerHeight}
rs();onresize=rs;
const snow=Array.from({length:120},()=>({x:Math.random()*sc.width,y:Math.random()*sc.height,r:Math.random()*2+1,s:Math.random()+.5}));
(function(){
  sctx.clearRect(0,0,sc.width,sc.height);
  snow.forEach(f=>{
    sctx.beginPath();
    sctx.arc(f.x,f.y,f.r,0,6.28);
    sctx.fillStyle="#fff";sctx.fill();
    f.y+=f.s*2;if(f.y>sc.height){f.y=-5;f.x=Math.random()*sc.width}
  });
  requestAnimationFrame(arguments.callee);
})();

/* EFFECTS */
const fx=document.getElementById("effects"),fctx=fx.getContext("2d");
fx.width=innerWidth;fx.height=innerHeight;

/* Stars */
const stars=Array.from({length:60},()=>({x:Math.random()*fx.width,y:Math.random()*fx.height,s:Math.random()+.2}));

/* Gifts */
let gifts=[];
function spawnGifts(){
  gifts=Array.from({length:20},()=>({x:Math.random()*fx.width,y:-20,s:Math.random()*2+1,r:Math.random()*6.28}));
}

(function(){
  fctx.clearRect(0,0,fx.width,fx.height);

  /* Aurora */
  const g=fctx.createLinearGradient(0,0,fx.width,0);
  g.addColorStop(0,"rgba(0,255,150,0)");
  g.addColorStop(.5,"rgba(0,255,150,.15)");
  g.addColorStop(1,"rgba(0,255,150,0)");
  fctx.fillStyle=g;
  fctx.fillRect(-fx.width/2,0,fx.width*2,fx.height);

  /* Stars */
  stars.forEach(s=>{
    fctx.beginPath();
    fctx.arc(s.x,s.y,1.5,0,6.28);
    fctx.fillStyle="rgba(255,230,150,.9)";
    fctx.fill();
    s.y+=s.s;if(s.y>fx.height){s.y=0;s.x=Math.random()*fx.width}
  });

  /* Gifts */
  gifts.forEach(g=>{
    fctx.save();
    fctx.translate(g.x,g.y);
    fctx.rotate(g.r);
    fctx.fillStyle="red";
    fctx.fillRect(-8,-8,16,16);
    fctx.fillStyle="gold";
    fctx.fillRect(-3,-10,6,20);
    fctx.restore();
    g.y+=g.s;
  });

  requestAnimationFrame(arguments.callee);
})();
/* SHARE */
const shareBtn = document.getElementById("shareBtn");

shareBtn.onclick = async () => {
  const shareData = {
    title: "Christmas 2025 🎄",
    text: "Check out this festive Christmas page! ❄️🎅",
    url: location.href
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      // User cancelled or error
      console.log("Share cancelled or failed", err);
    }
  } else {
    // Fallback for desktop and unsupported browsers
    try {
      await navigator.clipboard.writeText(location.href);
      alert("🔗 Link copied to clipboard! Paste it anywhere 😄");
    } catch (e) {
      alert("😀 Unable to copy — please copy manually:\n" + location.href);
    }
  }
};
