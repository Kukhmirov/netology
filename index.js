#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const readline = require('readline');
const clc = require('cli-color');
const fs = require('fs');
const path = require('path');
const argv = yargs(hideBin(process.argv)).argv;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const randGameNum = Math.floor(Math.random() * 2);
const file = path.join(__dirname, './logs', 'logs.json');



getResult = async() => {
    
    const json = await getAll();
    const getPart = json[json.length - 1].round
    const win = json.filter((part) => part.answer === String(part.randGameNum));
    const winLoose = Math.floor((json.length / 100 * win.length) * 100);
    
    console.log(`Колличество партий - ${getPart}`);
    console.log(`Колличество побед - ${win.length}`);
    console.log(`Колличество поражений - ${json.length - win.length}`);
    console.log(`процентное соотношение выигранных партий ${winLoose}`);
    rl.close();
}

createLog = (answer, randGameNum) => {
    let log = [{
        round: 0,
        answer: answer,
        randGameNum: randGameNum
    }]

    fs.stat("./logs/logs.json", async(err) => {
        if (err) {
            fs.mkdir(path.join(__dirname, 'logs'), (err) => {
                if(err) throw Error(err);
            });
            fs.writeFile(file, JSON.stringify(log), (err) => {
                if(err) throw Error(err);
            });
        } else {
            const json = await getAll();
            const round = ++json[json.length - 1].round
            data = {
                round: round,
                answer: answer,
                randGameNum: randGameNum
            }
            json.push(data)

            fs.writeFile(file, JSON.stringify(json), (err) => {
                if(err) throw err
            })
        }
    });
};

function getAll () {
    return new Promise((res, rej) => {
        fs.readFile(file, 'utf-8', (err, content) => {
            if (err) {
                rej(err);
            } else {
                res(JSON.parse(content))
            }
        })
    });
};
 

startGame = () => {
    rl.question(clc.green(`Все просто, есть 1 или 0... выбирай: \n\n`), (answer) => {
        const an = parseInt(answer);

        if (an !== 0 || 1) {
            createLog(answer, randGameNum);
            an === randGameNum
                ? console.log(`да я действительно загадал ${randGameNum}`)
                : console.log(`Ты проиграл, мое число ${randGameNum}`);

            rl.close();

            return;
        }
        rl.close();
    });
};

if(!argv._.length) {
    startGame();
} else if (argv._[0] === 'result') {
    getResult();
}
