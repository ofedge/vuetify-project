const debug = process.env.NODE_ENV !== 'production'

module.exports = {
  lintOnSave: false,
  configureWebpack: config => {
    if (debug) {
      config.devtool = 'source-map'
    }
  }
}
