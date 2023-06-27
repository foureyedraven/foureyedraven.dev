const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = [
  {
    mode: 'development',
    target: 'web',
    devServer: {
      static: path.join(__dirname, 'dist')
    },
    entry: {
      bundle: [
        './src/client/index.tsx'
      ]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist/js')
    },
    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/,
          use: { loader: 'ts-loader' },
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                noEmit: false, // this option will solve the issue
              }
            }
          }
        },
        // addition - add source-map support
        { enforce: "pre", test: /\.js$/, exclude: /node_modules/, loader: "source-map-loader" },
        {
          test: /\.(png|svg|jpg|gif|pdf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                esModule: false,
                name: '[name].[ext]'
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    // externals: {
    //   "react": "React",
    //   "react-dom": "ReactDOM",
    // },
    // addition - add source-map support
    devtool: "source-map",
    plugins: [
      // Will automatically inject bundle js into ./dist/index.html
      new HTMLWebpackPlugin({
        template: './public/index.html', //source
        filename: 'index.html'  //destination
      })
    ]
  }
]
