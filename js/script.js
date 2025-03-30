'use strict';

const title = document.getElementsByTagName('h1')[0];
const addButton = document.querySelector('.screen-btn');
const percents = document.querySelectorAll('.other-items.percent');
const numbers = document.querySelectorAll('.other-items.number');

const calculateButton = document.getElementsByClassName('handler_btn')[0];
const resetButton = document.getElementsByClassName('handler_btn')[1];

const rollbackRange = document.querySelector('.rollback input[type=range]');
const rollbackValue = document.querySelector('.rollback span.range-value');

const fullPriceInput = document.getElementsByClassName('total-input')[0];
const amountOfScreensInput = document.getElementsByClassName('total-input')[1];
const servicesPriceInput = document.getElementsByClassName('total-input')[2];
const finalPriceInput = document.getElementsByClassName('total-input')[3];
const rollbackPriceInput = document.getElementsByClassName('total-input')[4];

let screenTypes = document.querySelectorAll('.screen');


const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 14,
    ServicePricesPercent: 0,
    ServicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    addServicesPercent: {},
    addServicesNumber: {},
    init: function () {
        appData.addTitle();
        calculateButton.addEventListener('click', appData.start);
        addButton.addEventListener('click', appData.addScreenBlock);


    },

    addTitle: function () {
        document.title = title.textContent;
    },

    start: function () {
        appData.addScreens();
        appData.addServices();
        appData.addPrices();

        // appData.getServicePercentPrices(appData.fullPrice, appData.rollback);
        // appData.logger();

        console.log(appData);
        appData.showResult();
    },

    showResult: function () {
        fullPriceInput.value = appData.screenPrice;
        servicesPriceInput.value = appData.ServicePricesPercent + appData.ServicePricesNumber;
        finalPriceInput.value = appData.fullPrice
    },

    addScreens: function () {

        screenTypes = document.querySelectorAll('.screen');

        screenTypes.forEach(function (screen, index) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value
            });
        })
    },

    addServices: function () {
        percents.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label')
            const input = item.querySelector('input[type=text]')

            if (check.checked) {
                appData.addServicesPercent[label.textContent] = +input.value
            };
        });

        numbers.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label')
            const input = item.querySelector('input[type=text]')

            if (check.checked) {
                appData.addServicesNumber[label.textContent] = +input.value
            };
        });

    },

    addScreenBlock: function () {
        const cloneScreen = screenTypes[0].cloneNode(true);
        screenTypes[screenTypes.length - 1].after(cloneScreen);

    },

    addPrices: function () {

        appData.screenPrice = appData.screens.reduce(function (sum, screen) {
            return sum + Number(screen.price);
        }, 0)

        for (let key in appData.addServicesNumber) {
            appData.ServicePricesNumber += appData.addServicesNumber[key];
        }

        for (let key in appData.addServicesPercent) {
            appData.ServicePricesPercent += appData.screenPrice * (appData.addServicesPercent[key] / 100);
        }

        appData.fullPrice = +appData.screenPrice + appData.ServicePricesNumber + appData.ServicePricesPercent;

    },

    getServicePercentPrices: function (price, percent) {
        appData.servicePercentPrice = Math.ceil(price - (price * (percent / 100)));
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
            console.log(appData[key], typeof appData[key]);
        }
    },
}

appData.init();




