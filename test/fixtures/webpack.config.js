const path = require('path');
const context = path.resolve(__dirname, 'src');

module.exports = (env, { mode = 'production' }) => ({
  mode,
  context,
  entry:  [
    path.resolve(context, 'index.html'),
    path.resolve(context, 'scss/index.scss')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'main.js',
  },
  module: {
    rules: [{
      test: /\.html$/,
      use: [{
        loader: "file-loader",
        options: {
          emitFile: true,
          name: '[name].html'
        }
      }, {
        loader: 'extract-loader',
      }, {
        loader: 'html-loader',
        options: {
          attrs: [
            'link:href'
          ]
        }
      }]
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: (mode === 'production'
        ? [{
            loader: 'file-loader',
            options: {
              name: '[name].css',
              emitFile: true
            }
          }, {
            loader: 'extract-loader'
          }]
        : [{
          loader: 'style-loader'
        }]).concat([
          {
            loader: 'css-loader'
          }, {
            loader: 'postcss-loader'
          }, {
            loader: 'sass-loader',
            options: {
              includePaths: [
                path.resolve(__dirname, 'node_modules')
              ],
              linefeed: 'lf',
              outputStyle: 'nested'
            }
          }
        ])
    }]
  },
  resolve: {
    alias: {
      'varss': path.join(__dirname, '../../varss.scss')
    }
  }
});
