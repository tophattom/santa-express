(function() {
    'use strict';
    
    var Snowflake = function(x, y) {
        this.pos = new Vector(x, y, 1 + Math.random() * 2);
        
        this.vel = new Vector(0, 10 + Math.random() * 80, 0);
        
        this.sineScaler = 10 + Math.random() * 10;
        this.sineSpeed = 400 + Math.random() * 1000;
    };
    
    Snowflake.prototype.update = function(t, velOffset, minX, maxX, minY, maxY) {
        var tmpVel = this.vel.set(Math.sin(Date.now() / this.sineSpeed) * this.sineScaler, this.vel.j, 0).clone().sub(velOffset);
        this.pos.add(tmpVel.mul(t / 1000));
        
        if (this.pos.i < minX) {
            this.pos.i = maxX;
        } else if (this.pos.i > maxX) {
            this.pos.i = minX;
        }
        
        if (this.pos.j < minY) {
            this.pos.set(minX + Math.random() * (maxX - minX), maxY, 1 + Math.random() * 2);
        } else if (this.pos.j > maxY) {
            this.pos.set(minX + Math.random() * (maxX - minX), minY, 1 + Math.random() * 2);
        }
    };
    
    Snowflake.prototype.draw = function (ctx) {
        var alpha = 0.8 / this.pos.k;
        ctx.fillStyle = 'rgba(255, 255, 255, ' + alpha + ')';
        
        ctx.fillRect(this.pos.i, this.pos.j, 3 / this.pos.k, 3 / this.pos.k);
    };
    
    window.Snowflake = Snowflake;
})();