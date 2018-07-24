module.exports = {
  plugins: {
    'postcss-cssnext': {
      browsers: ['last 2 version', 'Safari 7', 'ie 10']
    },
    'css-declaration-sorter': {
      order: 'concentric-css'
    },
    'css-mqpacker': {}
  }
}
