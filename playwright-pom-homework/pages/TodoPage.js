const {test, expect} = require('@playwright/test');


class TodoPage {
    constructor(page) {
        this.page = page;


        this.header = page.locator('h1');
        this.inputField = page.getByPlaceholder('What needs to be done?');
        this.todoItems = page.locator('.todo-list li');
        this.todoCount = page.locator('.todo-count');
        this.clearCompletedButton = page.locator('.clear-completed');
        this.todoApp = page.locator('.todoapp');

        this.filters = {
            all: page.getByRole('link', {name: 'All'}),
            active: page.getByRole('link', {name: 'Active'}),
            completed: page.getByRole('link', {name: 'Completed'}),
        };


        this.checkbox = page.locator('input[type=checkbox]');
        this.editInput = page.locator('.edit');
        // this.destroyButton = page.locator('.destroy');
    }


    async open() {
        await this.page.goto('/todomvc');
        await this.inputField.waitFor({
            state: 'visible',
            timeout: 5000,
        });
    }


    async addTodo(todoText) {
        await this.inputField.fill(todoText);
        await this.inputField.press('Enter');
    }


    async addTodos(todoList) {
        for (const task of todoList) {
            await this.addTodo(task);
        }
    }


    async getTodoItems() {
        await this.todoItems.first().waitFor({
            state: 'visible',
            timeout: 5000
        });
        return await this.todoItems.allTextContents();
    }


    async getTodoByText(todoText) {
        return this.todoItems.filter({hasText: todoText});
    }


    async filterBy(filterName) {
        await this.filters[filterName].click();
    }


    async completeTodoByIndex(index) {
        await this.todoItems.nth(index).locator(this.checkbox).click();
    }


    // async completeTodo(todoText) {
    //     const todo = await this.getTodoByText(todoText);
    //     await todo.locator('input[type=checkbox]').click();
    // }


    async editTodo(oldTodoText, newTodoText) {
        const todo = await this.getTodoByText(oldTodoText);
        await todo.dblclick();
        await this.editInput.fill(newTodoText);
        await this.editInput.press('Enter');

    };


    async deleteTodo(todoText) {
        const todo = await this.getTodoByText(todoText);
        await todo.hover();
        await todo.locator('.destroy').click();
    }


    async clearCompleted() {
        await this.clearCompletedButton.click();
    }


    async saveState(path = 'storageState.json') {
        await this.page.context().storageState({path});
    }


    async reload() {
        await this.page.reload();
    }


    // async takeScreenshot(name = 'todo-app.png') {
    //     await expect(this.todoApp).toHaveScreenshot(name);
    // }
}

module.exports = {TodoPage};