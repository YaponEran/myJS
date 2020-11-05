let vector = {
    _x: 0,
    _y: 0,

    create: function(x, y){
        let obj = Object.create(this);
        obj.setX(x);
        obj.setY(y);
        return obj;
    },

    setX: function(val){
        this._x = val;
    },
    getX: function(){
        return this._x;
    },

    setY: function(val){
        this._y = val;
    },
    getY: function(){
        return this._y;
    },

    add: function(v2){
        return vector.create(this._x + v2.getX(), this._y + v2.getY());
    },
    subtract: function(v2){
        return vector.create(this._x - v2.getX(), this._y - v2.getY());
    },

    multiply: function(val){
        return vector.create(this._x * val, this._y * val);
    },
    devide: function(val){
        return vector.create(this._x / val, this._y / val);
    },

    setLength: function(length){
        let angle = this.getAngle();
        this._x = Math.cos(angle) * length;
        this._y = Math.sin(angle) * length;
    },
    getAngle: function(){
        return Math.atan2(this._y, this._x);
    },
    setAngle: function(angle){
        let length = this.getLength();
        this._x = Math.cos(angle) * length;
        this._y = Math.sin(angle) * length;
    },
    getLength: function(){
        return Math.sqrt(this._x * this._x + this._y * this._y);
    },

    addTo: function(v2){
        this._x += v2.getX();
        this._y += v2.getY();
    },

    subtractTo: function(v2){
        this._x -= v2.getX();
        this._y -= v2.getY();
    },

    multiplyTo: function(val){
        this._x *= val;
        this._y *= val;
    },

    devideTo: function(val){
        this._x /= val;
        this._y /= val;
    }
}
