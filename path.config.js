const path = require('path')
const devMode = process.env.NODE_ENV === 'development'
const filename = devMode ? '[name]' : '[name].[contenthash]'
const root = devMode ? 'dist' : 'production'

module.exports = {
  root: path.resolve(__dirname, root),
  src : path.resolve(__dirname, 'src'),

  alias : {
    components: path.resolve(__dirname, 'src/assets/javascript/components'),
    styles    : path.resolve(__dirname, 'src/assets/styles'),
    images    : path.resolve(__dirname, 'src/assets/images'),

    cssBlocks : path.resolve(__dirname, 'src/assets/styles/blocks'),
    cssVar    : path.resolve(__dirname, 'src/assets/styles/_var.scss'),

    json      : path.resolve(__dirname, 'src/assets/json'),
    xml       : path.resolve(__dirname, 'src/assets/xml')
  },

  html: {
    index : path.resolve(__dirname, 'src', 'index.html'),
    src   : path.resolve(__dirname, 'src')
  },

  favicon: {
    icon      : path.resolve(__dirname, 'src', 'favicon.ico'),
    output    : path.resolve(__dirname, root)
  },

  images: {
    output    : `./assets/images/${filename}.[ext]`
  },

  font: {
    output    : `./assets/fonts/${filename}.[ext]`
  },

  css : {
    output    : `./assets/css/${filename}.css`
  },

  js  : {
    index     : path.resolve(__dirname, 'src/assets/javascript', 'index.jsx'),
    analytics : path.resolve(__dirname, 'src/assets/javascript', 'analytics.js'),
    src       : path.resolve(__dirname, 'src/assets/javascript'),
    output    : `./assets/js/${filename}.js`
  }
}