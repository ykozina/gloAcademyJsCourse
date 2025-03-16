let title = "GloAcademy JS course: lesson 02";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 1500;
let rollback = 14;
let fullPrice = 7000;
let adaptive = true;

alert('На данной странице выводится задание второго урока курса');

console.log("Переменная title имеет тип " + typeof title + "\n" + "Переменная fullPrice имеет тип " + typeof fullPrice + "\n" + "Переменная adaptive имеет тип " + typeof adaptive);
console.log("Длина строки screens равна " + screens.length + " символу");
console.log("Стоимость верстки экранов - " + screenPrice + " рублей" + "\n" + "Стоимость разработки сайта - " + fullPrice + " рублей");
console.log(screens.toLowerCase().split(', '));
console.log("Процент отката посреднику за работу " + fullPrice * (rollback / 100));