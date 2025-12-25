document.addEventListener("DOMContentLoaded", () => {

  /* 🎶 BACKGROUND MUSIC */
  window.startMusic = function () {
    const music = document.getElementById("bgm");
    music.play();
  };

  /* 🎮 TIC TAC TOE (PLAYER vs SANTA BOT) */
  const cells = document.querySelectorAll(".cell");
  let board = Array(9).fill("");
  let gameActive = true;
  const player = "X";
  const bot = "O";

  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  window.playCell = function (cell) {
    const index = [...cells].indexOf(cell);

    if (!gameActive || board[index] !== "") return;

    makeMove(index, player);

    if (checkEnd()) return;

    setTimeout(botMove, 450);
  };

  function makeMove(index, symbol) {
    board[index] = symbol;
    cells[index].textContent = symbol;
  }

  function botMove() {
    const empty = board
      .map((v, i) => v === "" ? i : null)
      .filter(v => v !== null);

    if (empty.length === 0) return;

    const choice = empty[Math.floor(Math.random() * empty.length)];
    makeMove(choice, bot);

    checkEnd();
  }

  function checkEnd() {
    for (const [a,b,c] of winPatterns) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        gameActive = false;
        setTimeout(resetGame, 1800);
        return true;
      }
    }

    if (!board.includes("")) {
      gameActive = false;
      setTimeout(resetGame, 1800);
      return true;
    }
    return false;
  }

  window.resetGame = function () {
    board.fill("");
    cells.forEach(cell => cell.textContent = "");
    gameActive = true;
  };

  /* 🎅 SANTA WISH REPLY */
  window.sendWish = function () {
    const input = document.getElementById("wishInput");
    const reply = document.getElementById("santaReply");

    if (input.value.trim() === "") {
      reply.textContent = "🎅 Santa says: Don’t forget to write your wish!";
      reply.classList.add("show");
      return;
    }

    const responses = [
      "🎅 Ho ho ho! Your wish is noted ✨",
      "🎅 Such a beautiful wish! Keep believing ❤️",
      "🎅 Santa is preparing something special 🎁",
      "🎅 Magic is on the way for you ✨ Ho ho ho!"
    ];

    reply.textContent = responses[Math.floor(Math.random() * responses.length)];
    reply.classList.add("show");

    input.value = "";
  };

});
/* 🛷 SANTA SLEIGH FLY (FIXED & GUARANTEED) */
window.addEventListener("load", () => {
  const sleigh = document.getElementById("sleigh");
  if (!sleigh) return;

  function flySleigh() {
    // reset position instantly
    sleigh.style.transition = "none";
    sleigh.style.left = "-400px";

    // allow browser to register reset
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        sleigh.style.transition = "left 8s linear";
        sleigh.style.left = "110%";
      });
    });
  }

  flySleigh();                // run immediately
  setInterval(flySleigh, 15000); // repeat
});
