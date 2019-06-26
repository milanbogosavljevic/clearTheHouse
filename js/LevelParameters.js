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
            'enemiesDamage':6,
            'enemiesHealth':105,
            'maxNumberOfActiveEnemies':4,
            'maxNumberOfEnemies':6,
            'color':'#959595',
            'movementSpeed':2
        },
        'level3':{
            'enemiesDamage':7,
            'enemiesHealth':110,
            'maxNumberOfActiveEnemies':4,
            'maxNumberOfEnemies':7,
            'color':'#d9d92e',
            'movementSpeed':3
        },
        'level4':{
            'enemiesDamage':8,
            'enemiesHealth':115,
            'maxNumberOfActiveEnemies':5,
            'maxNumberOfEnemies':8,
            'color':'#ff981e',
            'movementSpeed':3
        },
        'level5':{
            'enemiesDamage':9,
            'enemiesHealth':120,
            'maxNumberOfActiveEnemies':6,
            'maxNumberOfEnemies':9,
            'color':'#ff172d',
            'movementSpeed':4
        },
        'level6':{
            'enemiesDamage':10,
            'enemiesHealth':125,
            'maxNumberOfActiveEnemies':7,
            'maxNumberOfEnemies':10,
            'color':'#ff8d9e',
            'movementSpeed':4
        },
        'level7':{
            'enemiesDamage':11,
            'enemiesHealth':130,
            'maxNumberOfActiveEnemies':7,
            'maxNumberOfEnemies':11,
            'color':'#b60ad9',
            'movementSpeed':4
        },
        'level8':{
            'enemiesDamage':12,
            'enemiesHealth':135,
            'maxNumberOfActiveEnemies':7,
            'maxNumberOfEnemies':12,
            'color':'#ff78f2',
            'movementSpeed':4
        },
        'level9':{
            'enemiesDamage':13,
            'enemiesHealth':140,
            'maxNumberOfActiveEnemies':8,
            'maxNumberOfEnemies':13,
            'color':'#4dc8f6',
            'movementSpeed':4
        },
        'level10':{
            'enemiesDamage':14,
            'enemiesHealth':145,
            'maxNumberOfActiveEnemies':8,
            'maxNumberOfEnemies':14,
            'color':'#5763ff',
            'movementSpeed':4
        },
        'level11':{
            'enemiesDamage':15,
            'enemiesHealth':150,
            'maxNumberOfActiveEnemies':8,
            'maxNumberOfEnemies':15,
            'color':'#18ffce',
            'movementSpeed':5
        },
        'level12':{
            'enemiesDamage':16,
            'enemiesHealth':155,
            'maxNumberOfActiveEnemies':8,
            'maxNumberOfEnemies':16,
            'color':'#1dff81',
            'movementSpeed':5
        },
        'level13':{
            'enemiesDamage':17,
            'enemiesHealth':160,
            'maxNumberOfActiveEnemies':9,
            'maxNumberOfEnemies':17,
            'color':'#32ce33',
            'movementSpeed':5
        },
        'level14':{
            'enemiesDamage':18,
            'enemiesHealth':165,
            'maxNumberOfActiveEnemies':9,
            'maxNumberOfEnemies':18,
            'color':'#97ce5f',
            'movementSpeed':6
        },
        'level15':{
            'enemiesDamage':20,
            'enemiesHealth':180,
            'maxNumberOfActiveEnemies':10,
            'maxNumberOfEnemies':20,
            'color':'#97ce5f',
            'movementSpeed':7
        }
    };

    LevelParameters.getRandomColor = function() {
        const maxNum = LevelParameters.getNumberOfLevels();
        const randomNum = system.CustomMethods.getRandomNumberFromTo(1, maxNum);
        const randomLevel = `level${randomNum}`;
        return LevelParameters.parameters[randomLevel].color;
    };

    LevelParameters.getParametersForLevel = function(level) {
        const levelToReturn = `level${level}`;
        return LevelParameters.parameters[levelToReturn];
    };

    LevelParameters.getNumberOfLevels = function() {
        return Object.keys(LevelParameters.parameters).length;
    };

    system.LevelParameters = LevelParameters;
})();