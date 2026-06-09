// Task 1. Dice game

function playDiceGame(playersCount, throwsCount) {
    let totalPlayers = []
    for(let i = 0; i < playersCount; i++) {
        totalPlayers.push({player: i+1,throws: [],total:null})
        for (let j = 0; j < throwsCount; j++) {
            totalPlayers[i].throws.push(Math.floor(Math.random() * 6) + 1 );
        }
    }
    totalPlayers.forEach((user)=>{
        let sumThrows = user.throws.reduce((acc, cur) => acc + cur, 0);
        user.total = sumThrows;
        console.log(`Player ${user.player} throws: ${user.throws}. Total: ${sumThrows}`);
    })
    let maxSumThrows = Math.max(...totalPlayers.map(player => player.total));
    const winners =totalPlayers.filter(player => player.total=== maxSumThrows);
    if (winners.length === 1) {
           console.log(`Winner: Player ${winners[0].player} with ${winners[0].total} points`)}
    else {
        console.log(`Draw between players: ${winners.map(w => `Player ${w.player}`).join(', ')}`)//тут очень долго пришлось думать
    }
}
playDiceGame(5,10);

// # Task 2. Split number into random parts

function splitNumber(number, partsCount) {
    let sum = [];
    let remaining = number;

    for (let i = 0; i < partsCount; i++) {
        if (i === partsCount - 1) {
            sum.push(remaining);
        } else {let max = remaining - (partsCount -i -1);
            let randomNumber = Math.floor(Math.random() * max) + 1;
            sum.push(randomNumber);
            remaining -= randomNumber;
        }
    }
    console.log(sum);
    console.log('Сумма:', sum.reduce((a, b) => a + b, 0));

}

splitNumber(10, 4);

//Task 3. Count Friday the 13th

function countFriday13(startDate,endDate){
    let start = new Date(startDate);
    let finish = new Date(endDate);
    let count = 0;
    let arrayFriday = [];
    let current = new Date(start.getFullYear(), start.getMonth(), 13);

    while (current <= finish) {
        if (current.getDay() === 5) {
            count++;
            // arrayFriday.push(current.toISOString().split('T')[0]);
            arrayFriday.push(current.toLocaleDateString());
        }


        current.setMonth(current.getMonth() + 1);
    }

    console.log(`Total Friday 13th count: ${count}`);
    console.log(`Friday 13th dates: \n${arrayFriday.join('\n')}`);
    return { count, dates: arrayFriday };


}
countFriday13("2026-01", "2026-12");
