module.exports = {
  env: {
    node: true, // Indica que el código se ejecutará en un entorno Node.js
    es2021: true, // Permite el uso de características de ES2021
  },
  extends: ['eslint:recommended'], // Usa la configuración recomendada de ESLint
  parserOptions: {
    ecmaVersion: 12, // Permite el uso de características de ES2021
    sourceType: 'module', // indica a ESLint que trate tu código como un módulo ES
  },
  rules: {
    'no-unused-vars': 'warn', // Advertencia para variables no utilizadas
    'no-undef': 'warn', // Advertencia para variables no definidas
    semi: ['error', 'always'],
    'no-param-reassign': ['error', { props: false }],
  },
};
