
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

    p._init = function (values) {
        const back = system.CustomMethods.makeImage('playerStatsBack', false, false);
        this.addChild(back);

        const xPos = 112;

        const damage = this._damage = system.CustomMethods.makeText(values.damage, '30px Arial', '#000000', 'center', 'middle');
        damage.y = 35;

        const health = this._health = system.CustomMethods.makeText(values.health, '30px Arial', '#000000', 'center', 'middle');
        health.y = 105;

        const speed = this._speed = system.CustomMethods.makeText(values.speed, '30px Arial', '#000000', 'center', 'middle');
        speed.y = 175;

        damage.x = health.x = speed.x = xPos;
        this.addChild(damage, health, speed);
    };

    p.updateTextField = function(type, value) {
        const txtField = `_${type}`;
        this[txtField].text = value;
    };

    system.PlayerStats = createjs.promote(PlayerStats,"Container");
})();


