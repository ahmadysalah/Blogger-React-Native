module.exports = {
  parser: 'babel-eslint',
  plugins: [
    'react',
    'react-native',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb-base',
  ],
  rules: {

    'arrow-body-style': 'warn',
    'no-use-before-define': ['error', { variables: false }],

  },
};
