
this.system = this.system || {};
(function(){
    "use strict";

    const GameoverPanel = function(game, playerHighscore){
        this.Container_constructor();
        this._init(game, playerHighscore);
    };

    const p = createjs.extend(GameoverPanel,createjs.Container);

    p._game = null;
    p._highscore = null;
    p._score = null;
    p._resetButton = null;

    p._init = function (game, playerHighscore) {
        this._game = game;

        const back = system.CustomMethods.makeImage('upgradePanelBack', false, false);
        this.addChild(back);

        const centerX = back.image.width/2;

        const heading = system.CustomMethods.makeText('GAME OVER', '40px Teko', '#ffffff', 'center', 'middle');
        heading.x = centerX;
        heading.y = 35;

        const highscoreHeading = system.CustomMethods.makeText('Highscore', '40px Teko', '#ffffff', 'center', 'middle');
        highscoreHeading.x = centerX - 150;
        highscoreHeading.y = 90;

        const highscore = this._highscore = system.CustomMethods.makeText(playerHighscore, '40px Teko', '#ffff36', 'center', 'middle');
        highscore.x = highscoreHeading.x;
        highscore.y = highscoreHeading.y + 50;

        const currentScore = system.CustomMethods.makeText('Score', '40px Teko', '#ffffff', 'center', 'middle');
        currentScore.x = centerX + 150;
        currentScore.y = highscoreHeading.y;

        const score = this._score = system.CustomMethods.makeText('0', '40px Teko', '#ffff36', 'center', 'middle');
        score.x = currentScore.x;
        score.y = highscore.y;


        let buttonImage = system.CustomMethods.makeImage('resetButton', true, false);
        const resetButton = this._resetButton = new system.Button(buttonImage);
        resetButton.x = centerX;
        resetButton.y = 230;
        resetButton.on('click', ()=>{
            resetButton.doScaleAnimation();
            this._game.onReset();
        });

        this.addChild(heading, highscoreHeading, highscore, currentScore, score, resetButton)
    };

    p.updateTextField = function(type, value) {
        const txtField = `_${type}`;
        this[txtField].text = `${value}`;
    };

    p.enableButtons = function(enable) {
        this._resetButton.enableClick(enable);
    };

    system.GameoverPanel = createjs.promote(GameoverPanel,"Container");
})();


