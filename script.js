/* ==========================================================================
   NORA — THE WORLD OF DREAMS
   Interactive Logic, Particle Engine, Letter Reveals & Secret Vault
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  /* ------------------------------------------------------------------------
     1. PRELOADER SEQUENCE
     ------------------------------------------------------------------------ */
  const preloader = document.getElementById('preloader');
  const loaderBar = document.getElementById('loaderBar');

  let loadProgress = 0;
  const loadInterval = setInterval(() => {
    loadProgress += Math.floor(Math.random() * 28) + 18;
    if (loadProgress >= 100) {
      loadProgress = 100;
      loaderBar.style.width = '100%';
      clearInterval(loadInterval);
      setTimeout(() => {
        preloader.classList.add('fade-out');
      }, 350);
    } else {
      loaderBar.style.width = `${loadProgress}%`;
    }
  }, 140);

  /* ------------------------------------------------------------------------
     2. OPENING SCREEN -> MAIN WORLD TRANSITION & LETTER-BY-LETTER REVEAL
     ------------------------------------------------------------------------ */
  const openingScreen = document.getElementById('openingScreen');
  const enterWorldBtn = document.getElementById('enterWorldBtn');
  const mainExperience = document.getElementById('mainExperience');
  const typewriterHeading = document.getElementById('typewriterHeading');
  const typewriterSubtext = document.getElementById('typewriterSubtext');

  function animateTextLetterByLetter(element, delayPerChar = 42, initialDelay = 0) {
    const rawText = element.getAttribute('data-text') || '';
    element.innerHTML = '';

    // Split by words first so mobile line-wrapping never breaks mid-word
    const words = rawText.split(' ');
    let charIndex = 0;

    words.forEach((word, wordIdx) => {
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      wordSpan.style.whiteSpace = 'nowrap';

      for (let i = 0; i < word.length; i++) {
        const span = document.createElement('span');
        span.textContent = word[i];
        span.className = 'char-reveal';
        span.style.animationDelay = `${initialDelay + charIndex * delayPerChar}ms`;
        wordSpan.appendChild(span);
        charIndex++;
      }

      element.appendChild(wordSpan);

      if (wordIdx < words.length - 1) {
        const space = document.createTextNode(' ');
        element.appendChild(space);
        charIndex++;
      }
    });
  }

  enterWorldBtn.addEventListener('click', () => {
    openingScreen.classList.add('dismissed');
    mainExperience.classList.add('active');
    mainExperience.setAttribute('aria-hidden', 'false');
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Trigger letter-by-letter animation for Welcome Section
    animateTextLetterByLetter(typewriterHeading, 45, 350);
    animateTextLetterByLetter(typewriterSubtext, 24, 1450);
  });

  /* ------------------------------------------------------------------------
     3. LIVE DIGITAL CLOCK
     ------------------------------------------------------------------------ */
  const digitalClock = document.getElementById('digitalClock');

  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    digitalClock.textContent = `${hours}:${minutes}:${seconds}`;
  }
  updateClock();
  setInterval(updateClock, 1000);

  /* ------------------------------------------------------------------------
     4. SCROLL PROGRESS INDICATOR & BACK-TO-TOP BUTTON
     ------------------------------------------------------------------------ */
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener(
    'scroll',
    () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      scrollProgress.style.width = `${scrolled}%`;

      if (scrollTop > 450) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    },
    { passive: true }
  );

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ------------------------------------------------------------------------
     5. INTERSECTION OBSERVER FOR SCROLL ANIMATIONS & FINAL SIGNATURE
     ------------------------------------------------------------------------ */
  const revealElements = document.querySelectorAll(
    '.reveal-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur'
  );
  const noraSignature = document.getElementById('noraSignature');
  const replaySignatureBtn = document.getElementById('replaySignatureBtn');
  let signaturePlayed = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');

          if (entry.target.id === 'finale' && !signaturePlayed) {
            signaturePlayed = true;
            noraSignature.classList.add('animate-signature');
          }
        }
      });
    },
    { threshold: 0.16 }
  );

  revealElements.forEach((el) => observer.observe(el));

  const finaleSection = document.getElementById('finale');
  if (finaleSection) {
    observer.observe(finaleSection);
  }

  replaySignatureBtn.addEventListener('click', () => {
    noraSignature.classList.remove('animate-signature');
    void noraSignature.offsetWidth; // Trigger reflow to restart CSS animation
    noraSignature.classList.add('animate-signature');
  });

  /* ------------------------------------------------------------------------
     6. SECRET MESSAGES VAULT (24 UNIQUE MESSAGES)
     ------------------------------------------------------------------------ */
  const secretMessages = [
    "You carry a quiet magic that makes ordinary moments feel unforgettable.",
    "Not everyone will understand your depth—and that is precisely what makes you rare.",
    "The dreams that keep returning to your heart are maps to where you belong.",
    "You have survived 100% of your hardest days; trust the strength inside you.",
    "Some souls shine so effortlessly they illuminate everyone lucky enough to cross their path.",
    "Never shrink your light to fit into spaces that were built too small for your spirit.",
    "What is meant for your story will never require you to lose yourself to keep it.",
    "Even in complete silence, your presence speaks volumes of grace and resilience.",
    "The universe is quietly rearranging pieces in your favor—be patient with the unfolding.",
    "Your kindness is not a weakness; it is proof that the world could not harden your heart.",
    "Every scar you carry is simply evidence that you were stronger than what tried to break you.",
    "There is a version of tomorrow waiting to thank you for not giving up today.",
    "You are allowed to outgrow old versions of yourself without apologizing to anyone.",
    "Like moonlight on still water, your calm energy brings peace to chaotic places.",
    "Never underestimate the power of a single brave decision to rewrite your entire universe.",
    "You deserve the same unconditional love and patience that you so freely give to others.",
    "Magic happens the moment you stop doubting your worth and start honoring your intuition.",
    "Some stories are written in ink, but yours is written in starlight—impossible to erase.",
    "Take pride in how far you have come, even the steps nobody else witnessed.",
    "Your voice, your dreams, and your existence matter more than words could ever measure.",
    "Let go of the weight of perfection; your authenticity is already breathtaking.",
    "When the night feels darkest, remember that constellations only appear after sunset.",
    "You are both the author and the masterpiece of this extraordinary chapter.",
    "A gentle heart paired with a fearless mind is an unstoppable force."
  ];

  const openSecretBtn = document.getElementById('openSecretBtn');
  const secretMessageText = document.getElementById('secretMessageText');
  const secretCard = document.getElementById('secretCard');
  const secretCounter = document.getElementById('secretCounter');
  const secretStatus = document.getElementById('secretStatus');
  let lastSecretIndex = -1;

  openSecretBtn.addEventListener('click', () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * secretMessages.length);
    } while (randomIndex === lastSecretIndex && secretMessages.length > 1);

    lastSecretIndex = randomIndex;

    secretMessageText.classList.add('animating-out');
    secretCard.classList.remove('revealed');

    setTimeout(() => {
      secretMessageText.textContent = `“${secretMessages[randomIndex]}”`;
      secretCounter.textContent = `WHISPER #${String(randomIndex + 1).padStart(2, '0')} OF ${secretMessages.length}`;
      secretStatus.textContent = 'UNSEALED';
      secretMessageText.classList.remove('animating-out');
      secretCard.classList.add('revealed');
    }, 320);
  });

  /* ------------------------------------------------------------------------
     7. FEELINGS CORNER INTERACTIVE TABS
     ------------------------------------------------------------------------ */
  const moodsData = {
    peace: {
      title: 'Where Quiet Meets Clarity',
      body: 'Breathe slowly. You do not have to solve every tomorrow tonight. Right here, in this quiet space, you are allowed to simply exist without expectation.',
      mantra: 'MANTRA: I AM AT PEACE WITH MY PACE.'
    },
    hope: {
      title: 'The First Light Before Dawn',
      body: 'Even the longest midnight eventually surrenders to morning. Every quiet effort you are planting right now is preparing to bloom in ways you cannot yet imagine.',
      mantra: 'MANTRA: MY BEST CHAPTERS ARE STILL AHEAD.'
    },
    strength: {
      title: 'Unbreakable Grace',
      body: 'Look at everything you have walked through and still kept your heart open. True power is not loud—it is the quiet refusal to surrender your spirit.',
      mantra: 'MANTRA: I AM STRONGER THAN ANY STORM.'
    },
    wonder: {
      title: 'Eyes Full of Starlight',
      body: 'The world is still overflowing with unwritten poetry, unexpected beauty, and moments that will take your breath away. Stay curious about what comes next.',
      mantra: 'MANTRA: I WELCOME MAGIC INTO MY UNIVERSE.'
    },
    nostalgia: {
      title: 'Echoes of Golden Hours',
      body: 'Honor the memories that shaped you without living in the past. Every person and moment that passed through your life prepared you for who you are becoming.',
      mantra: 'MANTRA: I CHERISH THE PAST AND EMBRACE NOW.'
    }
  };

  const moodButtons = document.querySelectorAll('.mood-btn');
  const feelingStage = document.getElementById('feelingStage');
  const feelingTitle = document.getElementById('feelingTitle');
  const feelingBody = document.getElementById('feelingBody');
  const feelingMantra = document.getElementById('feelingMantra');

  moodButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('active')) return;

      moodButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const selected = moodsData[btn.dataset.mood];
      if (!selected) return;

      feelingStage.classList.add('switching');
      setTimeout(() => {
        feelingTitle.textContent = selected.title;
        feelingBody.textContent = selected.body;
        feelingMantra.textContent = selected.mantra;
        feelingStage.classList.remove('switching');
      }, 240);
    });
  });

  /* ------------------------------------------------------------------------
     8. CUSTOM DESKTOP CURSOR EFFECT
     ------------------------------------------------------------------------ */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener(
      'mousemove',
      (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
      },
      { passive: true }
    );

    function animateCursorRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(animateCursorRing);
    }
    animateCursorRing();

    const interactiveTargets = document.querySelectorAll('button, a, .glass-card');
    interactiveTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('active'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('active'));
    });
  }

  /* ------------------------------------------------------------------------
     9. LIGHTWEIGHT FLOATING STARS & TEXT PARTICLES (MOBILE-OPTIMIZED)
     ------------------------------------------------------------------------ */
  const canvas = document.getElementById('ambientCanvas');
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const isMobile = width < 768;
  const starCount = isMobile ? 38 : 75;
  const floatingWords = ['NORA', 'DREAM', 'LIGHT', 'MAGIC', 'STARLIGHT', 'SOUL', 'INFINITY', 'GRACE'];
  const wordCount = isMobile ? 6 : 12;

  const stars = [];
  const textParticles = [];

  function initParticles() {
    stars.length = 0;
    textParticles.length = 0;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.4,
        alpha: Math.random() * 0.7 + 0.2,
        speedY: -(Math.random() * 0.22 + 0.05),
        twinkleSpeed: Math.random() * 0.015 + 0.005,
        color: Math.random() > 0.5 ? '255, 110, 199' : '216, 180, 254'
      });
    }

    for (let i = 0; i < wordCount; i++) {
      textParticles.push({
        text: floatingWords[i % floatingWords.length],
        x: Math.random() * width,
        y: Math.random() * height,
        speedY: -(Math.random() * 0.28 + 0.1),
        speedX: (Math.random() - 0.5) * 0.15,
        alpha: Math.random() * 0.12 + 0.04,
        size: isMobile ? 10 : 12
      });
    }
  }

  initParticles();

  let resizeTimeout;
  window.addEventListener(
    'resize',
    () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initParticles();
      }, 200);
    },
    { passive: true }
  );

  function renderCosmicCanvas() {
    ctx.clearRect(0, 0, width, height);

    // Render glowing stars
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.y += s.speedY;
      s.alpha += s.twinkleSpeed;
      if (s.alpha > 0.9 || s.alpha < 0.15) s.twinkleSpeed *= -1;

      if (s.y < -5) {
        s.y = height + 5;
        s.x = Math.random() * width;
      }

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${s.color}, ${s.alpha})`;
      ctx.fill();
    }

    // Render subtle floating text particles
    ctx.font = `500 ${isMobile ? '10px' : '11px'} Cinzel, serif`;
    for (let i = 0; i < textParticles.length; i++) {
      const tp = textParticles[i];
      tp.y += tp.speedY;
      tp.x += tp.speedX;

      if (tp.y < -20) {
        tp.y = height + 20;
        tp.x = Math.random() * width;
      }

      ctx.fillStyle = `rgba(226, 232, 240, ${tp.alpha})`;
      ctx.fillText(tp.text, tp.x, tp.y);
    }

    requestAnimationFrame(renderCosmicCanvas);
  }

  renderCosmicCanvas();
});
