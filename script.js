/* DOM */
const bg = document.querySelector(".background-container");
const loader = document.getElementById("loader");
const bgm = document.getElementById("bgm");
const musicBtn = document.getElementById("musicToggle");
const winOverlay = document.getElementById("winOverlay");
const giftBtn = document.getElementById("giftBtn");
const noteText = document.getElementById("noteText");

/* BACKGROUND */
const backgrounds = ["vibe1.jpg","vibe2.jpg","vibe3.jpg"];
let bi=0;
const img = new Image();
img.src = backgrounds[0];
img.onload = ()=>{ bg.style.backgroundImage=`url(${img.src})`; loader.style.display="none"; };
setInterval(()=>{ bi=(bi+1)%backgrounds.length; bg.style.backgroundImage=`url(${backgrounds[bi]})`; },15000);

/* MUSIC + WIND */
let started=false, ctx, windGain;
musicBtn.onclick=()=>{
 if(!started){
  bgm.play(); started=true; musicBtn.textContent="🔇 Mute";
  ctx=new AudioContext();
  const noise=ctx.createBufferSource();
  const buf=ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate);
  const d=buf.getChannelData(0);
  for(let i=0;i<d.length;i++) d[i]=Math.random()*2-1;
  noise.buffer=buf; noise.loop=true;
  windGain=ctx.createGain(); windGain.gain.value=.12;
  noise.connect(windGain).connect(ctx.destination);
  noise.start();
 } else {
  bgm.paused?bgm.play():bgm.pause();
 }
};

/* NAV */
document.querySelectorAll("[data-section]").forEach(b=>{
 b
