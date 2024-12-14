const filereader = require('../utils/fileread.js');
const run = require('../utils/run.js');
module.exports.run = run;

module.exports.part1 = async function (dayNum) {
    const data = await filereader.loadInput(dayNum);
    const lines = data.split('\n');
    const red = 12, green = 13, blue = 14;
    var sumIds = 0;
    for (let i=0; i<lines.length;i++) {
        if (!lines[i]) continue;
        lines[i] = lines[i].trim();
        if (gamePossible(red, green, blue, lines[i])) {
            sumIds += (i+1);
        } else {
            console.log('not possible', (i+1));
        }
    }

    return sumIds;
}

function gamePossible(r, g, b, game) {
    const trial = game.split(':');
    const tries = trial[1].split(';');
    var possible = true;
    for (let i=0; i<tries.length; i++) {
        const tokens = tries[i].split(',');
        for (let j=0; j<tokens.length; j++) {
            const spaceTokens = tokens[j].split(' ');
            if (spaceTokens[2] === 'red') {
                var red = +spaceTokens[1];
                if (red > r) {
                    console.log('red', red);
                    return false;
                }
            }
            if (spaceTokens[2] === 'green') {
                var green = +spaceTokens[1];
                if (green > g) {
                    console.log('green', green);
                    return false;
                }
            }
            if (spaceTokens[2] === 'blue') {
                var blue = +spaceTokens[1];
                if (blue > b) {
                    console.log('blue', blue);
                    return false;
                }
            }
        }
    }
    return possible;
}

function power(game) {
    const trial = game.split(':');
    const tries = trial[1].split(';');
    var r = 0; g = 0, b = 0;
    for (let i=0; i<tries.length; i++) {
        const tokens = tries[i].split(',');
        for (let j=0; j<tokens.length; j++) {
            const spaceTokens = tokens[j].split(' ');
            if (spaceTokens[2] === 'red') {
                var red = +spaceTokens[1];
                if (red > r) {
                    r = red;
                }
            }
            if (spaceTokens[2] === 'green') {
                var green = +spaceTokens[1];
                if (green > g) {
                    g = green;
                }
            }
            if (spaceTokens[2] === 'blue') {
                var blue = +spaceTokens[1];
                if (blue > b) {
                    b = blue;
                }
            }
        }
    }
    return r * g * b;
}

module.exports.part2 = async function (dayNum) {
    const data = await filereader.loadInput(dayNum);
    const lines = data.split('\n');
    let powerSum = 0;
    for (let i=0; i<lines.length;i++) {
        if (!lines[i]) continue;
        lines[i] = lines[i].trim();
        powerSum += power(lines[i]);
    }

    return powerSum;
}