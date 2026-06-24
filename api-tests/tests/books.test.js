const apiClient = require('../clients/apiClient');
const { validateBook } = require('../schemas/book.schema');
const BookFixture = require('../fixtures/book.fixture');

describe('Books API Tests', () => {
  let createdBookId = null;

  // 1. GET list
  test('GET /Books - should return list of books', async () => {
    const response = await apiClient.getBooks();
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);
    
    const firstBook = response.data[0];
    expect(validateBook(firstBook)).toBe(true);
  });

  // 2. GET by valid id
  test('GET /Books/1 - should return book by id', async () => {
    const response = await apiClient.getBook(1);
    
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('id');
    expect(response.data.id).toBe(1);
    expect(validateBook(response.data)).toBe(true);
  });

  // 3. GET by invalid id
  test('GET /Books/999999 - should return 404 for non-existent book', async () => {
    try {
      await apiClient.getBook(999999);
      expect(true).toBe(false);
    } catch (error) {
      expect(error.response.status).toBe(404);
      expect(error.response.data).toBeDefined();
    }
  });

  // 4. POST create book
  test('POST /Books - should create new book', async () => {
    const newBook = BookFixture.getBasicBook({
      title: 'Моя тестовая книга',
      pageCount: 250
    });
    
    const response = await apiClient.createBook(newBook);
    
    expect(response.status).toBe(200);
    expect(response.data.title).toBe('Моя тестовая книга');
    expect(response.data.pageCount).toBe(250);
    expect(validateBook(response.data)).toBe(true);
    
    createdBookId = response.data.id;
  });

  // 5. PUT update book
  test('PUT /Books/{id} - should update book', async () => {
    // Создаем книгу для обновления
    const createResponse = await apiClient.createBook(
      BookFixture.getBasicBook({ title: 'Книга для обновления' })
    );
    const bookId = createResponse.data.id;
    
   
    const updatedBook = {
      id: bookId,
      title: 'Обновленная книга',
      description: 'Новое описание',
      pageCount: 500,
      excerpt: 'Новый отрывок',
      publishDate: new Date().toISOString()
    };
    
    const response = await apiClient.updateBook(bookId, updatedBook);
    
    expect(response.status).toBe(200);
    expect(response.data.title).toBe('Обновленная книга');
    expect(response.data.pageCount).toBe(500);
    expect(response.data.id).toBe(bookId);
    expect(validateBook(response.data)).toBe(true);
  });

  // 6. DELETE book
  test('DELETE /Books/{id} - should delete book', async () => {
   
    const createResponse = await apiClient.createBook(
      BookFixture.getBasicBook({ title: 'Книга для удаления' })
    );
    const bookId = createResponse.data.id;
   
    const response = await apiClient.deleteBook(bookId);
    
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
    
    
    try {
      await apiClient.getBook(bookId);
      expect(true).toBe(false);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });
});

// ===== НЕГАТИВНЫЕ ТЕСТЫ НА СОЗДАНИЕ КНИГИ =====
describe('Books API Negative Tests - Create Book', () => {
  
  // 1. Тест с пустым названием
  test('POST /Books - should create book with empty title (API accepts it)', async () => {
    const invalidBook = BookFixture.getBasicBook({
      title: '',
      pageCount: 100
    });
    
    const response = await apiClient.createBook(invalidBook);
    
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('id');
    expect(response.data.title).toBe('');
    expect(response.data.pageCount).toBe(100);
  });

 
  test('POST /Books - should create book with negative pageCount (API accepts it)', async () => {
    const invalidBook = BookFixture.getBasicBook({
      title: 'Книга с отрицательными страницами',
      pageCount: -50
    });
    
    const response = await apiClient.createBook(invalidBook);
    
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('id');
    expect(response.data.title).toBe('Книга с отрицательными страницами');
    expect(response.data.pageCount).toBe(-50);
  });

  
  test.each([
    { title: '', pageCount: 0, description: 'empty title with zero pages' },
    { title: '   ', pageCount: -1, description: 'spaces only with negative pages' },
    { title: null, pageCount: -100, description: 'null title with negative pages' },
    { title: 'Книга', pageCount: -999, description: 'very negative page count' }
  ])('POST /Books - should accept invalid data: $description', async ({ title, pageCount }) => {
    const invalidBook = BookFixture.getBasicBook({
      title: title,
      pageCount: pageCount
    });
    
    const response = await apiClient.createBook(invalidBook);
    
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('id');
    expect(response.data.title).toBe(title);
    expect(response.data.pageCount).toBe(pageCount);
  });

});