// ####################### REQUIRES ####################### //
const path = require('./path.config.js')
const HTMLWebpackPlugin = require('html-webpack-plugin')        // собрать HTML в dist
const {CleanWebpackPlugin} = require('clean-webpack-plugin')    // удаляет старые экземпляры файлов при сборке
const CopyWebpackPlugin = require('copy-webpack-plugin')        // просто копирует какие-то файлы
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // отделяет css от js в отдельный файл при сборке
const OptimiseCssWebpackAssetsPlugin = require('optimize-css-assets-webpack-plugin') // для минификации css
const TerserWebpackPlugin = require('terser-webpack-plugin')    //


// ####################### PRODUCTION/DEV MODE VARIABLES ####################### //
const devMode = process.env.NODE_ENV === 'development'
const vars = {
  hotModuleReload: false,

  minify: {
    collapseWhitespace: true
  },

  minimizer: [
    new OptimiseCssWebpackAssetsPlugin(),
    new TerserWebpackPlugin()
  ]
}

if (devMode) {
  vars.hotModuleReload = true
  vars.minify = false
  vars.minimizer = []
}



// ############ //
module.exports = {


  // ####################### ENTRY / OUTPUT ####################### //
  mode: 'development',
  entry: {
    main: path.js.index,
    analytics: path.js.analytics
  },
  output: {
    filename: path.js.output,
    path: path.root
  },



  // ####################### OPTIMIZATION ####################### //
  optimization: {
    // отделяет одинаковый код из js-файлов в отдельный файл
    splitChunks: {
      chunks: 'all'
    },
    minimizer:
      vars.minimizer
  },



  // ####################### EXT / ALIAS ####################### //
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.xml',
      '.css'
    ],
    alias: {
      '@components': path.alias.components,
      '@images': path.alias.images,
      '@styles': path.alias.styles,

      '@cssBlocks': path.alias.cssBlocks,
      '@cssVar': path.alias.cssVar,

      '@json': path.alias.json,
      '@xml': path.alias.xml
    }
  },


  // ####################### PLUGINS ####################### //
  plugins: [
    // в этот файл будут подключены все js и css
    new HTMLWebpackPlugin({
      template: path.html.index,
      minify: vars.minify
    }),

    // удаляет старые экземпляры файлов
    new CleanWebpackPlugin(),

    // просто копирует какие-то файлы
    new CopyWebpackPlugin({
      patterns: [
        {from: path.favicon.icon, to: path.favicon.output}
      ],
    }),

    // отделяет css от js и сохраняет в отдельный файл
    new MiniCssExtractPlugin({
      filename: path.css.output
    })
  ],


  // ####################### LOADERS ####################### //
  module: {
    rules: [

      // css
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // hot module reload
              hmr: vars.hotModuleReload,
              reloadAll: true
            }
          },
          {loader: 'css-loader'}
        ]
      },

      // images
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          publicPath: '../../',
          name: path.images.output
        }
      },

      // fonts
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          publicPath: '../../',
          name: path.font.output
        }
      },

      // xml
      {
        test: /\.xml$/,
        exclude: /node_modules/,
        use: ['xml-loader']
      }

    ]
  },


  // ####################### DEV-SERVER ####################### //
  devServer: {
    port: 4200,

    // hot module reload
    hot: vars.hotModuleReload
  }
}