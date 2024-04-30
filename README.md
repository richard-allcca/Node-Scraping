# Puppeter Course

Different examples of scraping with puppeter

This is a repository for the course of Puppeter
[tuto](https://www.youtube.com/watch?v=gBnrdedhuU4&ab_channel=FaztCode)

## Confit eslint and prettier

```bash
  npm install eslint prettier eslint-plugin-import eslint-config-airbnb-base lint-staged
```

- Crea un archivo de configuración de ESLint llamado .eslintrc.cjs en la raíz de tu proyecto.

```js
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
```

- Crea un archivo de configuración de ESLint llamado .eslintignore en la raíz de tu proyecto.

```.eslintignore
  node_modules/**
  package-lock.json
  .git
  database/
  seeders/
  models/
  migrations/
  .github/
  .husky/
  bin/
  dist/
  *.test.js
  *.spec.js
```
