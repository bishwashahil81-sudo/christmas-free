/* ================= LOADER ================= */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
});

/* ================= MUSIC (MOBILE SAFE) ================= */
const bgm = document.getElementById("bgm");
const musicToggle = document.getElementById("musicToggle");
let musicOn = false;

musicToggle.addEventListener("click", async () => {
  try {
    if (!musicOn) {
      bgm.volume = 0.6;
      await bgm.play(); // required user gesture
      musicOn = true;
      musicToggle.textContent = "🔇 Mute";
    } else {
      bgm.pause();
      musicOn = false;
      musicToggle.textContent = "🎵 Music";
    }
  } catch (e) {
    alert("Tap again to enable music 🎵");
  }
});

/* ================= NAVIGATION ================= */
document.querySelectorAll("[data-section]").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".section")
      .forEach(s => s.classList.remove("active"));
    document.getElementById(btn.dataset.section)
      .classList.add("active");
  });
});

/* ================= SHARE ================= */
const shareBtn = document.getElementById("shareBtn");
shareBtn.addEventListener("click", async () => {
  const url = location.href;
  if (navigator.share) {
    await navigator.share({ title: "Christmas 2025 🎄", url });
  } else {
    await navigator.clipboard.writeText(url);
    alert("Link copied 🎄");
  }
});

/* ================= TIC TAC TOE ================= */
const cells = document.querySelectorAll(".cell");
let board = Array(9).fill(null);
let
