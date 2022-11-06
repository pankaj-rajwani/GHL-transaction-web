const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config.common');
const Dotenv = require('dotenv-webpack');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    port: 3000,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /(\.css|\.scss|\.sass)$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: `./.env`,
    }),
  ],
});
