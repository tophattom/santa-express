(function() {
    'use strict';
    
    var Keyboard = {
        keys: [],
        LEFT_KEY: 37,
        RIGHT_KEY: 39,
        keydown: keydown
    };
    
    function keydown(keyCode) {
        return Keyboard.keys[keyCode] || false;
    }
    
    window.addEventListener('keydown', function(event) {
        Keyboard.keys[event.keyCode] = true;
    });
    
    window.addEventListener('keyup', function(event) {
        Keyboard.keys[event.keyCode] = false;
    });
    
    window.Keyboard = Keyboard;
})();