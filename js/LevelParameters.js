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
            'color':'#82ff9a',
            'movementSpeed':3
        },
        'level3':{
            'enemiesDamage':10,
            'maxNumberOfActiveEnemies':5,
            'maxNumberOfEnemies':10,
            'color':'#8474ff',
            'movementSpeed':4
        }
    };

    LevelParameters.getParametersForLevel = function(level) {
        const levelToReturn = `level${level}`;
        return LevelParameters.parameters[levelToReturn];
    };

    system.LevelParameters = LevelParameters;
})();