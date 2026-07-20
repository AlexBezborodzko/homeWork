1. Установка зависимостей  
npm install
2. Установка браузеров Playwright
npx playwright install
3. Запуск всех тестов (headless mode)
npx playwright test
4.  Запуск всех тестов (headed mode)
npx playwright test --headed
5. Открыть HTML отчет
npx playwright show-report
6.  Обновить все скриншоты
npx playwright test --update-snapshots

структура проекта

playwright-pom-homework/


│
├── pages/                               # Page Object

│   └── TodoPage.js                      # Главная страница TodoMVC

│ 
├── fixtures/                            # Фикстуры

│   └── todo.fixture.js                  # Кастомные фикстуры Playwright

│
├── test-data/                           # Тестовые данные

│   └── todos.js                         # Константы с данными

│
├── tests/                               # Тесты

│   └── todomvc.spec.js                  # Все тесты TodoMVC

│
├── playwright.config.js                 # Конфигурация Playwright

├── package.json                         # Зависимости проекта

└── README.md                            # Документация