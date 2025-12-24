/* Loader */
window.onload = () => loader.style.display = "none";

/* Navigation */
document.querySelectorAll("[data-section]").forEach(btn=>{
  btn.onclick=()=>{
    document.querySelectorAll(".section").forEach(s=>s.classList.remove("active"));
    document.getElementById(btn.dataset.section).classList.add("active");
  }
});

/* Music */
const bgm = document.getElementById("bgm");
const musicBtn = document.getElementById("musicToggle");
musicBtn.onclick = ()=>{
  if(bgm.paused){ bgm.play(); musicBtn.textContent="🔇 Mute"; }
  else{ bgm.pause(); musicBtn.textContent="🎵 Music"; }
};

/* Share */
shareBtn.onclick=()=>{
  navigator.share?.({
    title:"Christmas 2025",
    text:"Merry Christmas 🎄",
    url:location.href
  });
};

/* Notes */
giftBtn.onclick=()=>{
  noteText.classList.add("fade");
};

/* Tic Tac Toe */
let board=Array(9).fill(null);
const cells=document.querySelectorAll(".cell");
cells.forEach(c=>c.onclick=()=>{
  const i=c.dataset.i;
  if(board[i])return;
  place(i,"X");
  setTimeout(robotMove,600);
});
function place(i,p){
  board[i]=p;
  cells[i].textContent=p;
  cells[i].classList.add(p);
  if(checkWin(p)) win();
}
function robotMove(){
  const i=board.findIndex(v=>!v);
  if(i>-1)place(i,"O");
}
function checkWin(p){
  return [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
    .some(c=>c.every(i=>board[i]===p));
}
function win(){
  winOverlay.style.display="flex";
  navigator.vibrate?.([200,100,200]);
  for(let i=0;i<6;i++)spawnGift();
}
function resetGame(){
  board.fill(null);
  cells.forEach(c=>c.textContent=c.className="cell");
  winOverlay.style.display="none";
}

/* Snow */
const canvas=document.getElementById("snow");
const ctx=canvas.getContext("2d");
function resize(){canvas.width=innerWidth;canvas.height=innerHeight}
resize();onresize=resize;

let wind=0;
setInterval(()=>wind=(Math.random()-.5)*2,3000);

const flakes=Array.from({length:120},()=>({
  x:Math.random()*canvas.width,
  y:Math.random()*canvas.height,
  r:Math.random()*2+1,
  s:Math.random()*1.5+0.5
}));

(function snow(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  flakes.forEach(f=>{
    ctx.beginPath();
    ctx.arc(f.x,f.y,f.r,0,Math.PI*2);
    ctx.fillStyle="#fff";
    ctx.fill();
    f.y+=f.s;
    f.x+=wind;
    if(f.y>canvas.height){f.y=-5;f.x=Math.random()*canvas.width}
  });
  requestAnimationFrame(snow);
})();

/* Stars */
setInterval(()=>{
  const s=document.createElement("div");
  s.className="star";
  s.style.left=Math.random()*innerWidth+"px";
  s.style.top="0";
  document.body.appendChild(s);
  setTimeout(()=>s.remove(),1200);
},6000);

/* Gifts */
function spawnGift(){
  const g=document.createElement("div");
  g.className="gift";
  g.textContent="🎁";
  g.style.left=Math.random()*innerWidth+"px";
  document.body.appendChild(g);
  setTimeout(()=>g.remove(),3000);
}
