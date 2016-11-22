const webpack = require('webpack');
const path = require('path');

module.exports = {

  entry: './src/scripts/app',

  output: {
    path: path.join(__dirname, 'public', 'assets'),
    filename: 'app.js',
    publicPath: '/assets/',
  }

};