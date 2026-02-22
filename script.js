// script.js

// ===== PRELOADER HIDE =====
window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  // already hidden via CSS animation, but ensure removal
  setTimeout(() => {
    if (preloader) preloader.style.display = 'none';
  }, 2600); // after fadeOut
});

// ===== NAVBAR TOGGLE & SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

// toggle mobile menu
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// close menu when a link is clicked
document.querySelectorAll('.nav-list a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// change navbar style on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== SCROLL-TRIGGERED ANIMATIONS (INTERSECTION OBSERVER) =====
const animatedElements = document.querySelectorAll('.animate-on-scroll');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // optionally unobserve after animation
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

animatedElements.forEach(el => observer.observe(el));

// ===== PARALLAX EFFECT ON HERO (simple scroll) =====
const hero = document.querySelector('.hero-section');
window.addEventListener('scroll', () => {
  if (hero) {
    const scrollY = window.scrollY;
    // move background slightly slower
    hero.style.backgroundPosition = `center ${scrollY * 0.5}px`;
  }
});

// ===== LIGHTBOX GALLERY =====
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;
const imageSources = [];

// gather image sources from gallery items (data-src)
galleryItems.forEach((item, index) => {
  // prefer data-src for high-res
  const src = item.dataset.src;
  if (src) imageSources.push(src);
  else {
    // fallback: extract from background-image
    const bg = window.getComputedStyle(item).backgroundImage;
    const url = bg.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
    imageSources.push(url);
  }

  item.addEventListener('click', () => {
    currentIndex = index;
    openLightbox(imageSources[currentIndex]);
  });
});

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden'; // prevent scrolling
}

closeBtn.addEventListener('click', () => {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + imageSources.length) % imageSources.length;
  lightboxImg.src = imageSources[currentIndex];
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % imageSources.length;
  lightboxImg.src = imageSources[currentIndex];
});

// close lightbox with escape
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  if (e.key === 'ArrowLeft') prevBtn.click();
  if (e.key === 'ArrowRight') nextBtn.click();
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== MINIMAL SOUND PLACEHOLDER (optional) =====
// document.querySelector('.war-drum i')?.addEventListener('click', () => {
//   const audio = document.getElementById('war-drum-sound');
//   if (audio) audio.play().catch(() => {});
// });


// ===== BACKGROUND AUDIO with mute/unmute floating button =====
document.addEventListener('DOMContentLoaded', function() {
  const audio = document.getElementById('war-drum-sound');
  const audioControl = document.getElementById('audio-control');
  const audioIcon = document.getElementById('audio-icon');

  if (!audio || !audioControl || !audioIcon) return;

  // Initial state: try to autoplay (browsers may block)
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

  // Attempt to play on page load (autoplay)
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      // Autoplay succeeded
      setIcon(true, audio.muted);
    }).catch(() => {
      // Autoplay blocked – set icon to muted
      setIcon(false, true);
    });
  }

  // Handle errors (e.g., file not found)
  audio.addEventListener('error', () => {
    console.warn('Audio file not found or unsupported');
    setIcon(false, true);
    audioControl.style.opacity = '0.5'; // visual hint
  });

  // Toggle on button click
  audioControl.addEventListener('click', () => {
    if (audio.paused) {
      // Try to play (user interaction usually allows it)
      audio.play()
        .then(() => {
          setIcon(true, audio.muted);
        })
        .catch(e => {
          console.warn('Playback failed:', e);
          setIcon(false, true);
        });
    } else {
      // Toggle mute
      audio.muted = !audio.muted;
      setIcon(true, audio.muted);
    }
  });

  // Update icon if audio ends (though loop is true, but just in case)
  audio.addEventListener('pause', () => {
    // If paused and not because of mute toggling, update icon
    if (audio.paused && !audio.muted) {
      setIcon(false, true);
    }
  });
});