
this.system = this.system || {};
(function(){
    "use strict";

    const Bullet = function(){
        this.Container_constructor();
        this._init();
    };

    const p = createjs.extend(Bullet,createjs.Container);

    p.speed = null;
    p.width = null;
    p.height = null;

    p._init = function () {
        const body = system.CustomMethods.makeImage('Bullet', false, true);
        this.addChild(body);

        this.speed = 50;
        this.width = body.image.width;
        this.height = body.image.height;
    };

    system.Bullet = createjs.promote(Bullet,"Container");
})();


