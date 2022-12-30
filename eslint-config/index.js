module.exports = {
  extends: ['./base.js'],
  globals: {},
  rules: {
    'import/order': [
      'error',
    ],
    'import/no-unresolved': 'error',
    'import/no-anonymous-default-export': 'off',
    'import/named': 'error',
  },
};
