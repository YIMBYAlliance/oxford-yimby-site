const nav = document.getElementById('nav')
const navToggle = document.getElementById('nav-toggle')
const mobileMenu = document.getElementById('mobile-menu')

if (nav) {
  const updateNav = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60)
  }
  window.addEventListener('scroll', updateNav, { passive: true })
  updateNav()
}

// Mobile menu — only present on pages that have the toggle + menu
if (navToggle && mobileMenu) {
  const setMenuOpen = (open) => {
    mobileMenu.classList.toggle('active', open)
    document.body.classList.toggle('menu-open', open)
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false')
  }

  navToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('active')
    setMenuOpen(!isOpen)
  })

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false))
  })

  // Close on Escape — keyboard accessibility
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      setMenuOpen(false)
      navToggle.focus()
    }
  })
}

// Smooth scroll for anchor links (handles offset for fixed nav)
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href')
    if (!href || href === '#') return
    const target = document.querySelector(href)
    if (target) {
      e.preventDefault()
      const offset = nav.offsetHeight + 20
      const top = target.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  })
})
