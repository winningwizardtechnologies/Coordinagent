const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
  mode: 'production',
  optimization: {
    minimize: true
  },
  performance: {
    maxEntrypointSize: 5000000,
    maxAssetSize: 250000,
    hints: 'warning'
  }
});
