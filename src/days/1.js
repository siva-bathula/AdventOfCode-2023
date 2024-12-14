const filereader = require('../utils/fileread.js');
const run = require('../utils/run.js');
module.exports.run = run;

module.exports.part1 = async function (dayNum) {
    const data = await filereader.loadInput(dayNum);
    const lines = data.split('\n');
    var calibrationScore = 0;
    for (let i=0; i<lines.length; i++) {
        var frontNumber = -1, backNumber = -1;
        lines[i] = lines[i].trim();
        for (let j=0; j<lines[i].length;j++) {
            var front = lines[i][j];
            var back = lines[i][lines[i].length - j - 1];
            console.log(back);
            if (!isNaN(+front) && frontNumber === -1) {
                frontNumber = +front;
            }
            if (!isNaN(+back) && backNumber === -1) {
                backNumber = +back;
            }
            if (frontNumber !== -1 && backNumber !== -1) {
                console.log(frontNumber, backNumber);
                break;
            }
        }
        const number = +(frontNumber + '' + backNumber);
        console.log(number);
        calibrationScore += number;
    }
    return calibrationScore;
}

module.exports.part2 = async function (dayNum) {
    const data = await filereader.loadInput(dayNum);
    const lines = data.split('\n');
    var calibrationScore = 0;
    const findAllIndexes = (text, word) => { 
        let indexes = []; 
        let index = text.indexOf(word); 
        while (index !== -1) { 
            indexes.push(index); 
            index = text.indexOf(word, index + 1); 
        } 
        return indexes; 
    }
    const wordNumber = (line) => {
        const words = ['zero','one','two','three','four','five','six','seven','eight','nine'];
        const numbersAsWords = [];
        for (let i=0; i<words.length; i++) {
            const indexes = findAllIndexes(line, words[i]);
            if (indexes.length > 0) {
                indexes.forEach(index => {
                    numbersAsWords.push({number: i, index: index, endIndex: index + words[i].length}); 
                });
            }
        }
        if (numbersAsWords.length < 1) {
            return [{number:-1,index:-1,endIndex:-1}, {number:-1,index:-1,endIndex:-1}];
        } else {
            if (numbersAsWords.length === 1) {
                return [numbersAsWords[0],numbersAsWords[0]];
            }
            numbersAsWords.sort((a,b) => a.index - b.index);
            console.log(numbersAsWords);
            var firstNonZero = numbersAsWords[0];
            if (firstNonZero.number === 0) {
                for (let i=0; i<numbersAsWords.length; i++) {
                    if (numbersAsWords[i].number !== 0) {
                        firstNonZero = numbersAsWords[i];
                        break;
                    }
                }
            }
            return [firstNonZero,numbersAsWords[numbersAsWords.length-1]];
        }
    };
    for (let i=0; i<lines.length; i++) {
        var frontNumber = -1, backNumber = -1;
        var frontIndex = -1, backIndex = -1;
        lines[i] = lines[i].trim();
        for (let j=0; j<lines[i].length;j++) {
            var front = lines[i][j];
            var back = lines[i][lines[i].length - j - 1];
            if (!isNaN(+front) && frontNumber === -1) {
                frontNumber = +front;
                frontIndex = j;
            }
            if (!isNaN(+back) && backNumber === -1) {
                backNumber = +back;
                backIndex = lines[i].length - j - 1;
            }
            if (frontNumber !== -1 && backNumber !== -1) {
                break;
            }
        }
        const numberPair = wordNumber(lines[i]);
        if (numberPair[0].number > 0 && numberPair[0].endIndex - 1 < frontIndex) {
            frontNumber = numberPair[0].number;
        }
        if (numberPair[1].number !== -1 && numberPair[1].endIndex - 1 > backIndex) {
            backNumber = numberPair[1].number;
        }
        const number = +(frontNumber + '' + backNumber);
        calibrationScore += number;
    }
    return calibrationScore;
}