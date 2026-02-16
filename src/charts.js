import Chart from 'chart.js/auto'

// Brand colors
const TEAL = '#73AB96'
const CHARCOAL = '#353741'
const ROSE = '#BE93A3'
const GRAY_LIGHT = '#e4e9e7'
const GRAY_TEXT = '#6b7280'

// Chart.js defaults
Chart.defaults.font.family = "'Lato', -apple-system, sans-serif"
Chart.defaults.font.size = 13
Chart.defaults.color = GRAY_TEXT
Chart.defaults.plugins.legend.display = false
Chart.defaults.plugins.tooltip.backgroundColor = CHARCOAL
Chart.defaults.plugins.tooltip.titleFont = { weight: '700', size: 13 }
Chart.defaults.plugins.tooltip.bodyFont = { size: 13 }
Chart.defaults.plugins.tooltip.padding = { top: 10, bottom: 10, left: 14, right: 14 }
Chart.defaults.plugins.tooltip.cornerRadius = 8
Chart.defaults.plugins.tooltip.displayColors = false

function createRentChart() {
  const ctx = document.getElementById('chart-rent')
  if (!ctx) return
  const context = ctx.getContext('2d')

  const gradient = context.createLinearGradient(0, 0, 0, 320)
  gradient.addColorStop(0, 'rgba(115, 171, 150, 0.3)')
  gradient.addColorStop(0.7, 'rgba(115, 171, 150, 0.05)')
  gradient.addColorStop(1, 'rgba(115, 171, 150, 0)')

  const labels = ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024']
  const rentData = [1020, 1060, 1110, 1150, 1200, 1260, 1240, 1300, 1380, 1460, 1547]
  const wageMonthly = [2333, 2383, 2433, 2483, 2517, 2583, 2567, 2625, 2700, 2800, 2875]

  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
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
          tension: 0.4,
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
          tension: 0.4,
        },
      ],
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
          ticks: { font: { size: 12, weight: '400' } },
        },
        y: {
          grid: { color: 'rgba(0,0,0,0.04)', drawBorder: false },
          border: { display: false },
          ticks: {
            font: { size: 12 },
            callback: (v) => '\u00A3' + v.toLocaleString(),
          },
          beginAtZero: false,
          min: 800,
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (ctx) => ctx.dataset.label + ': \u00A3' + ctx.raw.toLocaleString() + '/mo',
          },
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            usePointStyle: true,
            pointStyle: 'line',
            padding: 24,
            font: { size: 12 },
            color: GRAY_TEXT,
          },
        },
      },
      animation: { duration: 1800, easing: 'easeOutQuart' },
    },
  })
}

function createCitiesChart() {
  const ctx = document.getElementById('chart-cities')
  if (!ctx) return

  const cities = ['Oxford', 'London', 'Cambridge', 'Bath', 'Bristol', 'Reading', 'Manchester', 'Birmingham', 'Leeds', 'UK Average']
  const ratios = [12.1, 12.8, 11.3, 10.9, 9.2, 8.8, 7.2, 6.8, 6.4, 7.0]

  const colors = cities.map((city) => {
    if (city === 'Oxford') return TEAL
    if (city === 'UK Average') return ROSE
    return GRAY_LIGHT
  })

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: cities,
      datasets: [
        {
          data: ratios,
          backgroundColor: colors,
          borderColor: 'transparent',
          borderWidth: 0,
          borderRadius: 8,
          borderSkipped: false,
          barPercentage: 0.65,
          categoryPercentage: 0.85,
        },
      ],
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
            callback: (v) => v + 'x',
          },
          beginAtZero: true,
        },
        y: {
          grid: { display: false },
          border: { display: false },
          ticks: {
            font: { size: 12 },
            color: (context) => {
              const label = context.tick ? context.tick.label : ''
              if (label === 'Oxford') return TEAL
              if (label === 'UK Average') return ROSE
              return GRAY_TEXT
            },
          },
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (ctx) => 'Price-to-income ratio: ' + ctx.raw + 'x',
          },
        },
      },
      animation: { duration: 1400, easing: 'easeOutQuart' },
    },
  })
}

function createSupplyChart() {
  const ctx = document.getElementById('chart-supply')
  if (!ctx) return
  const context = ctx.getContext('2d')

  const neededGradient = context.createLinearGradient(0, 0, 0, 300)
  neededGradient.addColorStop(0, 'rgba(115, 171, 150, 0.2)')
  neededGradient.addColorStop(1, 'rgba(115, 171, 150, 0.05)')

  const labels = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024']
  const needed = [1400, 1400, 1400, 1400, 1400, 1400, 1400, 1400, 1400]
  const built = [680, 720, 810, 760, 420, 650, 780, 700, 620]

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
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
          categoryPercentage: 0.85,
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
          categoryPercentage: 0.85,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.5,
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: { font: { size: 12 } },
        },
        y: {
          grid: { color: 'rgba(0,0,0,0.04)', drawBorder: false },
          border: { display: false },
          ticks: { font: { size: 12 }, stepSize: 400 },
          beginAtZero: true,
        },
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
            color: GRAY_TEXT,
          },
        },
        tooltip: {
          callbacks: {
            label: (ctx) => ctx.dataset.label + ': ' + ctx.raw.toLocaleString() + ' homes',
          },
        },
      },
      animation: { duration: 1400, easing: 'easeOutQuart' },
    },
  })
}

// Lazy-load charts on scroll
const chartCreated = { rent: false, cities: false, supply: false }

const chartObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      const id = entry.target.id
      if (id === 'chart-rent' && !chartCreated.rent) {
        createRentChart()
        chartCreated.rent = true
      } else if (id === 'chart-cities' && !chartCreated.cities) {
        createCitiesChart()
        chartCreated.cities = true
      } else if (id === 'chart-supply' && !chartCreated.supply) {
        createSupplyChart()
        chartCreated.supply = true
      }
      chartObserver.unobserve(entry.target)
    })
  },
  { threshold: 0.2 }
)

document.querySelectorAll('canvas').forEach((c) => chartObserver.observe(c))
