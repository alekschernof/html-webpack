const path = require('path');

module.exports = {
  root: true,
  env: {
    browser: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  globals: {
    $: true,
    jQuery: true,
    ymaps: true,
  },
  extends: [
    'plugin:import/errors',
    'plugin:promise/recommended',
    'standard',
    'eslint:recommended',
    'airbnb-base',
    'plugin:vue/recommended',
    'plugin:react/recommended',
  ],
  plugins: [
    'import',
    'vue',
  ],
  rules: {
    'vue/html-self-closing': 0,
    'vue/no-v-html': 'off',
    'linebreak-style': 'off',
    'indent': 'off',
  },
  overrides: [
    {
      files: [
        'postcss.config.js',
        'webpack.*.conf.js',
        '.eslintrc.js',
      ],
      rules: {
        'global-require': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-dynamic-require': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      webpack: {
        config: {
          resolve: {
            alias: {
              '~': path.join(__dirname, './src'),
            },
          },
        },
      },
    },
  },
};
