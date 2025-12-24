 const musicBtn = document.getElementById('music-btn');
const bgMusic = document.getElementById('bg-music');
const card = document.getElementById('message-card');
const openBtn = document.getElementById('open-card-btn');

// Music Toggle
musicBtn.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicBtn.innerText = "Music ON";
    } else {
        bgMusic.pause();
        musicBtn.innerText = "Music OFF";
    }
});

// Open/Close Card
openBtn.onclick = () => card.classList.toggle('card-visible');
document.getElementById('close-card-btn').onclick = () => card.classList.add('card-hidden');

// Sparkle Snowfall
function createSnow() {
    const snow = document.createElement('div');
    snow.classList.add('snowflake');
    snow.style.left = Math.random() * 100 + 'vw';
    snow.style.opacity = Math.random();
    snow.style.fontSize = (Math.random() * 10 + 10) + 'px';
    snow.style.animationDuration = (Math.random() * 3 + 2) + 's';
    snow.innerText = Math.random() > 0.5 ? '❄' : '✨'; // Mixes snow and sparkles
    document.body.appendChild(snow);
    setTimeout(() => snow.remove(), 5000);
}
setInterval(createSnow, 200);

