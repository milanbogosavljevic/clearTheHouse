
this.system = this.system || {};
(function(){
    "use strict";

    const UpgradePanel = function(game, startingUpgradeValues){
        this.Container_constructor();
        this._init(game, startingUpgradeValues);
    };

    const p = createjs.extend(UpgradePanel,createjs.Container);

    p._game = null;
    p._buttons = null;
    p._damageIncrementerTxt = null;
    p._healthIncrementerTxt = null;
    p._speedIncrementerTxt = null;
    p._cooldownIncrementerTxt = null;

    p._init = function (game, startingUpgradeValues) {
        this._game = game;
        this._buttons = [];

        const back = system.CustomMethods.makeImage('upgradePanelBack', false, false);
        this.addChild(back);

        const heading = system.CustomMethods.makeText('CHOOSE UPGRADE', '30px Teko', '#ffffff', 'center', 'middle');
        heading.x = back.image.width/2;
        heading.y = 46;
        this.addChild(heading);

        const buttonsYPos = 140;
        const textsYPos = 240;

        let buttonImage = system.CustomMethods.makeImage('damageButton', true, false);
        const damageButton = new system.Button(buttonImage);
        damageButton.x = 67;
        damageButton.y = buttonsYPos;
        damageButton.on('click', ()=>{
            damageButton.doScaleAnimation();
            this._game.onUpgradeSelected('damage');
        });
        let damageIncrementer = this._damageIncrementerTxt = system.CustomMethods.makeText(`+${startingUpgradeValues.damage}`, '36px Teko', '#ffffff', 'center', 'middle');
        damageIncrementer.x = damageButton.x;
        damageIncrementer.y = textsYPos;

        buttonImage = system.CustomMethods.makeImage('healthButton', true, false);
        const healthButton = new system.Button(buttonImage);
        healthButton.x = 200;
        healthButton.y = buttonsYPos;
        healthButton.on('click', ()=>{
            healthButton.doScaleAnimation();
            this._game.onUpgradeSelected('health');
        });
        let healthIncrementer = this._healthIncrementerTxt = system.CustomMethods.makeText(`+${startingUpgradeValues.health}`, '36px Teko', '#ffffff', 'center', 'middle');
        healthIncrementer.x = healthButton.x;
        healthIncrementer.y = textsYPos;

        buttonImage = system.CustomMethods.makeImage('speedButton', true, false);
        const speedButton = new system.Button(buttonImage);
        speedButton.x = 333;
        speedButton.y = buttonsYPos;
        speedButton.on('click', ()=>{
            speedButton.doScaleAnimation();
            this._game.onUpgradeSelected('speed');
        });
        let speedIncrementer = this._speedIncrementerTxt = system.CustomMethods.makeText(`+${startingUpgradeValues.speed}`, '36px Teko', '#ffffff', 'center', 'middle');
        speedIncrementer.x = speedButton.x;
        speedIncrementer.y = textsYPos;

        buttonImage = system.CustomMethods.makeImage('cooldownButton', true, false);
        const cooldownButton = new system.Button(buttonImage);
        cooldownButton.x = 466;
        cooldownButton.y = buttonsYPos;
        cooldownButton.on('click', ()=>{
            cooldownButton.doScaleAnimation();
            this._game.onUpgradeSelected('cooldown');
        });
        let cooldownIncrementer = this._cooldownIncrementerTxt = system.CustomMethods.makeText(`-${startingUpgradeValues.cooldown}`, '36px Teko', '#ffffff', 'center', 'middle');
        cooldownIncrementer.x = cooldownButton.x;
        cooldownIncrementer.y = textsYPos;

        console.log(`cooldown ======== ${startingUpgradeValues.cooldown}`);

        this.addChild(damageButton, damageIncrementer, healthButton, healthIncrementer, speedButton, speedIncrementer, cooldownButton, cooldownIncrementer);
        this._buttons.push(damageButton, healthButton, speedButton, cooldownButton);
    };

    p.updateTextField = function(type, value) {
        const txtField = `_${type}IncrementerTxt`;
        let sign = type === 'cooldown' ? '-' : '+';
        this[txtField].text = `${sign}${value}`;
    };

    p.resetPanel = function(values) {
        this._damageIncrementerTxt.text = `+${values.damage}`;
        this._healthIncrementerTxt.text = `+${values.health}`;
        this._speedIncrementerTxt.text = `+${values.speed}`;
        this._cooldownIncrementerTxt.text = `-${values.cooldown}`;
    };

    p.enableButtons = function(enable) {
        this._buttons.forEach((button)=>{
            button.enableClick(enable);
        })
    };

    system.UpgradePanel = createjs.promote(UpgradePanel,"Container");
})();


