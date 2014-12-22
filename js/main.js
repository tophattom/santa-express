(function() {
    'use strict';
    
    var config = {
        width: 400,
        height: 200
    };
    
    var camera = new Camera(0, 0, config.width, config.height);
    
    var container, canvas, ctx;
    
    function setupCanvas() {
        var w = container.offsetWidth,
            h = container.offsetHeight,
            m = Math.floor(w / config.width),
            n = Math.floor(h / config.height),
            scale = Math.max(Math.min(m, n), 1);
            
        var width = config.width * scale,
            height = config.height * scale;
            
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        
        ctx.imageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        
        ctx.scale(scale, scale);
    }
    
    
    document.addEventListener('DOMContentLoaded', function() {
        container = document.getElementById('game-container');
        canvas = document.createElement('canvas');
        
        container.appendChild(canvas);
        
        ctx = canvas.getContext('2d');
        
        setupCanvas();
        
        var flakes = [];
        
        for (var i = 0; i < 400; i++) {
            var newFlake = new Snowflake(Math.random() * config.width, Math.random() * config.height);
            flakes.push(newFlake);
        }
        
        var santaVel = new Vector(0, 0, 0);
        var sled = new Sled(50, 100, 4);
        
        var lastT = 0,
            leftOverTime = 0,
            timesteps = 0;
        
        function update(t) {
            var dt = t - lastT;
            lastT = t;
            
            window.requestAnimationFrame(update);
            
            if (Keyboard.keydown(Keyboard.LEFT_KEY)) {
                sled.turnRate += 0.07;
            } else if (Keyboard.keydown(Keyboard.RIGHT_KEY)) {
                sled.turnRate -= 0.07;
            }
            
            draw(ctx);
            
            flakes.forEach(function(flake) {
                flake.update(dt, sled.pieces[0].vel.clone().mul(1.5), -5, config.width, -5, config.height);
                flake.draw(ctx);
            });
            
            sled.update(dt);
            
            camera.setPosition(sled.pieces[0].pos.i + 100, 100);
            sled.draw(ctx, camera);
        }
        
        function draw(ctx) {
            ctx.fillStyle = '#000026';
            ctx.fillRect(0, 0, config.width, config.height);
        }
        
        window.requestAnimationFrame(update);
        
        
    });
    
    window.onresize = setupCanvas;
})();