
this.system = this.system || {};
(function(){
    "use strict";

    const EnemiesCounter = function(){
        this.Container_constructor();
        this._init();
    };

    const p = createjs.extend(EnemiesCounter,createjs.Container);
    p._enemiesCounter = null;
    p._enemiesCounterNum = null;
    p._enemiesTotal = null;

    p._init = function () {
        const back = system.CustomMethods.makeImage('enemiesCounterBack', false, false);
        this.addChild(back);

        this.regX = back.image.width/2;
        this.regY = back.image.height/2;

        this._enemiesCounterNum = 0;

        let enemiesCounter = this._enemiesCounter = system.CustomMethods.makeText(this._enemiesCounterNum, '50px Arial', '#000000', 'center', 'middle');
        enemiesCounter.x = 55;
        enemiesCounter.y = 55;

        const divider = system.CustomMethods.makeText(':', '50px Arial', '#000000', 'center', 'middle');
        divider.x = 102;
        divider.y = 50;

        let enemiesTotal = this._enemiesTotal = system.CustomMethods.makeText('0', '50px Arial', '#000000', 'center', 'middle');
        enemiesTotal.x = 150;
        enemiesTotal.y = 55;

        this.addChild(enemiesCounter, divider, enemiesTotal);
    };

    p.updateCounter = function() {
        this._enemiesCounterNum++;
        this._enemiesCounter.text = this._enemiesCounterNum;
    };

    p.resetCounter = function() {
        this._enemiesCounterNum = -1;
        this.updateCounter();
    };

    p.updateTotal = function(num) {
        this._enemiesTotal.text = num;
    };

    system.EnemiesCounter = createjs.promote(EnemiesCounter,"Container");
})();


