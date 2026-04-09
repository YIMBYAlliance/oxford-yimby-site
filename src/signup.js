// Mailchimp embedded form — submitted via JSONP so the user never leaves the
// page. Mailchimp's classic /subscribe/post endpoint doesn't support CORS, but
// /subscribe/post-json does support a JSONP callback.

const form = document.getElementById('mc-embedded-subscribe-form')
const messageEl = document.getElementById('signup-message')

function showMessage(text, state) {
  if (!messageEl) return
  messageEl.textContent = text
  messageEl.dataset.state = state
}

if (form && messageEl) {
  // JS loaded — remove fallback that opens Mailchimp in a new tab
  form.removeAttribute('target')

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(form)
    const email = (formData.get('EMAIL') || '').toString().trim()

    if (!email) {
      showMessage('Please enter your email address.', 'error')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showMessage('That email address looks wrong — please check it.', 'error')
      return
    }

    showMessage('Signing you up…', 'pending')

    // Build JSONP request
    const callbackName = '__mc_cb_' + Math.random().toString(36).slice(2)
    const params = new URLSearchParams()
    for (const [k, v] of formData.entries()) {
      params.append(k, v.toString())
    }
    params.append('c', callbackName)

    const action = form.action.replace('/post?', '/post-json?')
    const url = action + (action.includes('?') ? '&' : '?') + params.toString()

    const script = document.createElement('script')

    const timeoutId = setTimeout(() => {
      cleanup()
      showMessage('Took too long to respond — please try again.', 'error')
    }, 10000)

    function cleanup() {
      clearTimeout(timeoutId)
      delete window[callbackName]
      script.remove()
    }

    window[callbackName] = (data) => {
      cleanup()
      if (data && data.result === 'success') {
        showMessage("You're in! Check your inbox to confirm your subscription.", 'success')
        form.reset()
      } else {
        const raw = (data && data.msg) || 'Something went wrong. Please try again.'
        // Mailchimp prefixes error codes like "0 - Already subscribed" — strip them
        const cleaned = raw.replace(/^\d+\s*-\s*/, '').replace(/<[^>]+>/g, '')
        showMessage(cleaned, 'error')
      }
    }

    script.onerror = () => {
      cleanup()
      showMessage('Could not reach the signup service. Please try again.', 'error')
    }

    script.src = url
    document.head.appendChild(script)
  })
}
