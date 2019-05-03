
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
    p._playerAmmo = null;
    p._playerBullets = null;
    
    p._enemiesController = null;

    //p._enemies = null;
    //p._enemiesDamage = null;
    //p._enemyAmmo = null;
    //p._enemyBullets = null;
    //p._activeEnemies = null;
    //p._maxNumberOfActiveEnemies = null;
    //p._maxNumberOfEnemies = null;
    //p._enemiesCounter = null;

    p._level = null;
    p._currentLevel = null;
    p._fpsText = null;

    p._gameOver = false;

    p._CAMERA_WIDTH = null;
    p._CAMERA_HEIGHT = null;

    p.LEVEL_WIDTH = null;
    p.LEVEL_HEIGHT = null;

    p._PLAYER_LEFT_BORDER = null;
    p._PLAYER_RIGHT_BORDER = null;
    p._PLAYER_UP_BORDER = null;
    p._PLAYER_DOWN_BORDER = null;

    p._LEFT_AREA_BORDER = null;
    p._RIGHT_AREA_BORDER = null;
    p._UP_AREA_BORDER = null;
    p._DOWN_AREA_BORDER = null;

    p._init = function () {
        this._enemiesController = new system.EnemiesController(this);
        
        this._playerAmmo = [];
        this._playerBullets = [];

        //this._enemyAmmo = [];
        //this._enemyBullets = [];

        //this._enemies = [];
        //this._activeEnemies = [];

        this._currentLevel = 1;

        this._setLevelParameters();

        this._level = new createjs.Container();

        const back = system.CustomMethods.makeImage('background', true);

        const player = this._player = new system.Player();
        player.x = 960;
        player.y = 540;
        player.setMovementSpeed(10);
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

        this.LEVEL_WIDTH = back.image.width;
        this.LEVEL_HEIGHT = back.image.height;

        this._LEFT_AREA_BORDER = this._CAMERA_WIDTH/2;
        this._RIGHT_AREA_BORDER = this.LEVEL_WIDTH - (this.LEVEL_WIDTH/4);
        this._UP_AREA_BORDER = this._CAMERA_HEIGHT/2;
        this._DOWN_AREA_BORDER = this.LEVEL_HEIGHT - (this.LEVEL_HEIGHT/4);

        const playerDimension = player.getDimension();
        this._PLAYER_LEFT_BORDER = 0;
        this._PLAYER_RIGHT_BORDER = this.LEVEL_WIDTH - playerDimension.width;
        this._PLAYER_UP_BORDER = 0;
        this._PLAYER_DOWN_BORDER = this.LEVEL_HEIGHT - playerDimension.height;
        // SETTING CONSTANTS
        // ADDING EVENT LISTENERS
        document.onkeydown = (e)=>{
            this._handleKey(e.key, true);
        };
        document.onkeyup = (e)=>{
            this._handleKey(e.key, false);
        };

        this._addButtons();

        const cursor = system.CustomMethods.makeImage('cursor', false, true);
        this.addChild(cursor);

        stage.on('stagemousemove', (e)=>{
            cursor.x = e.stageX;
            cursor.y = e.stageY;
            const playerDimension = this._player.getDimension();
            let point = this._player.localToGlobal(this.x, this.y);
            let angleDeg = Math.atan2((point.y + playerDimension.height/2) - e.stageY, (point.x + playerDimension.width/2) - e.stageX) * 180 / Math.PI;
            angleDeg -= 90;
            this._player.rotateGun(Math.round(angleDeg));
        });
        back.on('mousedown', (e)=>{ // click je pravio problem kada se uradi drag, nekad ne registruje event, stavljeno na back umesto na stage zbog dugmica
            if(this._gameOver === false){
                if(this._player.canShoot() === true){
                    this._playerShoot(e.stageX, e.stageY);
                }
            }
        });
        // ADDING EVENT LISTENERS
        setInterval(()=>{
            if(this._gameOver === false) {
                //this._enemyShoot();
                //this._manageEnemies();
                this._enemiesController.manageEnemies();
            }
        },1000);

        //this._addEnemies(3);
        this._enemiesController.addEnemies(3);

/*        setTimeout(()=>{
            player.setMovementSpeed(6);
        },3000);*/
    };

    p._setLevelParameters = function() {
        console.log(`setting parameters for level ${this._currentLevel}`);
        const parameters = system.LevelParameters.getParametersForLevel(this._currentLevel);
        this._enemiesController.setEnemiesParameters(parameters);
/*        this._enemiesDamage = parameters.enemiesDamage;
        this._setMaxNumberOfActiveEnemies(parameters.maxNumberOfActiveEnemies);
        this._setMaxNumberOfEnemies(parameters.maxNumberOfEnemies);*/
    };

/*    p._manageEnemies = function() {
        if(this._enemiesCounter < this._maxNumberOfEnemies){
            if(this._activeEnemies.length < this._maxNumberOfActiveEnemies){
                this._addEnemy();
            }
        }else{
            if(this._activeEnemies.length === 0){
                console.log('no more enemies');
                this._levelPassed();
            }
        }
    };*/

    p._addButtons = function() {
        const fsButtonImage = system.CustomMethods.makeImage('fsButton', true, false);
        let fsButton = new system.Button(fsButtonImage);
        fsButton.addEventListener('click', (e)=>{
            system.CustomMethods.toggleFullScreen();
        });
        fsButton.x = 1895;
        fsButton.y = 25;
        this.addChild(fsButton);
    };

/*    p._setMaxNumberOfEnemies = function(num) {
        this._maxNumberOfEnemies = num;
    };

    p._setMaxNumberOfActiveEnemies = function(num) {
        this._maxNumberOfActiveEnemies = num;
    };*/

/*    p._addEnemies = function(numOfEnemies) {
        for(let i = 0; i < numOfEnemies; i++) {
            this._addEnemy();
        }
    };*/

    p._playerShoot = function(mouseX, mouseY) {
        const playerDimension = this._player.getDimension();

        let point = this._player.localToGlobal(this.x, this.y);
        let angleDeg = Math.atan2((point.y + playerDimension.height/2) - mouseY, (point.x + playerDimension.width/2) - mouseX) * 180 / Math.PI;
        angleDeg -= 90;
        this._player.rotateGun(Math.round(angleDeg));

        let bull;

        if(this._playerAmmo.length > 0){
            bull = this._playerAmmo[0];
            this._playerAmmo.splice(0,1);
            //bull.visible = true;
        }else{
            bull = system.CustomMethods.makeImage('bullet', false, false);
            bull.visible = false;
            this._level.addChild(bull);
        }

        bull.x = this._player.x + playerDimension.width/2 - 4; // bullet w = 8
        bull.y = this._player.y + playerDimension.height/2 - 4; // bullet h = 8

        let p = this._player.bulletPoint.localToGlobal(this.x, this.y);
        let xP = Math.round(Math.abs(this._level.x) + p.x);
        let yP = Math.round(Math.abs(this._level.y) + p.y);

        this._playerBullets.push(bull);

        // DA BI DELOVALO KAO DA JE METAK ISPOD SETUJE VISIBILITY NA TRUE POSLE PAR MILISEKUNDI
        let startTime = 0;
        let checkTime = true;
        //bull.visible = false;
        let mousePoint = this._level.globalToLocal(mouseX,mouseY);
        let timeToShowBullet = 10;
        if(this._playerMovement.left === true){
            if(mousePoint.x < this._player.x){
                timeToShowBullet = 30;
            }else{
                timeToShowBullet = 5;
            }
        }
        if(this._playerMovement.right === true){
            if(mousePoint.x < this._player.x){
                timeToShowBullet = 5
            }else{
                timeToShowBullet = 30;
            }
        }
        if(this._playerMovement.down === true){
            if(mousePoint.y < this._player.y){
                timeToShowBullet = 5;
            }else{
                timeToShowBullet = 30;
            }
        }
        if(this._playerMovement.up === true){
            if(mousePoint.y < this._player.y){
                timeToShowBullet = 30;
            }else{
                timeToShowBullet = 5;
            }
        }

        //createjs.Tween.get(bull).to({x:xP,y:yP},this._player.getBulletSpeed());
        let bulletTween = createjs.Tween.get(bull).to({x:xP,y:yP},this._player.getBulletSpeed());

        this._player.doShootAnimation();

        bulletTween.addEventListener('change', (e)=>{
            if(checkTime === true){
                if(startTime === 0){
                    startTime = e.timeStamp;
                }else{
                    if((e.timeStamp - startTime) > timeToShowBullet){
                        bull.visible = true;
                        checkTime = false;
                        bulletTween.removeAllEventListeners();
                    }
                }
            }
        });
    };

    p._enemyShoot = function() {
        this._enemiesController.enemyShoot();
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
        const movementSpeed = this._player.getMovementSpeed();
        if(this._playerMovement.left === true){
            if(this._player.x > this._PLAYER_LEFT_BORDER){
                this._player.x -= movementSpeed;
            }
        }
        if(this._playerMovement.right === true){
            if(this._player.x < this._PLAYER_RIGHT_BORDER) {
                this._player.x += movementSpeed;
            }
        }
        if(this._playerMovement.up === true){
            if(this._player.y > this._PLAYER_UP_BORDER){
                this._player.y -= movementSpeed;
            }
        }
        if(this._playerMovement.down === true){
            if(this._player.y < this._PLAYER_DOWN_BORDER){
                this._player.y += movementSpeed;
            }
        }
    };

    p._moveEnemies = function() {
        this._enemiesController.moveActiveEnemies(this._player.x, this._player.y, this._player.getDimension());
    };

    p._moveLevel = function() {
        const movementSpeed = this._player.getMovementSpeed();
        if(this._playerMovement.right === true){
            if(this._player.x > this._LEFT_AREA_BORDER){
                if(this._level.x > -(this._CAMERA_WIDTH)){
                    this._level.x -= movementSpeed;
                }
            }
        }
        if(this._playerMovement.left === true){
            if(this._player.x < this._RIGHT_AREA_BORDER){
                if(this._level.x < 0) {
                    this._level.x += movementSpeed;
                }
            }
        }
        if(this._playerMovement.down === true){
            if(this._player.y > this._UP_AREA_BORDER){
                if(this._level.y > -(this._CAMERA_HEIGHT)) {
                    this._level.y -= movementSpeed;
                }
            }
        }
        if(this._playerMovement.up === true){
            if(this._player.y < this._DOWN_AREA_BORDER){
                if(this._level.y < 0) {
                    this._level.y += movementSpeed;
                }
            }
        }
    };

    p._onMovePlayer = function(direction, move) {
        this._playerMovement[direction] = move;
    };

    p._checkIfEnemyHitsPlayer = function() {
        this._enemiesController.checkActiveBullets(this._player);
    };

    p._checkEnemyHits = function() {
        let i = this._playerBullets.length-1;
        if(i < 0){return;}
        for(i; i > -1; i--){
            const bullet = this._playerBullets[i];
            if(bullet.x > this.LEVEL_WIDTH || bullet.x < 0 || bullet.y < 0 || bullet.y > this.LEVEL_HEIGHT){
                this._playerAmmo.push(bullet);
                this._playerBullets.splice(i,1);
                bullet.visible = false;
            }else{
                const bulletDamage = this._player.getDamage();
                if(this._enemiesController.checkHitFromPlayer(bullet, bulletDamage) === true){
                    this._playerAmmo.push(bullet);
                    this._playerBullets.splice(i,1);
                    bullet.visible = false;
                }
            }
        }
    };

    p._shakeStage = function() {
        createjs.Tween.get(this).to({x:5,y:-5},50).to({x:-5,y:5},50).to({x:5,y:-5},50).to({x:-5,y:5},50).to({x:0,y:0},50);
    };

    p._updateFps = function() {
        this._fpsText.text = Math.round(createjs.Ticker.getMeasuredFPS());
    };

    p.addEnemyBullet = function(bullet) {
        this._level.addChild(bullet);
    };

    p.addEnemy = function(enemy) {
        this._level.addChild(enemy);
    };

    p.moveEnemyBullet = function(bullet, bulletPoint, bulletSpeed) {
        let p = bulletPoint.localToGlobal(this.x, this.y);
        let xP = Math.round(Math.abs(this._level.x) + p.x);
        let yP = Math.round(Math.abs(this._level.y) + p.y);

        createjs.Tween.get(bullet).to({x:xP,y:yP},bulletSpeed);
    };

    p.levelPassed = function() {
        this._gameOver = true;
        this._currentLevel++;
        this._setLevelParameters();
        setTimeout(()=>{
            console.log('starting next level');
            this._gameOver = false;
        },3000);
    };

    p.enemyHitsPlayer = function(damage) {
        this._player.decreaseHealth(damage);
        this._shakeStage();
        if(this._player.getHealth() < 1) {
            this._player.visible = false;
            this._gameOver = true;
            console.log('game over');
        }
    };

    p.render = function(e){
        if(this._gameOver === false){
            this._movePlayer();
            this._moveEnemies();
            this._moveLevel();
            this._checkIfEnemyHitsPlayer();
            this._checkEnemyHits();
        }
        this._updateFps();
        stage.update(e);
        //console.log(this._enemyBullets.length);
        //console.log(this._playerBullets.length);
        //console.log(this._playerAmmo.length);
        //console.log(this._level.numChildren);
        //console.log(this._enemies.length);
    };

    system.Game = createjs.promote(Game,"Container");
})();


