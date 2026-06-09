// Task 1. Promise.race


function createPromise(id) {
    const randomTime = Math.floor(Math.random() * (5000 - 1000) + 1000);
    return new Promise(res => {
        setTimeout(() => res({ value: id, delay: randomTime }), randomTime);
    });
}
const promise1 = createPromise(1);
const promise2 = createPromise(2);
const promise3 = createPromise(3);


Promise.race([promise1, promise2, promise3]).then(({value}) => {
    console.log(`Fastest promise result: ${value}`);
});

Promise.all([promise1, promise2,promise3]).then(result => {
    result.forEach(({value,delay}) => {
        console.log(`Promise ${value} delay: ${delay} ms`);
    })

});


// Task 2. Async / await and square number


function getNum(){
    return  new Promise((resolve)=> {
        setTimeout(()=>resolve(Math.floor(Math.random() * (5) + 1)),3000)
    });
}
async function getSquare(){
    const result = await getNum();
    const square = result**2
    console.log(`Generated number: ${result}`);
    console.log(`Square: ${square}`);
}
// getSquare()

// Task 3. Sequential async operations


async function oneToFive(){
    return  new Promise((resolve)=> {
        setTimeout(()=>resolve(Math.floor(Math.random() * (5-1+1) + 1)),3000)
    });
}
async function sixToTen(){
    return  new Promise((resolve)=> {
        setTimeout(()=>resolve(Math.floor(Math.random() * (10-6+1)+6)),5000)
    });
}
async function result(){
    const first = await oneToFive();
    const second = await sixToTen();
    console.log(`First number: ${first}`);
    console.log(`Second number: ${second}`);
    console.log(`Sum: ${first+second}`);
 }

 // result()