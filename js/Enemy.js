
this.system = this.system || {};
(function(){
    "use strict";

    const Enemy = function(){
        this.Container_constructor();
        this._init();
    };

    const p = createjs.extend(Enemy,createjs.Container);

    p.speed = null;
    p._width = null;
    p._height = null;
    p._gun = null;

    p._init = function () {
        const body = system.CustomMethods.makeImage('enemyBody');
        this.addChild(body);

        const gun = this._gun = system.CustomMethods.makeImage('enemyGun', false, false);
        gun.regX = gun.image.width/2;
        gun.regY = gun.image.height;
        gun.x = body.image.width/2;
        gun.y = body.image.height/2;
        this.addChild(gun);

        this.speed = 10;
        this._width = body.image.width;
        this._height = body.image.height;
    };

    p.rotateGun = function(deg) {
        this._gun.rotation = deg;
    };

    p.getDimension = function() {
        return {
            width:this._width,
            height:this._height
        }
    };

    system.Enemy = createjs.promote(Enemy,"Container");
})();


