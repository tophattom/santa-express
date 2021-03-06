(function() {
    'use strict';
    
    var HORIZONTAL = new Vector(1, 0, 0);
    
    var reindeerImg = new Image(),
        sledSprite = new AnimatedSprite('img/sled-anim.png', 20, 15, 4, 250);
    
    reindeerImg.src = 'img/reindeer-anim.png';
    
    // var reindeerSprite = new AnimatedSprite(reindeerImg, 20, 15, 4, 48);
    
    var Sled = function(x, y, length) {
        this.pieces = [];
        
        this.turnRate = 0;
        this.speed = 120;
        
        this.pieceDist = 20;
        
        for (var i = 0; i < length; i++) {
            var newPiece = {
                pos: new Vector(x + this.pieceDist * i, y, 0),
                vel: new Vector(0, 0, 0),
                dir: new Vector(1, 0, 0),
                angle: 0,
                
                width: 20,
                height: 15,
                
                sprite: new AnimatedSprite(reindeerImg, 20, 15, 4, 130, i % length)
            };
            
            newPiece.sprite.start();
            
            this.pieces.push(newPiece);
        }
        
        sledSprite.start();
    };
    
    Sled.prototype.draw = function (ctx, camera) {
        ctx.fillStyle = '#ff0000';
        ctx.strokeStyle = '#00ff00';
        
        this.pieces.forEach(function(piece, index) {
            if (index === 0) {
                ctx.fillStyle = '#00ff00';
            } else {
                ctx.fillStyle = '#ff0000';
            }
            
            var screenX = camera.getScreenX(piece.pos.i),
                screenY = camera.getScreenY(piece.pos.j);
            // var angle = Math.atan2(piece.lastPos.j - piece.pos.j, piece.lastPos.i - piece.pos.i);
            ctx.save();
            ctx.translate(screenX, screenY);
            ctx.rotate(-piece.angle);
            
            // ctx.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);
            if (index === 0) {
                sledSprite.draw(ctx, 0, -piece.height / 2);    
            } else {
                // ctx.drawImage(reindeerImg, 0, -piece.height / 2);
                piece.sprite.draw(ctx, 0, -piece.height / 2);
            }
            
            
            ctx.restore();
        });
    };
    
    Sled.prototype.update = function(dt) {
        var firstPiece = this.pieces[0];
        
        firstPiece.angle += this.turnRate * (dt / 1000);
        firstPiece.dir.set(Math.cos(firstPiece.angle), -Math.sin(firstPiece.angle), 0);
        firstPiece.vel = firstPiece.dir.clone().mul(this.speed);
        
        firstPiece.pos.add(firstPiece.vel.clone().mul(dt / 1000));
        // firstPiece.pos.add(new Vector(0, firstPiece.vel.j * (dt / 1000), 0));
        
        for (var i = 1; i < this.pieces.length; i++) {
            var piece = this.pieces[i],
                leadingPiece = this.pieces[i - 1];
                
            var lastPos = piece.pos;
            piece.pos = leadingPiece.pos.clone().add(leadingPiece.dir.clone().mul(this.pieceDist));
            
            var fii = (this.pieceDist * this.turnRate) / this.speed;
            
            piece.angle = firstPiece.angle + fii * i;
            // piece.angle = firstPiece.angle - this.turnRate / (this.pieces.length - 1) * i;
            // piece.angle = -Math.atan2(lastPos.j - piece.pos.j, lastPos.i - piece.pos.i) + Math.PI;
            // piece.angle = leadingPiece.angle + this.turnRate / this.pieces.length;
            piece.dir.set(Math.cos(piece.angle), -Math.sin(piece.angle), 0);
        }
    };
    
    window.Sled = Sled;
})();