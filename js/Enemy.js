
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
    p._gunImage = null;
    p._bulletSpeed = null;
    p._damage = null;
    p._shootingCooldown = null;
    p._shootingCooldownCounter = null;
    p._startHealth = null;
    p._health = null;
    p._healthShape = null;
    p._body = null;
    p._healthColor = null;

    p.bulletPoint = null;

    p._init = function () {
        this._healthColor = '#000000';

        const strokeTickness = 8;
        const bodyWidth = 64;
        const bodyHeight = 64;

        const body = this._body = new createjs.Shape(new createjs.Graphics().setStrokeStyle(strokeTickness).beginStroke('#ffffff').drawRect(0, 0, bodyWidth, bodyHeight));
        body.cache(0,0,bodyWidth, bodyHeight);
        body.mouseEnabled = false;

        const healthWidth = bodyWidth - strokeTickness;
        const healthHeight = bodyHeight - strokeTickness;
        const health = this._healthShape = new createjs.Shape(new createjs.Graphics().beginFill(this._healthColor).drawRect(0, 0, healthWidth, healthHeight));
        health.cache(0,0,healthWidth, healthHeight);
        health.x = strokeTickness/2;
        health.y = strokeTickness/2;
        health.originalWidth = healthWidth;
        health.originalHeight = healthHeight;
        health.mouseEnabled = false;

        this.addChild(body,health);

        const gunImg = this._gunImage = system.CustomMethods.makeImage('enemyGun', false, false);
        const gun = this._gun = new createjs.Container();
        gun.regX = gunImg.image.width/2;
        gun.regY = gunImg.image.height;
        gun.x = body.bitmapCache.width/2;
        gun.y = body.bitmapCache.height/2;

        const gunOverlay = system.CustomMethods.makeImage('enemyGunOverlay', false, true);
        gunOverlay.x = gunImg.image.width/2;
        gunOverlay.y = gunImg.image.height;

        const bulletPoint = this.bulletPoint = system.CustomMethods.makeImage('bullet', false, false);
        bulletPoint.x = 4;
        bulletPoint.y = -4400;// mora da bude veci broj posto je spawn u razmaku od -100 do 0
        bulletPoint.visible = false;

        gun.addChild(gunImg,gunOverlay,bulletPoint);

        this.addChild(gun);

        this._bulletSpeed = 3000;
        this._width = body.bitmapCache.width;
        this._height = body.bitmapCache.height;

        this._shootingCooldownCounter = 0;
        this._startHealth = 0;
        this._health = this._startHealth;

        this.mouseEnabled = false;
    };

    p._updateBody = function() {
        this._body.uncache();
        this._body.graphics.clear().setStrokeStyle(8).beginStroke(this._healthColor).drawRect(0, 0, 64, 64);
        this._body.cache(0,0,64,64);
    };

    p._updateHealthBar = function(x,y,w,h) {
        this._healthShape.uncache();
        this._healthShape.graphics.clear().beginFill(this._healthColor).drawRect(x, y, w, h);
        this._healthShape.cache(x, y, w, h);
    };

    p.updateStartHealth = function(hp) {
        this._startHealth = hp;
    };

    p.updateColor = function(color) {
        if(this._healthColor !== color){
            this._healthColor = color;
            this._updateBody();
        }
    };

    p.reset = function() {
        this._health = this._startHealth;
        this._updateHealthBar(0,0,this._healthShape.originalWidth,this._healthShape.originalHeight);
    };

    p.decreaseHealth = function(damage) {
        this._health -= damage;
        const healthPercent = system.CustomMethods.getPercentage(this._startHealth, this._health);
        const w = this._healthShape.originalWidth;
        const h = (this._healthShape.originalHeight/100) * healthPercent;
        const x = 0;
        const y = this._healthShape.originalHeight - h;
        this._updateHealthBar(x,y,w,h);
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
            //this._doShootAnimation();
            canShoot = true;
            this._shootingCooldownCounter = 0;
        }
        return canShoot;
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


