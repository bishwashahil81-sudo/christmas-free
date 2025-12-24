body, html {
    margin: 0; padding: 0; width: 100%; height: 100%;
    overflow: hidden; background-color: #050a18; font-family: 'Arial', sans-serif;
}

.background-container {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: url('https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=2070&auto=format&fit=crop') no-repeat center center/cover;
    filter: blur(6px) brightness(45%); /* Perfect Santa visibility */
    transform: scale(1.1); z-index: -2;
}

#snowCanvas { position: fixed; top: 0; left: 0; z-index: -1; }

.controls {
    position: absolute; top: 15px; width: 100%;
    display: flex; justify-content: center; gap: 8px; z-index: 10;
}

button, .nav-btn {
    background: rgba(255, 255, 255, 0.1); color: white; border: 1px solid rgba(255,255,255,0.3);
    padding: 8px 12px; border-radius: 12px; font-weight: bold; cursor: pointer;
    backdrop-filter: blur(5px); font-size: 12px;
}

.content-section {
    position: absolute; top: 55%; left: 50%; transform: translate(-50%, -50%);
    text-align: center; width: 95%;
}

h1 { color: white; text-shadow: 0 0 10px rgba(255,255,255,0.3); margin-bottom: 10px; }

/* Game UI */
.game-container, .glass-card { background: rgba(0, 0, 0, 0.5); padding: 15px; border-radius: 20px; display: inline-block; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); }
.board { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; width: 210px; margin: 0 auto 15px; }
.cell { width: 65px; height: 65px; background: rgba(255,255,255,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 28px; color: white; cursor: pointer; }

/* Gallery UI */
.gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; max-width: 500px; margin: 0 auto; }
.photo-card img { width: 100%; height: 100px; object-fit: cover; border-radius: 10px; }
.caption { font-size: 10px; margin-top: 5px; color: #00ffcc; }



