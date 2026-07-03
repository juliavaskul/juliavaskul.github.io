// Julia Vaskul — Portfolio — shared interactions

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Sticky nav shrink on scroll ---------- */
  const nav = document.querySelector('.site-nav');
  const topFilters = document.querySelector('.top-filters');
  if (nav) {
    const onScroll = () => {
      const scrolled = window.scrollY > 40;
      nav.classList.toggle('scrolled', scrolled);
      if (topFilters) topFilters.style.top = scrolled ? '48px' : '64px';
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

  /* ---------- Work page: category tabs + media filter ---------- */
  const subnavLinks = document.querySelectorAll('.subnav a[data-cat]');
  const filterBtns  = document.querySelectorAll('.media-filter button');
  const catHeadings = document.querySelectorAll('.category-heading[id]');

  if (subnavLinks.length && catHeadings.length) {
    // Map each .act to its parent category id using DOM order
    const actCat = new Map();
    catHeadings.forEach(h => {
      let el = h.nextElementSibling;
      while (el && !el.classList.contains('category-heading')) {
        if (el.classList.contains('act')) actCat.set(el, h.id);
        el = el.nextElementSibling;
      }
    });

    let activeCat    = 'heritage-narrative';
    let activeFilter = 'all';

    function applyFilters() {
      actCat.forEach((cat, act) => {
        const show = cat === activeCat && (activeFilter === 'all' || act.dataset.type === activeFilter);
        act.style.display = show ? '' : 'none';
      });
    }

    function scrollToFirstAct() {
      requestAnimationFrame(() => {
        const firstVisible = [...actCat.keys()].find(act => act.style.display !== 'none');
        if (!firstVisible) return;
        const topFiltersEl = document.querySelector('.top-filters');
        const navH = nav && window.scrollY > 40 ? 48 : 64;
        const offset = navH + (topFiltersEl ? topFiltersEl.offsetHeight : 0);
        document.documentElement.style.scrollBehavior = 'auto';
        window.scrollTo(0, Math.max(0, firstVisible.offsetTop - offset));
        requestAnimationFrame(() => { document.documentElement.style.scrollBehavior = ''; });
      });
    }

    subnavLinks.forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        activeCat    = a.dataset.cat;
        activeFilter = 'all';
        subnavLinks.forEach(l => l.classList.toggle('active', l === a));
        filterBtns.forEach(b => b.classList.toggle('active', b.dataset.filter === 'all'));
        applyFilters();
        scrollToFirstAct();
      });
    });

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.dataset.filter;
        applyFilters();
        scrollToFirstAct();
      });
    });

    applyFilters(); // init: show only Heritage & Narrative
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
    function scrollToDDSection(section) {
      requestAnimationFrame(() => {
        const ddTabsEl = document.querySelector('.dd-tabs');
        const navH = nav && window.scrollY > 40 ? 48 : 64;
        const tabsH = ddTabsEl ? ddTabsEl.offsetHeight : 0;
        document.documentElement.style.scrollBehavior = 'auto';
        window.scrollTo(0, Math.max(0, section.offsetTop - navH - tabsH));
        requestAnimationFrame(() => { document.documentElement.style.scrollBehavior = ''; });
      });
    }

    const activateTab = (target, doScroll) => {
      const matched = [...ddTabs].find(t => t.dataset.target === target);
      if (!matched) return;
      ddTabs.forEach(t => t.classList.remove('active'));
      matched.classList.add('active');
      document.querySelectorAll('.dd-section').forEach(s => s.style.display = 'none');
      const section = document.querySelector(matched.dataset.target);
      section.style.display = '';
      if (doScroll) scrollToDDSection(section);
    };

    ddTabs.forEach(tab => {
      tab.addEventListener('click', () => activateTab(tab.dataset.target, true));
    });

    const hash = window.location.hash;
    if (hash && document.querySelector(hash)) {
      activateTab(hash, false);
    }
  }

});
