const path = require('path')
const fs = require('fs')
const merge = require('webpack-merge')
const ManifestPlugin = require('webpack-manifest-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminJpegoptim = require('imagemin-jpegoptim')

const base = require('./webpack.base')
const APP_DIR = path.resolve(__dirname, '..', 'src')
const BUILD_DIR = path.resolve(__dirname, '..', 'dist')

const extractStyles = new ExtractTextPlugin({
  filename: 'styles.[md5:contenthash:hex:8].css',
  ignoreOrder: true,
  allChunks: true,
})

module.exports = merge(base, {
  devtool: 'source-map',
  mode: 'production',
  output: {
    path: BUILD_DIR,
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /src\/(.*)\.s?css$/,
        use: extractStyles.extract({
          fallback: 'style-loader?sourceMap',
          use: [
            {
              loader: 'css-loader',
              options: {
                localIdentName: '[hash:base64:6]',
                modules: true,
                importLoaders: 1,
                minimize: {
                  discardComments: {
                    removeAll: true
                  }
                },
                sourceMap: true
              }
            },
            'postcss-loader?sourceMap',
            'resolve-url-loader?sourceMap',
            'sass-loader?sourceMap'
          ]
        })
      },
      {
        test: /node_modules\/(.*)\.s?css$/,
        exclude: /src\/(.*)\.scss$/,
        use: extractStyles.extract({
          fallback: 'style-loader?sourceMap',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: {
                  discardComments: {
                    removeAll: true
                  }
                },
                sourceMap: true
              }
            },
            'postcss-loader?sourceMap',
            'resolve-url-loader?sourceMap',
            'sass-loader?sourceMap'
          ]
        })
      }
    ]
  },
  plugins: [
    extractStyles,
    new ManifestPlugin({
      fileName: path.resolve(__dirname, '..', 'dist', 'rev-manifest.json')
    }),
    new ImageminPlugin({
      optipng: null,
      jpegtran: null,
      gifsicle: null,
      pngquant: {
        speed: 2
      },
      svgo: null,
      plugins: [
        imageminJpegoptim({
          max: 85,
          progressive: true
        })
      ]
    }),
    function () {
      this.plugin('done', (stats) => {
        if (stats.compilation.errors && stats.compilation.errors.length) {
          console.log(stats.compilation.errors)
          process.exit(1)
        }

        const PUBLIC_PATH = path.resolve(__dirname, '..', 'src', 'public')
        const MANIFEST_PATH = path.resolve(__dirname, '..', 'dist')
        const files = fs.readdirSync(PUBLIC_PATH)
        const filteredFiles = files.filter(file => !/^\./.test(file))


        fs.writeFileSync(
          `${MANIFEST_PATH}/public-manifest.json`,
          JSON.stringify(filteredFiles)
        )
      })
    }
  ]
});
