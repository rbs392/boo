/* eslint-disable import/no-extraneous-dependencies */
import 'babel-register';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default [
  /* App side config*/
  {
    entry: './app/app.jsx',
    output: {
      filename: 'app.js',
      path: './dist/app',
    },
    target: 'web',
    resolve: {
      extensions: ['.js', '.jsx', '.scss'],
    },
    module: {
      rules: [
        {
          test: /\.jsx$/,
          loader: 'babel-loader',
          exclude: 'node_modules',
        },
        {
          test: /\.scss$/,
          loader: ['style-loader', 'css-loader', 'sass-loader'],
          exclude: 'node_modules',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Boo.',
        template: './config/template.ejs',
      }),
    ],
  },
  /* server side config */
  {
    entry: './server/index.js',
    output: {
      filename: 'index.js',
      path: './dist',
      library: 'Boo',
      libraryTarget: 'commonjs2',
    },
    target: 'node',
    resolve: {
      extensions: ['.js', '.json'],
    },
    node: {
      __dirname: false,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
        },
      ],
    },
  },
];
