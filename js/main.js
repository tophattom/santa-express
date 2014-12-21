(function() {
    'use strict';
    
    var config = {
        width: 800,
        height: 600,
        
        scale: 2
    };
    
    
    document.addEventListener('DOMContentLoaded', function() {
        var canvas = document.getElementById('game-canvas'),
            ctx = canvas.getContext('2d');
        
        canvas.width = config.width;
        canvas.height = config.height;
        
        ctx.imageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        
        ctx.scale(config.scale, config.scale);
        
        var flakes = [];
        
        for (var i = 0; i < 400; i++) {
            var newFlake = new Snowflake(Math.random() * 400, Math.random() * 300);
            flakes.push(newFlake);
        }
        
        var santaVel = new Vector(0, 0, 0);
        
        var lastT = 0;
        
        function update(t) {
            var dt = t - lastT;
            lastT = t;
            window.requestAnimationFrame(update);
            
            draw(ctx);
            flakes.forEach(function(flake) {
                flake.update(dt, santaVel, 0, 400, 300);
                flake.draw(ctx);
            });
            
        }
        
        function draw(ctx) {
            ctx.fillStyle = '#000026';
            ctx.fillRect(0, 0, 400, 300);
            
            ctx.fillStyle = '#aa0000';
            ctx.fillRect(10, 10, 10, 10);
        }
        
        window.requestAnimationFrame(update);
    });
})();