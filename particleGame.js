//PART 1

class Player{
    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw(){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color
        context.fill();
    }
}

class Projectile{
    constructor(x, y, radius, color, velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw(){
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
    }

    update(){
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}

let x = width / 2;
let y = height / 2;
let player = new Player(x, y, 30, 'blue');
player.draw();


let projectiles = [];


window.addEventListener('click', (e)=>{

    let angle = Math.atan2(e.clientY - height / 2, e.clientX - width / 2);
    let velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }

    projectiles.push(new Projectile(width / 2, height / 2, 5, 'red', velocity))
})

function animate(){
    context.clearRect(0, 0, width, height);
    
    projectiles.forEach(projectile=>{
        
        projectile.update();
    })

    requestAnimationFrame(animate);
}

animate();

//------------------------------------------------------------------------------------------------------------------------

//PART 2 -- with enemy addition

//Player
class Player{
    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw(){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color
        context.fill();
    }
}


//Boolean
class Projectile{
    constructor(x, y, radius, color, velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw(){
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
    }

    update(){
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}

//Enemies
class Enemy{
    constructor(x, y, radius, color, velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw(){
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
    }

    update(){
        this.draw();

        this.x += this.velocity.x;
        this.y += this.velocity.y
    }
}

let x = width / 2;
let y = height / 2;
let player = new Player(x, y, 30, 'blue');


let projectiles = [];
let enemies = [];

window.addEventListener('click', (e)=>{

    let angle = Math.atan2(e.clientY - height / 2, e.clientX - width / 2);
    let velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }

    projectiles.push(new Projectile(width / 2, height / 2, 5, 'red', velocity))
})


function spawnEnemies(){
    setInterval(function(){
        let radius = 30;
        let x = Math.random() < 0.5 ? 0 - radius : width + radius;
        let y = Math.random() < 0.5 ? 0 - radius : height + radius;
        let color = 'green';

        let angle = Math.atan2(height / 2 - y, width / 2 - x);
        let velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        enemies.push(new Enemy(x, y, radius, color, velocity));


    }, 1000)
}

function animate(){
    context.clearRect(0, 0, width, height);

    player.draw();

    projectiles.forEach(projectile=>{
        projectile.update();
    })

    enemies.forEach(enemy=>{
        enemy.update();
    })

    requestAnimationFrame(animate);
}

animate();
spawnEnemies();


//------------------------------------------------------------------------------------------------------------------------

//PART 3 -- fixed Enemy movemen versio


//Player
class Player{
    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw(){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color
        context.fill();
    }
}


//Boolean
class Projectile{
    constructor(x, y, radius, color, velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw(){
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
    }

    update(){
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}

//Enemies
class Enemy{
    constructor(x, y, radius, color, velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw(){
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
    }

    update(){
        this.draw();

        this.x += this.velocity.x;
        this.y += this.velocity.y
    }
}

let x = width / 2;
let y = height / 2;
let player = new Player(x, y, 30, 'blue');


let projectiles = [];
let enemies = [];

window.addEventListener('click', (e)=>{

    let angle = Math.atan2(e.clientY - height / 2, e.clientX - width / 2);
    let velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }

    projectiles.push(new Projectile(width / 2, height / 2, 5, 'red', velocity))
})


function spawnEnemies(){
    setInterval(function(){
        let radius = 30;

        let x, y;
        if(Math.random() < 0.5){

             x = Math.random() < 0.5 ? 0 - radius : width + radius;
             y = Math.random() * height;
            //  y = Math.random() < 0.5 ? 0 - radius : height + radius;
        }else{
            x = Math.random() * width;
            y = Math.random() < 0.5 ? 0 - radius : height + radius;
        }

        let color = 'green';

        let angle = Math.atan2(height / 2 - y, width / 2 - x);
        let velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        enemies.push(new Enemy(x, y, radius, color, velocity));


    }, 1000)
}

function animate(){
    context.clearRect(0, 0, width, height);

    player.draw();

    projectiles.forEach(projectile=>{
        projectile.update();
    })

    enemies.forEach(enemy=>{
        enemy.update();
    })

    requestAnimationFrame(animate);
}

animate();
spawnEnemies();


//------------------------------------------------------------------------------------------------------------------------

//PART 4 -- bool killing enemy 


//Player
class Player{
    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw(){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color
        context.fill();
    }
}


//Boolean
class Projectile{
    constructor(x, y, radius, color, velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw(){
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
    }

    update(){
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}

//Enemies
class Enemy{
    constructor(x, y, radius, color, velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw(){
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
    }

    update(){
        this.draw();

        this.x += this.velocity.x;
        this.y += this.velocity.y
    }
}

let x = width / 2;
let y = height / 2;
let player = new Player(x, y, 30, 'blue');


let projectiles = [];
let enemies = [];

window.addEventListener('click', (e)=>{

    let angle = Math.atan2(e.clientY - height / 2, e.clientX - width / 2);
    let velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }

    projectiles.push(new Projectile(width / 2, height / 2, 5, 'red', velocity))
})


function spawnEnemies(){
    setInterval(function(){
        let radius = Math.random() * (30 - 4) + 4;

        let x, y;
        if(Math.random() < 0.5){

             x = Math.random() < 0.5 ? 0 - radius : width + radius;
             y = Math.random() * height;
            //  y = Math.random() < 0.5 ? 0 - radius : height + radius;
        }else{
            x = Math.random() * width;
            y = Math.random() < 0.5 ? 0 - radius : height + radius;
        }

        let color = 'green';

        let angle = Math.atan2(height / 2 - y, width / 2 - x);
        let velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        enemies.push(new Enemy(x, y, radius, color, velocity));


    }, 1000)
}

function animate(){
    context.clearRect(0, 0, width, height);

    player.draw();

    projectiles.forEach(projectile=>{
        projectile.update();
    })

    enemies.forEach((enemy, index)=>{
        enemy.update();

        projectiles.forEach((projectile, p_index)=>{
            let dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

            if(dist - enemy.radius - projectile.radius < 1){
                
                enemies.splice(index, 1);
                projectiles.splice(p_index, 1)
            }
        })
    })

    requestAnimationFrame(animate);
}

animate();
spawnEnemies();

//------------------------------------------------------------------------------------------------------------------------

//PART 5  Stop game when enemy touch player


//Player
class Player{
    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw(){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color
        context.fill();
    }
}


//Boolean
class Projectile{
    constructor(x, y, radius, color, velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw(){
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
    }

    update(){
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}

//Enemies
class Enemy{
    constructor(x, y, radius, color, velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw(){
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
    }

    update(){
        this.draw();

        this.x += this.velocity.x;
        this.y += this.velocity.y
    }
}

let x = width / 2;
let y = height / 2;
let player = new Player(x, y, 30, 'blue');


let projectiles = [];
let enemies = [];

window.addEventListener('click', (e)=>{

    let angle = Math.atan2(e.clientY - height / 2, e.clientX - width / 2);
    let velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }

    projectiles.push(new Projectile(width / 2, height / 2, 5, 'red', velocity))
})


function spawnEnemies(){
    setInterval(function(){
        let radius = Math.random() * (30 - 4) + 4;

        let x, y;
        if(Math.random() < 0.5){

             x = Math.random() < 0.5 ? 0 - radius : width + radius;
             y = Math.random() * height;
            //  y = Math.random() < 0.5 ? 0 - radius : height + radius;
        }else{
            x = Math.random() * width;
            y = Math.random() < 0.5 ? 0 - radius : height + radius;
        }

        let color = 'green';

        let angle = Math.atan2(height / 2 - y, width / 2 - x);
        let velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        enemies.push(new Enemy(x, y, radius, color, velocity));


    }, 1000)
}

let animtionId;
function animate(){
    context.clearRect(0, 0, width, height);
    animtionId = requestAnimationFrame(animate);
    player.draw();

    projectiles.forEach(projectile=>{
        projectile.update();
    })

    enemies.forEach((enemy, index)=>{
        enemy.update();

        let dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);

        if(dist - enemy.radius - player.radius < 1){
            cancelAnimationFrame(animtionId);
        }

        projectiles.forEach((projectile, p_index)=>{
            let dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

            if(dist - enemy.radius - projectile.radius < 1){
                
                setTimeout(()=>{
                    enemies.splice(index, 1);
                    projectiles.splice(p_index, 1)
                }, 0)
            }
        })
    })
}

animate();
spawnEnemies();


//------------------------------------------------------------------------------------------------------------------------

//PART 6  removing bool when outer window size 


//Player
class Player{
    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw(){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color
        context.fill();
    }
}


//Boolean
class Projectile{
    constructor(x, y, radius, color, velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw(){
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
    }

    update(){
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}

//Enemies
class Enemy{
    constructor(x, y, radius, color, velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw(){
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
    }

    update(){
        this.draw();

        this.x += this.velocity.x;
        this.y += this.velocity.y
    }
}

let x = width / 2;
let y = height / 2;
let player = new Player(x, y, 30, 'blue');


let projectiles = [];
let enemies = [];

window.addEventListener('click', (e)=>{

    let angle = Math.atan2(e.clientY - height / 2, e.clientX - width / 2);
    let velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }

    projectiles.push(new Projectile(width / 2, height / 2, 5, 'red', velocity))
})


function spawnEnemies(){
    setInterval(function(){
        let radius = Math.random() * (30 - 4) + 4;

        //diferes direction enemie algoritm
        let x, y;
        if(Math.random() < 0.5){

             x = Math.random() < 0.5 ? 0 - radius : width + radius;
             y = Math.random() * height;
            //  y = Math.random() < 0.5 ? 0 - radius : height + radius;
        }else{
            x = Math.random() * width;
            y = Math.random() < 0.5 ? 0 - radius : height + radius;
        }

        let color = 'green';

        let angle = Math.atan2(height / 2 - y, width / 2 - x);
        let velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        enemies.push(new Enemy(x, y, radius, color, velocity));


    }, 1000)
}

let animtionId;
function animate(){
    context.clearRect(0, 0, width, height);
    animtionId = requestAnimationFrame(animate);

    player.draw();

    //removing projectiles when outder window size
    projectiles.forEach((projectile, bool_index)=>{
        projectile.update();

        if(projectile.x + projectile.radius < 0 || projectile.x - projectile.radius > width ||
            projectile.y - projectile.radius < 0 || projectile.y + projectiles.radius > height){
            setTimeout(()=>{
                projectiles.splice(bool_index, 1);
            }, 0)
        }
    })

    enemies.forEach((enemy, index)=>{
        enemy.update();

        let dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);

        if(dist - enemy.radius - player.radius < 1){
            cancelAnimationFrame(animtionId);
        }

        projectiles.forEach((projectile, p_index)=>{
            let dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

            if(dist - enemy.radius - projectile.radius < 1){
                
                setTimeout(()=>{
                    enemies.splice(index, 1);
                    projectiles.splice(p_index, 1)
                }, 0)
            }
        })
    })
}

animate();
spawnEnemies();


//------------------------------------------------------------------------------------------------------------------------

//PART 7 // different enemy color and Enemy mechanic


//Player
class Player{
    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw(){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color
        context.fill();
    }
}


//Boolean
class Projectile{
    constructor(x, y, radius, color, velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw(){
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
    }

    update(){
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}

//Enemies
class Enemy{
    constructor(x, y, radius, color, velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw(){
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
    }

    update(){
        this.draw();

        this.x += this.velocity.x;
        this.y += this.velocity.y
    }
}

let x = width / 2;
let y = height / 2;
let player = new Player(x, y, 10, 'white');


let projectiles = [];
let enemies = [];

window.addEventListener('click', (e)=>{

    let angle = Math.atan2(e.clientY - height / 2, e.clientX - width / 2);
    let velocity = {
        x: Math.cos(angle) * 4,
        y: Math.sin(angle) * 4
    }

    projectiles.push(new Projectile(width / 2, height / 2, 5, 'white', velocity))
})


function spawnEnemies(){
    setInterval(function(){
        let radius = Math.random() * (30 - 4) + 4;

        //diferes direction enemie algoritm
        let x, y;
        if(Math.random() < 0.5){

             x = Math.random() < 0.5 ? 0 - radius : width + radius;
             y = Math.random() * height;
            //  y = Math.random() < 0.5 ? 0 - radius : height + radius;
        }else{
            x = Math.random() * width;
            y = Math.random() < 0.5 ? 0 - radius : height + radius;
        }

        let color = `hsl(${Math.random() * 360}, 50%, 50%)`;

        let angle = Math.atan2(height / 2 - y, width / 2 - x);
        let velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        enemies.push(new Enemy(x, y, radius, color, velocity));


    }, 1000)
}

let animtionId;
function animate(){
    context.fillStyle = 'rgba(0, 0, 0, 0.1)';
    context.fillRect(0, 0, width, height);
    animtionId = requestAnimationFrame(animate);

    player.draw();

    //removing projectiles when outder window size
    projectiles.forEach((projectile, bool_index)=>{
        projectile.update();

        if(projectile.x + projectile.radius < 0 || projectile.x - projectile.radius > width ||
            projectile.y - projectile.radius < 0 || projectile.y + projectiles.radius > height){
            setTimeout(()=>{
                projectiles.splice(bool_index, 1);
            }, 0)
        }
    })

    enemies.forEach((enemy, index)=>{
        enemy.update();

        let dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);

        if(dist - enemy.radius - player.radius < 1){
            cancelAnimationFrame(animtionId);
        }

        projectiles.forEach((projectile, p_index)=>{
            let dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

            //when bool touch enemy
            if(dist - enemy.radius - projectile.radius < 1){
                
                if(enemy.radius - 10 > 10){
                    enemy.radius -= 10;
                    setTimeout(()=>{
                        projectiles.splice(p_index, 1)
                    }, 0)
                }else{
                    setTimeout(()=>{
                        enemies.splice(index, 1);
                        projectiles.splice(p_index, 1)
                    }, 0)
                }
            }
        })
    })
}

animate();
spawnEnemies();



//------------------------------------------------------------------------------------------------------------------------

// PART 9 FINISH


//Player
class Player{
    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw(){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color
        context.fill();
    }
}


//Boolean
class Projectile{
    constructor(x, y, radius, color, velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw(){
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
    }

    update(){
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}

//Enemies
class Enemy{
    constructor(x, y, radius, color, velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw(){
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
    }

    update(){
        this.draw();

        this.x += this.velocity.x;
        this.y += this.velocity.y
    }
}

class Explosion{
    constructor(x, y, radius, color, velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
    }

    draw(){
        context.save();
        context.globalAlpha = this.alpha;
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
        context.restore();
    }

    update(){
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.01;
    }
}

let x = width / 2;
let y = height / 2;
let player = new Player(x, y, 10, 'white');


let projectiles = [];
let enemies = [];
let explosions = [];

window.addEventListener('click', (e)=>{

    let angle = Math.atan2(e.clientY - height / 2, e.clientX - width / 2);
    let velocity = {
        x: Math.cos(angle) * 4,
        y: Math.sin(angle) * 4
    }

    projectiles.push(new Projectile(width / 2, height / 2, 5, 'white', velocity))
})


function spawnEnemies(){
    setInterval(function(){
        let radius = Math.random() * (30 - 4) + 4;

        //diferes direction enemie algoritm
        let x, y;
        if(Math.random() < 0.5){

             x = Math.random() < 0.5 ? 0 - radius : width + radius;
             y = Math.random() * height;
            //  y = Math.random() < 0.5 ? 0 - radius : height + radius;
        }else{
            x = Math.random() * width;
            y = Math.random() < 0.5 ? 0 - radius : height + radius;
        }

        let color = `hsl(${Math.random() * 360}, 50%, 50%)`;

        let angle = Math.atan2(height / 2 - y, width / 2 - x);
        let velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        enemies.push(new Enemy(x, y, radius, color, velocity));


    }, 1000)
}

let animtionId;
function animate(){
    context.fillStyle = 'rgba(0, 0, 0, 0.1)';
    context.fillRect(0, 0, width, height);
    animtionId = requestAnimationFrame(animate);

    player.draw();

    //create explosions
    explosions.forEach((boom, boom_index)=>{
        if(boom.alpha <= 0){
            explosions.splice(boom_index, 1);
        }
        boom.update();
    })

    //removing projectiles when outder window size
    projectiles.forEach((projectile, bool_index)=>{
        projectile.update();

        if(projectile.x + projectile.radius < 0 || projectile.x - projectile.radius > width ||
            projectile.y - projectile.radius < 0 || projectile.y + projectiles.radius > height){
            setTimeout(()=>{
                projectiles.splice(bool_index, 1);
            }, 0)
        }
    })

    enemies.forEach((enemy, index)=>{
        enemy.update();

        let dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);

        if(dist - enemy.radius - player.radius < 1){
            cancelAnimationFrame(animtionId);
        }

        projectiles.forEach((projectile, p_index)=>{
            let dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

            //when bool touch enemy
            if(dist - enemy.radius - projectile.radius < 1){

                 //explosion
                for(let i = 0; i < enemy.radius * 2; i++){
                    explosions.push(new Explosion(projectile.x, projectile.y, Math.random() * 2, enemy.color, {x: (Math.random() - 0.5) * (Math.random() * 8), y: (Math.random() - 0.5) * (Math.random() * 8)}));
                }

                if(enemy.radius - 10 > 10){
                    enemy.radius -= 10;
                    setTimeout(()=>{
                        projectiles.splice(p_index, 1)
                    }, 0)
                }else{
                    setTimeout(()=>{
                        enemies.splice(index, 1);
                        projectiles.splice(p_index, 1)
                    }, 0)
                }
            }
        })
    })
}

animate();
spawnEnemies();




