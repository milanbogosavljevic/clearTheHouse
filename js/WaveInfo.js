
this.system = this.system || {};
(function(){
    "use strict";

    const WaveInfo = function(){
        this.Container_constructor();
        this._init();
    };

    const p = createjs.extend(WaveInfo,createjs.Container);

    p._waveNumber = null;
    p._numberOfEnemies = null;
    p._numberOfActiveEnemies = null;
    p._enemiesDamage = null;

    p._init = function () {
        const back = system.CustomMethods.makeImage('waveInfo', false, true);
        this.addChild(back);

        const spacing = 100;
        const spacing2 = 36;

        const currentWave = system.CustomMethods.makeText('Wave', '30px Teko', '#fff', 'center', 'middle');
        currentWave.y = -165;
        const waveNumber = this._waveNumber = system.CustomMethods.makeText('0', '30px Teko', '#ffff36', 'center', 'middle');
        waveNumber.y = currentWave.y + spacing2;

        const enemies = system.CustomMethods.makeText('Enemies', '30px Teko', '#fff', 'center', 'middle');
        enemies.y = currentWave.y + spacing;
        const numberOfEnemies = this._numberOfEnemies = system.CustomMethods.makeText('0', '30px Teko', '#ffff36', 'center', 'middle');
        numberOfEnemies.y = enemies.y + spacing2;

        const activeEnemies = system.CustomMethods.makeText('Active Enemies', '30px Teko', '#fff', 'center', 'middle');
        activeEnemies.y = enemies.y + spacing;
        const numberOfActiveEnemies = this._numberOfActiveEnemies = system.CustomMethods.makeText('0', '30px Teko', '#ffff36', 'center', 'middle');
        numberOfActiveEnemies.y = activeEnemies.y + spacing2;

        const damage = system.CustomMethods.makeText('Enemies Damage', '30px Teko', '#fff', 'center', 'middle');
        damage.y = activeEnemies.y + spacing;
        const enemiesDamage = this._enemiesDamage = system.CustomMethods.makeText('0', '30px Teko', '#ffff36', 'center', 'middle');
        enemiesDamage.y = damage.y + spacing2;

        this.addChild(currentWave, waveNumber, enemies, numberOfEnemies, activeEnemies, numberOfActiveEnemies, damage, enemiesDamage);
    };

    p.updateTextFields = function(info) {
        this._waveNumber.text = info.waveNumber;
        this._numberOfEnemies.text = info.numberOfEnemies;
        this._numberOfActiveEnemies.text = info.numberOfActiveEnemies;
        this._enemiesDamage.text = info.enemiesDamage;
    };

    system.WaveInfo = createjs.promote(WaveInfo,"Container");
})();


