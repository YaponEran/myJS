let particle = {
    position: null,
    velocity: null,
    gravity: null,
    radius: 0,
    friction: 1,

    create: function(x, y, speed, direction, grav){
        let obj = Object.create(this);
        obj.position = vector.create(x, y);
        obj.velocity = vector.create(0, 0);
        obj.velocity.setLength(speed)
        obj.velocity.setAngle(direction);
        obj.gravity = vector.create(0, grav || 0);
        return obj;
    },

    accelerate: function(accel){
        this.velocity.addTo(accel);
    },

    update: function(){
        this.position.addTo(this.velocity);
        this.velocity.addTo(this.gravity);
        this.velocity.multiplyTo(this.friction);
    },

    angleTo: function(p2){
        return Math.atan2(p2.position.getY() - this.position.getY(), p2.position.getX() - this.position.getX());
    },

    distanceTo: function(p2){
        let dx = p2.position.getX() - this.position.getX();
        let dy = p2.position.getY() - this.position.getX();
        return Math.sqrt(dx * dx + dy * dy);
    }
}
