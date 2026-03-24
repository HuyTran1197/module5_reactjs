let array = [0,1,2,3,4,8,5,9,10]

const isPrime = n => {
    if (n<2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n%i===0){
            return false;
        }
    }
    return true;
}

const C = array.filter(isPrime);
console.log(C)


export default C ;