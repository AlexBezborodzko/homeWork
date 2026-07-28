import js from '@eslint/js';

export default [
    js.configs.recommended, // подключаем eslint:recommended
    {
        // Настройки языка (вместо env и parserOptions)
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                // Ручное определение глобальных переменных для окружений
                // (browser, node, es2021)
                // Вместо env: { browser: true, node: true, es2021: true }
                // можно использовать готовые пакеты, но для простоты пропишем вручную:
                window: 'readonly',
                document: 'readonly',
                console: 'readonly',
                module: 'readonly',
                require: 'readonly',
                process: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                // ... добавьте другие глобальные переменные по необходимости
            },
        },
        // Ваши правила
        rules: {
            'no-console': 'warn',
            'eqeqeq': 'error',
            'semi': ['error', 'always'],
            'quotes': ['error', 'single'],
        },
    },
];