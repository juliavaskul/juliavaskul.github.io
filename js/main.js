// Julia Vaskul — Portfolio — shared interactions

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Sticky nav shrink on scroll ---------- */
  const nav = document.querySelector('.site-nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 40) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.style.display === 'flex';
      links.style.display = open ? 'none' : 'flex';
      links.style.flexDirection = 'column';
      links.style.position = 'fixed';
      links.style.top = '64px';
      links.style.left = '0';
      links.style.right = '0';
      links.style.background = '#fff';
      links.style.padding = '24px 5vw';
      links.style.gap = '1.2rem';
    });
  }

  /* ---------- Video click-to-play (YouTube) ---------- */
  document.querySelectorAll('.play-trigger[data-yt]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.yt;
      const wrap = btn.closest('.act-media');
      const iframe = document.createElement('iframe');
      iframe.className = 'yt-embed';
      iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&playsinline=1`;
      iframe.title = 'Video';
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
      iframe.allowFullscreen = true;
      wrap.innerHTML = '';
      wrap.appendChild(iframe);
    });
  });

  /* ---------- Photo carousels ---------- */
  document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const dotsWrap = carousel.querySelector('.carousel-dots');
    const prev = carousel.querySelector('.carousel-arrow.prev');
    const next = carousel.querySelector('.carousel-arrow.next');
    const slides = track.children.length;

    if (dotsWrap) {
      for (let i = 0; i < slides; i++) {
        const dot = document.createElement('span');
        if (i === 0) dot.classList.add('active');
        dotsWrap.appendChild(dot);
      }
    }

    const updateDots = () => {
      const idx = Math.round(track.scrollLeft / track.clientWidth);
      dotsWrap?.querySelectorAll('span').forEach((d, i) => d.classList.toggle('active', i === idx));
    };
    track.addEventListener('scroll', () => window.requestAnimationFrame(updateDots), { passive: true });

    prev?.addEventListener('click', () => track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' }));
    next?.addEventListener('click', () => track.scrollBy({ left: track.clientWidth, behavior: 'smooth' }));
  });

  /* ---------- Work page: media filter (All / Video / Photo) ---------- */
  const filterBtns = document.querySelectorAll('.media-filter button');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const type = btn.dataset.filter;
        document.querySelectorAll('.act[data-type]').forEach(act => {
          if (type === 'all' || act.dataset.type === type) act.style.display = '';
          else act.style.display = 'none';
        });
      });
    });
  }

  /* ---------- Work page: subnav smooth scroll + active highlight ---------- */
  const subnavLinks = document.querySelectorAll('.subnav a');
  if (subnavLinks.length) {
    const sections = Array.from(subnavLinks).map(a => document.querySelector(a.getAttribute('href')));
    const highlight = () => {
      let current = sections[0];
      sections.forEach(sec => {
        if (sec && window.scrollY >= sec.offsetTop - 140) current = sec;
      });
      subnavLinks.forEach(a => a.classList.toggle('active', document.querySelector(a.getAttribute('href')) === current));
    };
    window.addEventListener('scroll', highlight, { passive: true });
    highlight();
  }

  /* ---------- Projects outer carousel ---------- */
  const projCarousel = document.querySelector('.projects-carousel');
  if (projCarousel) {
    const track = projCarousel.querySelector('.projects-track');
    const slides = [...track.querySelectorAll(':scope > .act')];
    const dotsWrap = projCarousel.querySelector('.projects-dots');
    const prevBtn = projCarousel.querySelector('.projects-prev');
    const nextBtn = projCarousel.querySelector('.projects-next');
    let current = 0;

    slides.forEach((_, i) => {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });

    const goTo = (idx) => {
      current = Math.max(0, Math.min(idx, slides.length - 1));
      track.style.transform = `translateX(-${current * 100}%)`;
      dotsWrap.querySelectorAll('span').forEach((d, i) => d.classList.toggle('active', i === current));
    };

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    let touchStartX = 0, touchTarget = null;
    track.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
      touchTarget = e.target;
    }, { passive: true });
    track.addEventListener('touchend', e => {
      if (touchTarget && touchTarget.closest('.carousel')) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) goTo(current + (dx < 0 ? 1 : -1));
    }, { passive: true });
  }

  /* ---------- Deep Dive tabs ---------- */
  const ddTabs = document.querySelectorAll('.dd-tabs button');
  if (ddTabs.length) {
    ddTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        ddTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('.dd-section').forEach(s => s.style.display = 'none');
        document.querySelector(tab.dataset.target).style.display = '';
      });
    });
  }

});
