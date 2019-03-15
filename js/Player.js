
this.system = this.system || {};
(function(){
    "use strict";

    const Player = function(){
        this.Container_constructor();
        this._init();
    };

    const p = createjs.extend(Player,createjs.Container);

    p.speed = null;

    p._init = function () {
        const body = system.CustomMethods.makeImage('player', false, true);
        this.addChild(body);

        this.speed = 10;
    };

    system.Player = createjs.promote(Player,"Container");
})();


