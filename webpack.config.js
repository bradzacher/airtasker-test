module.exports = {
  entry: './src/app.jsx',
  output: {
    path: './src/',
    filename: 'app.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        loader : 'babel'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
};