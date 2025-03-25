'use strict';

const title = document.getElementsByTagName('h1')[0];
const mainButtons = document.getElementsByClassName('handler_btn');
const calculateButton = mainButtons[0];
const resetButton = mainButtons[1];
const addButton = document.querySelector('.screen-btn');
const percents = document.querySelectorAll('.other-items.percent');
const numbers = document.querySelectorAll('.other-items.number');
const rollbackRange = document.querySelector('.rollback input[type=range]');
const rollbackValue = document.querySelector('.rollback span.range-value');
const totalInputs = Array.from(document.getElementsByClassName('total-input'));

let screenTypes = document.querySelectorAll('.screen');

console.log(title);
console.log(calculateButton);
console.log(resetButton);
console.log(addButton);

percents.forEach(function (item) {
    console.log(item)
})

numbers.forEach(function (item) {
    console.log(item)
})

console.log(rollbackRange);
console.log(rollbackValue);

totalInputs.forEach(function (item) {
    console.log(item)
})

screenTypes.forEach(function (item) {
    console.log(item)
})



// const appData = {
//     title: '',
//     screens: [],
//     screenPrice: 0,
//     adaptive: true,
//     rollback: 14,
//     allServicePrices: 0,
//     fullPrice: 0,
//     servicePercentPrice: 0,
//     addServices: {},

//     start: function () {
//         appData.asking();
//         appData.addPrices();
//         appData.getFullPrice(+appData.screenPrice, +appData.allServicePrices);
//         appData.getServicePercentPrices(appData.fullPrice, appData.rollback);
//         appData.getTitle(appData.title);
//         appData.logger();
//     },

//     isNumber: function (num) {
//         return !isNaN(parseFloat(num)) && isFinite(num)
//     },

//     asking: function () {

//         //добавляем проверку на строку
//         do {
//             appData.title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
//         } while (appData.isNumber(appData.title))

//         for (let i = 0; i < 2; i++) {
//             let name = '';
//             let price = 0;

//             //добавляем проверку на строку
//             do {
//                 name = prompt('Какие типы экранов нужно разработать?');
//             } while (appData.isNumber(name))


//             //добавляем проверку на число
//             do {
//                 price = prompt('Сколько будет стоить данная работа?');
//             } while (!appData.isNumber(price))

//             appData.screens.push({ id: i, name: name, price: price })

//         }

//         for (let i = 0; i < 2; i++) {

//             let name = '';
//             let price = 0;

//             do {
//                 name = prompt('Какой дополнительный тип услуги нужен?');
//             } while (appData.isNumber(name))

//             do {
//                 price = prompt('Сколько это будет стоить?')
//             } while (!appData.isNumber(price));

//             //добавляем уникальность названиям ключей с использованием индекса
//             name = 'Дополнительная услуга ' + (i + 1) + ': ' + name;
//             appData.addServices[name] = +price;
//         }

//         appData.adaptive = confirm('Нужен ли адаптив на сайте?');
//     },

//     addPrices: function () {

//         appData.screenPrice = appData.screens.reduce(function (sum, screen) {
//             return sum + Number(screen.price);
//         }, 0)

//         for (let key in appData.addServices) {
//             appData.allServicePrices += appData.addServices[key];
//         }

//     },


//     getTitle: function (projectName) {
//         appData.title = projectName.trim().charAt(0).toUpperCase() + projectName.trim().slice(1).toLowerCase();
//     },


//     getFullPrice: function (devPrice, servicePrice) {
//         appData.fullPrice = devPrice + servicePrice;
//     },

//     getServicePercentPrices: function (price, percent) {
//         appData.servicePercentPrice = Math.ceil(price - (price * (percent / 100)));
//     },

//     getRollbackMessage: function (price) {
//         switch (true) {
//             case price >= 30000:
//                 return 'Даем скидку в 10%';
//             case price >= 15000 && price < 30000:
//                 return 'Даем скидку в 5%';
//             case price > 0 && price < 15000:
//                 return 'Скидка не предусмотрена';
//             case price <= 0:
//                 return 'Что-то пошло не так!';
//         };
//     },

//     logger: function () {
//         for (const key in appData) {
//             console.log(appData[key], typeof appData[key]);
//         }
//     },
// }

// appData.start();




