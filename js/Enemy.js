
this.system = this.system || {};
(function(){
    "use strict";

    const Enemy = function(){
        this.Container_constructor();
        this._init();
    };

    const p = createjs.extend(Enemy,createjs.Container);

    p._speed = null;
    p._width = null;
    p._height = null;
    p._gun = null;
    p._bulletSpeed = null;
    p._damage = null;
    p._shootingCooldown = null;
    p._shootingCooldownCounter = null;
    p._startHealth = null;
    p._health = null;
    p._healthShape = null;
    p._healthColor = null;

    p.bulletPoint = null;

    p._init = function () {
        this._healthColor = '#35eb34';

        const body = new createjs.Shape(new createjs.Graphics().setStrokeStyle(8).beginStroke('#000000').drawRect(0, 0, 64, 64));
        body.cache(0,0,64,64);

        const health = this._healthShape = new createjs.Shape(new createjs.Graphics().beginFill(this._healthColor).drawRect(0, 0, 56, 56)); // body width - stroke
        health.cache(0,0,56,56);
        health.x = 4; // stroke/2
        health.y = 4; // stroke/2
        health.originalWidth = 56;
        health.originalHeight = 56;

        this.addChild(body,health);

        const gunImg = this._gun = system.CustomMethods.makeImage('enemyGun', false, false);
        const gun = this._gun = new createjs.Container();
        gun.regX = gunImg.image.width/2;
        gun.regY = gunImg.image.height;
        gun.x = body.bitmapCache.width/2;
        gun.y = body.bitmapCache.height/2;

        const bulletPoint = this.bulletPoint = system.CustomMethods.makeImage('bullet', false, false);
        bulletPoint.x = 4;
        bulletPoint.y = -4400;// mora da bude veci broj posto je spawn u razmaku od -100 do 0
        bulletPoint.visible = false;

        gun.addChild(gunImg,bulletPoint);

        this.addChild(gun);

        this._bulletSpeed = 3000;
        this._width = body.bitmapCache.width;
        this._height = body.bitmapCache.height;

        this._shootingCooldownCounter = 0;
        this._startHealth = 100;
        this._health = this._startHealth;

        this.mouseChildren = false;
    };

    p.reset = function() {
        this._health = this._startHealth;
        this._updateHealthBar(0,0,this._healthShape.originalWidth,this._healthShape.originalHeight)
    };

    p.decreaseHealth = function(damage) {
        //console.log('hit');
        this._health -= damage;
        const healthPercent = system.CustomMethods.getPercentage(this._startHealth, this._health);
        const w = this._healthShape.originalWidth;
        const h = (this._healthShape.originalHeight/100) * healthPercent;
        const x = 0;
        const y = this._healthShape.originalHeight - h;
        this._updateHealthBar(x,y,w,h);
    };

    p._updateHealthBar = function(x,y,w,h) {
        this._healthShape.uncache();
        this._healthShape.graphics.clear().beginFill(this._healthColor).drawRect(x, y, w, h);
        this._healthShape.cache(x, y, w, h);
    };

    p.getHealth = function() {
        return this._health;
    };

    p.incrementShootingCooldown = function() {
        this._shootingCooldownCounter++;
    };

    p.setShootinCooldown = function(cooldown) {
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
        this._speed = speed;
    };

    p.getMovementSpeed = function() {
        return this._speed;
    };

    p.rotateGun = function(deg) {
        this._gun.rotation = deg;
    };

    p.getBulletSpeed = function() {
        return this._bulletSpeed;
    };

    p.getDamage = function() {
        return this._damage;
    };

    p.getDimension = function() {
        return {
            width:this._width,
            height:this._height
        }
    };

    system.Enemy = createjs.promote(Enemy,"Container");
})();


