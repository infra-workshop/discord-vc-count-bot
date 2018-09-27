module.exports = {
  mode: 'production',
  entry: __dirname + "/src/index.ts",
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.ts?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  target: 'node'
}
