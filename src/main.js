// Self-hosted Lato — Vite bundles each weight as a separate hashed asset
import '@fontsource/lato/300.css'
import '@fontsource/lato/400.css'
import '@fontsource/lato/700.css'
import '@fontsource/lato/900.css'

import './style.css'
import Chart from 'chart.js/auto'

/* ==========================================================================
   Oxford YIMBY : Main JavaScript (Mark III Logic)
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
    var isOpen = mobileMenu.classList.contains('active');
    document.body.style.overflow = isOpen ? 'hidden' : '';
    navToggle.setAttribute('aria-expanded', String(isOpen));
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
      var current = Math.round(target * easeOutExpo(progress))
      el.textContent = current.toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  var counters = document.querySelectorAll('[data-count]');
  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target)
        counterObserver.unobserve(entry.target)
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function (c) { counterObserver.observe(c); });

  // ========================================================================
  // Chart.js Shared Config
  // ========================================================================

  // Brand colors
  var TEAL = '#73AB96';
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
  // Chart 1: Rent Trends
  // ========================================================================

  function createRentChart() {
    var ctx = document.getElementById('chart-rent');
    if (!ctx) return;
    var context = ctx.getContext('2d');

    var gradient = context.createLinearGradient(0, 0, 0, 320);
    gradient.addColorStop(0, 'rgba(115, 171, 150, 0.3)');
    gradient.addColorStop(0.7, 'rgba(115, 171, 150, 0.05)');
    gradient.addColorStop(1, 'rgba(115, 171, 150, 0)');

    var labels = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026'];
    var rentData = [1391, 1429, 1516, 1545, 1584, 1630, 1635, 1646, 1732, 1806, 1923];

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
            borderWidth: 4,
            pointRadius: 4,
            pointBackgroundColor: TEAL,
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: TEAL,
            pointHoverBorderColor: '#fff',
            pointHoverBorderWidth: 3,
            fill: true,
            tension: 0.2
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
            min: 1300,
            max: 2000
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (ctx) {
                return 'Rent: \u00A3' + ctx.raw.toLocaleString() + '/mo';
              }
            }
          },
          legend: {
            display: false
          }
        },
        animation: { duration: 1800, easing: 'easeOutQuart' }
      }
    });
  }

  // ========================================================================
  // Chart 2: City Comparison
  // ========================================================================

  function createCitiesChart() {
    var ctx = document.getElementById('chart-cities');
    if (!ctx) return;

    var cities = ['Oxford', 'London', 'Bristol', 'Cardiff', 'Manchester', 'Birmingham', 'Leeds', 'Newcastle', 'Liverpool', 'UK Average'];
    var ratios = [11.0, 12.0, 8.6, 7.0, 6.5, 6.0, 6.4, 5.4, 4.4, 8.0];

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
  // Chart 3: Supply Gap
  // ========================================================================

  function createSupplyChart() {
    var ctx = document.getElementById('chart-supply');
    if (!ctx) return;
    var context = ctx.getContext('2d');

    var neededGradient = context.createLinearGradient(0, 0, 0, 300);
    neededGradient.addColorStop(0, 'rgba(115, 171, 150, 0.2)');
    neededGradient.addColorStop(1, 'rgba(115, 171, 150, 0.05)');

    var labels = ['2016/17', '2017/18', '2018/19', '2019/20', '2020/21', '2021/22', '2022/23', '2023/24', '2024/25'];
    var needed = [1300, 1300, 1300, 1300, 1300, 1300, 1300, 1300, 1300];
    var built = [419, 367, 358, 790, 711, 581, 554, 365, 272];

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
  // City Builder - Drag & Drop
  // ========================================================================

  var placementGrid = document.getElementById('placement-grid');
  var cityReset = document.getElementById('city-reset');
  var draggedItemType = null;
  var draggedItemSVG = null;

  if (placementGrid) {
    // Create grid cells
    for (var i = 0; i < 48; i++) {
      var cell = document.createElement('div');
      cell.className = 'placement-cell';
      cell.dataset.index = i;
      placementGrid.appendChild(cell);
    }

    // Drag start from palette
    document.querySelectorAll('.palette-item').forEach(function (item) {
      item.addEventListener('dragstart', function (e) {
        draggedItemType = e.currentTarget.dataset.type;
        draggedItemSVG = e.currentTarget.querySelector('svg').cloneNode(true);
        e.dataTransfer.effectAllowed = 'copy';
      });

      item.addEventListener('dragend', function () {
        draggedItemType = null;
        draggedItemSVG = null;
      });
    });

    // Drag over cells
    placementGrid.querySelectorAll('.placement-cell').forEach(function (cell) {
      cell.addEventListener('dragover', function (e) {
        e.preventDefault();
        cell.classList.add('drag-over');
      });

      cell.addEventListener('dragleave', function () {
        cell.classList.remove('drag-over');
      });

      cell.addEventListener('drop', function (e) {
        e.preventDefault();
        cell.classList.remove('drag-over');

        if (draggedItemSVG && draggedItemType) {
          // Create placed item
          var placedItem = document.createElement('div');
          placedItem.className = 'placed-item';
          placedItem.dataset.type = draggedItemType;
          placedItem.appendChild(draggedItemSVG.cloneNode(true));

          // Clear cell and add new item
          cell.innerHTML = '';
          cell.appendChild(placedItem);
        }
      });
    });

    // Reset button
    if (cityReset) {
      cityReset.addEventListener('click', function () {
        placementGrid.querySelectorAll('.placement-cell').forEach(function (cell) {
          cell.innerHTML = '';
        });
      });
    }
  }

  // ========================================================================
  // CTA floating home icons
  // ========================================================================

  var ctaIconField = document.querySelector('.cta-icon-field');
  if (ctaIconField) {
    var iconObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          ctaIconField.classList.add('visible');
          iconObserver.unobserve(ctaIconField);
        }
      });
    }, { threshold: 0.2 });
    iconObserver.observe(ctaIconField);
  }

  // ========================================================================
  // Sign-up form proximity glow
  // ========================================================================

  var formRow = document.querySelector('.form-row');
  if (formRow) {
    document.addEventListener('mousemove', function (e) {
      var rect = formRow.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;
      var dist = Math.sqrt(Math.pow(e.clientX - cx, 2) + Math.pow(e.clientY - cy, 2));
      var maxDist = 420;
      var intensity = Math.max(0, 1 - dist / maxDist);

      var glowInner = Math.round(intensity * 80);
      var glowOuter = Math.round(intensity * 140);
      var opacityInner = (intensity * 0.75).toFixed(2);
      var opacityOuter = (intensity * 0.35).toFixed(2);
      var borderOpacity = (0.2 + intensity * 0.7).toFixed(2);

      formRow.style.boxShadow = intensity > 0
        ? '0 0 ' + glowInner + 'px rgba(115,171,150,' + opacityInner + '), 0 0 ' + glowOuter + 'px rgba(115,171,150,' + opacityOuter + ')'
        : '';
      formRow.style.borderColor = 'rgba(115,171,150,' + borderOpacity + ')';
    });
  }

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

// Inline signup handler
if (document.getElementById('mc-embedded-subscribe-form')) {
  import('./signup.js')
}
