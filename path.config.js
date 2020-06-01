const path = require('path')

module.exports = {
  dist: path.resolve(__dirname, 'dist'),
  src : path.resolve(__dirname, 'src'),

  dev : {
    components: path.resolve(__dirname, 'src/assets/javascript/components'),
    styles    : path.resolve(__dirname, 'src/assets/styles'),
    images    : path.resolve(__dirname, 'src/assets/images'),
    cssBlocks : path.resolve(__dirname, 'src/assets/styles/blocks'),
    cssVar    : path.resolve(__dirname, 'src/assets/styles/_var.css')
  },

  html: {
    index : path.resolve(__dirname, 'src', 'index.html'),
    src   : path.resolve(__dirname, 'src')
  },

  images: {
    output    : './assets/images/[name].[contenthash].[ext]'
  },

  font: {
    output    : './assets/fonts/[name].[contenthash].[ext]'
  },

  js  : {
    index     : path.resolve(__dirname, 'src/assets/javascript', 'index.js'),
    analytics : path.resolve(__dirname, 'src/assets/javascript', 'analytics.js'),
    src       : path.resolve(__dirname, 'src/assets/javascript'),
    output    : './assets/js/[name].[contenthash].js'
  }
}