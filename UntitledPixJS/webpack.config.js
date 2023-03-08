const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin({/* options: see below */ })]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // https://webpack.js.org/configuration/optimization/
  optimization: {
    chunkIds: 'deterministic',
    nodeEnv: 'production',
  },
  performance: {
    maxEntrypointSize: 1024576,
    maxAssetSize: 512000
  },
};