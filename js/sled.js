(function() {
    'use strict';
    
    var FOLLOW_DIST = 1,
        SLOWING_RADIUS = 1;
    
    var Sled = function(x, y, length) {
        this.pieces = [];
        
        this.turnRate = 1;
        this.speed = 50;
        
        var leadingPiece = null;
        for (var i = 0; i < length; i++) {
            var tmpX = x - 40 * i,
                newPiece = new PointMass(tmpX, y);
            
            if (leadingPiece !== null) {
                newPiece.attachTo(leadingPiece, 40, 1);
            }
            
            this.pieces.push(newPiece);
            leadingPiece = newPiece;
        }        
        
        this.pieces[0].applyForce(new Vector(7000, 0, 0));
    };
    
    Sled.prototype.draw = function (ctx) {
        ctx.fillStyle = '#ff0000';
        ctx.strokeStyle = '#00ff00';
        
        this.pieces.forEach(function(piece) {
            var angle = Math.atan2(piece.lastPos.j - piece.pos.j, piece.lastPos.i - piece.pos.i);
            ctx.save();
            ctx.translate(piece.pos.i, piece.pos.j);
            ctx.rotate(angle);
            
            ctx.fillRect(-15, -10, 30, 20);
            
            ctx.restore();
        });
    };
    
    Sled.prototype.update = function(dt) {
        // var center = new Vector(200, 100, 0),
        //     acc = this.pieces[0].pos.clone().sub(center).normalize().mul(-100);
        //     
        // this.pieces[0].applyForce(acc);
    
        this.pieces.forEach(function(piece) {
            piece.solveConstraints();
            piece.updatePhysics(dt);
        });  
    };
    
    window.Sled = Sled;
})();