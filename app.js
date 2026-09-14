(function(){
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { items.forEach(function(el){ el.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  items.forEach(function(el){ io.observe(el); });
})();

(function(){
  var box = document.querySelector('.hero-skills');
  var spans = box ? Array.prototype.slice.call(box.querySelectorAll('.hero-skills-track span')) : [];
  if (!spans.length) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var lit = null;
  function visible(){
    var b = box.getBoundingClientRect();
    // keep to the un-faded middle of the masked column
    var top = b.top + b.height * 0.25, bottom = b.bottom - b.height * 0.25;
    return spans.filter(function(s){
      var r = s.getBoundingClientRect();
      return r.top >= top && r.bottom <= bottom;
    });
  }
  function tick(){
    if (lit) lit.classList.remove('lit');
    var pool = visible();
    if (pool.length) {
      lit = pool[Math.floor(Math.random() * pool.length)];
      lit.classList.add('lit');
    } else {
      lit = null;
    }
    setTimeout(tick, 1100 + Math.random() * 1600);
  }
  setTimeout(tick, 800);
})();

(function(){
  var bands = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  if (!bands.length) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var raf = null;
  function update(){
    raf = null;
    bands.forEach(function(band){
      var bg = band.querySelector('.parallax-bg, .photo-band-bg');
      if (!bg) return;
      var r = band.getBoundingClientRect();
      var mid = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
      var amp = band.classList.contains('photo-band') ? 190 : 90;
      bg.style.transform = 'translateY(' + (mid * amp).toFixed(1) + 'px)';
    });
  }
  function onScroll(){ if (!raf) raf = requestAnimationFrame(update); }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();

(function(){
  // duplicate marquee items so the loop is seamless
  document.querySelectorAll('.fig-scroll-track').forEach(function(track){
    var items = Array.prototype.slice.call(track.children);
    items.forEach(function(el){
      var c = el.cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      track.appendChild(c);
    });
  });
})();
