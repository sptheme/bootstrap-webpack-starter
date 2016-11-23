const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const bootstrapEntryPoints = require('./webpack.bootstrap.config.js');

// eslint-disable-next-line no-console
console.log(`=> bootstrap-loader configuration: ${bootstrapEntryPoints.dev}`);

module.exports = {
  devtool: '#cheap-module-eval-source-map',
  entry: [
  	bootstrapEntryPoints.dev,
    'tether',
  	'./src/scripts/app'
  ],

  output: {
    path: path.join(__dirname, 'public', 'assets'),
    filename: 'app.js',
    publicPath: '/public/',
  },

  resolve: {  extensions: ['*', '.js']  },
  module: {
    loaders: [
      { test: /\.css$/, loaders: [ 'style-loader', 'css-loader', 'postcss-loader' ] },
      { test: /\.scss$/, loaders: [ 'style-loader', 'css-loader', 'postcss-loader', 'sass-loader' ] },
      // Bootstrap 4
      {test: /bootstrap\/dist\/js\/umd\//, loader: 'imports-loader?jQuery=jquery'},
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      "window.Tether": "tether"
    }),
    new webpack.LoaderOptionsPlugin({
      postcss: [autoprefixer],
    }),
  ]

};