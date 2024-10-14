const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const entry = {
  index: ['./index.tsx']
};

const rules = [
  {
    test: /\.(js|ts)?$/,
    loader: 'esbuild-loader',
    options: {
      target: 'es2015'
    }
  },
  {
    test: /\.(jsx|tsx)?$/,
    loader: 'esbuild-loader',
    options: {
      loader: 'tsx',
      target: 'es2015'
    }
  },
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
  },
  {
    test: /\.(png|jp(e*)g|svg|gif)$/,
    type: 'asset/resource'
  }
];

module.exports = {
  bail: true,
  target: ['web', 'es5'],
  context: path.resolve('./src'),
  entry,
  output: {
    filename: '[name].js',
    path: path.resolve('dist')
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.css', '.html']
  },
  module: {
    rules
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Coordinagent',
      filename: 'index.html',
      template: './index.html',
      chunks: ['index']
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '../assets',
          to: 'assets',
          globOptions: {
            ignore: ['*.scss', '*.js', '*.json']
          }
        }
      ]
    }),
    new Dotenv({
      systemvars: true,
      path: path.resolve(__dirname, '..', '.env')
    })
  ]
};
