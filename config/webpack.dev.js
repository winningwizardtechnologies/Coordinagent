const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const FS = require('fs');
const PATH = require('path');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    compress: false,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    server: {
      type: 'https',
      options: {
        key: FS.readFileSync(
          PATH.resolve(__dirname, './cert/localhost-key.pem')
        ),
        cert: FS.readFileSync(PATH.resolve(__dirname, './cert/localhost.pem'))
      }
    },
    hot: true,
    open: true
  },
  optimization: {
    runtimeChunk: 'single'
  },
  performance: {
    maxEntrypointSize: 10000000,
    maxAssetSize: 250000,
    hints: false
  }
});
