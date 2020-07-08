const path = require('path')
const webpack = require('webpack')

module.exports = [
  {
    mode: 'development',
    target: 'web',
    devServer: {
      contentBase: path.join(__dirname, 'dist')
    },
    entry: {
      bundle: [
        './src/client'
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist/js')
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.(png|svg|jpg|gif|pdf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]'
              }
            }
          ]
        }
      ]
    }
  }
]
