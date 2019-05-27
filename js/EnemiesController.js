
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
        this._enemiesCounter = 0;
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

        const xSpawn = system.CustomMethods.getRandomBool() === true ? system.CustomMethods.getRandomNumberFromTo(-100, 0) : system.CustomMethods.getRandomNumberFromTo(this._game.LEVEL_WIDTH, (this._game.LEVEL_WIDTH + 100));
        const ySpawn = system.CustomMethods.getRandomBool() === true ? system.CustomMethods.getRandomNumberFromTo(-100, 0) : system.CustomMethods.getRandomNumberFromTo(this._game.LEVEL_HEIGHT, (this._game.LEVEL_HEIGHT + 100));

        enemy.x = xSpawn;
        enemy.y = ySpawn;
        //enemy.setMovementSpeed(this._movementSpeed);

        const shootingCooldown = system.CustomMethods.getRandomNumberFromTo(50, 500);
        enemy.setShootinCooldown(shootingCooldown);

        this._activeEnemies.push(enemy);
        console.log('add enemy');
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

    p._getHealthColor = function() {
        return this._healthColor;
    };

    p.setEnemiesParameters = function(parameters) {
        this._enemiesDamage = parameters.enemiesDamage;
        this._maxNumberOfActiveEnemies = parameters.maxNumberOfActiveEnemies;
        this._maxNumberOfEnemies = parameters.maxNumberOfEnemies;
        this._healthColor = parameters.color;
        this._movementSpeed = parameters.movementSpeed;

        console.log(`setting color ${this._healthColor}`);
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

    p.resetCounter = function() {
        this._enemiesCounter = 0;
    };

    p.clearEnemies = function() {
        let e = this._activeEnemies.length - 1;
        for(e; e > -1; e--) {
            const enemy = this._activeEnemies[e];
            enemy.visible = false;
            enemy.reset();
            this._activeEnemies.splice(e,1);
            this._enemies.push(enemy);
            console.log(`clear enemy`);
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
                        this._game.updateEnemiesCounter();
                        const enemyX = enemy.x + (dimension.width/2);
                        const enemyY = enemy.y + (dimension.height/2);
                        const color = this._getHealthColor();
                        this._game.showParticles(enemyX, enemyY, color, 40, 10, -200, 200);
                    }
                    return true;
                }
            }
        }
        return false;
    };

    p.enemyShoot = function() {
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
                    this._game.addEnemyBullet(bullet);
                    //this._level.addChild(bullet);
                }

                bullet.x = enemy.x + enemyDimension.width/2 - 4;
                bullet.y = enemy.y + enemyDimension.height/2 - 4;

                this._enemyBullets.push(bullet);
                this._game.moveEnemyBullet(bullet,enemy.bulletPoint,enemy.getBulletSpeed());
            }
        }
    };

    p.checkActiveBullets = function(player) {
        let i = this._enemyBullets.length-1;
        if(i < 0){return;}
        const playerDimension = player.getDimension();
        for(i; i > -1; i--){
            const bullet = this._enemyBullets[i];
            if(bullet.x > this._game.LEVEL_WIDTH || bullet.x < 0 || bullet.y < 0 || bullet.y > this._game.LEVEL_HEIGHT){
                this._enemyBullets.splice(i,1);
                this._enemyAmmo.push(bullet);
                bullet.visible = false;
            }else{
                if(bullet.x > player.x && bullet.x < (player.x + playerDimension.width)){
                    if(bullet.y > player.y && bullet.y < (player.y + playerDimension.height)){
                        this._enemyBullets.splice(i,1);
                        this._enemyAmmo.push(bullet);
                        bullet.visible = false;
                        this._game.enemyHitsPlayer(this.getEnemiesDamage());
                    }
                }
            }
        }
    };

    p.moveActiveEnemies = function(pX, pY, pDimension) {
        let i = this._activeEnemies.length - 1;
        if(i < 0){return;}
        for(i; i > -1; i--){
            const enemy = this._activeEnemies[i];
            //const speed = enemy.getMovementSpeed(); // todo staviti da bude u level params posto svakako moraju svi da se krecu istom brzinom
            const speed = this._movementSpeed;
            const xDifference = Math.abs(pX - enemy.x);
            const yDifference = Math.abs(pY - enemy.y);
            if(pX > enemy.x){
                if(this._checkRightLeft(i,'right') === true){
                    if(xDifference > speed){
                        enemy.x += speed;
                    }
                }
            }else if(pX < enemy.x){
                if(this._checkRightLeft(i,'left') === true) {
                    if(xDifference > speed){
                        enemy.x -= speed;
                    }
                }
            }
            if(pY > enemy.y){
                if(this._checkUpDown(i, 'up') === true){
                    if(yDifference > speed){
                        enemy.y += speed;
                    }
                }
            }
            if(pY < enemy.y){
                if(this._checkUpDown(i, 'down') === true) {
                    if (yDifference > speed) {
                        enemy.y -= speed;
                    }
                }
            }
            const enemyDimension = enemy.getDimension();
            let angleDeg = Math.atan2((enemy.y + enemyDimension.height/2) - (pY + (pDimension.height/2)), (enemy.x + enemyDimension.width/2) - (pX + (pDimension.width/2))) * 180 / Math.PI;
            angleDeg -= 90;
            enemy.rotateGun(Math.round(angleDeg));
            enemy.incrementShootingCooldown();
        }
    };

    system.EnemiesController = EnemiesController;
})();


