(function() {
    'use strict';
    
    var Snowflake = function(x, y) {
        this.pos = new Vector(x, y, 1 + Math.random() * 2);
        
        this.vel = new Vector(0, 10 + Math.random() * 80, 0);
        
        this.sineScaler = 10 + Math.random() * 10;
        this.sineSpeed = 400 + Math.random() * 1000;
    };
    
    Snowflake.prototype.update = function(t, minX, maxX, maxY) {
        this.pos.add(this.vel.clone().mul(t / 1000));
        
        this.vel.set(Math.sin(Date.now() / this.sineSpeed) * this.sineScaler, this.vel.j, 0);
        
        if (this.pos.i < minX) {
            this.pos.i = maxX;
        } else if (this.pos.i > maxX) {
            this.pos.i = minX;
        }
        
        if (this.pos.j > maxY) {
            this.pos.set(minX + Math.random() * (maxX - minX), -10, 1 + Math.random() * 2);
        }
    };
    
    Snowflake.prototype.draw = function (ctx) {
        var alpha = 0.8 / this.pos.k;
        ctx.fillStyle = 'rgba(255, 255, 255, ' + alpha + ')';
        
        ctx.fillRect(this.pos.i, this.pos.j, 3 / this.pos.k, 3 / this.pos.k);
    };
    
    window.Snowflake = Snowflake;
})();