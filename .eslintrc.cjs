module.exports = {
  env: {
    // node: true, // commonjs: true,
    node: true,
    es2021: true,
  },
  // extends: ['eslint:recommended'], // Usa la configuración recomendada de ESLint
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12, // Permite el uso de características de ES2021
    sourceType: 'module', // indica a ESLint que trate tu código como un módulo ES
  },
  rules: {
    'linebreak-style': [
      'error',
      process.platform === 'win32' ? 'windows' : 'unix',
    ],
    'no-unused-vars': 'warn', // Advertencia para variables no utilizadas
    'no-undef': 'warn', // Advertencia para variables no definidas
    semi: ['error', 'always'],
    'no-param-reassign': ['error', { props: false }],
    'no-console': 'warn',
    'no-await-in-loop': 'off',
    // 'arrow-body-style': ['error', 'always'],
    // 'arrow-body-style': ['warn', 'always'],
    'arrow-body-style': ['warn', 'off'],
    'no-underscore-dangle': 'off',
    'no-plusplus': 'off',
  },
};
