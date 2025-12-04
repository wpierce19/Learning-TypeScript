const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/game.js', // Entry file for your app
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Cleans up the /dist folder before each build
  },
  mode: 'development', // Use 'production' for deployment
  devServer: {
    static: './dist',
    port: 9000, // Port for dev server
    open: true, // Automatically open the browser
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'], // Processes CSS files
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './template.html', // Template for the HTML file
    }),
  ],
};