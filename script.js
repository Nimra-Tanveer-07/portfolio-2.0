/**
 * ==========================================================================
 * SENIOR CREATIVE ENGINEER INTERACTIVE ARCHITECTURE ENGINE
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initLoaderEngine();
    initCustomCursor();
    initParticleConstellation();
    initInteractiveParallax();
    initScrollEngine();
    initTiltInteraction();
    initProjectModals();
});

/* ==========================================================================
   1. EXTREMELY SMOOTH LOADER & SVG PROGRESS ENGINE
   ========================================================================== */
function initLoaderEngine() {
    const loader = document.getElementById('loader');
    
    // Artificial delay for premium content buffering and path drawing visibility
    setTimeout(() => {
        loader.classList.add('loaded');
        document.body.style.overflowY = 'auto';
    }, 2500);
}

/* ==========================================================================
   2. CUSTOM HARDWARE-ACCELERATED CURSOR GLOW & FLASHLIGHT
   ========================================================================== */
function initCustomCursor() {
    const glow = document.getElementById('cursor-glow');
    const dot = document.getElementById('cursor-dot');

    let mouseX = -100, mouseY = -100;
    let currentX = -100, currentY = -100;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Radial tracking coordinates
        document.documentElement.style.setProperty('--mouse-x', `${mouseX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${mouseY}px`);
    });

    // Animate coordinates using Linear Interpolation (Lerp)
    function updateCursor() {
        const lerpFactor = 0.15;
        currentX += (mouseX - currentX) * lerpFactor;
        currentY += (mouseY - currentY) * lerpFactor;

        glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

        requestAnimationFrame(updateCursor);
    }
    updateCursor();
}

/* ==========================================================================
   3. DECORATIVE PERFORMANCE-OPTIMIZED PARTICLE SYSTEM
   ========================================================================== */
function initParticleConstellation() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    const maxParticles = 60;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.5;
            this.speedX = Math.random() * 0.3 - 0.15;
            this.speedY = Math.random() * 0.3 - 0.15;
            this.alpha = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        draw() {
            ctx.fillStyle = `rgba(0, 243, 255, ${this.alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

/* ==========================================================================
   4. INTERACTIVE PARALLAX GEOMETRY SCENERY
   ========================================================================== */
function initInteractiveParallax() {
    const layers = document.querySelectorAll('.parallax-layer');
    
    window.addEventListener('mousemove', (e) => {
        const xOffset = (window.innerWidth / 2 - e.clientX) * 0.015;
        const yOffset = (window.innerHeight / 2 - e.clientY) * 0.015;

        layers.forEach(layer => {
            const speed = parseFloat(layer.getAttribute('data-speed') || 0);
            layer.style.transform = `translate3d(${xOffset * speed}px, ${yOffset * speed}px, 0)`;
        });
    });
}

/* ==========================================================================
   5. INTERSECTION OBSERVER & PROGRESS BAR SCROLL ENGINE
   ========================================================================== */
function initScrollEngine() {
    const scrollBar = document.getElementById('scroll-bar');
    const reveals = document.querySelectorAll('.scroll-reveal');
    const stats = document.querySelectorAll('.stat-num');
    let countersInitiated = false;

    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollBar.style.width = `${scrolled}%`;

        const header = document.querySelector('.main-header');
        if (winScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                
                if (entry.target.id === 'about' && !countersInitiated) {
                    initCounters();
                    countersInitiated = true;
                }
            }
        });
    }, observerOptions);

    reveals.forEach(el => revealObserver.observe(el));

    function initCounters() {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            let current = 0;
            const step = Math.ceil(target / 60);

            const counterInterval = setInterval(() => {
                current += step;
                if (current >= target) {
                    stat.innerText = target;
                    clearInterval(counterInterval);
                } else {
                    stat.innerText = current;
                }
            }, 25);
        });
    }
}

/* ==========================================================================
   6. INTERACTIVE GLASSMORPHISM 3D TILT EFFECT
   ========================================================================== */
function initTiltInteraction() {
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const xRotation = ((y - rect.height / 2) / rect.height) * -15;
            const yRotation = ((x - rect.width / 2) / rect.width) * 15;

            card.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

/* ==========================================================================
   7. POPUP DETAILS ENGINE FOR CREATIONS/PROJECTS
   ========================================================================== */
const projectDetails = {
    'proj-1': {
        title: "CaseFlow System",
        desc: "A dedicated design framework engineered to map complex test structures, dynamic dashboard panels, and modular parameters for Software Quality Assurance teams.",
        stack: "Manual Testing Methodology, UI Prototyping, Figma UI Design",
        perf: "Organized Case Tracking Optimization"
    },
    'proj-2': {
        title: "Skillcy UI Ecosystem",
        desc: "A custom 14-screen responsive development architecture built around performance and fluid transitions tracking structural training models for modern students.",
        stack: "Responsive Web Standards, Custom CSS Layouts, CSS Variables",
        perf: "100% Client Rendering Performance"
    },
    'proj-3': {
        title: "'Dreadful Her' Portal",
        desc: "An immersive serialized suspense portal deploying unique dual-page layout strategies, clean typographic lines, and smooth scrolling aesthetics.",
        stack: "Creative Writing Integration, Classic Typography, Clean Grid Structures",
        perf: "Dynamic Visual Reading Optimization"
    }
};

function initProjectModals() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projId = card.getAttribute('data-project-id');
            const data = projectDetails[projId];
            if (data) {
                openProjectModal(data);
            }
        });
    });
}

function openProjectModal(data) {
    const modal = document.getElementById('project-modal');
    document.getElementById('modal-project-title').innerText = data.title;
    document.getElementById('modal-project-desc').innerText = data.desc;
    document.getElementById('modal-tech-stack').innerText = data.stack;
    document.getElementById('modal-perf-metric').innerText = data.perf;

    modal.classList.add('active');
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('active');
}

/* ==========================================================================
   8. TRANSMIT TERMINAL CONTACT INTERACTION
   ========================================================================== */
function handleContactSubmit(event) {
    event.preventDefault();
    const btn = document.getElementById('send-form-btn');
    const logBox = document.getElementById('terminal-log');
    
    btn.disabled = true;
    btn.querySelector('.btn-text').innerText = "Transmitting...";

    setTimeout(() => {
        logBox.classList.remove('hidden');
        btn.querySelector('.btn-text').innerText = "Signal Dispatched";
    }, 1500);
}

/* Helper Smooth Scrolling */
function scrollToSection(id) {
    const target = document.getElementById(id);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
}
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.transition = "opacity .6s ease";

        setTimeout(() => {
            loader.style.display = "none";
        }, 600);

    }, 1500);
});