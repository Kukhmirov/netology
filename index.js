#!/usr/bin/env node

const readline = require('readline');
const clc = require('cli-color');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const randGameNum = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
const getRandNum = Math.round(Math.random() * randGameNum);
let count = 7;

startGame = () => {
    if (count !== 0) {
        rl.question(clc.green(`Я загадал число в диапозоне  от 0 до ${randGameNum}, угадай за ${count} попыток:\n\n`), (answer) => {
            if (!Number(answer)) {
                count -= 2;
                count > 0
                    ? console.log(clc.red(`за то что ты пишешь буквы в место чисел, число попыток у тебя - ${count}\n\n`))
                    & startGame()
                    : console.log(clc.red(`ты пишешь не цифры, не надо так, ты проиграл`)) & rl.close();
                
            }

            if (parseInt(answer) ===  getRandNum) {
                console.log(clc.red.bgWhite.underline('\nПоздравляю воин! Ты справился с моей задачей\n'));
                rl.close();
            } else if (parseInt(answer) > getRandNum) {
                console.log(clc.yellow(`Твое число ${answer} велико, попробуй еще раз\n`));
                --count;
                startGame();
            } else if (parseInt(answer) < getRandNum) {
                console.log(clc.yellow(`Ццц, ты назвал число ${answer}, но оно меньше\n`));
                --count;
                startGame();
            }
        });
    } else {
        console.log(clc.red(`Ты проиграл воин, иди учи матчасть и бинарный поиск`));
        rl.close();
    };
};

startGame();