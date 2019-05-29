this.system = this.system || {};

(function() {
    "use strict";

    const LevelParameters = function() {};

    LevelParameters.parameters = {
        'level1':{
            'enemiesDamage':5,
            'enemiesHealth':100,
            'maxNumberOfActiveEnemies':3,
            'maxNumberOfEnemies':5,
            'color':'#ffffff',
            'movementSpeed':2
        },
        'level2':{
            'enemiesDamage':8,
            'enemiesHealth':110,
            'maxNumberOfActiveEnemies':4,
            'maxNumberOfEnemies':6,
            'color':'#fffd2f',
            'movementSpeed':2
        },
        'level3':{
            'enemiesDamage':10,
            'enemiesHealth':120,
            'maxNumberOfActiveEnemies':4,
            'maxNumberOfEnemies':8,
            'color':'#ff9331',
            'movementSpeed':3
        },
        'level4':{
            'enemiesDamage':13,
            'enemiesHealth':130,
            'maxNumberOfActiveEnemies':5,
            'maxNumberOfEnemies':10,
            'color':'#ff8d9e',
            'movementSpeed':4
        },
        'level5':{
            'enemiesDamage':15,
            'enemiesHealth':140,
            'maxNumberOfActiveEnemies':6,
            'maxNumberOfEnemies':12,
            'color':'#5178ff',
            'movementSpeed':4
        },
        'level6':{
            'enemiesDamage':17,
            'enemiesHealth':150,
            'maxNumberOfActiveEnemies':7,
            'maxNumberOfEnemies':17,
            'color':'#b60ad9',
            'movementSpeed':5
        },
        'level7':{
            'enemiesDamage':17,
            'enemiesHealth':160,
            'maxNumberOfActiveEnemies':8,
            'maxNumberOfEnemies':17,
            'color':'#ff172d',
            'movementSpeed':5
        },
        'level8':{
            'enemiesDamage':19,
            'enemiesHealth':170,
            'maxNumberOfActiveEnemies':8,
            'maxNumberOfEnemies':19,
            'color':'#959595',
            'movementSpeed':6
        },
        'level9':{
            'enemiesDamage':20,
            'enemiesHealth':180,
            'maxNumberOfActiveEnemies':9,
            'maxNumberOfEnemies':20,
            'color':'#02ac0e',
            'movementSpeed':6
        },
        'level10':{
            'enemiesDamage':13,
            'enemiesHealth':200,
            'maxNumberOfActiveEnemies':10,
            'maxNumberOfEnemies':22,
            'color':'#4dc8f6',
            'movementSpeed':6
        }
    };

    LevelParameters.getParametersForLevel = function(level) {
        const levelToReturn = `level${level}`;
        return LevelParameters.parameters[levelToReturn];
    };

    system.LevelParameters = LevelParameters;
})();