// ===== Running Character Animation + Scroll Effects =====

document.addEventListener('DOMContentLoaded', function () {

    // ===== Runner Canvas Setup =====
    const canvas = document.getElementById('runner-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H;
    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // ===== Running Character (Back View, Pixel Art) =====
    // 4-frame running cycle — arms swing, legs stride, body bounces
    function drawRunner(x, y, frame, scale) {
        const s = scale;
        const cycles = [
            { la: -3, ra: 2, ll: -3, rl: 2, bounce: 0 },
            { la: -1, ra: 0, ll: -1, rl: 0, bounce: -1.5 },
            { la: 2, ra: -3, ll: 2, rl: -3, bounce: 0 },
            { la: 0, ra: -1, ll: 0, rl: -1, bounce: -1.5 },
        ];
        const f = cycles[frame % 4];
        const by = f.bounce * s;

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.beginPath();
        ctx.ellipse(x, y + 6 * s, 6 * s, 1.5 * s, 0, 0, Math.PI * 2);
        ctx.fill();

        // Hair (messy, spiky)
        ctx.fillStyle = '#1a0e05';
        ctx.fillRect(x - 4 * s, y - 20 * s + by, 8 * s, 6 * s);
        ctx.fillRect(x - 5 * s, y - 22 * s + by, 3 * s, 3 * s);
        ctx.fillRect(x - 1 * s, y - 23 * s + by, 3 * s, 4 * s);
        ctx.fillRect(x + 3 * s, y - 21 * s + by, 2 * s, 2 * s);
        ctx.fillRect(x - 6 * s, y - 19 * s + by, 2 * s, 4 * s);
        ctx.fillRect(x + 4 * s, y - 20 * s + by, 2 * s, 3 * s);

        // Neck
        ctx.fillStyle = '#d4a574';
        ctx.fillRect(x - 1.5 * s, y - 14 * s + by, 3 * s, 2 * s);

        // Tank top (grey)
        ctx.fillStyle = '#aaa';
        ctx.fillRect(x - 4 * s, y - 12 * s + by, 8 * s, 7 * s);
        ctx.fillStyle = '#888';
        ctx.fillRect(x - 0.5 * s, y - 12 * s + by, 1 * s, 7 * s);

        // Arms (skin, swinging)
        ctx.fillStyle = '#d4a574';
        ctx.fillRect(x - 5.5 * s, y - 11 * s + by + f.la * s, 2 * s, 6 * s);
        ctx.fillRect(x + 3.5 * s, y - 11 * s + by + f.ra * s, 2 * s, 6 * s);

        // Shorts (dark)
        ctx.fillStyle = '#2a2a2a';
        ctx.fillRect(x - 3.5 * s, y - 5 * s + by, 7 * s, 4 * s);

        // Legs (skin, animated)
        ctx.fillStyle = '#d4a574';
        ctx.fillRect(x - 3 * s, y - 1 * s + by + f.ll * s, 2.5 * s, 5 * s);
        ctx.fillRect(x + 0.5 * s, y - 1 * s + by + f.rl * s, 2.5 * s, 5 * s);

        // Shoes
        ctx.fillStyle = '#eee';
        ctx.fillRect(x - 3.5 * s, y + 4 * s + by + f.ll * s, 3.5 * s, 2 * s);
        ctx.fillRect(x + 0 * s, y + 4 * s + by + f.rl * s, 3.5 * s, 2 * s);
        ctx.fillStyle = '#555';
        ctx.fillRect(x - 3.5 * s, y + 5.5 * s + by + f.ll * s, 3.5 * s, 0.5 * s);
        ctx.fillRect(x + 0 * s, y + 5.5 * s + by + f.rl * s, 3.5 * s, 0.5 * s);

        // Bag (slung over shoulder)
        ctx.fillStyle = '#8B7355';
        const bagSwing = f.bounce * 0.5;
        ctx.fillRect(x + 5 * s, y - 8 * s + by + bagSwing * s, 3 * s, 10 * s);
        ctx.fillStyle = '#6B5335';
        ctx.fillRect(x + 5 * s, y - 8 * s + by + bagSwing * s, 3 * s, 1 * s);
        ctx.fillRect(x + 3.5 * s, y - 12 * s + by, 2 * s, 5 * s);
    }

    // ===== Animation Loop =====
    let frameIndex = 0;
    let lastFrameSwitch = 0;
    const FRAME_INTERVAL = 140;

    function render(time) {
        ctx.clearRect(0, 0, W, H);

        if (time - lastFrameSwitch > FRAME_INTERVAL) {
            frameIndex = (frameIndex + 1) % 4;
            lastFrameSwitch = time;
        }

        // Position character on the road — bottom center of viewport
        const charX = W * 0.5;
        const charY = H * 0.82;
        const charScale = Math.max(2.5, Math.min(4, W / 350));

        drawRunner(charX, charY, frameIndex, charScale);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);

    // ===== Scroll Fade-In for Sections =====
    const sections = document.querySelectorAll('section, #hero');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    sections.forEach(s => observer.observe(s));
});
