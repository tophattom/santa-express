(function() {
    'use strict';
    
    var config = {
        width: 800,
        height: 400,
        
        scale: 2,
        
        ratio: 2
    };
    
    var gameArea = {
        width: config.width / config.scale,
        height: config.height / config.scale
    };
    
    
    document.addEventListener('DOMContentLoaded', function() {
        var canvas = document.getElementById('game-canvas'),
            ctx = canvas.getContext('2d');
        
        setupCanvas();
        
        var flakes = [];
        
        for (var i = 0; i < 400; i++) {
            var newFlake = new Snowflake(Math.random() * gameArea.width, Math.random() * gameArea.height);
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
                flake.update(dt, santaVel, 0, gameArea.width, gameArea.height);
                flake.draw(ctx);
            });
            
        }
        
        function draw(ctx) {
            ctx.fillStyle = '#000026';
            ctx.fillRect(0, 0, gameArea.width, gameArea.height);
            
            ctx.fillStyle = '#aa0000';
            ctx.fillRect(10, 10, 10, 10);
        }
        
        window.requestAnimationFrame(update);
    });
    
    window.onresize = setupCanvas;
    
    function setupCanvas() {
        var canvas = document.getElementById('game-canvas'),
            ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = canvas.width / config.ratio;
        
        ctx.imageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        
        ctx.scale(config.scale, config.scale);
        
        gameArea = {
            width: canvas.width / config.scale,
            height: canvas.height / config.scale
        };
    }
})();