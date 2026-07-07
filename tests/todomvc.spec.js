import {expect, test} from '@playwright/test';

test.describe('Тестирование TodoMVC', () => {
    const tasks = ['Learn Playwright',
        'Write API tests',
        'Review homework']
    test.beforeEach(async ({page}) => {
        await page.goto('https://demo.playwright.dev/todomvc');

    });
    test.describe('Домашнее задание', () => {

// Task 1
        test('Проверка загрузки TodoMVC', async ({page}) => {
            const header = page.locator('h1');
            await expect(header).toHaveText('todos');

            const inputField = page.getByPlaceholder('What needs to be done?');
            await expect(inputField).toBeVisible();


        });
// Task 2
        test('Добавление нескольких задач', async ({page}) => {
            const inputField = page.getByPlaceholder('What needs to be done?');

            for (const task of tasks) {
                await inputField.fill(task)
                await inputField.press('Enter');

            }
            const todoItems = page.locator('.todo-list li')
            await expect(todoItems).toHaveCount(tasks.length);
            for (let i = 0; i < tasks.length; i++) {
                await expect(todoItems.nth(i)).toHaveText(tasks[i]);
            }
            const todoCount = page.locator('.todo-count')
            await expect(todoCount).toHaveText(`${tasks.length} items left`);
        });
// Task 3
        test('Отметка задачи как выполненной и фильтрация', async ({page}) => {
            const inputField = page.getByPlaceholder('What needs to be done?');

            for (const task of tasks) {
                await inputField.fill(task)
                await inputField.press('Enter');

            }
            const todoItems = page.locator('.todo-list li');
            await todoItems.nth(0).locator('input[type=checkbox]').click();
            await expect(todoItems.nth(0)).toHaveClass(/completed/);
            await page.getByRole('link', {name: 'Active'}).click();
            const firstTask = page.locator('.todo-list li').filter({hasText: 'Learn Playwright'});
            await expect(firstTask).toBeHidden();
            await page.getByRole('link', {name: 'Completed'}).click();
            await expect(firstTask).not.toBeHidden();
            await page.getByRole('link', {name: 'All'}).click();
            const visibleItems = page.locator('.todo-list li:visible');
            await expect(visibleItems).toHaveCount(tasks.length);


        });
// Task 4
        test('Редактирование задачи', async ({page}) => {
            const inputField = page.getByPlaceholder('What needs to be done?');
            await inputField.fill('Old task name');
            await inputField.press('Enter');
            const task = page.locator('.todo-list li').filter({hasText: 'Old task name'});
            await task.dblclick();
            const editInput = task.locator('.edit');
            await editInput.fill('Updated task name');
            await editInput.press('Enter');
            const oldTask = page.locator('.todo-list li').filter({hasText: 'Old task name'});
            await expect(oldTask).toHaveCount(0); // или .toBeHidden()
            const newTask = page.locator('.todo-list li').filter({hasText: 'Updated task name'});
            await expect(newTask).toBeVisible();
        });
// Task 5
        test('Удаление задачи и очистка выполненных задач', async ({page}) => {
            const inputField = page.getByPlaceholder('What needs to be done?');
            for (const task of tasks) {
                await inputField.fill(task)
                await inputField.press('Enter');

            }
            const firstTask = page.locator('.todo-list li').nth(0);
            await firstTask.hover()
            await firstTask.locator('.destroy').click();
            const todoItems = page.locator('.todo-list li')
            await expect(todoItems).toHaveCount(2);
            const remainingFirst = page.locator('.todo-list li').nth(0);
            await remainingFirst.locator('input[type=checkbox]').click();
            await page.locator('.clear-completed').click();
            await expect(todoItems).not.toHaveText('Write API tests')
            await expect(todoItems).toHaveCount(1);

        });
// task 6
        test('Сохранение состояния приложения', async ({page}) => {
            const inputField = page.getByPlaceholder('What needs to be done?');
            await inputField.fill('Persistent task 1');
            await inputField.press('Enter');
            await inputField.fill('Persistent task 2');
            await inputField.press('Enter');
            const todoItems = page.locator('.todo-list li')
            await todoItems.nth(0).locator('input[type=checkbox]').click();
            await page.context().storageState({path: 'storageState.json'})
            await page.reload();
            await expect(page.locator('.todo-list li')).toHaveCount(2);
            await expect(page.locator('.todo-list li').nth(0)).toHaveClass(/completed/);
            await expect(page.locator('.todo-list li').nth(1)).not.toHaveClass(/completed/);
        });
// task 7
        test('Screenshot testing', async ({page}) => {
            const inputField = page.getByPlaceholder('What needs to be done?');
            for (const task of tasks) {
                await inputField.fill(task)
                await inputField.press('Enter');

            }
            await page.locator('.todo-list li').nth(0).locator('input[type=checkbox]').click();
            await page.getByRole('link', {name: 'All'}).click();
            const todoList = page.locator('.todoapp');
            await expect(todoList).toHaveScreenshot('todo-list-desktop.png')
        })
    });
    test.describe('Задание с *', () => {
        test.use({
            viewport: {width: 390, height: 844}
        });

        test('Проверка TodoMVC на мобильном устройстве', async ({page}) => {
            const inputField = page.getByPlaceholder('What needs to be done?');
            await inputField.fill('Persistent task 1');
            await inputField.press('Enter');
            await inputField.fill('Persistent task 2');
            await inputField.press('Enter');
            await expect(page.locator('.todo-list li')).toHaveCount(2);
            const todoList = page.locator('.todoapp');
            await expect(todoList).toHaveScreenshot('todo-list-mobile.png')

        });
    });
})