'use strict';
//alert('На данной странице выводится задание четвертого урока курса');

const title = prompt('Как называется ваш проект?');
const screens = prompt('Какие типы экранов нужно разработать?');
const screenPrice = +prompt('Сколько будет стоить данная работа?');
const adaptive = confirm('Нужен ли адаптив на сайте?');
const addService1 = prompt('Какой дополнительный тип услуги нужен?');
const addService1Price = +prompt('Сколько это будет стоить?');
const addService2 = prompt('Какой дополнительный тип услуги нужен?');
const addService2Price = +prompt('Сколько это будет стоить?');

const rollback = 14;

let fullPrice;
let allServicePrices;
let servicePercentPrice;

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

const getAllServicePrices = function (price1, price2) {
    return price1 + price2;
}

function getFullPrice(devPrice, servicePrice) {
    return devPrice + servicePrice;
}

function getServicePercentPrices(price, percent) {
    return Math.ceil(price - (price * (percent / 100)));
}

allServicePrices = getAllServicePrices(addService1Price, addService2Price);
fullPrice = getFullPrice(screenPrice, allServicePrices);

showTypeOf(getTitle(title));
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log("Сумма всего: " + fullPrice);
console.log("Сумма всех дополнительных услуг: " + allServicePrices);
console.log(getRollbackMessage(fullPrice));
console.log("Итоговая стоимость за вычетом отката посреднику: " + getServicePercentPrices(fullPrice, rollback));
console.log(screens.toLowerCase().split(', '));