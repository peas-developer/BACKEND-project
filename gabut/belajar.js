const id = Symbol("wow");
const beta = "234";
const p = Symbol("haw");
console.log(id);

// switch(id){
//     case id:
//         return id;
//     default:
//         console.log("cuals")
// }

if (id) {
  console.log(id);
} else {
  console.log("hai");
}

if (isNaN(beta)) {
  console.log("wow");
} else {
  console.log("cakks");
}

// Object

const user = {
  nama: "dika",
  kelas: "XII IPA 9",
  sekolah: "SMAN 100 Jakarta",
  nisn: "008833992",
};

user.eskul = "futsal";
delete user.nisn;

console.log(user);

const arr = [1, 2, 3, 4, 5, 6, 7];

let obj = {};

console.log(...arr);

console.log({ ...user, ...arr });

console.log(obj);

const { nama: names, kelas: clas, sekolah: school, eskul: escool } = user;

console.log(names, clas, school, escool);

const [, , g] = arr;
console.log(g);

let obj2 = {
  true: "wow",
};

let myMap = new Map([
  ["satu", "satu"],
  [true, "benar"],
]);

console.log(myMap.has(true));

const mySet = new Set([1, 2, 3, 4, 4, 4, 4, 43, 3, 3]);
console.log(mySet.size, myMap.size);

// Function

myFunc(1, 2, 2, 3, 4, 5);

function myFunc(satu, ...ckass) {
  console.log(arguments);
}

const myFanc = function (...caks) {
  console.log(caks);
};
myFunc(1, 1, 1, 1, 1, 1);

console.log(myFanc, myFunc);

const caks = () => "cuaaks";

console.log(caks);

//  Closure

function a() {
  let coba = "abcdef";
  function b() {
    function c() {
      console.log(coba);
    }
    c();
  }
  b();
}

a();

// oop

const Mobil = {
  brand: "ford",
  drive: () => cakss,
};

// consstructor function (functional programming)
function Car(brand) {
  this.brand = brand;
}

Car.prototype.drive = function () {
  console.log("sedang mengendarai", this.brand);
};

const car1 = new Car("toyota");
console.log(car1);

car1.drive();

// constructor function (Class based Programming)
class Gadget {
  constructor(brand) {
    this.brand = brand;
  }
  powerOn(model) {
    console.log("nyalakan hp", this.brand, model);
  }
}

const samsung = new Gadget("samsung");
samsung.powerOn("galaxy s20");

// propoerti & method (Getter, Setter, member Visibility)

class Name {
  #cha = "cuaks";
  constructor(firstName, lastName) {
    (this.firstName = firstName), (this.lastName = lastName);
  }

  get fullName() {
    console.log(this.firstName, this.lastName, this.#cha);
  }

  set fullName(fullName) {
    let [firstName, lastName] = fullName.split(" ");
    this.firstName = firstName;
    this.lastName = lastName;
    this.#cha = "ppp";
  }
}

const arif = new Name();
arif.fullName = "tara tiri";
arif.fullName;

// inheritance (class based)

class Nama extends Name {
  constructor(firstName, middleName, lastName) {
    super(firstName, lastName);
    this.middleName = middleName;
  }
}

const pis = new Nama("satu", "dua", "tiga");

console.log(pis);

pis.fullName;

// inheritance (prototype based)
function Kendaraan(brand, jenis) {
  this.brand = brand;
  this.jenis = jenis;
}

Kendaraan.prototype.drive = function () {
  console.log("kendaraan", this.brand);
};

function Motor(brand, model, jenis) {
  Kendaraan.call(this, brand, jenis); // WAJIB
  this.model = model;
}

Motor.prototype = Object.create(Kendaraan.prototype); // WAJIB
Motor.prototype.constructor = Motor; // WAJIB

let w175 = new Motor("honda", "ADV", "motor");
w175.drive();
console.log(w175.model);
console.log(w175);

// Overriding
class Buku {
  constructor(kategori) {
    this.kategori = kategori;
  }
  baca() {
    return "baca buku";
  }
}

class Novel extends Buku {
  constructor(kategori) {
    super(kategori);
  }

  baca() {
    let p = super.baca();
    console.log(p, "novel");
  }
}

let bumi = new Novel("novel");
console.log(bumi);

bumi.baca();

//

let person = {
  firstName: "ayaka",
};

let manusia = Object.create(person);
manusia.lastName = "sakura";
console.log(manusia.firstName, manusia.lastName);
console.log(manusia);

console.log(bumi instanceof Object);

// Functional Programming

// gabut

const abc = function(a,b){
  return a + b
}(1,2)

console.log(typeof abc)

// Asynchronus
function getUsers(callback){
  setTimeout(() => {
    const users = ['john','jack']
    callback(users)
  }, 0);
}

getUsers((users) => console.log(users))

// promise
function beliTiket(duit){
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      if(duit < 5000){
        reject('kurang duit')
        return
      }
      resolve('dapat tiket')
    },0)
  })
}

function cekTiket(tiket){
  return new Promise((resolve, reject) => {
    if(!tiket) reject('gk ada tiket')
    resolve('punya tiket')
  })
}



beliTiket(4000)
  .then((tiket) => cekTiket(tiket))
  .then((cek) => console.log(cek))
  .catch((e)=>console.log(e) )