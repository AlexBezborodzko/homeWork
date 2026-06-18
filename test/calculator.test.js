const { Calculator } = require('../calculator.js');

const calc = new Calculator();

describe('calculator', () => {
    describe('Сложение', () => {
        test.each([
            { value: 'Сложение положительных чисел', arrNumbers: [1, 2, 3], total: 6 },
            { value: 'Сложение отрицательных чисел', arrNumbers: [-1, -2, -3], total: -6 },
            { value: 'Смешанные значения', arrNumbers: [1, 3, -4], total: 0 },
            { value: 'Вызов без аргументов', arrNumbers: [], total: 0 },
        ])(`$value`, ({ arrNumbers, total }) => {
            expect(calc.add(...arrNumbers)).toBe(total);
        });
    });

    describe('Вычитание', () => {
        test('обычное вычитание', () => {
            const a = 10;
            const b =4;
            const expected = 6;

            const result = calc.subtraction(a,b)

            expect(result).toBe(expected);
        });

        test('отрицательный результат', () => {
            const a = 4;
            const b =10;
            const expected = -6;

            const result = calc.subtraction(a,b)

            expect(result).toBe(expected);
        });

        test('работа с нулем', () => {
            const a = 0;
            const b =4;
            const expected = -4;

            const result = calc.subtraction(a,b)

            expect(result).toBe(expected);

        });
    });

    describe('Умножение', () => {
        test('умножение нескольких чисел', () => {
            expect(calc.multiply(2, 3, 4)).toBe(24);
        });

        test('умножение на ноль', () => {
            expect(calc.multiply(2, 3, 0)).toBe(0);
        });

        test('отрицательные числа', () => {
            expect(calc.multiply(-2, -3, -4)).toBe(-24);
        });

        test('вызов без аргументов', () => {
            expect(calc.multiply()).toBe(1);
        });
    });

    describe('Деление', () => {
        test('деление целых чисел', () => {
            expect(calc.divide(12, 3)).toBe(4);
        });

        test('деление с дробным результатом', () => {
            expect(calc.divide(5, 2)).toBe(2.5);
        });

        test('деление положительного числа на ноль', () => {
            expect(calc.divide(12, 0)).toBe(Infinity);
        });

        test('деление отрицательного числа на ноль', () => {
            expect(calc.divide(-12, 0)).toBe(-Infinity);
        });
    });

    describe('Возведение в степень', () => {
        test('Положительное число', () => {
            expect(calc.exponentiation(5)).toBe(25);
        });

        test('Отрицательное число', () => {
            expect(calc.exponentiation(-4)).toBe(16);
        });

        test('ноль', () => {
            expect(calc.exponentiation(0)).toBe(0);
        });
    });
});


describe('использование jest.fn()', () => {
    test('отслеживание мок функции', () => {
        const mockFn = jest.fn();
        mockFn(10, 4);
        mockFn('hello', 'world');
        mockFn(42);
        expect(mockFn).toHaveBeenCalledTimes(3);
        expect(mockFn).toHaveBeenCalledWith(10, 4);
        expect(mockFn).toHaveBeenCalledWith('hello', 'world');
        expect(mockFn).toHaveBeenCalledWith(42);

    });
});

/*Методы калькулятора не проверяют типы входных данных
* валидация нужна , если нужно что бы калькулятор работал как нужно
* добавить проверки типа typeof === 'number' && !isNaN()
* для деления на ноль выбрасывать ошибку вместо Infinity
* можно  переписать код на TS, для строгой типизации*/