module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
};
