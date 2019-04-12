
this.system = this.system || {};
(function(){
    "use strict";

    const Enemy = function(){
        this.Container_constructor();
        this._init();
    };

    const p = createjs.extend(Enemy,createjs.Container);

    p._width = null;
    p._height = null;
    p._gun = null;
    p._bulletSpeed = null;
    p._shootingCooldown = null;
    p._shootingCooldownCounter = null;

    p.speed = null;
    p.bulletPoint = null;

    p._init = function () {
        const body = system.CustomMethods.makeImage('enemyBody');
        this.addChild(body);

        const gunImg = this._gun = system.CustomMethods.makeImage('enemyGun', false, false);
        const gun = this._gun = new createjs.Container();
        gun.regX = gunImg.image.width/2;
        gun.regY = gunImg.image.height;
        gun.x = body.image.width/2;
        gun.y = body.image.height/2;

        const bulletPoint = this.bulletPoint = system.CustomMethods.makeImage('bullet', false, false);
        bulletPoint.x = 4;
        bulletPoint.y = -4100;// mora da bude veci broj posto je spawn u razmaku od -100 do 0
        bulletPoint.visible = false;

        gun.addChild(gunImg,bulletPoint);

        this.addChild(gun);

        this._bulletSpeed = 3000;
        this._width = body.image.width;
        this._height = body.image.height;

        this._shootingCooldownCounter = 0;
    };

    p.incrementShootingCooldown = function() {
        this._shootingCooldownCounter++;
    };

    p.setShootinCooldown = function(cooldown) {
        console.log(cooldown);
        this._shootingCooldown = cooldown;
    };
    
    p.canShoot = function() {
        let canShoot = false;
        if(this._shootingCooldownCounter > this._shootingCooldown){
            canShoot = true;
            this._shootingCooldownCounter = 0;
        }
        return canShoot;
    };

    p.setMovementSpeed = function(speed) {
        this.speed = speed;
    };

    p.getMovementSpeed = function() {
        return this.speed;
    };

    p.rotateGun = function(deg) {
        this._gun.rotation = deg;
    };

    p.getBulletSpeed = function() {
        return this._bulletSpeed;
    };

    p.getDimension = function() {
        return {
            width:this._width,
            height:this._height
        }
    };

    system.Enemy = createjs.promote(Enemy,"Container");
})();


