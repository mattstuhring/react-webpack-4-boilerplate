const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  entry: {
    server: './src/server/main-server.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'server-bundle.js'
  },
  target: 'node',
  node: {
    __dirname: false
  },
  externals: [nodeExternals()]
}
