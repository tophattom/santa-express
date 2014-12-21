(function() {
    'use strict';
    
    var AngleConstraint = function(p1, p2, maxAngle) {
        this.p1 = p1;
        this.p2 = p2;
        
        this.maxAngle = maxAngle;
    };
    
    AngleConstraint.prototype.solve = function () {
        var dir1 = this.p1.pos.clone().sub(this.p1.lastPos).normalize(),
            dir2 = this.p2.pos.clone().sub(this.p2.lastPos).normalize();
            
        var angle = Vector.angle(dir1, dir2);
        
        if (angle > this.maxAngle) {
            this.p1.lastPos = this.p1.pos;
        }
    };
    
    window.AngleConstraint = AngleConstraint;
})();