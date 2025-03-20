'use strict';
//alert('На данной странице выводится задание пятого урока курса');

let title;
let screens;
let screenPrice;
let adaptive;
let rollback = 14;
let addService1;
let addService2;
let fullPrice;
let allServicePrices;
let servicePercentPrice;

const isNumber = function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num)
}

const asking = function () {
    title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
    screens = prompt('Какие типы экранов нужно разработать?', 'Простые, сложные, средние');

    while (!isNumber(screenPrice)) {
        screenPrice = prompt('Сколько будет стоить данная работа?');
    }

    //сохраняем в переменную именно число
    screenPrice = +screenPrice;
    adaptive = confirm('Нужен ли адаптив на сайте?');
}


const getAllServicePrices = function () {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            addService1 = prompt('Какой дополнительный тип услуги нужен?');
        } else if (i === 1) {
            addService2 = prompt('Какой дополнительный тип услуги нужен?');
        }

        sum += +prompt('Сколько будет стоить данная работа?');
    }
    return sum;
}

function getTitle(projectName) {
    return projectName.trim().charAt(0).toUpperCase() + projectName.trim().slice(1).toLowerCase();
}

const showTypeOf = function (variable) {
    console.log("Переменная " + variable + " имеет тип ", typeof variable)
}

const getRollbackMessage = function (price) {
    switch (true) {
        case price >= 30000:
            return 'Даем скидку в 10%';
        case price >= 15000 && price < 30000:
            return 'Даем скидку в 5%';
        case price > 0 && price < 15000:
            return 'Скидка не предусмотрена';
        case price <= 0:
            return 'Что-то пошло не так!';
    };
}

function getFullPrice(devPrice, servicePrice) {
    return devPrice + servicePrice;
}

function getServicePercentPrices(price, percent) {
    return Math.ceil(price - (price * (percent / 100)));
}

asking();

allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(screenPrice, allServicePrices);

showTypeOf(getTitle(title));
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log(allServicePrices);

console.log("Сумма всего: " + fullPrice);
console.log("Сумма всех дополнительных услуг: " + allServicePrices);
console.log(getRollbackMessage(fullPrice));
console.log("Итоговая стоимость за вычетом отката посреднику: " + getServicePercentPrices(fullPrice, rollback));
console.log(screens.toLowerCase().split(', '));