(function() {
    'use strict';
    
    var LinkConstraint = function(p1, p2, restingDist, stiffness) {
        this.p1 = p1;
        this.p2 = p2;
        
        this.restingDist = restingDist;
        
        this.stiffness = stiffness || 1;
    };
    
    LinkConstraint.prototype.solve = function () {
        var diff = this.p1.pos.clone().sub(this.p2.pos),
            d = diff.length(),
            ratio = (this.restingDist - d) / d,
            
            invM1 = 1 / this.p1.mass,
            invM2 = 1 / this.p2.mass,
            scalarP1 = (invM1 / (invM1 + invM2)) * this.stiffness,
            scalarP2 = this.stiffness - scalarP1;
            
            this.p1.pos.add(diff.mul(scalarP1).mul(ratio));
            this.p2.pos.sub(diff.mul(scalarP2).mul(ratio));
    };
    
    window.LinkConstraint = LinkConstraint;
})();