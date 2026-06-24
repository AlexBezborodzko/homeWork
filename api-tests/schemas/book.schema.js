const Ajv = require('ajv');
const ajv = new Ajv();

// JSON схема для книги
const bookSchema = {
  type: 'object',
  required: ['id', 'title', 'description', 'pageCount', 'excerpt', 'publishDate'],
  properties: {
    id: { type: 'integer' },
    title: { type: 'string' },
    description: { type: 'string' },
    pageCount: { type: 'integer' },
    excerpt: { type: 'string' },
    publishDate: { type: 'string' }
  }
};

// Функция проверки
function validateBook(data) {
  const validate = ajv.compile(bookSchema);
  return validate(data);
}

module.exports = {
  bookSchema,
  validateBook
};