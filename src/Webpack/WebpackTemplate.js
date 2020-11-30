const path = require('path');
const BannerPlugin = require('webpack').BannerPlugin;
const TerserPlugin = require('terser-webpack-plugin');

/**
 * Generic configuration for Webpack.
 * @type import("webpack").Configuration
 */
module.exports = {
  entry: {
    TestFunction: './src/TestFunction/TestFunction.ts',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  externals: {
    'aws-sdk': 'aws-sdk',
  },
  optimization: {
    minimizer: [new TerserPlugin({ terserOptions: { mangle: false } })], // mangle false else mysql blow ups with "PROTOCOL_INCORRECT_PACKET_SEQUENCE"
  },
  target: 'node',
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
    ],
  },
  devtool: 'inline-source-map',
  plugins: [
    new BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }),
  ],
};
