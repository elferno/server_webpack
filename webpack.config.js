// ####################### REQUIRES ####################### //
const path = require('./path.config.js')
const HTMLWebpackPlugin = require('html-webpack-plugin')        // собрать HTML в dist
const {CleanWebpackPlugin} = require('clean-webpack-plugin')    // удаляет старые экземпляры файлов при сборке
const CopyWebpackPlugin = require('copy-webpack-plugin')        // просто копирует какие-то файлы
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // отделяет CSS от JS в отдельный файл при сборке
const OptimiseCssWebpackAssetsPlugin = require('optimize-css-assets-webpack-plugin') // для минификации CSS
const TerserWebpackPlugin = require('terser-webpack-plugin')    // для минификации JS



// ####################### PRODUCTION/DEV MODE VARIABLES ####################### //
const devMode = process.env.NODE_ENV === 'development'
const vars = {
  devtool: '',

  // javascript loader
  jsLoader: [
    { loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties']
      }
    }
  ],

  // горячая перезагрузка модулей
  hotModuleReload: false,

  // минификация HTML
  minifyHTML: {
    collapseWhitespace: true
  },

  // минификация CSS и JS
  minifyJSnCSS: [
    new OptimiseCssWebpackAssetsPlugin(),
    new TerserWebpackPlugin()
  ]
}

if (devMode) {
  vars.jsLoader.push( {loader: 'eslint-loader'} )
  vars.devtool = 'inline-source-map'
  vars.hotModuleReload = true
  vars.minifyHTML = false
  vars.minifyJSnCSS = []
}

// список директориев, которые не надо парсить в поисках файлов для обработки
const exclude = [/dist/, /production/, /node_modules/]





// ############ //
module.exports = {


  // ####################### ENTRY / OUTPUT ####################### //
  mode: 'development',
  entry: {
    // когда собираем "main" - так же пользуемся babel-полифилом
    main: ['@babel/polyfill', path.js.index],
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
      vars.minifyJSnCSS
  },



  // ####################### EXT / ALIAS ####################### //
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.xml',
      '.scss'
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
      minify: vars.minifyHTML
    }),

    // удаляет старые экземпляры файлов
    new CleanWebpackPlugin(),

    // просто копирует какие-то файлы
    new CopyWebpackPlugin({
      patterns: [
        { from: path.favicon.icon, to: path.favicon.output }
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
      // sass, scss
      {
        test: /\.s[a|c]ss$/,
        exclude: exclude,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // hot module reload
              hmr: vars.hotModuleReload,
              reloadAll: true
            }
          },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      },

      // images
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: exclude,
        loader: 'file-loader',
        options: {
          esModule: false,
          path: path.root,
          publicPath: path.host,
          name: path.images.output
        }
      },

      // fonts
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        exclude: exclude,
        loader: 'file-loader',
        options: {
          path: path.root,
          publicPath: '../../',
          name: path.font.output
        }
      },

      // xml
      {
        test: /\.xml$/,
        exclude: /node_modules/,
        use: ['xml-loader']
      },

      // js
      {
        test: /\.js$/,
        exclude: exclude,
        use: vars.jsLoader,

      },

      // react
      {
        test: /\.jsx$/,
        exclude: exclude,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      }

    ]
  },


  // ####################### DEV-SERVER ####################### //
  devtool: vars.devtool,
  devServer: {
    port: 8000,
    // hot module reload
    hot: vars.hotModuleReload
  }
}