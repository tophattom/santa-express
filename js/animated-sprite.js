(function() {
    'use strict';
    
    var AnimatedSprite = function(sheet, frameW, frameH, frames, frameTime, startFrame) {
        if (typeof sheet !== 'string') {
            this.sheet = sheet;
        } else {
            this.sheet = new Image();
            this.sheet.src = sheet;
        }
        
        this.frameW = frameW;
        this.frameH = frameH;
        
        this.frames = frames;
        
        this.currentFrame = startFrame || 0;
        
        this.frameTime = frameTime;
        this.lastFrame = Date.now();
        
        this.interval = null;
    };
    
    AnimatedSprite.prototype.start = function () {
        var that = this;
        this.interval = window.setInterval(function() {
            that.currentFrame = (that.currentFrame + 1) % that.frames;
        }, this.frameTime);
    };
    
    AnimatedSprite.prototype.stop = function () {
        window.clearInterval(this.interval);
    };
    
    AnimatedSprite.prototype.draw = function (ctx, x, y) {
        var srcX = this.frameW * this.currentFrame;
        
        ctx.drawImage(this.sheet,
            srcX,
            0,
            this.frameW,
            this.frameH,
            x,
            y,
            this.frameW,
            this.frameH);
    };
    
    window.AnimatedSprite = AnimatedSprite;
})();