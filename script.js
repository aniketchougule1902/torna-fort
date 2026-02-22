// script.js - Enhanced Award-Winning Version

// ===== PARTICLE SYSTEM - MOBILE OPTIMIZED =====
class ParticleSystem {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    
    // Detect mobile and reduce particles
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    
    this.options = {
      particleCount: isMobileDevice ? 30 : options.particleCount || 80,
      particleColor: options.particleColor || '255, 153, 51',
      particleSize: isMobileDevice ? 2 : options.particleSize || 3,
      speed: isMobileDevice ? 0.3 : options.speed || 0.5,
      connectDistance: isMobileDevice ? 80 : options.connectDistance || 150,
      mouseDistance: isMobileDevice ? 100 : options.mouseDistance || 200,
      ...options
    };
    
    this.mouse = { x: null, y: null };
    this.resize();
    this.init();
    this.animate();
    
    window.addEventListener('resize', () => this.resize());
    
    // Touch support for mobile
    this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: true });
    this.canvas.addEventListener('touchstart', (e) => this.handleTouchMove(e), { passive: true });
    this.canvas.addEventListener('touchend', () => this.handleTouchEnd());
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  handleTouchMove(e) {
    if (e.touches.length > 0) {
      this.mouse.x = e.touches[0].clientX;
      this.mouse.y = e.touches[0].clientY;
    }
  }
  
  handleTouchEnd() {
    this.mouse.x = null;
    this.mouse.y = null;
  }
  
  handleMouseMove(e) {
    this.mouse.x = e.x;
    this.mouse.y = e.y;
  }
  
  handleMouseLeave() {
    this.mouse.x = null;
    this.mouse.y = null;
  }
  
  init() {
    for (let i = 0; i < this.options.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * this.options.speed,
        vy: (Math.random() - 0.5) * this.options.speed,
        size: Math.random() * this.options.particleSize + 1,
        alpha: Math.random() * 0.5 + 0.3
      });
    }
  }
  
  drawParticles() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw particles
    this.particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      
      // Bounce off edges
      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
      
      // Mouse interaction
      if (this.mouse.x && this.mouse.y) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < this.options.mouseDistance) {
          const force = (this.options.mouseDistance - dist) / this.options.mouseDistance;
          p.x -= dx * force * 0.02;
          p.y -= dy * force * 0.02;
        }
      }
      
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${this.options.particleColor}, ${p.alpha})`;
      this.ctx.fill();
      
      // Draw connections
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < this.options.connectDistance) {
          const opacity = (1 - dist / this.options.connectDistance) * 0.3;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(${this.options.particleColor}, ${opacity})`;
          this.ctx.stroke();
        }
      }
    });
  }
  
  animate() {
    this.drawParticles();
    requestAnimationFrame(() => this.animate());
  }
}

// ===== HERO PARTICLES =====
class HeroParticles {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    
    this.particles = [];
    this.init();
    this.animate();
  }
  
  init() {
    for (let i = 0; i < 30; i++) {
      this.particles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }
  
  createParticleElement(p) {
    const el = document.createElement('div');
    el.className = 'hero-particle';
    el.style.cssText = `
      position: absolute;
      width: ${p.size}px;
      height: ${p.size}px;
      background: radial-gradient(circle, rgba(255, 153, 51, 0.8) 0%, transparent 70%);
      border-radius: 50%;
      left: ${p.x}%;
      top: ${p.y}%;
      opacity: ${p.opacity};
      pointer-events: none;
    `;
    return el;
  }
  
  animate() {
    this.particles.forEach(p => {
      p.x += p.speedX;
      p.y -= p.speedY;
      
      if (p.y < -10) {
        p.y = 110;
        p.x = Math.random() * 100;
      }
      if (p.x < -10) p.x = 110;
      if (p.x > 110) p.x = -10;
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// ===== PRELOADER PARTICLES =====
function initPreloaderParticles() {
  const container = document.getElementById('preloaderParticles');
  if (!container) return;
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 6 + 2}px;
      height: ${Math.random() * 6 + 2}px;
      background: ${Math.random() > 0.5 ? 'var(--gold)' : 'var(--saffron)'};
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      opacity: ${Math.random() * 0.5 + 0.3};
      animation: preloaderParticle ${Math.random() * 3 + 2}s infinite ease-in-out;
      animation-delay: ${Math.random() * 2}s;
    `;
    container.appendChild(particle);
  }
}

// Add preloader particle animation
const style = document.createElement('style');
style.textContent = `
  @keyframes preloaderParticle {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
    25% { transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) scale(1.2); opacity: 1; }
    50% { transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) scale(0.8); opacity: 0.5; }
    75% { transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) scale(1.1); opacity: 1; }
  }
`;
document.head.appendChild(style);

// ===== PRELOADER HIDE =====
window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    if (preloader) {
      preloader.style.opacity = '0';
      preloader.style.transition = 'opacity 0.8s ease';
      setTimeout(() => {
        preloader.style.display = 'none';
        // Start main animations after preloader
        initParticleSystems();
      }, 800);
    }
  }, 3000);
});

// ===== INIT PARTICLE SYSTEMS =====
let particleSystems = [];
function initParticleSystems() {
  // Check for mobile device
  const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
  
  // Reduced particles on mobile for better performance
  const particleCount = isMobileDevice ? 30 : 100;
  const particleSize = isMobileDevice ? 2 : 2;
  
  // Main particle canvas
  particleSystems.push(new ParticleSystem('particleCanvas', {
    particleCount: particleCount,
    particleColor: '212, 175, 55',
    particleSize: particleSize,
    speed: 0.6,
    connectDistance: isMobileDevice ? 80 : 100
  }));
}

// ===== NAVBAR TOGGLE & SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

// Enhanced mobile detection
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  // Prevent body scroll when menu is open
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Touch event for nav toggle
navToggle.addEventListener('touchstart', (e) => {
  e.preventDefault();
  navMenu.classList.toggle('active');
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}, { passive: false });

document.querySelectorAll('.nav-list a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Navbar scroll effect - debounced for performance
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  
  // Only update class when crossing threshold
  if (currentScroll > 50 && !navbar.classList.contains('scrolled')) {
    navbar.classList.add('scrolled');
  } else if (currentScroll <= 50 && navbar.classList.contains('scrolled')) {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
}, { passive: true });

// ===== SCROLL-TRIGGERED ANIMATIONS (INTERSECTION OBSERVER) =====
const animatedElements = document.querySelectorAll('.animate-on-scroll');

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

animatedElements.forEach(el => observer.observe(el));

// ===== ENHANCED PARALLAX EFFECT ON HERO =====
const hero = document.querySelector('.hero-section');
const heroTitle = document.querySelector('.hero-title');

window.addEventListener('scroll', () => {
  if (hero) {
    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;
    
    if (scrollY < heroHeight) {
      hero.style.backgroundPosition = `center ${scrollY * 0.4}px`;
      
      if (heroTitle) {
        heroTitle.style.transform = `translateY(${scrollY * 0.3}px)`;
        heroTitle.style.opacity = 1 - (scrollY / heroHeight);
      }
    }
  }
});

// ===== 3D TILT EFFECT FOR CARDS - MOBILE ENHANCED =====
function initTiltEffect() {
  const cards = document.querySelectorAll('.contrib-card, .flip-card');
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  cards.forEach(card => {
    // Mouse events (desktop)
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      card.style.transition = 'transform 0.4s ease';
    });
    
    // Touch events for mobile - tap to flip
    if (isTouchDevice) {
      card.addEventListener('touchstart', (e) => {
        card.classList.add('touched');
      }, { passive: true });
      
      card.addEventListener('touchend', (e) => {
        setTimeout(() => {
          card.classList.remove('touched');
        }, 1500);
      });
    }
  });
}

// ===== LIGHTBOX GALLERY - MOBILE ENHANCED =====
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;
const imageSources = [];

// Build image sources array
galleryItems.forEach((item, index) => {
  const src = item.dataset.src;
  if (src) imageSources.push(src);
  else {
    const bg = window.getComputedStyle(item).backgroundImage;
    const url = bg.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
    imageSources.push(url);
  }
  
  // Click/touch event
  item.addEventListener('click', () => {
    currentIndex = index;
    openLightbox(imageSources[currentIndex]);
  });
  
  // Touch support for mobile
  item.addEventListener('touchend', (e) => {
    e.preventDefault();
    currentIndex = index;
    openLightbox(imageSources[currentIndex]);
  });
});

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  document.body.style.position = '';
}

closeBtn.addEventListener('click', closeLightbox);

// Close on background click
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + imageSources.length) % imageSources.length;
  lightboxImg.src = imageSources[currentIndex];
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % imageSources.length;
  lightboxImg.src = imageSources[currentIndex];
});

// Keyboard and touch navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') prevBtn.click();
  if (e.key === 'ArrowRight') nextBtn.click();
});

// Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

lightbox.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, { passive: true });

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe left - next image
      nextBtn.click();
    } else {
      // Swipe right - previous image
      prevBtn.click();
    }
  }
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
  });
});

// ===== BACKGROUND AUDIO with enhanced control =====
document.addEventListener('DOMContentLoaded', function() {
  const audio = document.getElementById('war-drum-sound');
  const audioControl = document.getElementById('audio-control');
  const audioIcon = document.getElementById('audio-icon');
  
  if (!audio || !audioControl || !audioIcon) return;
  
  let userInteracted = false;
  
  function setIcon(playing, muted) {
    if (!playing || muted) {
      audioIcon.classList.remove('fa-volume-up');
      audioIcon.classList.add('fa-volume-mute');
    } else {
      audioIcon.classList.remove('fa-volume-mute');
      audioIcon.classList.add('fa-volume-up');
    }
  }
  
  // Try to autoplay
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      setIcon(true, audio.muted);
    }).catch(() => {
      setIcon(false, true);
    });
  }
  
  audio.addEventListener('error', () => {
    console.warn('Audio file not found or unsupported');
    setIcon(false, true);
    audioControl.style.opacity = '0.5';
  });
  
  audioControl.addEventListener('click', () => {
    userInteracted = true;
    if (audio.paused) {
      audio.play()
        .then(() => {
          setIcon(true, audio.muted);
          audioControl.style.animation = 'none';
        })
        .catch(e => {
          console.warn('Playback failed:', e);
          setIcon(false, true);
        });
    } else {
      audio.muted = !audio.muted;
      setIcon(true, audio.muted);
    }
  });
  
  audio.addEventListener('pause', () => {
    if (audio.paused && !audio.muted) {
      setIcon(false, true);
    }
  });
});

// ===== AUDIO BUTTON HOVER SOUND EFFECT =====
function initHoverSounds() {
  const buttons = document.querySelectorAll('.hero-btn, .contrib-social a, .footer-links a');
  
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      // Visual feedback instead of sound (browser restrictions)
      btn.style.transition = 'all 0.2s ease';
    });
  });
}

// ===== CURSOR TRAIL EFFECT =====
function initCursorTrail() {
  // Disable cursor trail on mobile for better performance
  if (isMobile || window.innerWidth < 768) return;
  
  const trail = [];
  const trailLength = 20;
  
  document.addEventListener('mousemove', (e) => {
    trail.push({ x: e.clientX, y: e.clientY });
    
    if (trail.length > trailLength) {
      trail.shift();
    }
  });
  
  // Create trail elements
  const trailContainer = document.createElement('div');
  trailContainer.id = 'cursor-trail';
  trailContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9998;
    overflow: hidden;
  `;
  document.body.appendChild(trailContainer);
  
  const dots = [];
  for (let i = 0; i < trailLength; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: absolute;
      width: ${10 - i * 0.4}px;
      height: ${10 - i * 0.4}px;
      background: radial-gradient(circle, rgba(212, 175, 55, ${0.5 - i * 0.02}) 0%, transparent 70%);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: opacity 0.1s ease;
    `;
    trailContainer.appendChild(dot);
    dots.push(dot);
  }
  
  function updateTrail() {
    trail.forEach((pos, i) => {
      if (dots[i]) {
        dots[i].style.left = pos.x + 'px';
        dots[i].style.top = pos.y + 'px';
        dots[i].style.opacity = (1 - i / trailLength) * 0.6;
      }
    });
    requestAnimationFrame(updateTrail);
  }
  
  updateTrail();
}

// ===== MAGNETIC BUTTON EFFECT =====
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.hero-btn');
  
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
      btn.style.transition = 'transform 0.3s ease';
    });
  });
}

// ===== SCROLL PROGRESS INDICATOR =====
function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 4px;
    background: linear-gradient(90deg, var(--saffron), var(--gold));
    z-index: 10000;
    transition: width 0.1s ease;
    box-shadow: 0 0 10px var(--gold);
  `;
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });
}

// ===== SMOOTH SECTION REVEAL =====
function initSectionReveal() {
  const sections = document.querySelectorAll('section');
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
      }
    });
  }, { threshold: 0.1 });
  
  sections.forEach(section => {
    section.classList.add('section-reveal');
    sectionObserver.observe(section);
  });
}

// ===== IMAGE LAZY LOADING WITH FADE =====
function initLazyLoad() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// ===== INITIALIZE ALL FEATURES =====
document.addEventListener('DOMContentLoaded', () => {
  initPreloaderParticles();
  initTiltEffect();
  initHoverSounds();
  initMagneticButtons();
  initScrollProgress();
  initSectionReveal();
  initLazyLoad();
  
  // Only init cursor trail on non-touch devices
  if (!('ontouchstart' in window)) {
    initCursorTrail();
  }
  
  // Initialize hero particles if container exists
  if (document.getElementById('heroParticles')) {
    new HeroParticles('heroParticles');
  }
});

// ===== ENHANCED SCROLL REVEAL =====
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  
  // Parallax for different elements
  document.querySelectorAll('.fog').forEach((fog, i) => {
    fog.style.transform = `translateX(${scrolled * (0.1 + i * 0.05)}px)`;
  });
  
  // Reveal elements on scroll
  document.querySelectorAll('.timeline-item').forEach((item, index) => {
    const itemTop = item.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (itemTop < windowHeight * 0.8) {
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }
  });
});

// ===== PERFORMANCE OPTIMIZATION =====
let lastScrollTime = 0;
window.addEventListener('scroll', () => {
  const now = Date.now();
  if (now - lastScrollTime > 16) { // ~60fps
    lastScrollTime = now;
    // Scroll-based animations here
  }
}, { passive: true });

// ===== REDUCE MOTION FOR ACCESSIBILITY =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  // Disable heavy animations for accessibility
  document.documentElement.style.setProperty('--transition-speed', '0');
} else {
  // Add smooth scroll behavior
  document.documentElement.style.scrollBehavior = 'smooth';
}
