const path = require('path')
const devMode = process.env.NODE_ENV === 'development'

module.exports = {
  root: path.resolve(__dirname, devMode ? 'dist' : 'production'),
  src : path.resolve(__dirname, 'src'),

  alias : {
    components: path.resolve(__dirname, 'src/assets/javascript/components'),
    styles    : path.resolve(__dirname, 'src/assets/styles'),
    images    : path.resolve(__dirname, 'src/assets/images'),

    cssBlocks : path.resolve(__dirname, 'src/assets/styles/blocks'),
    cssVar    : path.resolve(__dirname, 'src/assets/styles/_var.css'),

    json      : path.resolve(__dirname, 'src/assets/json'),
    xml       : path.resolve(__dirname, 'src/assets/xml')
  },

  html: {
    index : path.resolve(__dirname, 'src', 'index.html'),
    src   : path.resolve(__dirname, 'src')
  },

  favicon: {
    icon      : path.resolve(__dirname, 'src', 'favicon.ico'),
    output    : path.resolve(__dirname, 'dist')
  },

  images: {
    output    : './assets/images/[name].[contenthash].[ext]'
  },

  font: {
    output    : './assets/fonts/[name].[contenthash].[ext]'
  },

  css : {
    output    : './assets/css/[name].[contenthash].css'
  },

  js  : {
    index     : path.resolve(__dirname, 'src/assets/javascript', 'index.js'),
    analytics : path.resolve(__dirname, 'src/assets/javascript', 'analytics.js'),
    src       : path.resolve(__dirname, 'src/assets/javascript'),
    output    : './assets/js/[name].[contenthash].js'
  }
}