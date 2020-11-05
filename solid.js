
// Single Responsibility Principles 

let box = document.querySelector('.parent');

class News{
    constructor(title, text){
        this.title = title;
        this.text = text;
        this.modified = false
    }

    update(text){
        this.text = text
        this.modified = true;
    }
}


class NewsPrinter{
    constructor(news){
        this.news = news;
    }

    html(){
        return `
            <div>
                <h1>${this.news.title}</h1>
                <p>${this.news.text}</p>
            </div>
        `
    }

    json(){
        return JSON.stringify({
            title: this.news.title,
            text: this.news.text,
            modified: this.news.modified
        }, null, 2);
    }


}

const printer = new NewsPrinter(new News("Mountain", "Summit of Himalaya mountains"));
console.log(printer.html());
console.log(printer.json());







//Open Close Prinsiples

class Shape{
    area(){
        throw new Error("Area method should be implemented");
    }
}

class Square extends Shape{
    constructor(size){
        super();
        this.size = size;
    }

    area(){
        return this.size ** 2;
    }
}

class Circle extends Shape{
    constructor(radius){
        super();
        this.radius = radius;
    }

    area(){
        return (this.radius ** 2) * Math.PI;
    }
}

class Rect extends Shape{
    constructor(width, height){
        super();
        this.width = width;
        this.height = height;
    }

    area(){
        return this.width * this.height;
    }
}

class AreaCalc{
    constructor(shapes = []){
        this.shapes = shapes;
    }

    sum(){
        return this.shapes.reduce((acc, shape)=> {
           acc += shape.area();
           return acc;
        }, 0)
    }
}

let calc = new AreaCalc([new Rect(5, 10), new Circle(20), new Square(4)]);
console.log(calc.sum());





// Liskov substiuation principle

class Person{

}

class Member extends Person{
    access(){
        console.log('You have entreance premisiion');        
    }
}

class Guest extends Person{
    isGuest = true;
}

class Frontend extends Member{
    canCreateFrontend(){
    }
}

class Backend extends Member{
    canCreateBackend(){
    }
}

class PersonFromOtherCompany extends Guest{
    access(){
        throw new Error('you have no premession');
    }
}

function openSequreDoor(member){
    member.access();
}

openSequreDoor(new Frontend());
openSequreDoor(new Backend());
// openSequreDoor(new PersonFromOtherCompany()); // here should be member





//Interface segragation priciples 


//whic one is not correct for building this

// class Animal{
//     constructor(name){
//         this.name = name;
//     }

//     walk(){
//         console.log(`${this.name} can walk`);
//     }

//     swim(){
//         console.log(`${this.name} can swim`);
//     }

//     fly(){
//         console.log(`${this.name} can fly`);
//     }
// }

// class Dog extends Animal{
//     fly(){
//         return null;
//     }
// }

// class Eagle extends Animal{
//     swim(){
//         return null;
//     }
// }

// class Whale extends Animal{
//     fly(){
//         return null;
//     }

//     walk(){
//         return null;
//     }
// }

// const dog = new Dog("chappi");
// dog.walk();
// dog.swim();
// dog.fly();

// const eagle = new Eagle("Ribird");
// eagle.walk();
// eagle.swim();
// eagle.fly();

// const whale = new Whale("Gig Blue Friend");
// whale.swim();
// whale.fly();
// whale.walk();


//Itreface segrartion building type
class Animal{
    constructor(name){
        this.name = name;
    }
}

const swimmer = {
    swim(){
        console.log(`${this.name} can swim`);
    }
}

const flier = {
    fly(){
        console.log(`${this.name} can fly`);
    }
}

const walker = {
    walk(){
        console.log(`${this.name} can walk`);
    }
}

class Dog extends Animal{}
class Eagle extends Animal{}
class Whale extends Animal{}

Object.assign(Dog.prototype, walker, swimmer);
Object.assign(Eagle.prototype, walker, flier);
Object.assign(Whale.prototype, swimmer);


const dog = new Dog("chappi");
dog.walk();
dog.swim();

const eagle = new Eagle("Ribird");
eagle.walk();
eagle.fly();

const whale = new Whale("Gig Blue Friend");
whale.swim();

