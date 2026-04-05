// ── Image seeds (picsum.photos/seed/N/W/H — always returns the same real photo)
const IMG_SEEDS = {
  '🌽':237,'🐄':582,'🐐':433,'⚾':116,'🌉':894,'🏛':665,'🏆':371,
  '🌾':159,'🐝':428,'🚜':614,'🏃':339,'🎨':488,'📚':256,'🚌':199,
  '🥎':747,'🎾':823,'🏋️':65,'✍️':412,'📬':503,'🏫':354,'🚒':791,
  '🐒':101,'⛅':290,'🌤':291,'☀️':292,'🌧':293,'🌦':294,'💀':400,
  '🏀':117,'⚽':118,'🎓':355,'📅':256,'🔥':791
};

function getSeed(emoji) {
  if (!emoji) return 100;
  const e = [...emoji.trim()][0];
  if (IMG_SEEDS[e]) return IMG_SEEDS[e];
  // fallback: use codepoint as seed
  return (e.codePointAt(0) % 900) + 50;
}

function replaceImages() {
  // Card placeholders in section pages
  document.querySelectorAll('.card-img-placeholder').forEach(el => {
    const emoji = el.textContent.trim();
    const seed  = getSeed(emoji);
    const img   = document.createElement('img');
    img.src     = `https://picsum.photos/seed/${seed}/800/450`;
    img.alt     = '';
    img.className = 'card-img';
    el.parentNode.replaceChild(img, el);
  });

  // Large article hero placeholders (class hero-ph)
  document.querySelectorAll('.hero-ph').forEach(el => {
    const emoji = el.textContent.trim();
    const seed  = getSeed(emoji);
    const img   = document.createElement('img');
    img.src     = `https://picsum.photos/seed/${seed}/1200/675`;
    img.alt     = '';
    img.style.cssText = 'width:100%;display:block;border:1px solid #ddd;aspect-ratio:16/9;object-fit:cover;margin-bottom:0';
    el.parentNode.replaceChild(img, el);
  });

  // Sidebar more-thumb cells (small thumbnails)
  document.querySelectorAll('.more-thumb').forEach(el => {
    if (el.querySelector('img')) return;
    const emoji = el.textContent.trim();
    const seed  = getSeed(emoji);
    const img   = document.createElement('img');
    img.src     = `https://picsum.photos/seed/${seed}/160/120`;
    img.alt     = '';
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
    el.innerHTML = '';
    el.appendChild(img);
  });

  // Homepage inline weather / misc emoji blocks
  document.querySelectorAll('[data-img]').forEach(el => {
    const seed = parseInt(el.dataset.img, 10);
    const img  = document.createElement('img');
    img.src    = `https://picsum.photos/seed/${seed}/800/450`;
    img.alt    = '';
    img.style.cssText = 'width:100%;display:block;object-fit:cover;';
    el.parentNode.replaceChild(img, el);
  });
}

const NAV_ITEMS = [
  { label: 'Home',        href: 'news-home.html' },
  { label: 'Local',       href: 'local.html' },
  { label: 'Agriculture', href: 'agriculture.html' },
  { label: 'Schools',     href: 'schools.html' },
  { label: 'Sports',      href: 'sports.html' },
  { label: 'Opinion',     href: 'opinion.html' },
  { label: 'Weather',     href: 'weather.html' },
  { label: 'Obituaries',  href: 'obituaries.html' },
  { label: 'Classifieds', href: 'classifieds.html' },
];

const DATE_STR  = 'Sunday, April 6, 2025';
const VOL_STR   = 'Vol. XXXVIII, No. 14';
const PRICE_STR = 'Print Edition · 75¢';

function buildSite(activeHref) {
  // Inject favicon
  const _fav = document.createElement('link');
  _fav.rel = 'icon'; _fav.type = 'image/svg+xml'; _fav.href = 'favicon.svg';
  document.head.appendChild(_fav);
  const _fav2 = document.createElement('link');
  _fav2.rel = 'icon'; _fav2.type = 'image/png'; _fav2.href = 'favicon.png';
  document.head.appendChild(_fav2);

  document.addEventListener('DOMContentLoaded', replaceImages);
  // TOP BAR
  document.body.insertAdjacentHTML('afterbegin', `
    <div class="top-bar">
      <a href="news-home.html">Subscribe</a><span>|</span>
      <a href="news-home.html">e-Edition</a><span>|</span>
      <a href="obituaries.html">Obituaries</a><span>|</span>
      <a href="classifieds.html">Classifieds</a><span>|</span>
      ${DATE_STR}
    </div>
    <div class="masthead">
      <div class="masthead-kicker">Est. 1987 · Serving Harlan County Since the Beginning</div>
      <div class="masthead-name"><a href="news-home.html" style="text-decoration:none;color:inherit">The Harlan County Courier</a></div>
      <div class="masthead-sub">LOCAL NEWS · AGRICULTURE · COMMUNITY · SPORTS</div>
      <div class="masthead-meta">
        <span>${VOL_STR}</span>
        <span>${DATE_STR}</span>
        <span>${PRICE_STR}</span>
      </div>
    </div>
    <div class="nav">
      <div class="nav-inner">
        ${NAV_ITEMS.map(n => `<a href="${n.href}" class="nav-item${n.href === activeHref ? ' active' : ''}">${n.label}</a>`).join('')}
      </div>
    </div>
  `);

  // FOOTER
  document.body.insertAdjacentHTML('beforeend', `
    <div class="site-footer">
      <strong>The Harlan County Courier</strong><br/>
      114 Main Street, Harlan, KY 40831 &nbsp;·&nbsp; (606) 555-0142 &nbsp;·&nbsp; <a href="#">news@harlancouriernews.com</a><br/>
      © 2025 Harlan County Courier. All rights reserved. Reproduction without permission is prohibited.
    </div>
  `);
}
