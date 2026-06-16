// Task 1
const arrayStrNumbers = ['123', ,'','456','789.567', 'f556',
    '1.3','33hello', "Infinity", "null", "123n",'1/3','1,3'];
function formatCurrency(arr){
    [...arr].map(item => {

        if(  isFinite(item)&&item!==''){
            console.log(new Intl.NumberFormat('en-US',
            {style: 'currency',
                currency: 'USD'}).format(item));

        }else {console.error(`${item} - это я не смогу преобразовать в валюту`);}
    })
}
formatCurrency(arrayStrNumbers)

// Task 2

const array = [123, ,'',0,-0,'789.567', -1,'1.3',undefined, Infinity, null, 123n,0n,NaN,false,true];

function notFalsySort(arr){
   return console.log(arr.filter(Boolean).sort((a,b) => (b>a)-(a<b)));

}
notFalsySort(array);

// Task 3

const users = [
    {name:"Alex", age:10},
    {name:"Petr", age:30},
    {name:"Jan", age:30},
    {name:"Fedya", age:20},
]

function groupUsers(arr){
    const obj = {}
    arr.forEach(item => {
        if(!obj[item.age]){
            obj[item.age]=[];
        }
        obj[item.age].push(item.name);
    })
    return obj
}

console.log(groupUsers(users))


// Task 4

const arrayPromise = [
    function(){return new Promise((resolve) => {
        setTimeout(()=>resolve(1),3000)
    });},
    function(){return new Promise((resolve) => {
        setTimeout(()=>resolve(2),1000)
    });},
    function(){return new Promise((resolve) => {
        setTimeout(()=>resolve(3),2000)
    });},
]
async function runPromise(arr){
    for(const item of arr){
        let res = await item();
        console.log(res);

    }

}

runPromise(arrayPromise)

// Task 5

function tableMult(n){
    let table = [];
    let head = " X | ";
    let sumOfRows = [];
    let sumOfCols = sumOfRows;
    let total = [];
    if (n<1|| !Number.isInteger(n)){
        return console.log("Вы ввели некорректное значение");
    }
    for (let i = 1; i <= n; i++){
        head += i.toString().padStart(4,' ')+'  ';
    }
    table.push(head);
    table.push('---+-' + '-'.repeat(n*6));
    for(let i = 1; i <= n; i++){
        let row = i.toString().padStart(2,' ') +" | ";
        let count= 0
        for(let j = 1; j <= n; j++){
            row +=(j*i).toString().padStart(4,' ')+"  ";
            count+=j*i
            total.push(i*j);
    }
        table.push(row);
        sumOfRows.push(count);
        count=0;
}
    table.push('---+-' + '-'.repeat(n*6));
    table.push(`Сумма значений в строке: ${sumOfRows}`);
    table.push(`Сумма значений в столбце: ${sumOfCols}`);
    table.push(`Общая сумма значений в таблице: ${total.reduce((a,b)=>a+b,0)}`);

    console.log( table.join('\n'));


}
// let num=+prompt()
tableMult(10);

// Task 6

 new Promise(resolve => {
    resolve(Math.floor(Math.random()*10)+1);
}).then(result=>{
    setTimeout(()=>result,3000)
     return result**2
}).then(result=>{
    setTimeout(()=>result,3000)
     return result**2
 }).then(result=>{
     setTimeout(()=>console.log(result),3000)
 })
