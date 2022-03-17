const webpack = require('webpack');
const { merge } = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');
const del = require('del');
const GlobImporter = require('node-sass-glob-importer');
const baseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  target: 'web',
  devtool: 'eval-cheap-source-map',
  devServer: {
    contentBase: [
      baseWebpackConfig.externals.paths.dist,
      `${baseWebpackConfig.externals.paths.src}/templates`,
      `${baseWebpackConfig.externals.paths.src}/data`,
    ],
    watchContentBase: true,
    overlay: true,
    useLocalIp: true,
    host: process.env.toIntroNet ? '192.168.1.65' : '0.0.0.0',
    port: 8081,
    progress: true,
    hot: true,
    index: 'page-list.html',
    before() {
      del.sync([baseWebpackConfig.externals.paths.dist]);
    },
    // proxy: {
    //   '/v1/**': {
    //     target: 'https://screen3.nenaprasno.dev.vr.buroburo.tech',
    //     secure: false,
    //     changeOrigin: true,
    //   },
    //   '/api/**': {
    //     target: 'https://screen3.nenaprasno.dev.vr.buroburo.tech',
    //     secure: false,
    //     changeOrigin: true,
    //   },
    //   '/v1/user/registration/**': {
    //     target: 'https://screen3.nenaprasno.dev.vr.buroburo.tech',
    //     secure: false,
    //     changeOrigin: true,
    //   },
    // },
  },
  output: {
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                importer: GlobImporter(),
              },
              additionalData: '@import "~/scss/base/_includes.scss";',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['js', 'vue', 'jsx'],
      exclude: ['node_modules', 'src/js/vendor'],
      cache: true,
    }),
    new StylelintPlugin({
      files: [
        'src/scss/**/*.scss',
        'src/vue-components/**/*.vue',
      ],
      cache: true,
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
    new ExtraWatchWebpackPlugin({
      dirs: [`${baseWebpackConfig.externals.paths.src}/scss`],
    }),
  ],
});

module.exports = new Promise((resolve) => {
  resolve(devWebpackConfig);
});
