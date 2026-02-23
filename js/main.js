// ========== Click Sound ==========
function playClickSound() {
  try {
    var ctx = new (window.AudioContext || window.webkitAudioContext)();
    // Click 1
    var osc1 = ctx.createOscillator();
    var gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(1200, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);
    gain1.gain.setValueAtTime(0.3, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.1);
    // Click 2
    var osc2 = ctx.createOscillator();
    var gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1800, ctx.currentTime + 0.06);
    osc2.frequency.exponentialRampToValueAtTime(2200, ctx.currentTime + 0.12);
    gain2.gain.setValueAtTime(0, ctx.currentTime);
    gain2.gain.setValueAtTime(0.2, ctx.currentTime + 0.06);
    gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(ctx.currentTime + 0.06);
    osc2.stop(ctx.currentTime + 0.15);
  } catch (e) {}
}

// Attach sound to all nav links
document.addEventListener('DOMContentLoaded', function () {
  // Click sounds on nav links
  document.querySelectorAll('.nav-click').forEach(function (link) {
    link.addEventListener('click', playClickSound);
  });

  // Mobile toggle
  var toggle = document.getElementById('mobile-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      mobileNav.classList.toggle('open');
      toggle.textContent = mobileNav.classList.contains('open') ? '✕' : '☰';
    });
    // Close mobile nav on link click
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        toggle.textContent = '☰';
      });
    });
  }

  // Highlight active nav link
  var currentPage = window.location.pathname.split('/').pop() || 'home.html';
  document.querySelectorAll('.desktop-nav a, .mobile-nav a').forEach(function (a) {
    if (a.getAttribute('href') === currentPage) {
      a.classList.add('active');
    }
  });
});

// ========== Listings Filter ==========
function filterListings() {
  var location = document.getElementById('filter-location');
  var minPrice = document.getElementById('filter-min-price');
  var maxPrice = document.getElementById('filter-max-price');
  var bedrooms = document.getElementById('filter-bedrooms');

  if (!location) return; // not on listings page

  var locVal = location.value;
  var minVal = parseInt(minPrice.value) || 0;
  var maxVal = parseInt(maxPrice.value) || 99999999;
  var bedVal = parseInt(bedrooms.value) || 0;

  var cards = document.querySelectorAll('.property-card');
  var count = 0;

  cards.forEach(function (card) {
    var cardLoc = card.dataset.location;
    var cardPrice = parseInt(card.dataset.price);
    var cardBeds = parseInt(card.dataset.bedrooms);

    var show = true;
    if (locVal !== 'All' && cardLoc !== locVal) show = false;
    if (cardPrice < minVal || cardPrice > maxVal) show = false;
    if (bedVal > 0 && cardBeds < bedVal) show = false;

    card.style.display = show ? '' : 'none';
    if (show) count++;
  });

  var counter = document.getElementById('results-count');
  if (counter) counter.textContent = count + ' properties found';
}

// ========== Contact Form ==========
function handleContactSubmit(e) {
  e.preventDefault();
  var msg = document.getElementById('success-msg');
  if (msg) {
    msg.classList.add('show');
    e.target.reset();
    setTimeout(function () {
      msg.classList.remove('show');
    }, 4000);
  }
  return false;
}
