this.system = this.system || {};

(function() {
    "use strict";

    const LevelParameters = function() {};

    LevelParameters.parameters = {
        'level1':{
            'enemiesDamage':5,
            'enemiesHealth':100,
            'maxNumberOfActiveEnemies':5,
            'maxNumberOfEnemies':3,
            'color':'#ffffff',
            'movementSpeed':2
        },
        'level2':{
            'enemiesDamage':8,
            'enemiesHealth':120,
            'maxNumberOfActiveEnemies':4,
            'maxNumberOfEnemies':6,
            'color':'#fffd2f',
            'movementSpeed':2
        },
        'level3':{
            'enemiesDamage':10,
            'enemiesHealth':140,
            'maxNumberOfActiveEnemies':5,
            'maxNumberOfEnemies':10,
            'color':'#ff9331',
            'movementSpeed':3
        },
        'level4':{
            'enemiesDamage':13,
            'enemiesHealth':160,
            'maxNumberOfActiveEnemies':6,
            'maxNumberOfEnemies':13,
            'color':'#ff8d9e',
            'movementSpeed':4
        },
        'level5':{
            'enemiesDamage':15,
            'enemiesHealth':180,
            'maxNumberOfActiveEnemies':7,
            'maxNumberOfEnemies':15,
            'color':'#5178ff',
            'movementSpeed':5
        },
        'level6':{
            'enemiesDamage':17,
            'enemiesHealth':200,
            'maxNumberOfActiveEnemies':8,
            'maxNumberOfEnemies':17,
            'color':'#b60ad9',
            'movementSpeed':6
        },
        'level7':{
            'enemiesDamage':20,
            'enemiesHealth':220,
            'maxNumberOfActiveEnemies':10,
            'maxNumberOfEnemies':20,
            'color':'#ff172d',
            'movementSpeed':7
        }
    };

    LevelParameters.getParametersForLevel = function(level) {
        const levelToReturn = `level${level}`;
        return LevelParameters.parameters[levelToReturn];
    };

    system.LevelParameters = LevelParameters;
})();