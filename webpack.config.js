const path = require('./path.config.js')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  context: path.src,
  mode: 'development',
  entry: {
    main: path.js.index,
    analytics: path.js.analytics
  },
  output: {
    filename: path.js.output,
    path: path.dist
  },
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.css'
    ],
    alias: {
      '@components': path.dev.components,
      '@images': path.dev.images,
      '@styles': path.dev.styles,

      '@cssBlocks': path.dev.cssBlocks,
      '@cssVar': path.dev.cssVar,

      '@': path.src
    }
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.html.index
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [

      // css
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },

      // images
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: path.images.output
        }
      },

      // fonts
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        loader: 'file-loader',
        options: {
          name: path.font.output
        }
      },

      // xml
      {
        test: /\.xml$/,
        use: ['xml-loader']
      }

    ]
  }
}