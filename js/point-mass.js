(function() {
    'use strict';
    
    var PointMass = function(x, y) {
        this.pos = new Vector(x, y, 0);
        this.lastPos = this.pos.clone();
        this.acc = new Vector(0, 0, 0);
        
        this.mass = 1;
        
        this.links = [];
    };
    
    PointMass.prototype.updatePhysics = function (dt) {
        dt = dt / 1000;
        
        var vel = this.pos.clone().sub(this.lastPos).mul(1),
            dtSq = dt * dt;
            
        var nextPos = this.pos.clone().add(vel).add(this.acc.mul(0.5).mul(dtSq));
        
        this.lastPos = this.pos;
        this.pos = nextPos;
        this.acc.set(0, 0, 0);
    };
    
    PointMass.prototype.solveConstraints = function () {
        this.links.forEach(function(link) {
            link.solve();
        });
    };
    
    PointMass.prototype.applyForce = function (force) {
        this.acc.add(force.div(this.mass));
    };
    
    PointMass.prototype.attachTo = function (p, restingDist, stiffness) {
        this.links.push(new LinkConstraint(this, p, restingDist, stiffness));
        // this.links.push(new AngleConstraint(this, p, Math.PI / 4));
    };
    
    window.PointMass = PointMass;
})();