import globals from 'globals';
import js from '@eslint/js';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,

        page: 'readonly',
        browser: 'readonly',
        context: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        request: 'readonly',
      },
    },
    rules: {

      ...js.configs.recommended.rules,


      'indent': ['error', 2, { SwitchCase: 1 }],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      'semi': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'comma-spacing': ['error', { before: false, after: true }],
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'space-before-function-paren': ['error', { anonymous: 'never', named: 'never', asyncArrow: 'always' }],
      'space-in-parens': ['error', 'never'],
      'space-infix-ops': 'error',
      'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
      'eol-last': ['error', 'always'],
      'no-trailing-spaces': 'error',


      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'no-var': 'error',
      'prefer-const': 'warn',
      'prefer-template': 'warn',
      'object-shorthand': ['warn', 'always'],
      'arrow-parens': ['warn', 'always'],
      'no-else-return': ['error', { allowElseIf: false }],
      'no-return-await': 'error',
      'radix': ['error', 'as-needed'],
      'camelcase': ['error', { properties: 'never', ignoreDestructuring: true, ignoreImports: true }],
      'require-await': 'warn',
      'no-useless-escape': 'warn',
      'no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
      'no-console': 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    },
  },
  {
    ignores: [
      'node_modules/**',
      'playwright-report/**',
      'test-results/**',
      'dist/**',
      'coverage/**',
      '*.log',
      'package-lock.json',
      'yarn.lock',
      '.prettierrc',
      '.eslintrc.json',
      'main.js',
      'feature.js',
    ],
  },
];
