
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
    p._enemies = null;
    p._enemyAmmo = null;
    p._enemyBullets = null;
    p._activeEnemies = null;
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
        this._playerAmmo = [];
        this._playerBullets = [];

        this._enemyAmmo = [];
        this._enemyBullets = [];

        this._enemies = [];
        this._activeEnemies = [];

        this._level = new createjs.Container();

        const back = system.CustomMethods.makeImage('background', true);

        const player = this._player = new system.Player();
        player.x = 300;
        player.y = 500;
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
            this._playerShoot(e.stageX, e.stageY)
        });

        setInterval(()=>{
            //this._enemyShoot();
            if(this._activeEnemies.length < 10){
                this._addEnemy();
            }
        },2000);

        this._addEnemies(10);

/*        setTimeout(()=>{
            player.setMovementSpeed(6);
        },3000);*/
    };

    p._addEnemies = function(numOfEnemies) {
        for(let i = 0; i < numOfEnemies; i++) {
            this._addEnemy();
        }
    };

    p._addEnemy = function() {
        let enemy;
        if(this._enemies.length > 0){
            enemy = this._enemies[0];
            this._enemies.splice(0,1);
            enemy.visible = true;
        }else{
            enemy = new system.Enemy();
            this._level.addChild(enemy);
        }

        const xSpawn = system.CustomMethods.getRandomBool() === true ? system.CustomMethods.getRandomNumberFromTo(-100, 0) : system.CustomMethods.getRandomNumberFromTo(this._LEVEL_WIDTH, (this._LEVEL_WIDTH + 100));
        const ySpawn = system.CustomMethods.getRandomBool() === true ? system.CustomMethods.getRandomNumberFromTo(-100, 0) : system.CustomMethods.getRandomNumberFromTo(this._LEVEL_HEIGHT, (this._LEVEL_HEIGHT + 100));

        const speed = 4;
        enemy.x = xSpawn;
        enemy.y = ySpawn;
        enemy.setMovementSpeed(speed);

        this._activeEnemies.push(enemy);
    };

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
            bull.visible = true;
        }else{
            bull = system.CustomMethods.makeImage('bullet', false, false);
            this._level.addChild(bull);
        }

        bull.x = this._player.x + playerDimension.width/2 - 4;
        bull.y = this._player.y + playerDimension.height/2 - 4;

        let p = this._player.bulletPoint.localToGlobal(this.x, this.y);
        let xP = Math.round(Math.abs(this._level.x) + p.x);
        let yP = Math.round(Math.abs(this._level.y) + p.y);

        this._playerBullets.push(bull);

        createjs.Tween.get(bull).to({x:xP,y:yP},this._player.getBulletSpeed());
    };

    p._enemyShoot = function() {
        let i = this._activeEnemies.length - 1;
        if(i < 0){return;}

        let bullet;

        for(i; i > -1; i--){
            const enemy = this._activeEnemies[i];
            const enemyDimension = enemy.getDimension();

            if(this._enemyAmmo.length > 0){
                bullet = this._enemyAmmo[0];
                this._enemyAmmo.splice(0,1);
                bullet.visible = true;
            }else {
                bullet = system.CustomMethods.makeImage('bullet', false, false);
                this._level.addChild(bullet);
            }

            bullet.x = enemy.x + enemyDimension.width/2 - 4;
            bullet.y = enemy.y + enemyDimension.height/2 - 4;

            let p = enemy.bulletPoint.localToGlobal(this.x, this.y);
            let xP = Math.round(Math.abs(this._level.x) + p.x);
            let yP = Math.round(Math.abs(this._level.y) + p.y);

            this._enemyBullets.push(bullet);

            createjs.Tween.get(bullet).to({x:xP,y:yP},enemy.getBulletSpeed());
        }
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

    p._moveEnemy = function() {
        let i = this._activeEnemies.length - 1;
        if(i < 0){return;}
        for(i; i > -1; i--){
            const enemy = this._activeEnemies[i];
            const speed = enemy.getMovementSpeed();
            const xDifference = Math.abs(this._player.x - enemy.x); // nema potrebe ako su svi iste brzine, ne mogu da se prestizu
            const yDifference = Math.abs(this._player.y - enemy.y); // nema potrebe ako su svi iste brzine, ne mogu da se prestizu
            if(this._player.x > enemy.x){
                if(this._checkRightLeft(i,'right') === true){
                    if(xDifference > speed){
                        enemy.x += speed;
                    }
                }
            }else if(this._player.x < enemy.x){
                if(this._checkRightLeft(i,'left') === true) {
                    if(xDifference > speed){
                        enemy.x -= speed;
                    }
                }
            }
            if(this._player.y > enemy.y){
                if(this._checkUpDown(i, 'up')){
                    if(yDifference > speed){
                        enemy.y += speed;
                    }
                }
            }
            if(this._player.y < enemy.y){
                if(this._checkUpDown(i, 'down')) {
                    if (yDifference > speed) {
                        enemy.y -= speed;
                    }
                }
            }
            const playerDimension = this._player.getDimension();
            const enemyDimension = enemy.getDimension();
            let angleDeg = Math.atan2((enemy.y + enemyDimension.height/2) - (this._player.y + (playerDimension.height/2)), (enemy.x + enemyDimension.width/2) - (this._player.x + (playerDimension.width/2))) * 180 / Math.PI;
            angleDeg -= 90;
            enemy.rotateGun(Math.round(angleDeg));
        }
    };

    p._checkRightLeft = function(ind,direction) {
        const mainEnemy = this._activeEnemies[ind];
        const mX = mainEnemy.x;
        const mY = mainEnemy.y; // da bi mogao da ga obidje, nema potrebe ako su svi iste brzine
        const spacing = 80;
        let canGo = true;
        let i = this._activeEnemies.length - 1;
        for(i; i > -1; i--){
            if(i !== ind){
                const enemy = this._activeEnemies[i];
                const eX = enemy.x;
                const eY = enemy.y; // da bi mogao da ga obidje, nema potrebe ako su svi iste brzine
                let diff = direction === 'right' ? (eX - mX) : (mX - eX);
                const yDiff = Math.abs(mY - eY); // da bi mogao da ga obidje, nema potrebe ako su svi iste brzine
                if(yDiff < spacing){ // da bi mogao da ga obidje, nema potrebe ako su svi iste brzine
                    if(diff < spacing && diff > 0){
                        canGo = false;
                        break;
                    }
                }
            }
        }
        return canGo;
    };

    p._checkUpDown = function(ind,direction) {
        const mainEnemy = this._activeEnemies[ind];
        const mX = mainEnemy.x;
        const mY = mainEnemy.y; // da bi mogao da ga obidje, nema potrebe ako su svi iste brzine
        const spacing = 80;
        let canGo = true;
        let i = this._activeEnemies.length - 1;
        for(i; i > -1; i--){
            if(i !== ind){
                const enemy = this._activeEnemies[i];
                const eX = enemy.x;
                const eY = enemy.y; // da bi mogao da ga obidje, nema potrebe ako su svi iste brzine
                let diff = direction === 'up' ? (eY - mY) : (mY - eY);
                const xDiff = Math.abs(mX - eX); // da bi mogao da ga obidje, nema potrebe ako su svi iste brzine
                if(xDiff < spacing){ // da bi mogao da ga obidje, nema potrebe ako su svi iste brzine
                    if(diff < spacing && diff > 0){
                        canGo = false;
                        break;
                    }
                }
            }
        }
        return canGo;
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

    p._checkPlayerHits = function() {
        let i = this._enemyBullets.length-1;
        if(i < 0){return;}
        const playerDimension = this._player.getDimension();
        for(i; i > -1; i--){
            const bullet = this._enemyBullets[i];
            if(bullet.x > this._LEVEL_WIDTH || bullet.x < 0 || bullet.y < 0 || bullet.y > this._LEVEL_HEIGHT){
                this._enemyAmmo.push(bullet);
                this._enemyBullets.splice(i,1);
                bullet.visible = false;
                //this._level.removeChild(bullet);
            }else{
                if(bullet.x > this._player.x && bullet.x < (this._player.x + playerDimension.width)){
                    if(bullet.y > this._player.y && bullet.y < (this._player.y + playerDimension.height)){
                        this._enemyAmmo.push(bullet);
                        this._enemyBullets.splice(i,1);
                        bullet.visible = false;
                        //this._level.removeChild(bullet);
                        console.log('enemy hits player');
                    }
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
                this._playerAmmo.push(bullet);
                this._playerBullets.splice(i,1);
                bullet.visible = false;
            }else{
                let e = this._activeEnemies.length - 1;
                for(e; e > -1; e--){
                    const enemy = this._activeEnemies[e];
                    const dimension = enemy.getDimension();

                    if(bullet.x > enemy.x && bullet.x < (enemy.x + dimension.width)){
                        if(bullet.y > enemy.y && bullet.y < (enemy.y + dimension.height)){
                            this._playerAmmo.push(bullet);
                            this._playerBullets.splice(i,1);
                            bullet.visible = false;
                            enemy.visible = false;
                            const ind = this._activeEnemies.indexOf(enemy);
                            this._activeEnemies.splice(ind,1);
                            this._enemies.push(enemy);
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
        //console.log(this._enemyBullets.length);
        //console.log(this._playerBullets.length);
        //console.log(this._playerAmmo.length);
        //console.log(this._level.numChildren);
        //console.log(this._enemies.length);
    };

    system.Game = createjs.promote(Game,"Container");
})();


