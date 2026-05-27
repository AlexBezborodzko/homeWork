//task 1

const name = "Alex"; //имя пользователя
let age = 42; //возраст пользователя
let areYouStudent= true; // является ли пользователь студентом
let city ;// город пользователя
let salary = null; // зарплата пользователя
console.log(name);
console.log(age);
console.log(areYouStudent);
console.log(city);
console.log(salary);
console.log('-----------------------')


//task 2

console.log(typeof name); // string
console.log(typeof age); // number
console.log(typeof areYouStudent); //boolean
console.log(typeof city); //undefined
console.log(typeof salary); //object возвращает объект - баг
console.log('-----------------------')

//task 3

let first;
let second = null;
console.log(first);
console.log(second);
console.log(typeof first);
console.log(typeof second);
/* undefined - когда переменная существует , но ей еще не присвоили значение
null - когда переменной присваивают явное значение чего-то , чего пока не существует - пустое значение*/
console.log('-----------------------')

//task 4

let strEmpty = ''; //пустая строка - false
let zero = 0; // число 0 - false
let nil = null; // null - false
let undef = undefined; // undefined - false
let str = 'Hello'; // непустая строка - true
let num = 1; // любое положительное число -true
console.log(Boolean(strEmpty));
console.log(Boolean(zero));
console.log(Boolean(nil));
console.log(Boolean(undef));
console.log(Boolean(str));
console.log(Boolean(num));
console.log('-----------------------')

//task 5

let intNumber = 5; //целое число
let floatNumber = 2.5; // дробное число
let strNumber = '5'; // строка, внутри которой находится число
let str2 = "сто"// строка, внутри которой находится обычный текст
console.log(typeof intNumber);
console.log(typeof floatNumber);
console.log(typeof strNumber);
console.log(typeof str2);
console.log(parseInt(str2)); /* получаем NaN    потому что parseInt() пытается преобразовать строку в число,
но так как в строке "сто" нет числовых значений, возвращает NaN*/
console.log('-----------------------')

//task 6

console.log(0.1+0.2);
console.log(0.1+0.2 === 0.3);
/* 0.30000000000000004 - получаем  из-за того что числа храняться в двоичной системе,
 и для копьютора 1/10  нельзя точно собрать из двоичных дробей.*/
console.log('-----------------------')

//task 7

let str3 = "  Hello World! I'm learning js.   ";
console.log(str3.length);
console.log(str3.trim());
console.log(str3.toLocaleUpperCase());
console.log(str3.toLocaleLowerCase());
console.log(str3.includes('js'));
console.log(str3.indexOf("js"));
console.log(`Привет, меня зовут ${name},  мне ${age} года!`);