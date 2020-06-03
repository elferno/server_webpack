import * as $ from 'jquery'

function CreateAnalytics() {
  this.counter = 0
  this.destroyed = false
  this.listener = () => this.counter++

  $(document).on('click', this.listener)
}

CreateAnalytics.prototype = {
  destroy() {
    $(document).off('click', this.listener)
    this.destroyed = true
  },

  getClicks() {
    if (this.destroyed) return `Analytics is destroyed. Total counter was: ${this.counter}`
    return this.counter
  }
}

window.analytics = new CreateAnalytics()