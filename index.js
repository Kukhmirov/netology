#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const clc = require('cli-color');
const argv = yargs(hideBin(process.argv)).argv;


const triggersFlag = ['month', 'm', 'year', 'y', 'date', 'd'];
const triggersCommand = ['current', 'add', 'sub'];

const command = Object.values(argv._).filter(item => triggersCommand.includes(item));
const gflag = Object.keys(argv).filter(item => triggersFlag.includes(item))[0];

const current = command.find(item => item === 'current');
const add = command.find(item => item === 'add');
const sub = command.find(item => item === 'sub');

if(current && !gflag) {
    console.log(clc.yellow(`время формата ISO ${new Date().toISOString()}`));
};

function getDay() {
    const isInt = !isNaN(parseFloat(argv[gflag]));
    const sklonenie = (number, txt, cases = [2, 0, 1, 1, 1, 2]) => txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];

    if(Boolean(add) && isInt) {
        const futureDay = new Date().getDate() + argv[gflag];
        
        let descr = `через ${argv[gflag]} ${sklonenie(argv[gflag], ['день', 'дня', 'дней'])} будет ${futureDay} число`;

        console.log(clc.yellow(descr));
    } else if (Boolean(sub) && isInt) {
        const lastDay = new Date().getDate() - argv[gflag];

        let descr = `${argv[gflag]} ${sklonenie(argv[gflag], ['день', 'дня', 'дней'])} дня назад было ${lastDay} число`;

        console.log(lastDay > 0
            ? clc.yellow(descr)
            : clc.red(`Ваше число ${argv[gflag]} слишком велико, попробуйте еще раз`));
    } else {
        console.log(clc.yellow(`Сегодня ${new Date().getDate()} число`));
    }
    
}

if(command.length && gflag) {
    switch (gflag[0]) {
        case 'month':
        case 'm':
            console.log(clc.yellow(`Месяц - ${new Date().getMonth() + 1}`));
            break;
        case 'year':
        case 'y':
            console.log(clc.yellow(`Год - ${new Date().getFullYear()}`));
            break;
        case 'date':
        case 'd':
            getDay();
            break;
    };
};