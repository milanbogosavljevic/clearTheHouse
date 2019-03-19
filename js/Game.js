
this.system = this.system || {};
(function(){
    "use strict";

    const Game = function(){
        this.Container_constructor();
        this._init();
    };

    const p = createjs.extend(Game,createjs.Container);

    p._player = null;
    p._playerMovement = null;
    p._playerBullets = null;
    p._level = null;
    p._fpsText = null;

    p._CAMERA_WIDTH = null;
    p._CAMERA_HEIGHT = null;

    p._LEVEL_WIDTH = null;
    p._LEVEL_HEIGHT = null;

    p._PLAYER_LEFT_BORDER = null;
    p._PLAYER_RIGHT_BORDER = null;
    p._PLAYER_UP_BORDER = null;
    p._PLAYER_DOWN_BORDER = null;

    p._LEFT_AREA_BORDER = null;
    p._RIGHT_AREA_BORDER = null;
    p._UP_AREA_BORDER = null;
    p._DOWN_AREA_BORDER = null;

    p._init = function () {
        this._playerBullets = [];

        this._level = new createjs.Container();

        const back = system.CustomMethods.makeImage('background', true);

        const player = this._player = new system.Player();
        player.x = 300;
        player.y = 500;
        this._setPlayerMovement();

        this._level.addChild(back, player);
        this.addChild(this._level);

        let fps = this._fpsText = system.CustomMethods.makeText('', '50px Arial', '#fff', 'center', 'middle');
        fps.x = 100;
        fps.y = 100;
        this.addChild(fps);
        // SETTING CONSTANTS
        this._CAMERA_WIDTH = stage.canvas.width;
        this._CAMERA_HEIGHT = stage.canvas.height;

        this._LEVEL_WIDTH = back.image.width;
        this._LEVEL_HEIGHT = back.image.height;

        this._LEFT_AREA_BORDER = this._CAMERA_WIDTH/2;
        this._RIGHT_AREA_BORDER = this._LEVEL_WIDTH - (this._LEVEL_WIDTH/4);
        this._UP_AREA_BORDER = this._CAMERA_HEIGHT/2;
        this._DOWN_AREA_BORDER = this._LEVEL_HEIGHT - (this._LEVEL_HEIGHT/4);

        const playerDimension = player.getDimension();
        this._PLAYER_LEFT_BORDER = playerDimension.width/2;
        this._PLAYER_RIGHT_BORDER = this._LEVEL_WIDTH - (playerDimension.width/2);
        this._PLAYER_UP_BORDER = playerDimension.height/2;
        this._PLAYER_DOWN_BORDER = this._LEVEL_HEIGHT - (playerDimension.height/2);
        // SETTING CONSTANTS
        // ADDING EVENT LISTENERS
        document.onkeydown = (e)=>{
            this._handleKey(e.key, true);
        };
        document.onkeyup = (e)=>{
            this._handleKey(e.key, false);
        };
        stage.on('stagemousemove', (e)=>{
            let point = this._player.localToGlobal(this.x, this.y);
            let angleDeg = Math.atan2(point.y - e.stageY, point.x - e.stageX) * 180 / Math.PI;
            angleDeg -= 90;
            this._player.rotation = Math.round(angleDeg);
        });
        stage.on('click', (e)=>{
            console.log('click');
        });
        // ADDING EVENT LISTENERS

        this._bull = system.CustomMethods.makeImage('bullet', false, true);
        this._bull.x = 200;
        this._bull.y = 200;

        this._player2 = system.CustomMethods.makeImage('player', false, true);
        this._player2.x = 500;
        this._player2.y = 500;
        this._level.addChild(this._player2);


        this._level.addChild(this._bull);
    };

    p._handleKey = function(key, bool) {
        if(key === 'a' || key === 'A'){
            if(this._playerMovement.left !== bool){
                this._playerMovement.left = bool;
            }
        }
        if(key === 'd' || key === 'D'){
            if(this._playerMovement.right !== bool){
                this._playerMovement.right = bool;
            }
        }
        if(key === 'w' || key === 'W'){
            if(this._playerMovement.up !== bool){
                this._playerMovement.up = bool;
            }
        }
        if(key === 's' || key === 'S'){
            if(this._playerMovement.down !== bool){
                this._playerMovement.down = bool;
            }
        }
    };

    p._setPlayerMovement = function() {
        this._playerMovement = {
            left:false,
            right:false,
            up:false,
            down:false
        }
    };

    p._movePlayer = function() {
        if(this._playerMovement.left === true){
            if(this._player.x > this._PLAYER_LEFT_BORDER){
                this._player.x -= this._player.speed;
            }
        }
        if(this._playerMovement.right === true){
            if(this._player.x < this._PLAYER_RIGHT_BORDER) {
                this._player.x += this._player.speed;
            }
        }
        if(this._playerMovement.up === true){
            if(this._player.y > this._PLAYER_UP_BORDER){
                this._player.y -= this._player.speed;
            }
        }
        if(this._playerMovement.down === true){
            if(this._player.y < this._PLAYER_DOWN_BORDER){
                this._player.y += this._player.speed;
            }
        }
    };

    p._moveLevel = function() {
        if(this._playerMovement.right === true){
            if(this._player.x > this._LEFT_AREA_BORDER){
                if(this._level.x > -(this._CAMERA_WIDTH)){
                    this._level.x -= this._player.speed;
                }
            }
        }
        if(this._playerMovement.left === true){
            if(this._player.x < this._RIGHT_AREA_BORDER){
                if(this._level.x < 0) {
                    this._level.x += this._player.speed;
                }
            }
        }
        if(this._playerMovement.down === true){
            if(this._player.y > this._UP_AREA_BORDER){
                if(this._level.y > -(this._CAMERA_HEIGHT)) {
                    this._level.y -= this._player.speed;
                }
            }
        }
        if(this._playerMovement.up === true){
            if(this._player.y < this._DOWN_AREA_BORDER){
                if(this._level.y < 0) {
                    this._level.y += this._player.speed;
                }
            }
        }
    };

    p._onMovePlayer = function(direction, move) {
        this._playerMovement[direction] = move;
    };

    p._checkBulletsHits = function() {
        //console.log(`bull x = ${this._bull.x}      y = ${this._bull.y}`);
        //console.log(`player x = ${this._player.x}      y = ${this._player.y}`);
        let point = this._bull.localToGlobal(this.x, this.y);
        console.log(this._player.hitTest(point.x, point.y));
    };

    p._updateFps = function() {
        this._fpsText.text = Math.round(createjs.Ticker.getMeasuredFPS());
    };

    p.render = function(e){
        stage.update(e);
        this._movePlayer();
        this._moveLevel();
        this._checkBulletsHits();
        this._updateFps();
    };

    system.Game = createjs.promote(Game,"Container");
})();


