(function() {
    'use strict';
    
    var Snowflake = function(x, y) {
        this.pos = new Vector(x, y, 0);
        
        this.vel = new Vector(0, 10 + Math.random() * 80, 0);
        
        this.sineScaler = 10 + Math.random() * 30;
        this.sineSpeed = 400 + Math.random() * 1000;
    };
    
    Snowflake.prototype.update = function(t, minX, maxX, maxY) {
        this.pos.add(this.vel.clone().mul(t / 1000));
        
        this.vel.set(Math.sin(Date.now() / this.sineSpeed) * this.sineScaler, this.vel.j, 0);
        
        if (this.pos.j > maxY || this.pos.i < (minX - this.sineScaler) || this.pos.i > (maxX + this.sineScaler)) {
            this.pos.set(minX + Math.random() * (maxX - minX), -10, 0);
        }
    };
    
    Snowflake.prototype.draw = function (ctx) {
        ctx.fillStyle = '#ffffff';
        
        ctx.fillRect(this.pos.i, this.pos.j, 2, 2);
    };
    
    window.Snowflake = Snowflake;
})();