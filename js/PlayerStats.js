
this.system = this.system || {};
(function(){
    "use strict";

    const PlayerStats = function(startingUpgradeValues){
        this.Container_constructor();
        this._init(startingUpgradeValues);
    };

    const p = createjs.extend(PlayerStats,createjs.Container);

    p._damage = null;
    p._health = null;
    p._speed = null;
    p._score = null;
    p._scoreNum = null;

    p._init = function (values) {
        const back = system.CustomMethods.makeImage('playerStatsBack', false, false);
        this.addChild(back);

        this._scoreNum = 0;

        const xPos = 112;

        const damage = this._damage = system.CustomMethods.makeText(values.damage, '30px Teko', '#000000', 'center', 'middle');
        damage.y = 35;

        const health = this._health = system.CustomMethods.makeText(values.health, '30px Teko', '#000000', 'center', 'middle');
        health.y = 105;

        const speed = this._speed = system.CustomMethods.makeText(values.speed, '30px Teko', '#000000', 'center', 'middle');
        speed.y = 175;

        const score = this._score = system.CustomMethods.makeText(this._scoreNum, '40px Teko', '#0006ff', 'center', 'middle');
        score.x = back.image.width/2;
        score.y = 250;

        damage.x = health.x = speed.x = xPos;
        this.addChild(damage, health, speed, score);
    };

    p.updateTextField = function(type, value) {
        const txtField = `_${type}`;
        this[txtField].text = value;
    };

    p.resetStats = function(values) { // todo na reset dugme zvati
        this._scoreNum = 0;
        this._damage.text = values.damage;
        this._health.text = values.health;
        this._speed.text = values.speed;
        this._score.text = 0;
    };

    p.increaseScore = function(incrementer) {
        this._scoreNum += incrementer;
        this.updateTextField('score', this._scoreNum);
    };

    p.getScore = function() {
        return this._scoreNum;
    };

    system.PlayerStats = createjs.promote(PlayerStats,"Container");
})();


