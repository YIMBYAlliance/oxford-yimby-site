// Self-hosted Lato — Vite bundles each weight as a separate hashed asset
import '@fontsource/lato/300.css'
import '@fontsource/lato/400.css'
import '@fontsource/lato/700.css'
import '@fontsource/lato/900.css'

import './style.css'
import './nav.js'

// Code-split modules that are only relevant on certain pages
if (document.querySelector('[data-animate], [data-count]')) {
  import('./animations.js')
}

if (document.querySelector('canvas')) {
  import('./charts.js')
}

if (document.getElementById('mc-embedded-subscribe-form')) {
  import('./signup.js')
}
