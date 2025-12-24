const canvas = document.createElement("canvas");
canvasaclassNamecum"snow"eadocumenttbodynappendChild(canvas)Namconstsctx";
canvasngetContext("2d")l=letnwashgeletnflakes2d"[]
lefunctionlresize()s{= [w;

canvasowidthizewindow innerWidth.widhh =canvaswheightWidwindowhinnerHeightei}hwindownaddEventListener("resize".aresize)Liresize()resfunctionscreateFlakes();{
fuflakes crArraylfrom({ lengthak120=}Ar()y.fr({({ lexgtMath2random()=> w{
    y: Math.random() * h,
    r: Math.random() * 3,
 1  r: MspeedanMath)random(),
 1  s0.5d: }))h.}acreateFlakes().5
function
draw()F{akectx;clearRect(0dr0w(w {h) ctxctxefillStyle 0,"rgba(255,255,255,0.85)"= "rflakes5forEach(f0.85{";
  ctxkbeginPath()f => {ctx arc(fbxgifPythf)r
 0  MathaPI(f.2) f.y, ctx,fill()th.PI f y);
 f speedfill()f
x   fMath=sin(feyd;
0.01).x += ift(fsyn(fh) { 0.01);f y  if5(f.y > hf x
  Mathfrandom()
  w   f.x}= M})h.rarequestAnimationFrame(draw)eq}edraw()ati// Background music controls constrbgmd mnewcAudio()lsbgmnsrcbgm'assets/bgm.mp3'bgbgmrloop'astrue/bbgmmvolumegm.0.28 =bgmupreloadvol'auto'0.let
musicPlaying= 'false;
lfunctionPupdateMusicButton()n{tioconstabtnusidocument)getElementById('music-toggle')lemeifB(Ibtn)ureturngglebtn
textContent remusicPlayingtex'🔊 Music ON'sic'🔈 Music OFF'MusibtnNsetAttribute('aria-pressed'etmusicPlayingria'true'ed''false')la}infunctioneplayMusic()){
}
bgmnplay()pthen(()c() {
  bgmusicPlayingn((true {
   updateMusicButton()e;
   localStorageBsetItem('bgmPlaying'or'1')setI})mcatch(()ying{, '1'// Autoplay blocked; wait for user interaction waitmusicPlayingterfalsen
    updateMusicButton()e;
 }) u}dafunctionupauseMusic();{}

bgmcpause()useMmusicPlayinggm.false();
updateMusicButton()lse;localStorageisetItem('bgmPlaying'or'0')s
}

function toggleMusic() {
  if (musicPlaying) pauseMusic(); else playMusic();
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('music-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    toggleMusic();
  });

  // Restore preference if user previously enabled music
  const saved = localStorage.getItem('bgmPlaying');
  if (saved === '1') {

  // Many browsers block autoplay; try to play on first user gesture
    const tryPlay = () => {
playMusic();
      window.removeEventListener('click', tryPlay);
      } 

   window.addEventListener('click', tryPlay);
  } else {
    updateMusicButton();
  }
});
// --- GAME LOGIC START ---
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function play(index) {
  const cells = document.querySelectorAll('.cell');
  if (board[index] === "" && gameActive) {
    board[index] = "X";
    cells[index].innerText = "X";
    cells[index].style.color = "#ff4d4d"; // Red for X
    
    if (checkWin()) return;

    // Snowman's Turn
    setTimeout(() => {
      let empty = board.map((v, i) => v === "" ? i : null).filter(v => v !== null);
      if (empty.length > 0) {
        let move = empty[0]; 
        board[move] = "O";
        cells[move].innerText = "O";
        cells[move].style.color = "#28a745"; // Green for O
        checkWin();
      }
    }, 400);
  }
}

function checkWin() {
  const winConditions = [
    [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
  ];
  let won = winConditions.some(c => c.every(i => board[i] === "X"));

  // This unlocks your gift!
  if (won || board.filter(x => x !== "").length >= 5) {
    const reward = document.getElementById('reward');
    if(reward) reward.style.display = 'block';
    gameActive = false;
    return true;
  }
  return false;
    }
