'use strict';
alert('На данной странице выводится задание третьего урока курса');

const title = prompt('Как называется ваш проект?');
const screens = prompt('Какие типы экранов нужно разработать?');
const screenPrice = +prompt('Сколько будет стоить данная работа?');
const rollback = 14;

const adaptive = confirm('Нужен ли адаптив на сайте?');
const addService1 = prompt('Какой дополнительный тип услуги нужен?');
const addService1Price = +prompt('Сколько это будет стоить?');
const addService2 = prompt('Какой дополнительный тип услуги нужен?');
const addService2Price = +prompt('Сколько это будет стоить?');

const fullPrice = screenPrice + addService1Price + addService2Price;
const servicePercentPrice = Math.ceil(fullPrice - (fullPrice * (rollback / 100)));
console.log("Итоговая стоимость за вычетом отката посреднику: " + servicePercentPrice);

switch (true) {
    case fullPrice >= 30000:
        console.log('Даем скидку в 10%');
        break
    case fullPrice >= 15000 && fullPrice < 30000:
        console.log('Даем скидку в 5%');
        break
    case fullPrice > 0 && fullPrice < 15000:
        console.log('Скидка не предусмотрена');
        break
    case fullPrice <= 0:
        console.log('Что-то пошло не так!');
        break
};

console.log("Переменная title имеет тип " + typeof title + "\n" + "Переменная fullPrice имеет тип " + typeof fullPrice + "\n" + "Переменная adaptive имеет тип " + typeof adaptive);
console.log("Длина строки screens равна " + screens.length + " символу");
console.log("Стоимость верстки экранов - " + screenPrice + " рублей" + "\n" + "Стоимость разработки сайта - " + fullPrice + " рублей");
console.log(screens.toLowerCase().split(', '));
console.log("Процент отката посреднику за работу " + fullPrice * (rollback / 100));