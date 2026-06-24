// Простые тестовые данные для книг

const BookFixture = {
  // Базовая книга для создания
  getBasicBook: (overrides = {}) => ({
    id: 0,
    title: 'Тестовая книга',
    description: 'Описание тестовой книги',
    pageCount: 100,
    excerpt: 'Краткий отрывок из книги...',
    publishDate: new Date().toISOString(),
    ...overrides
  }),
  
  // Книга с конкретным названием
  getBookWithTitle: (title) => {
    return BookFixture.getBasicBook({ title });
  },
  
  // Книга с большим количеством страниц
  getLongBook: () => {
    return BookFixture.getBasicBook({
      title: 'Большая книга',
      pageCount: 1000
    });
  },
  
  // Невалидные данные для негативных тестов
  getInvalidBook: () => ({
    title: '', // Пустое название
    description: 'Описание',
    pageCount: -10, // Отрицательное число
    excerpt: 'Отрывок',
    publishDate: 'invalid-date'
  })
};

module.exports = BookFixture;