
let ship = particle.create(width / 2, height / 2, 0, 0); 
let thrust = vector.create(0, 0);

document.addEventListener("keydown", (e)=>{
    switch(e.keyCode){
        case 38: //up
            thrust.setY(-0.1);
            break;
        case 40: //down
            thrust.setY(0.1);
            break;
        case 37: //left
            thrust.setX(-0.1);
            break;
        case 39: //right
            thrust.setX(0.1);
            break;
        default:
            break;
    }  
})

document.addEventListener("keyup", (e)=>{
    switch(e.keyCode){
        case 38: //up
            thrust.setY(0);
            break;
        case 40: //down
            thrust.setY(0);
            break;
        case 37: //left
            thrust.setX(0);
            break;
        case 39: //right
            thrust.setX(0);
            break;
        default:
            break;
    }  
})

function update() {
    context.clearRect(0, 0, width, height);

    ship.accelerate(thrust);
    ship.update();
    context.beginPath();
    context.arc(ship.position.getX(), ship.position.getY(), 10, 0, Math.PI * 2, false);
    context.fill();

    if(ship.position.getX() > width){
        ship.position.setX(0);
    }else if(ship.position.getX() < 0){
        ship.position.setX(width);
    }
    if(ship.position.getY() > height){
        ship.position.setY(0);
    }else if(ship.position.getY() < 0){
        ship.position.setY(height);
    }
    
    requestAnimationFrame(update);   
}

update();






class GameObject{
    constructor(context, x, y, vx, vy){
        this.context = context;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;

        this.isColliding = false;
    }
}

class Square extends GameObject{
    // default width and height
    static width = 50;
    static height = 50;

    constructor(context, x, y, vx, vy){
        super(context, x, y, vx, vy);
    }

    draw(){
        this.context.fillStyle = this.isColliding ? "red" : "blue";
        this.context.fillRect(this.x, this.y, Square.width, Square.height);
    }

    update(){
        this.x += this.vx;
        this.y += this.vy;
    }
}

let gameObjects;

function createWorld(){
    gameObjects = [
        new Square(context, 250, 50, .4, .4),
        new Square(context, 250, 300, .4, -.4),
        new Square(context, 150, 0, .4, .4),
        new Square(context, 20, 150, .4, .4),
        new Square(context, 350, 75, -.4, .4),
        new Square(context, 300, 100, .4, -.4)
    ];    
}

createWorld();

function gameLoop(){

    for(let i = 0; i < gameObjects.length; i++){
        gameObjects[i].update();
    }

    context.clearRect(0, 0, width, height);
    

    for(let i = 0; i < gameObjects.length; i++){
        gameObjects[i].draw();
    }

    detectCollision();

    requestAnimationFrame(gameLoop);
}

gameLoop();

function detectCollision(){
    let obj1;
    let obj2;

    //reset
    for(let i = 0; i < gameObjects.length; i++){
        gameObjects[i].isColliding = false;
    }

    //start for cheking collision
    for(let i = 0; i < gameObjects.length; i++){
        obj1 = gameObjects[i];

        for(let j = i + 1; j < gameObjects.length; j++){
            obj2 = gameObjects[j];

            if(rectIntersect(obj1.x, obj1.y, obj1.width, obj1.height, obj2.x, obj2.y, obj2.width, obj2.height)){
                obj1.isColliding = true;
                obj2.isColliding = true;
            }
        }
    }
}

function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2){
    if(x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2){
        return true;
        
    }
    return false;
}






let mouse = {
    x: width / 2,
    y: height / 2
}

window.addEventListener('mousemove', (e)=>{
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function getDistance(x1, y1, x2, y2){
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
}

function Circle(x, y, radius, color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.update = function(){
        this.draw();
    };

    this.draw = function(){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
        
    }
}

//iplementatio
let ball1;
let ball2;
function init(){
    ball1 = new Circle(width / 2, height / 2, 200, 'black');
    ball2 = new Circle(undefined, undefined, 30, 'red');
}

function animate(){
    context.clearRect(0, 0, width, height);

    ball1.update();

    ball2.update();
    ball2.x = mouse.x;
    ball2.y = mouse.y;
    
    detectCheck();
    
    requestAnimationFrame(animate);
}

function detectCheck(){
    if(getDistance(ball1.x, ball1.y, ball2.x, ball2.y) < ball1.radius + ball2.radius){
       ball1.color = 'red';
    }else{
        ball1.color = 'black';
    }
}

init();
animate();








function randomRange(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let mouse = {
    x: width / 2,
    y: height / 2
}

window.addEventListener('mousemove', (e)=>{
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function getDistance(x1, y1, x2, y2){
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
}

function Particle(x, y, radius, color){
    this.x = x;
    this.y = y;
    this.velocity = {
        x: Math.random() * -.5,
        y: Math.random() * -.5
    }
    this.radius = radius;
    this.color = color;

    this.update = function(particles){
        this.draw();

        for(let i = 0; i < particles.length; i++){
            if(this === particles[i]) continue;

            if(getDistance(this.x, this.y, particles[i].x, particles[i].y) - this.radius * 2 < 0){
               // console.log("Collided");
                
            }

            if(this.x - this.radius <= 0 || this.x + this.radius > width){
                this.velocity.x = -this.velocity.x;
            }

            if(this.y - this.radius <= 0 || this.y + this.radius > height){
                this.velocity.y = -this.velocity.y;
            }
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    };

    this.draw = function(){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.strokeStyle = this.color;
        context.stroke();
        
    }
}

//iplementatio
let objects;
function init(){
    objects = [];

    for(let i = 0; i < 4; i++){
        let radius = 100;
        let x = randomRange(radius, width - radius)
        let y = randomRange(radius, height - radius)
        let color = 'blue';

        if(i !== 0){
            for(let j = 0; j < objects.length; j++){
                if(getDistance(x, y, objects[j].x, objects[j].y) - radius * 2 < 0){
                    x = randomRange(radius, width - radius);
                    y = randomRange(radius, height - radius)

                    j = -1;
                }
            }
        }

        objects.push(new Particle(x, y, radius, color))
    }
}

function animate(){
    context.clearRect(0, 0, width, height);

    for(let i = 0; i < objects.length; i++){
        objects[i].update(objects);
    }
    
    requestAnimationFrame(animate);
}

function detectCheck(){
    if(getDistance(ball1.x, ball1.y, ball2.x, ball2.y) < ball1.radius + ball2.radius){
       ball1.color = 'red';
    }else{
        ball1.color = 'black';
    }
}

init();
animate();