const nav = document.getElementById('nav')
const navToggle = document.getElementById('nav-toggle')
const mobileMenu = document.getElementById('mobile-menu')

function updateNav() {
  nav.classList.toggle('scrolled', window.scrollY > 60)
}

window.addEventListener('scroll', updateNav, { passive: true })
updateNav()

navToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('active')
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : ''
})

mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active')
    document.body.style.overflow = ''
  })
})

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href')
    if (href === '#') return
    const target = document.querySelector(href)
    if (target) {
      e.preventDefault()
      const offset = nav.offsetHeight + 20
      const top = target.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  })
})
