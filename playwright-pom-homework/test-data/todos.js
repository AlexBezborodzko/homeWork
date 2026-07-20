const TODOS = {
    default: ['Learn Playwright',
        'Write API tests',
        'Review homework'],
    persistent: [
        'Persistent task 1',
        'Persistent task 2'
    ],


    single: ['Old task name'],
    updated: ['Updated task name'],
};
const SCREENSHOTS = {
    DESKTOP: 'todo-list-desktop.png',
    MOBILE: 'todo-list-mobile.png'
};

const FILTERS = {
    ALL: 'all',
    ACTIVE: 'active',
    COMPLETED: 'completed'
};

module.exports = {TODOS, SCREENSHOTS, FILTERS};