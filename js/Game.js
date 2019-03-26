
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
    p._enemy = null;
    p._enemyBullets = null;
    p._enemies = null;
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
        let playerBullets = this._playerBullets = [];
        let enemyBullets = this._enemyBullets = [];

        this._enemies = [];

        this._level = new createjs.Container();

        const back = system.CustomMethods.makeImage('background', true);

        const player = this._player = new system.Player();
        player.x = 300;
        player.y = 500;
        this._setPlayerMovement();

        const enemy = new system.Enemy();
        enemy.x = 300;
        enemy.y = 500;

        const enemy2 = new system.Enemy();
        enemy2.x = 800;
        enemy2.y = 500;

        this._enemies.push(enemy);
        this._enemies.push(enemy2);

        this._level.addChild(back, player, enemy, enemy2);
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
        //this._PLAYER_LEFT_BORDER = playerDimension.width/2;
        this._PLAYER_LEFT_BORDER = 0;
        //this._PLAYER_RIGHT_BORDER = this._LEVEL_WIDTH - (playerDimension.width/2);
        this._PLAYER_RIGHT_BORDER = this._LEVEL_WIDTH - playerDimension.width;
        //this._PLAYER_UP_BORDER = playerDimension.height/2;
        this._PLAYER_UP_BORDER = 0;
        //this._PLAYER_DOWN_BORDER = this._LEVEL_HEIGHT - (playerDimension.height/2);
        this._PLAYER_DOWN_BORDER = this._LEVEL_HEIGHT - playerDimension.height;
        // SETTING CONSTANTS
        // ADDING EVENT LISTENERS
        document.onkeydown = (e)=>{
            this._handleKey(e.key, true);
        };
        document.onkeyup = (e)=>{
            this._handleKey(e.key, false);
        };
        stage.on('stagemousemove', (e)=>{
            const playerDimension = this._player.getDimension();
            let point = this._player.localToGlobal(this.x, this.y);
            let angleDeg = Math.atan2((point.y + playerDimension.height/2) - e.stageY, (point.x + playerDimension.width/2) - e.stageX) * 180 / Math.PI;
            angleDeg -= 90;
            this._player.rotateGun(Math.round(angleDeg));
        });
        stage.on('click', (e)=>{
            const playerDimension = this._player.getDimension();
            const bull = system.CustomMethods.makeImage('bullet', false, false);
            bull.x = this._player.x + playerDimension.width/2 - 4;
            bull.y = this._player.y + playerDimension.height/2 - 4;

            this._level.addChild(bull);

            this._playerBullets.push(bull);

            let p = this._player.bulletPoint.localToGlobal(this.x, this.y);
            let xP = Math.round(Math.abs(this._level.x) + p.x);
            let yP = Math.round(Math.abs(this._level.y) + p.y);

            createjs.Tween.get(bull).to({x:xP,y:yP},this._player.getBulletSpeed());

        });
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

    p._moveEnemy = function() {

        // ovde

        const point = this._enemy.localToGlobal(this.x, this.y);
        const playerDimension = this._player.getDimension();
        let angleDeg = Math.atan2(point.y - this._player.y - (playerDimension.height/4), point.x - this._player.x - (playerDimension.width/4)) * 180 / Math.PI;
        angleDeg -= 90;
        this._enemy.rotateGun(Math.round(angleDeg));
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

    p._checkPlayerHits = function() {
        let i = this._enemyBullets.length-1;
        if(i < 0){return;}
        const playerDimension = this._player.getDimension();
        for(i; i > -1; i--){
            const bullet = this._enemyBullets[i];
            if(bullet.x > this._player.x && bullet.x < (this._player.x + playerDimension.width)){
                if(bullet.y > this._player.y && bullet.y < (this._player.y + playerDimension.height)){
                    console.log('enemy hits player');
                    this._enemyBullets.splice(i,1);
                    this._level.removeChild(bullet);
                }
            }
        }
    };

    p._checkEnemyHits = function() {
        let i = this._playerBullets.length-1;
        if(i < 0){return;}
        for(i; i > -1; i--){
            const bullet = this._playerBullets[i];

            if(bullet.x > this._LEVEL_WIDTH || bullet.x < 0 || bullet.y < 0 || bullet.y > this._LEVEL_HEIGHT){
                this._playerBullets.splice(i,1);
                this._level.removeChild(bullet);
            }else{
                let e = this._enemies.length - 1;
                for(e; e > -1; e--){
                    const enemy = this._enemies[e];
                    const dimension = enemy.getDimension();

                    if(bullet.x > enemy.x && bullet.x < (enemy.x + dimension.width)){
                        if(bullet.y > enemy.y && bullet.y < (enemy.y + dimension.height)){
                            this._playerBullets.splice(i,1);
                            this._level.removeChild(bullet);
                            enemy.alpha = 0.5;
                            console.log('player hits enemy');
                        }
                    }
                }
            }
        }
    };

    p._updateFps = function() {
        this._fpsText.text = Math.round(createjs.Ticker.getMeasuredFPS());
    };

    p.render = function(e){
        stage.update(e);
        this._movePlayer();
        this._moveEnemy();
        this._moveLevel();
        this._checkPlayerHits();
        this._checkEnemyHits();
        this._updateFps();
        //console.log(this._playerBullets.length);
        //console.log(this._level.numChildren);
    };

    system.Game = createjs.promote(Game,"Container");
})();


