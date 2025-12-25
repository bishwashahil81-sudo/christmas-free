/* 🎶 BACKGROUND MUSIC */
function startMusic() {
  const music = document.getElementById("bgm");
  music.play();
}

/* 🎮 TIC TAC TOE (PLAYER vs SANTA BOT) */
let cells = document.querySelectorAll(".cell");
let board = Array(9).fill("");
let gameActive = true;
const player = "X";
const bot = "O";

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function playCell(cell) {
  const index = [...cells].indexOf(cell);

  if (!gameActive || board[index] !== "") return;

  makeMove(index, player);

  if (checkEnd()) return;

  setTimeout(botMove, 500);
}

function makeMove(index, symbol) {
  board[index] = symbol;
  cells[index].textContent = symbol;
}

function botMove() {
  let empty = board
    .map((v, i) => v === "" ? i : null)
    .filter(v => v !== null);

  if (empty.length === 0) return;

  let choice = empty[Math.floor(Math.random() * empty.length)];
  makeMove(choice, bot);

  checkEnd();
}

function checkEnd() {
  for (let pattern of winPatterns) {
    let [a,b,c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      setTimeout(resetGame, 2000);
      return true;
    }
  }

  if (!board.includes("")) {
    gameActive = false;
    setTimeout(resetGame, 2000);
    return true;
  }
  return false;
}

function resetGame() {
  board.fill("");
  cells.forEach(cell => cell.textContent = "");
  gameActive = true;
}

/* 🎅 SANTA WISH REPLY */
function sendWish() {
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

  // ✅ CLEAR TEXTAREA AFTER SENDING
  input.value = "";
}
