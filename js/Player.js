
this.system = this.system || {};
(function(){
    "use strict";

    const Player = function(){
        this.Container_constructor();
        this._init();
    };

    const p = createjs.extend(Player,createjs.Container);

    p._START_SPEED = null;
    p._START_DAMAGE = null;
    p._START_HEALTH = null;
    p._START_COOLDOWN = null;

    p._DAMAGE_UPGRADES = null;
    p._HEALTH_UPGRADES = null;
    p._SPEED_UPGRADES = null;
    p._COOLDOWN_UPGRADES = null;

    p._damageUpgrades = null;
    p._healthUpgrades = null;
    p._speedUpgrades = null;
    p._cooldownUpgrades = null;

    p._speed = null;
    p._width = null;
    p._height = null;
    p._gun = null;
    p._gunImage = null;
    p._bulletSpeed = null;
    p._canShoot = null;
    p._damage = null;
    p._health = null;
    p._healthShape = null;
    p._healthColor = null;
    p._cooldown = null;

    p._highscore = null;

    p.bulletPoint = null;

    p._init = function () {
        this._START_DAMAGE = 10;
        this._START_HEALTH = 100;
        this._START_SPEED = 6;
        this._START_COOLDOWN = 300;

        this._DAMAGE_UPGRADES = [5, 8, 10, 10, 10, 12];
        this._HEALTH_UPGRADES = [20, 20, 30, 40, 50, 60];
        this._SPEED_UPGRADES = [1, 1, 2, 2, 3, 3];
        this._COOLDOWN_UPGRADES = [50, 50, 50, 50, 50, 50];

        this._cooldown = this._START_COOLDOWN;

        const highscore = this._highscore = JSON.parse(localStorage.getItem("highscore"));
        if(highscore === null){
            localStorage.setItem("highscore" , JSON.stringify(0));
        }

        const strokeTickness = 8;
        const bodyWidth = 64;
        const bodyHeight = 64;

        this._healthColor = '#5dff7c';
        const body = new createjs.Shape(new createjs.Graphics().setStrokeStyle(strokeTickness).beginStroke('#5dff7c').drawRect(0, 0, bodyWidth, bodyHeight));
        body.cache(0,0,bodyWidth,bodyHeight);

        const healthWidth = bodyWidth - strokeTickness;
        const healthHeight = bodyHeight - strokeTickness;
        const health = this._healthShape = new createjs.Shape(new createjs.Graphics().beginFill(this._healthColor).drawRect(0, 0, healthWidth, healthHeight));
        health.cache(0,0,healthWidth,healthHeight);
        health.x = strokeTickness/2;
        health.y = strokeTickness/2;
        health.originalWidth = healthWidth;
        health.originalHeight = healthHeight;
        health.mouseEnabled = false;

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
        this._damage = this._START_DAMAGE;
        this._speed = this._START_SPEED;
        this._health = this._START_HEALTH;
        this.mouseChildren = false;// todo staviti na svaki gfx mouse enabled false

        this._damageUpgrades = this._DAMAGE_UPGRADES.concat();
        this._healthUpgrades = this._HEALTH_UPGRADES.concat();
        this._speedUpgrades = this._SPEED_UPGRADES.concat();
        this._cooldownUpgrades = this._COOLDOWN_UPGRADES.concat();
    };

    p.resetPlayer = function() {
        this._damage = this._START_DAMAGE;
        this._health = this._START_HEALTH;
        this._speed = this._START_SPEED;
        this._cooldown = this._START_COOLDOWN;
        this._updateHealthBar();
    };

    p.decreaseHealth = function(damage) {
        this._health -= damage;
        this._updateHealthBar();
    };

    p.increasehealth = function() {
        this._health += this._healthUpgrades.shift();
        this._updateHealthBar();
    };

    p._updateHealthBar = function() {
        let healthPercent = system.CustomMethods.getPercentage(this._START_HEALTH, this._health);
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

    p.increasedamage = function() {
        this._damage += this._damageUpgrades.shift();
    };

    p.getDamage = function() {
        return this._damage;
    };

    p.increasecooldown = function() {
        this._cooldown -= this._cooldownUpgrades.shift();
    };

    p.getCooldown = function() {
        return this._cooldown;
    };

    p.doShootAnimation = function() {
        this._canShoot = false;
        createjs.Tween.get(this._gunImage).to({y:15},100,createjs.Ease.circOut).to({y:0},100,createjs.Ease.circIn).wait(this._cooldown).call(()=>{
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

    p.increasespeed = function() {
        this._speed += this._speedUpgrades.shift();
    };

    p.getSpeed = function() {
        return this._speed;
    };

    p.getUpgradeValue = function(upgrade) {
        const upgradeType = `_${upgrade}Upgrades`;
        if(this[upgradeType].length === 0){
            return false;
        }else {
            return this[upgradeType][0];
        }
    };

    p.getStartingUpgradeValues = function() {
        return {
            'damage':this._damageUpgrades[0],
            'health':this._healthUpgrades[0],
            'speed':this._speedUpgrades[0],
            'cooldown':this._cooldownUpgrades[0]
        }
    };

    p.resetUpgrades = function() {
        this._damageUpgrades = this._DAMAGE_UPGRADES.concat();
        this._healthUpgrades = this._HEALTH_UPGRADES.concat();
        this._speedUpgrades = this._SPEED_UPGRADES.concat();
        this._cooldownUpgrades = this._COOLDOWN_UPGRADES.concat();
    };

    p.setHighscore = function(score) {
        this._highscore = score;
        localStorage.setItem("highscore" , JSON.stringify(this._highscore));
    };

    p.getHighscore = function() {
        return this._highscore;
    };

    system.Player = createjs.promote(Player,"Container");
})();


