const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const bootstrapEntryPoints = require('./webpack.bootstrap.config.js');

// eslint-disable-next-line no-console
console.log(`=> bootstrap-loader configuration: ${bootstrapEntryPoints.prod}`);

module.exports = {
  devtool: '#cheap-module-eval-source-map',
  entry: [
  	bootstrapEntryPoints.prod,
    'tether',
  	'./src/scripts/app'
  ],

  output: {
    path: path.join(__dirname, 'public', 'assets'),
    filename: 'app.js',
  },

  resolve: {  extensions: ['*', '.js']  },

  plugins: [
    new ExtractTextPlugin({ filename: 'app.css', allChunks: true }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.Tether': 'tether',
    }),
    new webpack.LoaderOptionsPlugin({
      postcss: [autoprefixer],
    }),
  ],

  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader', loader: 'css-loader!postcss-loader',
      }) },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader', loader: 'css-loader!postcss-loader!sass-loader',
      }) },

      // Bootstrap 4
      { test: /bootstrap\/dist\/js\/umd\//, loader: 'imports-loader?jQuery=jquery' },
    ]
  }

};