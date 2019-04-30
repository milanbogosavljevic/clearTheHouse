
this.system = this.system || {};
(function(){
    "use strict";

    const EnemiesController = function(game){
        this._init(game);
    };

    const p = EnemiesController.prototype;

    p._game = null;

    p._enemies = null;
    p._activeEnemies = null;
    p._maxNumberOfActiveEnemies = null;
    p._maxNumberOfEnemies = null;
    p._enemiesCounter = null;
    p._enemiesDamage = null;
    p._enemyAmmo = null;
    p._enemyBullets = null;
    p._healthColor = null;
    p._movementSpeed = null;

    p._init = function (game) {
        this._game = game;
        this._enemies = [];
        this._activeEnemies = [];
        this._enemyAmmo = [];
        this._enemyBullets = [];
        this._movementSpeed = 0;
    };

    p._addEnemy = function() {
        this._enemiesCounter++;
        let enemy;
        if(this._enemies.length > 0){
            enemy = this._enemies[0];
            this._enemies.splice(0,1);
            enemy.visible = true;
        }else{
            enemy = new system.Enemy();
            this._game.addEnemy(enemy);
        }

        enemy.updateColor(this._healthColor);

        const xSpawn = system.CustomMethods.getRandomBool() === true ? system.CustomMethods.getRandomNumberFromTo(-100, 0) : system.CustomMethods.getRandomNumberFromTo(this._LEVEL_WIDTH, (this._LEVEL_WIDTH + 100));
        const ySpawn = system.CustomMethods.getRandomBool() === true ? system.CustomMethods.getRandomNumberFromTo(-100, 0) : system.CustomMethods.getRandomNumberFromTo(this._LEVEL_HEIGHT, (this._LEVEL_HEIGHT + 100));

        enemy.x = xSpawn;
        enemy.y = ySpawn;
        enemy.setMovementSpeed(this._movementSpeed);

        const shootingCooldown = system.CustomMethods.getRandomNumberFromTo(50, 500);
        enemy.setShootinCooldown(shootingCooldown);

        this._activeEnemies.push(enemy);
    };

    p.setEnemiesParameters = function(parameters) {
        this._enemiesDamage = parameters.enemiesDamage;
        this._maxNumberOfActiveEnemies = parameters.maxNumberOfActiveEnemies;
        this._maxNumberOfEnemies = parameters.maxNumberOfEnemies;
        this._healthColor = parameters.color;
        this._movementSpeed = parameters.movementSpeed;
    };

    p.getEnemiesDamage = function() {
        return this._enemiesDamage;
    };

    p.addEnemies = function(numOfEnemies) {
        for(let i = 0; i < numOfEnemies; i++) {
            this._addEnemy();
        }
    };

    p.manageEnemies = function() {
        if(this._enemiesCounter < this._maxNumberOfEnemies){
            if(this._activeEnemies.length < this._maxNumberOfActiveEnemies){
                this._addEnemy();
            }
        }else{
            if(this._activeEnemies.length === 0){
                console.log('no more enemies');
                this._enemiesCounter = 0;
                this._game.levelPassed();
            }
        }
    };

    p.checkHitFromPlayer = function(playerBullet, bulletDamage) {
        let e = this._activeEnemies.length - 1;
        for(e; e > -1; e--){
            const enemy = this._activeEnemies[e];
            const dimension = enemy.getDimension();

            if(playerBullet.x > enemy.x && playerBullet.x < (enemy.x + dimension.width)){
                if(playerBullet.y > enemy.y && playerBullet.y < (enemy.y + dimension.height)){
                    enemy.decreaseHealth(bulletDamage);
                    if(enemy.getHealth() < 1){
                        enemy.visible = false;
                        enemy.reset();
                        this._activeEnemies.splice(e,1);
                        this._enemies.push(enemy);
                    }
                    console.log('player hits enemy');
                }
            }
        }
    };

    p.enemyShoot = function() {
        // todo ovde srediti, prebaceno iz game, mozda samo pozvati addEnemyBullet
        let i = this._activeEnemies.length - 1;
        if(i < 0){return;}

        let bullet;

        for(i; i > -1; i--){
            const enemy = this._activeEnemies[i];
            const enemyDimension = enemy.getDimension();
            if(enemy.canShoot() === true){
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
        }
    };

    system.EnemiesController = EnemiesController;
})();


