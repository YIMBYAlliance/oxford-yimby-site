/* ==========================================================================
   Oxford YIMBY — Main JavaScript
   ========================================================================== */

(function () {
  'use strict';

  // ========================================================================
  // Navigation
  // ========================================================================

  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('nav-toggle');
  var mobileMenu = document.getElementById('mobile-menu');

  function updateNav() {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  navToggle.addEventListener('click', function () {
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ========================================================================
  // Scroll Animations
  // ========================================================================

  var animatedElements = document.querySelectorAll('[data-animate]');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

  animatedElements.forEach(function (el) {
    observer.observe(el);
  });

  // ========================================================================
  // Animated Counters
  // ========================================================================

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var duration = 2000;
    var startTime = null;

    function easeOutExpo(t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function tick(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var current = Math.round(target * easeOutExpo(progress));
      el.textContent = current.toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  var counters = document.querySelectorAll('[data-count]');
  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function (c) { counterObserver.observe(c); });

  // ========================================================================
  // Chart.js Shared Config
  // ========================================================================

  // Brand colors
  var TEAL = '#73AB96';
  var TEAL_DARK = '#5a9480';
  var CHARCOAL = '#353741';
  var ROSE = '#BE93A3';
  var GRAY_LIGHT = '#e4e9e7';
  var GRAY_TEXT = '#6b7280';

  Chart.defaults.font.family = "'Lato', -apple-system, sans-serif";
  Chart.defaults.font.size = 13;
  Chart.defaults.color = GRAY_TEXT;
  Chart.defaults.plugins.legend.display = false;
  Chart.defaults.plugins.tooltip.backgroundColor = CHARCOAL;
  Chart.defaults.plugins.tooltip.titleFont = { weight: '700', size: 13 };
  Chart.defaults.plugins.tooltip.bodyFont = { size: 13 };
  Chart.defaults.plugins.tooltip.padding = { top: 10, bottom: 10, left: 14, right: 14 };
  Chart.defaults.plugins.tooltip.cornerRadius = 8;
  Chart.defaults.plugins.tooltip.displayColors = false;

  var chartInstances = {};

  // ========================================================================
  // Chart 1: Rent Trends (gradient fill + glow)
  // ========================================================================

  function createRentChart() {
    var ctx = document.getElementById('chart-rent');
    if (!ctx) return;

    var context = ctx.getContext('2d');

    // Gradient fill
    var gradient = context.createLinearGradient(0, 0, 0, 320);
    gradient.addColorStop(0, 'rgba(115, 171, 150, 0.3)');
    gradient.addColorStop(0.7, 'rgba(115, 171, 150, 0.05)');
    gradient.addColorStop(1, 'rgba(115, 171, 150, 0)');

    // Illustrative data — replace with verified ONS / VOA figures
    var labels = ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];
    var rentData = [1020, 1060, 1110, 1150, 1200, 1260, 1240, 1300, 1380, 1460, 1547];
    var wageMonthly = [2333, 2383, 2433, 2483, 2517, 2583, 2567, 2625, 2700, 2800, 2875];

    chartInstances.rent = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Average Monthly Rent',
            data: rentData,
            borderColor: TEAL,
            backgroundColor: gradient,
            borderWidth: 3,
            pointRadius: 0,
            pointHoverRadius: 7,
            pointHoverBackgroundColor: TEAL,
            pointHoverBorderColor: '#fff',
            pointHoverBorderWidth: 3,
            fill: true,
            tension: 0.4
          },
          {
            label: 'Average Monthly Wage (pre-tax)',
            data: wageMonthly,
            borderColor: GRAY_LIGHT,
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderDash: [6, 4],
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: GRAY_TEXT,
            pointHoverBorderColor: '#fff',
            pointHoverBorderWidth: 2,
            fill: false,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.5,
        interaction: { mode: 'index', intersect: false },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: { font: { size: 12, weight: '400' } }
          },
          y: {
            grid: { color: 'rgba(0,0,0,0.04)', drawBorder: false },
            border: { display: false },
            ticks: {
              font: { size: 12 },
              callback: function (v) { return '\u00A3' + v.toLocaleString(); }
            },
            beginAtZero: false,
            min: 800
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (ctx) {
                return ctx.dataset.label + ': \u00A3' + ctx.raw.toLocaleString() + '/mo';
              }
            }
          },
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              usePointStyle: true,
              pointStyle: 'line',
              padding: 24,
              font: { size: 12 },
              color: GRAY_TEXT
            }
          }
        },
        animation: { duration: 1800, easing: 'easeOutQuart' }
      }
    });
  }

  // ========================================================================
  // Chart 2: City Comparison (horizontal bars with gradient)
  // ========================================================================

  function createCitiesChart() {
    var ctx = document.getElementById('chart-cities');
    if (!ctx) return;

    var cities = ['Oxford', 'London', 'Cambridge', 'Bath', 'Bristol', 'Reading', 'Manchester', 'Birmingham', 'Leeds', 'UK Average'];
    var ratios = [12.1, 12.8, 11.3, 10.9, 9.2, 8.8, 7.2, 6.8, 6.4, 7.0];

    var colors = cities.map(function (city) {
      if (city === 'Oxford') return TEAL;
      if (city === 'UK Average') return ROSE;
      return GRAY_LIGHT;
    });

    chartInstances.cities = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: cities,
        datasets: [{
          data: ratios,
          backgroundColor: colors,
          borderColor: 'transparent',
          borderWidth: 0,
          borderRadius: 8,
          borderSkipped: false,
          barPercentage: 0.65,
          categoryPercentage: 0.85
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.5,
        indexAxis: 'y',
        scales: {
          x: {
            grid: { color: 'rgba(0,0,0,0.03)', drawBorder: false },
            border: { display: false },
            ticks: {
              font: { size: 12 },
              callback: function (v) { return v + 'x'; }
            },
            beginAtZero: true
          },
          y: {
            grid: { display: false },
            border: { display: false },
            ticks: {
              font: { size: 12 },
              color: function (context) {
                var label = context.tick ? context.tick.label : '';
                if (label === 'Oxford') return TEAL;
                if (label === 'UK Average') return ROSE;
                return GRAY_TEXT;
              }
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (ctx) {
                return 'Price-to-income ratio: ' + ctx.raw + 'x';
              }
            }
          }
        },
        animation: { duration: 1400, easing: 'easeOutQuart' }
      }
    });
  }

  // ========================================================================
  // Chart 3: Housing Supply Gap (gradient bars)
  // ========================================================================

  function createSupplyChart() {
    var ctx = document.getElementById('chart-supply');
    if (!ctx) return;

    var context = ctx.getContext('2d');

    // Gradient for "needed" bars
    var neededGradient = context.createLinearGradient(0, 0, 0, 300);
    neededGradient.addColorStop(0, 'rgba(115, 171, 150, 0.2)');
    neededGradient.addColorStop(1, 'rgba(115, 171, 150, 0.05)');

    var labels = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];
    var needed = [1400, 1400, 1400, 1400, 1400, 1400, 1400, 1400, 1400];
    var built = [680, 720, 810, 760, 420, 650, 780, 700, 620];

    chartInstances.supply = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Homes needed per year',
            data: needed,
            backgroundColor: neededGradient,
            borderColor: TEAL,
            borderWidth: 2,
            borderRadius: 8,
            borderSkipped: false,
            barPercentage: 0.55,
            categoryPercentage: 0.85
          },
          {
            label: 'Homes actually built',
            data: built,
            backgroundColor: ROSE,
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 8,
            borderSkipped: false,
            barPercentage: 0.55,
            categoryPercentage: 0.85
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.5,
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: { font: { size: 12 } }
          },
          y: {
            grid: { color: 'rgba(0,0,0,0.04)', drawBorder: false },
            border: { display: false },
            ticks: { font: { size: 12 }, stepSize: 400 },
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              usePointStyle: true,
              pointStyle: 'rectRounded',
              padding: 24,
              font: { size: 12 },
              color: GRAY_TEXT
            }
          },
          tooltip: {
            callbacks: {
              label: function (ctx) {
                return ctx.dataset.label + ': ' + ctx.raw.toLocaleString() + ' homes';
              }
            }
          }
        },
        animation: { duration: 1400, easing: 'easeOutQuart' }
      }
    });
  }

  // ========================================================================
  // Lazy-load charts on scroll
  // ========================================================================

  var chartCreated = { rent: false, cities: false, supply: false };

  var chartObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var id = entry.target.id;
      if (id === 'chart-rent' && !chartCreated.rent) {
        createRentChart();
        chartCreated.rent = true;
      } else if (id === 'chart-cities' && !chartCreated.cities) {
        createCitiesChart();
        chartCreated.cities = true;
      } else if (id === 'chart-supply' && !chartCreated.supply) {
        createSupplyChart();
        chartCreated.supply = true;
      }
      chartObserver.unobserve(entry.target);
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('canvas').forEach(function (c) {
    chartObserver.observe(c);
  });

  // ========================================================================
  // Smooth scroll for anchor links
  // ========================================================================

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var offset = nav.offsetHeight + 20;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

})();
