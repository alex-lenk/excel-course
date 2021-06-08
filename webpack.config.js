const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[fullhash].${ext}`;

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties']
      }
    }
  ]

  if (isDev) {
    loaders.push('eslint-loader')
  }

  return loaders
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',

  // Entry
  entry: ['@babel/polyfill', './index.js'],

  // Output
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'public_html')
  },

  // Target Runtime for live reloading
  target: 'web',

  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core')
    }
  },

  // Sourcemap and Optimization
  devtool: isDev ? 'source-map' : false,

  devServer: {
    contentBase: path.join(__dirname, 'public_html'),
    port: 9090
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: 'index.html',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd
      }
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon'),
          to: path.resolve(__dirname, 'public_html/')
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: filename('css')
    }),
    new ESLintPlugin()
  ],
  module: {
    rules: [
      // Sass and Css
      {
        test: /\.scss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: ''
            }
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      }
    ]
  }
}
