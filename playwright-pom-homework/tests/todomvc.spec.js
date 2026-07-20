// tests/todomvc.spec.js

const {test, expect} = require('@playwright/test');
const {TodoPage} = require('../pages/TodoPage');
const {TODOS, FILTERS, SCREENSHOTS} = require('../test-data/todos');

test.describe('TodoMVC Application', () => {

    let todoPage;

    test.beforeEach(async ({page}) => {
        todoPage = new TodoPage(page);
        await todoPage.open();
    });


    test('1. Проверка загрузки TodoMVC', async () => {
        await expect(todoPage.header).toHaveText('todos');
        await expect(todoPage.inputField).toBeVisible();
        await expect(todoPage.inputField).toHaveAttribute(
            'placeholder',
            'What needs to be done?'
        );
    });


    test('2. Добавление нескольких задач', async () => {
        await todoPage.addTodos(TODOS.default);
        await expect(todoPage.todoItems).toHaveCount(TODOS.default.length);
        await expect(todoPage.getTodoItems()).resolves.toEqual(TODOS.default);
        await expect(todoPage.todoCount).toHaveText(`${TODOS.default.length} items left`);
    });


    test('3. Проверить выполнение задачи и работу фильтров', async () => {
        await todoPage.addTodos(TODOS.default);
        await todoPage.completeTodoByIndex(0);
        await todoPage.filterBy(FILTERS.ACTIVE);
        await expect(todoPage.todoItems.filter({hasText: TODOS.default[0]})).toBeHidden();
        await todoPage.filterBy(FILTERS.COMPLETED);
        await expect(todoPage.todoItems.filter({hasText: TODOS.default[0]})).toBeVisible();
        await todoPage.filterBy(FILTERS.ALL);
        await expect(todoPage.todoItems).toHaveCount(TODOS.default.length);
    });

    test('4. Проверить редактирование задачи', async () => {
        await todoPage.addTodo(TODOS.single[0]);
        await todoPage.editTodo(TODOS.single[0], TODOS.updated[0]);
        await expect(todoPage.todoItems.filter({hasText: TODOS.single[0]})).toHaveCount(0);
        await expect(todoPage.todoItems.filter({hasText: TODOS.updated[0]})).toBeVisible();

    });


    test('5. Проверить удаление задачи и очистку выполненных задач', async () => {
        await todoPage.addTodos(TODOS.default);
        await todoPage.deleteTodo(TODOS.default[0]);
        await expect(todoPage.todoItems).toHaveCount(TODOS.default.length - 1);
        await todoPage.completeTodoByIndex(0);
        await todoPage.clearCompleted();
        await expect(todoPage.todoItems.filter({hasText: TODOS.default[1]})).toBeHidden();
        await expect(todoPage.todoItems).toHaveCount(1);
        await expect(todoPage.todoCount).toHaveText('1 item left');
    });


    test('6. Проверить сохранение состояния приложения', async () => {
        await todoPage.addTodos(TODOS.persistent);
        await todoPage.completeTodoByIndex(0);
        await todoPage.saveState('storageState.json');
        await todoPage.reload();
        await expect(todoPage.todoItems).toHaveCount(2);
        await expect(todoPage.todoItems.nth(0)).toHaveClass(/completed/);
        await expect(todoPage.todoItems.nth(1)).not.toHaveClass(/completed/);

    });


    test('7. Проверить визуальное состояние TodoMVC', async () => {
        await todoPage.addTodos(TODOS.default);
        await todoPage.completeTodoByIndex(0);
        await expect(todoPage.todoApp).toHaveScreenshot(SCREENSHOTS.DESKTOP);
    });
});
test.describe('Мобильная версия', () => {
    test.use({
        viewport: {width: 390, height: 844}
    });
    let todoPage;
    test.beforeEach(async ({page}) => {
        todoPage = new TodoPage(page);
        await todoPage.open();
    });

    test('Проверка загрузки TodoMVC на мобильном устройстве', async () => {
        await todoPage.addTodos(TODOS.persistent);
        await expect(todoPage.todoItems).toHaveCount(2);
        await expect(todoPage.todoApp).toHaveScreenshot(SCREENSHOTS.MOBILE);
    });
});