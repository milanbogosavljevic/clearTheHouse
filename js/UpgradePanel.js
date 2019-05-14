
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
    p._healtIncrementerTxt = null;
    p._speedIncrementerTxt = null;

    p._init = function (game, startingUpgradeValues) {
        this._game = game;
        this._buttons = [];

        const back = system.CustomMethods.makeImage('upgradePanelBack', false, false);
        this.addChild(back);

        const heading = system.CustomMethods.makeText('CHOOSE UPGRADE', '30px Arial', '#ffffff', 'center', 'middle');
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
            this._game.onUpgradeSelected('Damage');
        });
        let damageIncrementer = this._damageIncrementerTxt = system.CustomMethods.makeText(`+${startingUpgradeValues.damage}`, '36px Arial', '#ffffff', 'center', 'middle');
        damageIncrementer.x = damageButton.x;
        damageIncrementer.y = textsYPos;

        buttonImage = system.CustomMethods.makeImage('healthButton', true, false);
        const healthButton = new system.Button(buttonImage);
        healthButton.x = 200;
        healthButton.y = buttonsYPos;
        healthButton.on('click', ()=>{
            healthButton.doScaleAnimation();
            this._game.onUpgradeSelected('Health');
        });
        let healthIncrementer = this._healthIncrementerTxt = system.CustomMethods.makeText(`+${startingUpgradeValues.health}`, '36px Arial', '#ffffff', 'center', 'middle');
        healthIncrementer.x = healthButton.x;
        healthIncrementer.y = textsYPos;

        buttonImage = system.CustomMethods.makeImage('speedButton', true, false);
        const speedButton = new system.Button(buttonImage);
        speedButton.x = 333;
        speedButton.y = buttonsYPos;
        speedButton.on('click', ()=>{
            speedButton.doScaleAnimation();
            this._game.onUpgradeSelected('Speed');
        });
        let speedIncrementer = this._speedIncrementerTxt = system.CustomMethods.makeText(`+${startingUpgradeValues.speed}`, '36px Arial', '#ffffff', 'center', 'middle');
        speedIncrementer.x = speedButton.x;
        speedIncrementer.y = textsYPos;

        this.addChild(damageButton, damageIncrementer, healthButton, healthIncrementer, speedButton, speedIncrementer);
        this._buttons.push(damageButton, healthButton, speedButton);
    };

    p.updateTextField = function(type, value) {
        const txtField = `_${type.toLowerCase()}IncrementerTxt`;
        console.log(txtField);
        this[txtField].text = `+${value}`;

        console.log(`updating ${type}  with value  ${value}`);
    };

    p.enableButtons = function(enable) {
        this._buttons.forEach((button)=>{
            button.enableClick(enable);
        })
    };

    system.UpgradePanel = createjs.promote(UpgradePanel,"Container");
})();


