const obj = {
    alpa : 'alpa',
    beta : function(){console.log(this.alpa)}
}

obj.beta()

function ex(){
    console.log('hai')
}

// method MAP MANUAL
let map = function(arr,fn){
    const putar = function(arr, fn, newArr = [], i=0){
        if(arr[i] === i) return newArr
        return putar(arr, fn, [...newArr, fn(arr[i], i)], ++i)
    }
    return putar(arr, fn)
}


// method FILTER MANUAL
let arr = [-2,-1,0,1,2]

const filter = function(arr, fn){
    const putar = function(arr,fn, newArr=[], i=0){
        if(i === arr.length) return newArr
        let hasil = fn(arr[i], i)
        if(hasil) return putar(arr, fn, [...newArr,arr[i]], ++i)
        return putar(arr, fn, [...newArr], ++i)
    }
    return putar(arr,fn)
}

const hasil = filter(arr,(a) => a+1)
console.log(hasil)

// method reduce MANUAL
const nums = [1,2]
const reduce = function(nums, fn, init){
    const putar = function(nums, fn, init, i=0){
        if(nums.length === 0) return init
        if(nums.length === i) return init
        return putar(nums, fn, fn(init, nums[i]), ++i)
    }
    return putar(nums, fn, init)
}

let b = reduce(nums, (a,b) => {return a+b},1)
console.log(b)

// reduce right manual

let f = [x => x+1, x => x * x, x => 2 * x]
let x = 4

const compose = function(f){
    return function(x){
        let putar = function(f,x,i){
            if(i === -1) return x
            if(f.length === 0) return x
            return putar(f,f[i](x), --i)
        }
        return putar(f,x,f.length-1)
    }
}

const fn = compose(f)
console.log(fn(x))

// fungsi yang hanya bisa di panggil sekali

var once = function(fn){
    let state = {
        called : false
    }
    return function(...args){
        if(state.called) return undefined
        state.called = true
        return fn(...args)
    }
}

let aaa = (a,b,c) => a*b*c

let onceFn = once(aaa)
console.log(onceFn(5,7,4)) // bisa manggil
console.log(onceFn(2,3,6)) // gk bisa

let ppa = once(aaa)
console.log(ppa(1,2,3)) // bisa manggil karena membuat baru 

// MEMOIZE function => penggunaan CHACE =>> gk perlu menjalankan function nya lagi untuk input yang sama
function memoize(fn){
    let chace = {}
    return function(...arr){
        if(chace[arr.join(',')] != undefined) return chace[arr.join(',')]
        chace[arr.join(',')] = fn(...arr)
        return chace[arr.join(',')]
    }
}

// CURRY function
const sum = function(a,b,c) {return a+b}

var curry = function(fn){
    return function curried(...args){
        if(args.length < fn.length){
            console.log(args)
            /*
            CACAT disini, 
            ketika csum(1,2) => akan keluar function nya 
            karena argument tdk memenuhi jmlh parameter yg disediakan 
            dan fungsi keduanya gk di panggil 
            */
            return (...args2) => { 
                if(args2.length === 0) return 'argument kurang dari jumlah parameter'
                return curried(...args,...args2)
            }
        } 
        console.log(args)
        return fn(...args)
    }
}

const csum = curry(sum)
/*
Ketika argument tdk memenuhi jumlah parameter
fungsi kedua harus tetap di panggil 
seperti kode di bawah ini
*/
console.log(csum(1,2)())


let cukkk = {
    a : 'a',
    b : 'b',
    c : 'c'
}

console.log(cukkk)

cukkk = {
    ...cukkk,
    a : 'abc'
}

console.log(cukkk)