import { resolve } from 'path';
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin';

import { URL } from 'url'
const __dirname = new URL('.', import.meta.url).pathname;


const config = {
  entry: './demo/main.js',
  output: {
    path: resolve(__dirname, 'dist'),
    publicPath : '',
    filename: 'main.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'demo/index.html',
      title:'Caldera Demo App'
    })
  ]
}

export default config
