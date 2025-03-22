'use strict';
//alert('На данной странице выводится задание пятого урока курса');

let title;
let screens;
let screenPrice;
let adaptive;
let rollback = 14;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let addService1;
let addService2;

const isNumber = function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num)
}

const asking = function () {
    title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
    screens = prompt('Какие типы экранов нужно разработать?', 'Простые, сложные, средние');

    do {
        screenPrice = prompt('Сколько будет стоить данная работа?');
    } while (!isNumber(screenPrice))

    adaptive = confirm('Нужен ли адаптив на сайте?');
}


const getAllServicePrices = function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        let price = 0;

        if (i === 0) {
            addService1 = prompt('Какой дополнительный тип услуги нужен?');
        } else if (i === 1) {
            addService2 = prompt('Какой дополнительный тип услуги нужен?');
        }

        do {
            price = prompt('Сколько это будет стоить?')
        } while (!isNumber(price));

        sum += +price;
    }

    return sum;
}

function getFullPrice(devPrice, servicePrice) {
    return devPrice + servicePrice;
}

function getServicePercentPrices(price, percent) {
    return Math.ceil(price - (price * (percent / 100)));
}

function getTitle(projectName) {
    return projectName.trim().charAt(0).toUpperCase() + projectName.trim().slice(1).toLowerCase();
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



asking();

allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(+screenPrice, +allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);
title = getTitle(title);


console.log('Название проекта', title);
console.log("Сумма всего:", fullPrice);
console.log("Сумма всех дополнительных услуг:", allServicePrices);


console.log(getRollbackMessage(fullPrice));
console.log("Итоговая стоимость за вычетом отката посреднику: " + getServicePercentPrices(fullPrice, rollback));
console.log(screens.length);
console.log(servicePercentPrice);
console.log(screens.toLowerCase().split(', '));