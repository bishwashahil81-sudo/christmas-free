document.addEventListener("DOMContentLoaded", () => {

  /* =======================
     BACKGROUND MUSIC
  ======================= */
  const bgm = document.getElementById("bgm");
  window.startMusic = () => {
    bgm.play();
  };

  /* =======================
     SANTA SLEIGH ANIMATION
  ======================= */
  const sleigh = document.getElementById("sleigh");

  function moveSleigh() {
    sleigh.style.transition = "none";
    sleigh.style.left = "-300px";
    sleigh.style.top = Math.random() * 40 + 10 + "%";

    setTimeout(() => {
      sleigh.style.transition = "left 12s linear";
      sleigh.style.left = "110%";
    }, 200);
  }

  moveSleigh();
  setInterval(moveSleigh, 15000);

  /* =======================
     TIC TAC TOE (VS ROBOT)
  ======================= */
  const cells = document.querySelectorAll(".cell");
  let board = Array(9).fill("");
  let gameActive = true;

  const PLAYER = "❌";
  const AI = "⭕";

  window.playCell = (cell) => {
    const index = [...cells].indexOf(cell);
    if (!gameActive || board[index] !== "") return;

    board[index] = PLAYER;
    cell.textContent = PLAYER;

    if (checkWin(PLAYER)) {
      endGame("You win 🎉");
      return;
    }

    if (boardFull()) {
      endGame("It's a draw 🤝");
      return;
    }

    setTimeout(aiMove, 400);
  };

  function aiMove() {
    if (!gameActive) return;

    const emptyIndexes = board
      .map((v, i) => v === "" ? i : null)
      .filter(v => v !== null);

    const move = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
    board[move] = AI;
    cells[move].textContent = AI;

    if (checkWin(AI)) {
      endGame("Santa wins 🎅");
    } else if (boardFull()) {
      endGame("It's a draw 🤝");
    }
  }

  function checkWin(player) {
    const wins = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    return wins.some(combo =>
      combo.every(i => board[i] === player)
    );
  }

  function boardFull() {
    return board.every(cell => cell !== "");
  }

  function endGame(message) {
    gameActive = false;
    setTimeout(() => {
      alert(message);
      resetGame();
    }, 300);
  }

  window.resetGame = () => {
    board = Array(9).fill("");
    cells.forEach(cell => cell.textContent = "");
    gameActive = true;
  };

  /* =======================
     SANTA WISH REPLY
  ======================= */
  window.sendWish = () => {
    const reply = document.getElementById("santaReply");
    reply.textContent = "🎅 Santa says: Ho Ho Ho! I'm on my way!";
  };

});
