document.addEventListener('DOMContentLoaded', function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================
     ROLE PROFILES
     One page, several angles. Each profile changes the hero line,
     the intro, the order of results and services, and which
     process steps are flagged as the focus.
     Share a tailored link with ?role=editor (or any key below).
     ========================================================== */
  var ROLES = {
    all: {
      title: null, // null = cycle through every role
      intro: 'I shoot, edit and plan social content in Glasgow, working with community organisations and university teams to tell stories that hold attention on Instagram and TikTok.',
      services: ['shoot', 'edit', 'drone', 'photo', 'strategy', 'manage'],
      results: ['followers', 'watchtime', 'views', 'aerial'],
      focus: [],
      servicesFocus: []
    },
    videographer: {
      title: 'Videographer',
      intro: 'I film on location for events, campaigns, food and everyday content with my own kit: Sony camera, phone rig and drone. Every shot is planned with the edit and the platform in mind.',
      services: ['shoot', 'drone', 'edit', 'photo', 'strategy', 'manage'],
      results: ['aerial', 'views', 'watchtime', 'followers'],
      focus: ['shoot'],
      servicesFocus: ['shoot', 'drone']
    },
    editor: {
      title: 'Video Editor',
      intro: 'I turn raw footage into finished reels and posts in Premiere Pro, DaVinci Resolve and CapCut, cutting for pace, sound and captions so people keep watching.',
      services: ['edit', 'shoot', 'drone', 'photo', 'strategy', 'manage'],
      results: ['watchtime', 'aerial', 'views', 'followers'],
      focus: ['edit'],
      servicesFocus: ['edit']
    },
    creator: {
      title: 'Content Creator',
      intro: 'I make social content end to end, from community events to campus stories, and I run my own channel where one reel reached 1M views.',
      services: ['shoot', 'edit', 'photo', 'strategy', 'drone', 'manage'],
      results: ['views', 'aerial', 'followers', 'watchtime'],
      focus: ['shoot', 'edit', 'publish'],
      servicesFocus: ['shoot', 'edit']
    },
    strategist: {
      title: 'Social Media Strategist',
      intro: 'I plan content around the platform and the audience it needs to reach, then look at what landed and feed it into the next idea.',
      services: ['strategy', 'manage', 'edit', 'shoot', 'photo', 'drone'],
      results: ['followers', 'watchtime', 'views', 'aerial'],
      focus: ['brief', 'plan', 'measure'],
      servicesFocus: ['strategy']
    },
    marketer: {
      title: 'Social Media Marketer',
      intro: 'I run day to day posting and scheduling and make the content that grows an audience, including 50% follower growth for the Glasgow Indians Association.',
      services: ['manage', 'strategy', 'photo', 'edit', 'shoot', 'drone'],
      results: ['followers', 'views', 'watchtime', 'aerial'],
      focus: ['plan', 'publish', 'measure'],
      servicesFocus: ['manage', 'strategy']
    }
  };

  var CYCLE_WORDS = ['Videographer', 'Video Editor', 'Content Creator', 'Social Media Strategist', 'Social Media Marketer'];

  /* ---------- Mobile nav ---------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('siteNav');

  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen);
    toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    });
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Typewriter role word ---------- */
  var roleWord = document.getElementById('roleWord');
  var typeToken = 0;
  var cycleTimer = null;

  function wait(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
  }

  function typeWord(word) {
    var token = ++typeToken;
    if (reduceMotion) {
      roleWord.textContent = word;
      return Promise.resolve(true);
    }
    var current = roleWord.textContent;

    function erase() {
      if (token !== typeToken) return Promise.resolve(false);
      if (!roleWord.textContent.length) return Promise.resolve(true);
      roleWord.textContent = roleWord.textContent.slice(0, -1);
      return wait(28).then(erase);
    }

    function type(i) {
      if (token !== typeToken) return Promise.resolve(false);
      if (i > word.length) return Promise.resolve(true);
      roleWord.textContent = word.slice(0, i);
      return wait(55).then(function () { return type(i + 1); });
    }

    if (current === word) return Promise.resolve(true);
    return erase().then(function (ok) { return ok ? type(1) : false; });
  }

  function startCycle() {
    if (reduceMotion) return;
    var i = Math.max(0, CYCLE_WORDS.indexOf(roleWord.textContent));
    function next() {
      i = (i + 1) % CYCLE_WORDS.length;
      typeWord(CYCLE_WORDS[i]).then(function (ok) {
        if (ok) cycleTimer = setTimeout(next, 2200);
      });
    }
    cycleTimer = setTimeout(next, 2200);
  }

  function stopCycle() {
    clearTimeout(cycleTimer);
    cycleTimer = null;
  }

  /* ---------- Apply a role ---------- */
  var chips = document.querySelectorAll('.chip');
  var intro = document.getElementById('heroIntro');
  var serviceCards = document.querySelectorAll('#servicesGrid .service-card');
  var resultCards = document.querySelectorAll('#resultsGrid .result-card');
  var clips = document.querySelectorAll('.clip');
  var baseTitle = 'Rohit Kumar Dubey';

  function applyOrder(cards, order) {
    cards.forEach(function (card) {
      var idx = order.indexOf(card.getAttribute('data-key'));
      card.style.order = idx === -1 ? 99 : idx;
    });
  }

  function applyRole(key, opts) {
    var role = ROLES[key] || ROLES.all;
    if (!ROLES[key]) key = 'all';
    opts = opts || {};

    chips.forEach(function (chip) {
      chip.setAttribute('aria-pressed', chip.getAttribute('data-role') === key ? 'true' : 'false');
    });

    // Intro text with a quick fade
    if (opts.instant || reduceMotion) {
      intro.textContent = role.intro;
    } else if (intro.textContent.trim() !== role.intro) {
      intro.classList.add('is-swapping');
      setTimeout(function () {
        intro.textContent = role.intro;
        intro.classList.remove('is-swapping');
      }, 250);
    }

    // Headline role word
    stopCycle();
    if (role.title) {
      typeWord(role.title);
      document.title = baseTitle + ' | ' + role.title + ' | Dubey Visuals';
    } else {
      typeWord(CYCLE_WORDS[0]).then(function (ok) { if (ok) startCycle(); });
      document.title = baseTitle + ' | Videographer, Video Editor, Content Creator & Social Media Strategist';
    }

    applyOrder(serviceCards, role.services);
    applyOrder(resultCards, role.results);

    serviceCards.forEach(function (card) {
      card.classList.toggle('is-focus', role.servicesFocus.indexOf(card.getAttribute('data-key')) !== -1);
    });

    clips.forEach(function (clip) {
      clip.classList.toggle('is-focus', role.focus.indexOf(clip.getAttribute('data-step')) !== -1);
    });

    // Keep the URL shareable without reloading
    if (!opts.skipUrl && window.history && window.history.replaceState) {
      var url = new URL(window.location.href);
      if (key === 'all') url.searchParams.delete('role');
      else url.searchParams.set('role', key);
      window.history.replaceState(null, '', url.pathname + url.search + url.hash);
    }
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      applyRole(chip.getAttribute('data-role'));
    });
  });

  var initialRole = new URLSearchParams(window.location.search).get('role') || 'all';
  applyRole(initialRole, { instant: true, skipUrl: true });

  /* ---------- Hero timecode ---------- */
  var timecode = document.getElementById('timecode');
  var startTime = performance.now();

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function renderTimecode() {
    var elapsed = (performance.now() - startTime) / 1000;
    var h = Math.floor(elapsed / 3600);
    var m = Math.floor((elapsed % 3600) / 60);
    var s = Math.floor(elapsed % 60);
    var f = Math.floor((elapsed % 1) * 25);
    timecode.textContent = pad(h) + ':' + pad(m) + ':' + pad(s) + ':' + pad(f);
  }

  if (!reduceMotion) {
    setInterval(renderTimecode, 40);
  }

  /* ---------- Reel loops ----------
     Desktop: play on hover/focus. Touch: play while the card is mostly in view.
     Reduced motion: posters only, never autoplay. */
  var reels = document.querySelectorAll('.reel');
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function playReel(reel) {
    var v = reel.querySelector('.reel-video');
    if (!v || reduceMotion) return;
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
    reel.classList.add('is-playing');
  }

  function stopReel(reel) {
    var v = reel.querySelector('.reel-video');
    if (!v) return;
    v.pause();
    reel.classList.remove('is-playing');
  }

  if (canHover) {
    reels.forEach(function (reel) {
      reel.addEventListener('mouseenter', function () { playReel(reel); });
      reel.addEventListener('mouseleave', function () { stopReel(reel); });
      reel.addEventListener('focus', function () { playReel(reel); });
      reel.addEventListener('blur', function () { stopReel(reel); });
    });
  } else if ('IntersectionObserver' in window) {
    var reelObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.intersectionRatio >= 0.6) playReel(entry.target);
        else stopReel(entry.target);
      });
    }, { threshold: [0, 0.6] });
    reels.forEach(function (reel) { reelObserver.observe(reel); });
  }

  /* ---------- YouTube: load the player only on click ---------- */
  document.querySelectorAll('.yt-embed').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-yt');
      var frame = document.createElement('iframe');
      frame.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      frame.title = btn.getAttribute('aria-label').replace('Play video: ', '');
      frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      frame.allowFullscreen = true;
      var holder = document.createElement('div');
      holder.className = 'yt-embed';
      holder.appendChild(frame);
      btn.replaceWith(holder);
    });
  });

  /* ---------- Stills lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  if (lightbox && typeof lightbox.showModal === 'function') {
    var lbImg = lightbox.querySelector('img');
    var lbCap = lightbox.querySelector('.lightbox-cap');

    document.querySelectorAll('.still').forEach(function (still) {
      still.addEventListener('click', function (e) {
        e.preventDefault();
        lbImg.src = still.getAttribute('href');
        lbImg.alt = still.querySelector('img').alt;
        lbCap.innerHTML = still.getAttribute('data-caption');
        lightbox.showModal();
      });
    });

    lightbox.querySelector('.lightbox-close').addEventListener('click', function () { lightbox.close(); });
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) lightbox.close(); });
  }

  /* ---------- Copy email ---------- */
  var copyBtn = document.getElementById('copyEmail');
  var toast = document.getElementById('toast');
  var toastTimer = null;

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('is-visible'); }, 2200);
  }

  copyBtn.addEventListener('click', function () {
    var email = copyBtn.getAttribute('data-email');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(function () {
        showToast('Email copied. Talk soon.');
      }, function () {
        window.location.href = 'mailto:' + email;
      });
    } else {
      window.location.href = 'mailto:' + email;
    }
  });

  /* ---------- Scroll: scrubber, header state, process playhead ---------- */
  var scrubber = document.querySelector('.scrubber');
  var header = document.querySelector('.site-header');
  var hero = document.getElementById('hero');
  var darkSections = document.querySelectorAll('.section-dark, .marquee, .site-footer');
  var editor = document.getElementById('timelineEditor');
  var ticking = false;

  function onScroll() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    var progress = max > 0 ? window.scrollY / max : 0;
    scrubber.style.setProperty('--progress', progress.toFixed(4));

    // Header: transparent over hero, solid afterwards, dark variant over dark sections
    var headerH = header.offsetHeight;
    var pastHero = hero.getBoundingClientRect().bottom <= headerH;
    header.classList.toggle('is-solid', pastHero);

    var onDark = false;
    darkSections.forEach(function (sec) {
      var r = sec.getBoundingClientRect();
      if (r.top <= headerH / 2 && r.bottom >= headerH / 2) onDark = true;
    });
    header.classList.toggle('on-dark', onDark);

    // Process: playhead runs across the track as the section scrolls through
    if (editor) {
      var rect = editor.getBoundingClientRect();
      var vh = window.innerHeight;
      var start = vh * 0.85;
      var end = vh * 0.25;
      var p = (start - rect.top) / (start - end + rect.height * 0.5);
      p = Math.max(0, Math.min(1, p));
      if (reduceMotion) p = 1;
      editor.style.setProperty('--progress', p.toFixed(4));

      var count = clips.length;
      clips.forEach(function (clip, i) {
        clip.classList.toggle('is-active', p >= i / count + 0.02 || p === 1);
      });
    }

    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onScroll);
    }
  }, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Count-up numbers ---------- */
  var counters = document.querySelectorAll('.counter');

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    if (reduceMotion) {
      el.textContent = target;
      return;
    }
    var duration = 1400;
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var t = Math.min((ts - start) / duration, 1);
      el.textContent = Math.round((1 - Math.pow(1 - t, 3)) * target);
      if (t < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { counterObserver.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = el.getAttribute('data-target'); });
  }
});
