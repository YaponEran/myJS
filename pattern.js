
//--------------------------- CREATIONAL PATTERN --------

//Constructor pattern

class Server{
    constructor(name, ip){
        this.name = name;
        this.ip = ip;
    }
}

//factor pattern

class SimpleMemberShip{
     constructor(name){
         this.name = name;
         this.cost = 50;
     }
}

class StandartMemberShip{
    constructor(name){
        this.name = name;
        this.cost = 150;
    }
}

class PremiunMemberShip{
    constructor(name){
        this.name = name;
        this.cost = 250;
    }
}

class MemberFactory{
    static list = {
        siple: SimpleMemberShip,
        standart: StandartMemberShip,
        premium: PremiunMemberShip
    }

    cretate(name, type = 'simple'){
        const MemberShip = MemberFactory.list[type] || MemberFactory.list.siple;
        const member = new MemberShip(name);

        member.type = type;
        member.define = function(){
            console.log(`${this.name} : (${this.type}) : ${this.cost}`);
        }

        return member;
    }
}

const factory = new MemberFactory;
const members = [
    factory.cretate("Erandal", "simple"),
    factory.cretate("Zubi", "standart"),
    factory.cretate("Mama", "premium")
]

members.forEach(m=>{
    m.define();
})



//prototype pattern

let car = {
    wheels: 4,
    init(){
        console.log(`I have ${this.wheels} wheels, my owner is ${this.owner}`);
        
    }
}

let carOwner = Object.create(car, {
    owner: {
        value: "Erandal"
    }
});

carOwner.init();


//SingleTon Pattern

class Database{
    constructor(data){
        if(Database.exist){
            return Database.instance;
        }
        Database.instance = this;
        Database.exist = true;
        this.data = data;
    }

    getData(){
        return this.data;
    }
}

const mongo = new Database('ErandaDB');
console.log(mongo.getData());

const mySql = new Database('MySQL');
console.log(mySql.getData());


//--------------------------- STRUCTURAL PATTERN --------


// Adatper PATTERN

// can help when we have old function can use in new version function

class OldCalc{
    operations(t1, t2, operation){
        switch(operation){
            case 'add': return t1 + t2;
            case 'sub': return t1 - t2;
            default: return NaN;
        }
    }
}

class NewCalc{
    add(t1, t2){
        return t1 + t2;
    }

    sub(t1, t2){
        return t1 - t2;
    }
}

class CalcAdapter{
    constructor(){
        this.calc = new NewCalc();
    }

    operations(t1, t2, operation){
        switch(operation){
            case 'add': return this.calc.add(t1, t2);
            case 'sub': return this.calc.sub(t1, t2); 
            default: return NaN;
        }
    }
}

const oldCalc = new OldCalc();
console.log(oldCalc.operations(10, 10, 'add'));

const newCalc = new NewCalc();
console.log(newCalc.add(30, 40));

const calcAdapter = new CalcAdapter();
console.log(calcAdapter.operations(5, 9, 'add'));



// Decoreater PATTERN

class Server{
    constructor(ip, port){
        this.ip = ip;
        this.port = port;
    }

    get url(){
        return `https:// ${this.ip} : ${this.port}`;
    }
}

function azure(server){
    server.isAzure = true;
    server.port += 500;
    return server;
}

function aws(server){
    server.isAWS = true;
    server.awsInfo = function(){
        return server.url;
    }

    return server;
}

const s1 = aws(new Server('12.34.56.78', 8080));
console.log(s1.isAWS);
console.log(s1.awsInfo());

console.log('-------------------');

const s2 = azure(new Server('98.99.01.45', 1000));
console.log(s2.isAzure);
console.log(s2.url);





// Fasad PATTERN

class Compliants{
    constructor(){
        this.complaint = [];
    }

    reply(complaint){}

    add(complaint){
        this.complaint.push(complaint);
        return this.reply(complaint);
    }
}

class ProductComplaints extends Compliants{
    reply({id, customer, details}){
        return `Product ${id} : ${customer} (${details})`;
    }
}

class ServiceComplaints extends Compliants{
    reply({id, customer, details}){
        return `Service ${id} : ${customer} (${details})`;
    }
}

class CompliantRegistry{
    registr(customer, type, details){
        const id = Date.now();
        let complaint

        if(type == 'service'){
            complaint = new ServiceComplaints();
        }else{
            complaint = new ProductComplaints();
        }

        return complaint.add({id, customer, details});
    }
}

const registr = new CompliantRegistry();
console.log(registr.registr('Erandal', 'product', 'bad souce and non fresh juice'));
console.log(registr.registr('Zubi', 'service', 'need wait so long time'));




// FLYWEIGHT PATTERN

class Car{
    constructor(model, price){
        this.model = model;
        this.price = price;
    }
}

class CarFactory{
    constructor(){
        this.cars = [];
    }

    create(model, price){
        const conditate = this.getCar(model)
        if(conditate){
            return conditate;
        }

        const newCar = new Car(model, price);
        this.cars.push(newCar);
        return newCar
    }

    getCar(model){
        return this.cars.find(car => car.model === model);
    }
}

const factory = new CarFactory();
const bmwX6 = factory.create('bmw', 5000);
const accent = factory.create('hyudai', 33000);
console.log(bmwX6);
console.log(accent);


//PROXY PATTERN 

function netwrokFetch(url){
    return `${url} - The answer from server`;
}

const cache =  new Set();
const proxyFetch = new Proxy(netwrokFetch, {
    apply(target, thisArg, args){
        const url = args[0];
        if(cache.has(url)){
            return `${url} - Answer from cache`;
        }else{
            cache.add(url);
            return Reflect.apply(target, thisArg, args);
        }
    }
})

console.log(proxyFetch('angular.io'));
console.log(proxyFetch('react.io'));
console.log(proxyFetch('react.io'));




//--------------------------- BEHAVIOUR PATTERN --------

// Chain Of Responsibility PATTERN

class MySum{
    constructor(initialValue = 42){
        this.sum = initialValue;
    }

    add(value){
        this.sum += value;
        return this
    }
}

const sum1 = new MySum();
console.log(sum1.add(8).add(10).add(5).sum);

const sum2 = new MySum(0);
console.log(sum2.add(1).add(2).add(3).sum);



// Comand PATTERN semila REDUX 

class MyMAth{
    constructor(initialValue = 0){
        this.number = initialValue;
    }

    square(){
        return this.number ** 2;
    }

    cube(){
        return this.number ** 3;
    }
}

class Command{
    constructor(subject){
        this.subject = subject;
        this.commandsExecuted = [];
    }

    execute(command){
        this.commandsExecuted.push(command);
        return this.subject[command]();
    }
}

const x = new Command(new MyMAth(2));
console.log(x.execute('square'));
console.log(x.execute('cube'));
console.log(x.commandsExecuted);



//Iterator PATTERN

class MyIterator{
    constructor(data){
        this.index = 0;
        this.data = data;
    }

    [Symbol.iterator](){
        return {
            next: ()=>{
                if(this.index < this.data.length){
                     return {
                         value: this.data[this.index++],
                         done: false
                     }
                }else{
                     this.index = 0;
                     return{
                         done: true,
                         value: undefined
                     }
                }
            }
        }
    }
}

const iterator = new MyIterator(['This', 'is', 'iterator']);

for(const val of iterator){
    console.log("Val", val);
    
}

// Mediator PATTERN

class Useer{
    constructor(name){
        this.name = name;
        this.room = null;
    }

    send(message, to){
        this.room.send(message, this, to);
    }

    recieve(message, from){
        console.log(`${from.name} => ${this.name} : ${message}`);
    }
}

class ChatRoom{
    constructor(){
        this.users = {};
    }

    registr(user){
        this.users[user.name] = user;
        user.room = this;
    }

    send(message, from, to){
        if(to){
            to.recieve(message, from);
        }else{
            Object.keys(this.users).forEach(key=>{
                 if(this.users[key] !== from){
                     this.users[key].recieve(message, from);
                 }
            })
        }
    }
}

const Eran = new Useer("Erandal");
const Zubi = new Useer("Zubi");
const Tema = new Useer("Artem");

const room = new ChatRoom();

room.registr(Eran);
room.registr(Zubi);
room.registr(Tema);

Eran.send("Jannym Menim", Zubi);
Tema.send("Rovshik kak ty", Eran);
Eran.send("Hello every one");


 
//Observer PATTERN

class Subject{
    constructor(){
        this.observesrs = [];
    }

    subscribe(observer){
        this.observesrs.push(observer)
    }

    unSubscribe(observer){
        this.observesrs = this.observesrs.filter(obs=> obs !== observer)
    }

    fire(changes){
        this.observesrs.forEach(observer=>{
            observer.update(changes);
        })
    }
}

class Observer{
    constructor(state = 1){
        this.state = state;
        this.initalState = state;
    }

    update(changes){
        switch(changes.type){
            case 'INCREMENT':
                this.state = ++this.state;
                break;
            case 'SUBTRACT':
                this.state = --this.state;
                break;
            case "ADD":
                this.state += changes.payload;
                break;
            default : this.state = this.initalState;
        }
    }
}

const stream$ = new Subject();

const obs1 = new Observer();
const obs2 = new Observer(42);

stream$.subscribe(obs1);
stream$.subscribe(obs2);

stream$.fire({type: 'INCREMENT'});
stream$.fire({type: 'INCREMENT'});
stream$.fire({type: 'ADD', payload: 10});

console.log(obs1);
console.log(obs2);


// STATE PATTERN

class Light{
    constructor(light){
        this.light = light;
    }
}

class RedLight extends Light{
    constructor(){
        super('red');
    }

    sign(){
        return 'STOP';
    }
}

class YellowLight extends Light{
    constructor(){
        super('yellow');
    }

    sign(){
        return 'ready';
    }
}

class GreenLight extends Light{
    constructor(){
        super('green');
    }

    sign(){
        return 'Go';
    }
}

class TraficLight{
    constructor(){
        this.states = [
            new RedLight(),
            new YellowLight,
            new GreenLight
        ];

        this.current = this.states[0];
    }

    change(){
        const total = this.states.length;
        let index = this.states.findIndex(light=> light === this.current);

        if(index + 1 < total){
            this.current = this.states[index + 1];
        }else{
            this.current = this.states[0];
        }
    }

    sign(){
        return this.current.sign();
    }
}

const trafic = new TraficLight()
trafic.change();
trafic.change();
console.log(trafic.sign());



// Strategy PATTERN

class Vehicle{
    travelTIme(){
        return this.timeTaken;
    }
}

class Bus extends Vehicle{
    constructor(){
        super()
        this.timeTaken = 10; 
    }
}

class Taxi extends Vehicle{
    constructor(){
        super()
        this.timeTaken = 5; 
    }
}

class Car extends Vehicle{
    constructor(){
        super()
        this.timeTaken = 3; 
    }
}

class Commute{
    trave(transport){
        return transport.travelTIme();
    }
}

let commute = new Commute()

console.log(commute.trave(new Taxi));




