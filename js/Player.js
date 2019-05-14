
this.system = this.system || {};
(function(){
    "use strict";

    const Player = function(){
        this.Container_constructor();
        this._init();
    };

    const p = createjs.extend(Player,createjs.Container);

    p._speed = null;
    p._width = null;
    p._height = null;
    p._gun = null;
    p._gunImage = null;
    p._bulletSpeed = null;
    p._canShoot = null;
    p._damage = null;
    p._startHealth = null;
    p._health = null;
    p._healthShape = null;
    p._healthColor = null;

    p._damageUpgrades = null;
    p._healthUpgrades = null;
    p._speedUpgrades = null;

    p.bulletPoint = null;

    p._init = function () {
        this._healthColor = '#ff6468';
        const body = new createjs.Shape(new createjs.Graphics().setStrokeStyle(8).beginStroke('#000000').drawRect(0, 0, 128, 128));
        body.cache(0,0,128,128);

        const health = this._healthShape = new createjs.Shape(new createjs.Graphics().beginFill(this._healthColor).drawRect(0, 0, 120, 120)); // body width - stroke/2
        health.cache(0,0,120,120);
        health.x = 4;
        health.y = 4;
        health.originalWidth = 120;
        health.originalHeight = 120;

        this.addChild(body,health);

        const gunImg = this._gunImage = system.CustomMethods.makeImage('playerGun', false, false);
        const gun = this._gun = new createjs.Container();
        gun.regX = gunImg.image.width/2;
        gun.regY = gunImg.image.height;
        gun.x = body.bitmapCache.width/2;
        gun.y = body.bitmapCache.height/2;

        const gunOverlay = system.CustomMethods.makeImage('playerGunOverlay', false, true);
        gunOverlay.x = gunImg.image.width/2;
        gunOverlay.y = gunImg.image.height;

        const bulletPoint = this.bulletPoint = system.CustomMethods.makeImage('bullet', false, false);
        bulletPoint.x = 4;
        bulletPoint.y = -4000;
        bulletPoint.visible = false;
        gun.addChild(gunImg,gunOverlay,bulletPoint);

        this.addChild(gun);

        this._bulletSpeed = 3000;
        this._width = body.bitmapCache.width;
        this._height = body.bitmapCache.height;
        this._canShoot = true;
        this._damage = 100;
        this._startHealth = 100;
        this._speed = 15;
        this._health = this._startHealth;
        this.mouseChildren = false;// todo staviti na svaki gfx mouse enabled false
        this._damageUpgrades = [5, 8, 10, 13, 16];
        this._healthUpgrades = [10, 15, 20, 25, 30];
        this._speedUpgrades = [3, 4, 6, 8, 10];
    };

    p.decreaseHealth = function(damage) {
        this._health -= damage;
        this._updateHealthBar();
    };

    p.increaseHealth = function() {
        const hp = this._healthUpgrades.shift();
        console.log(`increasing health for ${hp}`);
        this._health += hp;
        this._updateHealthBar();
    };

    p._updateHealthBar = function() {
        let healthPercent = system.CustomMethods.getPercentage(this._startHealth, this._health);
        if(healthPercent > 100){
            healthPercent = 100;
        }
        const w = this._healthShape.originalWidth;
        const h = (this._healthShape.originalHeight/100) * healthPercent;
        const x = 0;
        const y = this._healthShape.originalHeight - h;

        this._healthShape.uncache();
        this._healthShape.graphics.clear().beginFill(this._healthColor).drawRect(x, y, w, h);
        this._healthShape.cache(x, y, w, h);
    };

    p.getHealth = function() {
        return this._health;
    };

    p.getHealthColor = function() {
        return this._healthColor;
    };

    p.increaseDamage = function() {
        const damage = this._damageUpgrades.shift();
        console.log(`increasing damage for ${damage}`);
        this._damage += damage;
    };

    p.getDamage = function() {
        return this._damage;
    };

    p.doShootAnimation = function() {
        this._canShoot = false;
        createjs.Tween.get(this._gunImage).to({y:15},100,createjs.Ease.circOut).to({y:0},100,createjs.Ease.circIn).call(()=>{
            this._canShoot = true;
        })
    };

    p.canShoot = function() {
        return this._canShoot;
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

    p.increaseSpeed = function() {
        const increment = this._speedUpgrades.shift();
        console.log(`increasing speed ${ typeof increment}`);
        this._speed += increment;
    };

    p.getMovementSpeed = function() {
        return this._speed;
    };

    p.getUpgradeValue = function(upgrade) {
        const upgradeType = `_${upgrade.toLowerCase()}Upgrades`;
        console.log(upgradeType);
        return this[upgradeType][0];
    };

    p.getStartingUpgradeValues = function() {
        return {
            'damage':this._damageUpgrades[0],
            'health':this._healthUpgrades[0],
            'speed':this._speedUpgrades[0]
        }
    };

    system.Player = createjs.promote(Player,"Container");
})();


