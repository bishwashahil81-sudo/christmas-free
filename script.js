const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');
const musicBtn = document.getElementById('musicToggle');

// 1. Setup Audio
const audio = new Audio('bgm.mp3');
audio.loop = true;

// 2. Music Toggle Logic
musicBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play().then(() => {
            musicBtn.innerText = "Music ON 🔊";
            musicBtn.style.background = "#28a745"; // Changes to Green
        }).catch(err => {
            console.log("Audio play blocked by browser. Try clicking again.");
        });
    } else {
        audio.pause();
        musicBtn.innerText = "Music OFF 🔇";
        musicBtn.style.background = "#ff4d4d"; // Changes back to Red
    }
});

// 3. Snowfall Animation (The Game)
let particles = [];
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Snowflake {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speed = Math.random() * 1 + 0.5;
        this.velX = Math.random() * 0.5 - 0.25;
    }
    update() {
        this.y += this.speed;
        this.x += this.velX;
        if (this.y > canvas.height) this.reset();
    }
    draw() {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < 100; i++) particles.push(new Snowflake());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}
animate();

