const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Scroll-triggered visibility animations
const animatedElements = document.querySelectorAll('[data-animate]')

if (prefersReducedMotion) {
  // Skip the animation, just reveal everything immediately so the CSS opacity:0 doesn't hide content
  animatedElements.forEach((el) => el.classList.add('visible'))
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
  )

  animatedElements.forEach((el) => observer.observe(el))
}

// Animated counters
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'), 10)

  if (prefersReducedMotion) {
    el.textContent = target.toLocaleString()
    return
  }

  const duration = 2000
  let startTime = null

  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
  }

  function tick(timestamp) {
    if (!startTime) startTime = timestamp
    const progress = Math.min((timestamp - startTime) / duration, 1)
    const current = Math.round(target * easeOutExpo(progress))
    el.textContent = current.toLocaleString()
    if (progress < 1) requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)
}

const counters = document.querySelectorAll('[data-count]')

if (prefersReducedMotion) {
  counters.forEach(animateCounter)
} else {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target)
          counterObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 }
  )

  counters.forEach((c) => counterObserver.observe(c))
}
