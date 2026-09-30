(function () {
  'use strict';
  var C = CONFIG, $ = function (id) { return document.getElementById(id); };
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text) e.textContent = text; return e; }

  // --- Hero ---
  document.title = C.slogan || document.title;
  $('groupName').textContent = C.groupName || '';
  $('slogan').textContent = C.slogan || '';
  $('sloganVi').textContent = C.sloganVi || '';
  $('groupImg').src = C.groupPhoto;
  $('groupCap').textContent = C.groupCaption || '';
  $('footer').textContent = C.footer || '';

  // --- Lời nhắn fan ---
  if (C.fan && C.fan.message) {
    $('fanMsg').textContent = C.fan.message;
    $('fanBy').textContent = '— ' + (C.fan.name || '') + (C.fan.date ? ' · ' + C.fan.date : '');
    $('fanSec').hidden = false;
  }

  // --- Nhạc ---
  var m = C.music || {}, box = $('music');
  var yt = (m.youtube || '').match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  var sp = (m.spotify || '').match(/open\.spotify\.com\/(?:intl-[a-z]+\/)?(track|album|playlist)\/([A-Za-z0-9]+)/);
  if (m.src) {
    var audio = new Audio(); audio.preload = 'none'; audio.src = m.src;
    var row = el('div', 'player'), btn = el('button', 'player__btn', '▶'), info = el('div', 'player__info');
    btn.type = 'button'; btn.setAttribute('aria-label', 'Phát / dừng');
    var bar = el('input'); bar.type = 'range'; bar.min = 0; bar.max = 1000; bar.value = 0; bar.setAttribute('aria-label', 'Tua nhạc');
    info.appendChild(el('div', 'player__title', m.title || 'Bài hát'));
    info.appendChild(el('div', 'player__artist', m.artist || ''));
    info.appendChild(bar); row.appendChild(btn); row.appendChild(info); box.appendChild(row);
    btn.addEventListener('click', function () { audio.paused ? audio.play() : audio.pause(); });
    audio.addEventListener('play', function () { btn.textContent = '❚❚'; });
    audio.addEventListener('pause', function () { btn.textContent = '▶'; });
    audio.addEventListener('ended', function () { btn.textContent = '▶'; bar.value = 0; });
    audio.addEventListener('timeupdate', function () { if (audio.duration) bar.value = audio.currentTime / audio.duration * 1000; });
    bar.addEventListener('input', function () { if (audio.duration) audio.currentTime = bar.value / 1000 * audio.duration; });
  } else if (yt) {
    var f = el('iframe', 'embed embed--yt'); f.loading = 'lazy'; f.title = m.title || 'YouTube';
    f.src = 'https://www.youtube-nocookie.com/embed/' + yt[1]; f.allow = 'autoplay; encrypted-media; picture-in-picture'; f.allowFullscreen = true;
    box.appendChild(f);
  } else if (sp) {
    var s = el('iframe', 'embed'); s.loading = 'lazy'; s.height = sp[1] === 'track' ? 152 : 352; s.title = m.title || 'Spotify';
    s.src = 'https://open.spotify.com/embed/' + sp[1] + '/' + sp[2]; s.allow = 'encrypted-media';
    box.appendChild(s);
  } else {
    box.appendChild(el('p', 'empty', '🎵 Bài nhạc của bạn sẽ hiện ở đây (điền mục music trong CONFIG)'));
  }

  // --- Hiện dần khi cuộn ---
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px' }) : null;
  function reveal(n) { io ? io.observe(n) : n.classList.add('in'); }

  // --- Tường lời nhắn ---
  (C.wall || []).forEach(function (w) {
    var n = el('div', 'note'); n.appendChild(el('p', '', w.text)); n.appendChild(el('small', '', '— ' + w.name));
    $('wall').appendChild(n); reveal(n);
  });
  if ((C.wall || []).length) $('wallSec').hidden = false;

  // --- Ảnh: nhóm, thành viên, khung ảnh (mỗi nhóm là 1 danh sách riêng trong lightbox) ---
  var norm = function (p) { return typeof p === 'string' ? { src: p, caption: '' } : { src: p.src, caption: p.caption || '' }; };
  var photos = [];

  var groupList = [{ src: C.groupPhoto, caption: C.groupCaption || '' }];
  $('groupBtn').addEventListener('click', function () { photos = groupList; openLB(0, $('groupBtn')); });

  var mem = C.members || [];
  var memList = mem.map(function (m) { return { src: m.photo, caption: m.name + (m.sub ? ' · ' + m.sub : '') }; });
  mem.forEach(function (m, i) {
    var b = el('button', 'member'); b.type = 'button'; b.setAttribute('aria-label', 'Xem ảnh ' + m.name);
    var im = el('img'); im.src = m.photo; im.alt = m.name; im.loading = 'lazy'; im.decoding = 'async';
    var nm = el('span', 'member__name', m.name);
    if (m.sub) nm.appendChild(el('span', 'member__sub', m.sub));
    b.appendChild(im); b.appendChild(el('span', 'member__no', String(i + 1).padStart(2, '0'))); b.appendChild(nm);
    b.addEventListener('click', function () { photos = memList; openLB(i, b); });
    $('memberGrid').appendChild(b); reveal(b);
  });
  if (mem.length) $('membersSec').hidden = false;

  var frames = (C.gallery || []).map(norm);
  var filled = frames.filter(function (p) { return p.src; });
  frames.forEach(function (p, i) {
    if (!p.src) { // khung trống: chờ bạn đặt ảnh vào
      var e = el('div', 'frame frame--empty'); e.appendChild(el('span', 'frame__plus', '+')); e.appendChild(el('span', '', p.caption || 'Ảnh của bạn'));
      $('gallery').appendChild(e); reveal(e); return;
    }
    var b = el('button', 'frame'); b.type = 'button'; b.setAttribute('aria-label', 'Xem ảnh ' + (i + 1));
    var im = el('img'); im.src = p.src; im.alt = p.caption || 'Ảnh kỷ niệm ' + (i + 1); im.loading = 'lazy'; im.decoding = 'async';
    b.appendChild(im); if (p.caption) b.appendChild(el('span', 'frame__cap', p.caption));
    b.addEventListener('click', function () { photos = filled; openLB(filled.indexOf(p), b); });
    $('gallery').appendChild(b); reveal(b);
  });
  if (frames.length) $('gallerySec').hidden = false;

  var lb = $('lb'), img = $('lbImg'), cur = 0, opener = null, x0 = 0, y0 = 0;
  function show(i) {
    cur = (i + photos.length) % photos.length;
    img.src = photos[cur].src; img.alt = photos[cur].caption; $('lbCap').textContent = photos[cur].caption;
    $('lbC').textContent = (cur + 1) + ' / ' + photos.length;
  }
  function openLB(i, from) { opener = from; show(i); lb.hidden = false; document.body.classList.add('lock'); $('lbX').focus(); }
  function closeLB() { lb.hidden = true; document.body.classList.remove('lock'); if (opener) opener.focus(); }
  $('lbX').onclick = closeLB;
  $('lbP').onclick = function () { show(cur - 1); };
  $('lbN').onclick = function () { show(cur + 1); };
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLB(); });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLB(); else if (e.key === 'ArrowLeft') show(cur - 1); else if (e.key === 'ArrowRight') show(cur + 1);
  });
  lb.addEventListener('touchstart', function (e) { x0 = e.changedTouches[0].clientX; y0 = e.changedTouches[0].clientY; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) show(dx < 0 ? cur + 1 : cur - 1);
  }, { passive: true });
})();
