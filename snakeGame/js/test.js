let a = 'aba'
let count = 0
for (let i = 0; i <= a.length-1; i++) {
    for (let j = 1; j <= a.length; j++) {
        if (a[i] === a[j]) {
            b = a.split('').reverse().join('');
            count ++
            if(a === b){
               
                console.log(true)
            }
        }
    }
}

console.log(count)

