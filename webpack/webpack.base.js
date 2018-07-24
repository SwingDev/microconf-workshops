const PROD_ENV = process.env.NODE_ENV === 'production'
const ENV_FILE = process.env.ENV_FILE

const envFilePath = (ENV_FILE) ? `./.env.${ENV_FILE}` : './.env'

require('dotenv').config({
  path: envFilePath
})

const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ModernizrWebpackPlugin = require('modernizr-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const APP_DIR = path.resolve(__dirname, '..', 'src')
const BUILD_DIR = path.resolve(__dirname, '..', 'dist')

module.exports = {
  entry: [
    '@babel/polyfill',
    `${APP_DIR}/index.tsx`
  ],
  output: {
    path: BUILD_DIR,
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]'
        ]
      },
      {
        test: /\.svg$/i,
        oneOf: [{
          resourceQuery: /inline/,
          use: [
            'babel-loader',
            {
              loader: 'svgr/webpack',
              options: {
                title: false
              }
            }
          ]
        }, {
          use: 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]'
        }]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader'
      },
      {
        test: /\.hbs$/,
        loader : 'handlebars-loader',
        options: {
          knownHelpersOnly: false,
          inlineRequires: '/images/',
        },
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      images: path.resolve('./src/images'),
      styles: path.resolve('./src/styles'),
      fonts: path.resolve('./src/fonts'),
      components: path.resolve('./src/components'),
      views: path.resolve('./src/views'),
      utils: path.resolve('./src/utils'),
      root: path.resolve('./src')
    }
  },
  plugins: [
    new Dotenv({
      systemvars: true,
      path: envFilePath
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: `${APP_DIR}/index.hbs`,
      production: PROD_ENV
    }),
    new CopyWebpackPlugin([{
      from: './src/public'
    }]),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ModernizrWebpackPlugin({
      options: [
        'setClasses'
      ],
      'feature-detects': [
        'touchevents'
      ],
      filename: 'modernizr[hash]',
      noChunk: true,
      htmlWebpackPlugin: true
    })
  ],
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'all'
    }
  }
}
