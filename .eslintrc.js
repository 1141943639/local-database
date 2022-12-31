module.exports = {
  extends: ['./eslint-config'],
  ignorePatterns: ['*.d.ts', '.eslintrc.js', 'eslint-config/*'],
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
    },
  }
};
