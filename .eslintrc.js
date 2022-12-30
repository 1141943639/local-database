export default {
  extends: ['./eslint-config'],
  ignorePatterns: ['*.d.ts'],
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
};
