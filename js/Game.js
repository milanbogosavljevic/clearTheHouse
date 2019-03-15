
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

    p._init = function () {
        const back = system.CustomMethods.makeImage('background', false);
        this.addChild(back);

        const player = this._player = new system.Player();
        player.x = 300;
        player.y = 500;

        this.addChild(player);

        this._setPlayerMovement();

        document.onkeydown = (e)=>{
            this._handleKey(e.key, true);
        };

        document.onkeyup = (e)=>{
            this._handleKey(e.key, false);
        };
    };

    p._handleKey = function(key, bool) {
        if(key === 'a'){
            if(this._playerMovement.left !== bool){
                this._playerMovement.left = bool;
            }
        }
        if(key === 'd'){
            if(this._playerMovement.right !== bool){
                this._playerMovement.right = bool;
            }
        }
        if(key === 'w'){
            if(this._playerMovement.up !== bool){
                this._playerMovement.up = bool;
            }
        }
        if(key === 's'){
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
            this._player.x -= this._player.speed;
        }
        if(this._playerMovement.right === true){
            this._player.x += this._player.speed;
        }
        if(this._playerMovement.up === true){
            this._player.y -= this._player.speed;
        }
        if(this._playerMovement.down === true){
            this._player.y += this._player.speed;
        }
    };

    p._onMovePlayer = function(direction, move) {
        this._playerMovement[direction] = move;
    };

    p.render = function(e){
        stage.update(e);
        this._movePlayer();
    };

    system.Game = createjs.promote(Game,"Container");
})();


