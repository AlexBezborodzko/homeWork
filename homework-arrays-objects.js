// Task 1. Reverse array

const numbers = [1, 2, 3, 4, 5, 6];
const reverseNumbers = [];
for(let i = numbers.length; i >0; i--) {
    reverseNumbers.push(i);
}
console.log(`Перевернутый массив: `,reverseNumbers); // менять исходный массив нежелательно , для дальнейшего его использования

// Task 2. Find max and min number
console.log('________________________________________________________');
const arrNumbers = [3, 67, 15, 89, 24, 7, 101, 36];
console.log(`максимальное значение: ${Math.max(...arrNumbers)}`)
console.log(`минимальное значение: ${Math.min(...arrNumbers)}`)
let maxValue = arrNumbers[0];
let minValue = arrNumbers[0];
for(let i = 0;i<arrNumbers.length;i++) {
    if(maxValue<arrNumbers[i]) {
        maxValue=arrNumbers[i];
    }
    else if(minValue>arrNumbers[i]){
        minValue=arrNumbers[i];
    }
}
console.log(`максимальное значение: ${maxValue}`)
console.log(`минимальное значение: ${minValue}`)

// Task 3. Fibonacci array
console.log('________________________________________________________');
const startIndex = 3;
const length = 7;

let previous =0
let current = 1
for(let i = 2; i < startIndex; i++){
    let next = previous+current;
    previous = current;
    current = next;
}
const arrFibonacci=[];
for(let i = 0; i < length; i++){
    let next = previous+current;
    previous = current;
    current = next;
    arrFibonacci.push(current);
}


console.log(`последовательность Фибоначчи: `,arrFibonacci)

// Task 4. Bulls and Cows

const secret = 3487;
const guess = 3794;
console.log('________________________________________________________');

let samePosition =0;
let differentPosition = 0;
//const arrSamePosition = Array.from(String(secret),Number)
const arrSecret = secret.toString().split('').map(Number)
const arrGuess = guess.toString().split('').map(Number)
for(let i = 0;i<arrSecret.length;i++) {
    if(arrSecret[i] === arrGuess[i]) {
        samePosition+=1;
    }else if(arrGuess.includes(arrSecret[i])){
        differentPosition+=1;
    }
}
console.log(`Same position: ${samePosition}`)
console.log(`Same value but different position: ${differentPosition}`)


// Task 5. Sort and filter users

const users = [
    { name: "Alex", age: 25, city: "Warsaw" },
    { name: "Maria", age: 32, city: "Gdansk" },
    { name: "John", age: 19, city: "Berlin" },
    { name: "Oleg", age: 41, city: "Warsaw" },
    { name: "Anna", age: 25, city: "Krakow" }
];
console.log('________________________________________________________');
const sortByAgeUp =   [...users].sort((a, b) => a.age-b.age);
console.log(`Users sorted by age ascending\n`,sortByAgeUp)
const sortByAgeDown =   [...users].sort((a, b) => b.age-a.age);
console.log(`Users sorted by age descending\n`,sortByAgeDown)
const sortByName =   [...users].sort((a,b)=>a.name.localeCompare(b.name));
console.log(`Users sorted by name\n`,sortByName)
const usersNames = [];
const usersNamesOlder25 =[]
for (const usersNamesKey in users) {
    usersNames.push(users[usersNamesKey].name)
    if (users[usersNamesKey].age > 25) {
        usersNamesOlder25.push(users[usersNamesKey])
    }
}
console.log(`User names\n`,usersNames)
console.log(`Users older than 25\n`,usersNamesOlder25)
const userFromWarsaw =[]
for(const user in users) {
    if(users[user].city === 'Warsaw' && userFromWarsaw.length<1) {
        userFromWarsaw.push(users[user]);

    }
}
/* Или так
const userFromWarsaw =[]
for(const user in users) {
    if(users[user].city === 'Warsaw') {
        userFromWarsaw.push(users[user]);
        break;
    }
}*/
//метод find()
// const userFromWarsaw = users.find(user => user.city === "Warsaw")
console.log(`First user from Warsaw\n`,userFromWarsaw)

// Task 6. Remove duplicates and analyze products

const products = [
    { id: 1, title: "Phone", price: 1200, category: "electronics" },
    { id: 2, title: "Laptop", price: 2500, category: "electronics" },
    { id: 3, title: "Book", price: 40, category: "books" },
    { id: 4, title: "Phone", price: 1200, category: "electronics" },
    { id: 5, title: "Pen", price: 5, category: "stationery" },
    { id: 6, title: "Book", price: 40, category: "books" }
];
console.log('________________________________________________________');
const result = [...new Map(products.map(obj => [`${obj.title} ${obj.price}`,obj])).values()];
const arrTitle = [...new Map(result.map(obj => [obj.title,obj])).keys()];
const arrCategory = [...new Map(result.map(obj => [obj.category,obj])).keys()];
let receipt = 0
for(const item of result) {
    receipt +=item.price}
let categoriesStats = {};
result.forEach(item => {
    if(!categoriesStats[item.category]) {
        categoriesStats[item.category] = 0;
    }
    categoriesStats[item.category] ++
})

console.log(`удаление дубликатов: `,result)
console.log(`название товаров: `,arrTitle)
console.log(`категории без дублей: `,arrCategory);
console.log(`Total price: `,receipt);
console.log(`подсчет кол-ва товаров в категории: `,categoriesStats)
console.log(`все ключи: `,Object.keys(result[1]))
console.log(`все значения: `,Object.values(result[1]))
console.log(`все пары: `,Object.entries(result[1]))