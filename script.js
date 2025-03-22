'use strict';
//alert('На данной странице выводится задание седьмого урока курса');

const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: true,
    rollback: 14,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    addService1: '',
    addService2: '',

    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num)
    },

    asking: function () {
        appData.title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
        appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые, сложные, средние');

        do {
            appData.screenPrice = prompt('Сколько будет стоить данная работа?');
        } while (!appData.isNumber(appData.screenPrice))

        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },


    getTitle: function (projectName) {
        return projectName.trim().charAt(0).toUpperCase() + projectName.trim().slice(1).toLowerCase();
    },



    getAllServicePrices: function () {
        let sum = 0;

        for (let i = 0; i < 2; i++) {
            let price = 0;

            if (i === 0) {
                appData.addService1 = prompt('Какой дополнительный тип услуги нужен?');
            } else if (i === 1) {
                appData.addService2 = prompt('Какой дополнительный тип услуги нужен?');
            }

            do {
                price = prompt('Сколько это будет стоить?')
            } while (!appData.isNumber(price));

            sum += +price;
        }

        return sum;
    },

    getFullPrice: function (devPrice, servicePrice) {
        return devPrice + servicePrice;
    },

    getServicePercentPrices: function (price, percent) {
        return Math.ceil(price - (price * (percent / 100)));
    },

    getRollbackMessage: function (price) {
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
    },

    logger: function () {
        for (const key in appData) {
            console.log(appData[key]);
        }
    },

    start: function () {
        appData.asking();
        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice(+appData.screenPrice, +appData.allServicePrices);
        appData.servicePercentPrice = appData.getServicePercentPrices(appData.fullPrice, appData.rollback);
        appData.title = appData.getTitle(appData.title);
        appData.logger();
    }
}

appData.start();




