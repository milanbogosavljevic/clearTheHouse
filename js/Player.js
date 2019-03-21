
this.system = this.system || {};
(function(){
    "use strict";

    const Player = function(){
        this.Container_constructor();
        this._init();
    };

    const p = createjs.extend(Player,createjs.Container);

    p.speed = null;
    p._width = null;
    p._height = null;
    p._gun = null;
    p._bulletSpeed = null;

    p._init = function () {
        const body = system.CustomMethods.makeImage('playerBody');
        this.addChild(body);

        const gun = this._gun = system.CustomMethods.makeImage('playerGun', false, false);
        gun.regX = gun.image.width/2;
        gun.regY = gun.image.height;
        gun.x = body.image.width/2;
        gun.y = body.image.height/2;
        this.addChild(gun);

        this.speed = 10;
        this._bulletSpeed = 50;
        this._width = body.image.width;
        this._height = body.image.height;
    };

    p.getBulletSpeed = function() {
        return this._bulletSpeed;
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

    system.Player = createjs.promote(Player,"Container");
})();


