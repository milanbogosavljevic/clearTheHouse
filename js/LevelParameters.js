this.system = this.system || {};

(function() {
    "use strict";

    const LevelParameters = function() {};

    LevelParameters.parameters = {
        'level1':{
            'enemiesDamage':5,
            'maxNumberOfActiveEnemies':3,
            'maxNumberOfEnemies':6,
            'color':'#ffffff',
            'movementSpeed':2
        },
        'level2':{
            'enemiesDamage':8,
            'maxNumberOfActiveEnemies':4,
            'maxNumberOfEnemies':7,
            'color':'#fffd2f',
            'movementSpeed':3
        },
        'level3':{
            'enemiesDamage':10,
            'maxNumberOfActiveEnemies':5,
            'maxNumberOfEnemies':10,
            'color':'#ff9331',
            'movementSpeed':4
        },
        'level4':{
            'enemiesDamage':13,
            'maxNumberOfActiveEnemies':6,
            'maxNumberOfEnemies':13,
            'color':'#5dff7c',
            'movementSpeed':5
        },
        'level5':{
            'enemiesDamage':15,
            'maxNumberOfActiveEnemies':7,
            'maxNumberOfEnemies':15,
            'color':'#5178ff',
            'movementSpeed':5
        },
        'level6':{
            'enemiesDamage':17,
            'maxNumberOfActiveEnemies':8,
            'maxNumberOfEnemies':17,
            'color':'#ad5914',
            'movementSpeed':6
        },
        'level7':{
            'enemiesDamage':20,
            'maxNumberOfActiveEnemies':10,
            'maxNumberOfEnemies':20,
            'color':'#000000',
            'movementSpeed':8
        }
    };

    LevelParameters.getParametersForLevel = function(level) {
        const levelToReturn = `level${level}`;
        return LevelParameters.parameters[levelToReturn];
    };

    system.LevelParameters = LevelParameters;
})();