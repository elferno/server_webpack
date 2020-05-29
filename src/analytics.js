function CreateAnalytics() {
  this.counter = 0
  this.destroyed = false
  this.listener = () => this.counter++

  document.addEventListener('click', this.listener)
}

CreateAnalytics.prototype = {
  destroy() {
    document.removeEventListener('click', this.listener)
    this.destroyed = true
  },

  getClicks() {
    if (this.destroyed) return 'Analytics is destroyed'
    return this.counter
  }
}

window.analytics = new CreateAnalytics()