const title = "GloAcademy JS course: lesson 02";
const screens = "Простые, Сложные, Интерактивные";
const screenPrice = 1500;
const rollback = 14;
const fullPrice = 7000;
const adaptive = true;

alert('На данной странице выводится задание второго урока курса');

console.log("Переменная title имеет тип " + typeof title + "\n" + "Переменная fullPrice имеет тип " + typeof fullPrice + "\n" + "Переменная adaptive имеет тип " + typeof adaptive);
console.log("Длина строки screens равна " + screens.length + " символу");
console.log("Стоимость верстки экранов - " + screenPrice + " рублей" + "\n" + "Стоимость разработки сайта - " + fullPrice + " рублей");
console.log(screens.toLowerCase().split(', '));
console.log("Процент отката посреднику за работу " + fullPrice * (rollback / 100));