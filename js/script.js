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
    rollback: 0,
    ServicePricesPercent: 0,
    ServicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    addServicesPercent: {},
    addServicesNumber: {},
    init: function () {
        appData.addTitle();
        appData.checkInputs();
        rollbackRange.value = 0;
        rollbackValue.textContent = '0%';
        appData.rollback = 0;

        calculateButton.addEventListener('click', appData.start);
        rollbackRange.addEventListener('input', appData.rollbackInput);
        addButton.addEventListener('click', appData.addScreenBlock);
    },

    checkInputs: function () {
        const screenTypes = document.querySelectorAll('.screen');

        const validateScreen = function (screen) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            return select.value !== '' && input.value !== '';
        };

        const checkAllScreensValid = function () {
            let allValid = true;
            screenTypes.forEach(screen => {
                if (!validateScreen(screen)) {
                    allValid = false;
                }
            });
            return allValid;
        };

        screenTypes.forEach(function (screen) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');

            const handleInputChange = () => {
                if (checkAllScreensValid()) {
                    calculateButton.classList.remove('inactive');
                } else {
                    calculateButton.classList.add('inactive');
                }
            };

            select.addEventListener('change', handleInputChange);
            input.addEventListener('input', handleInputChange);
        });

        // Изначальная проверка при загрузке страницы
        if (!checkAllScreensValid()) {
            calculateButton.classList.add('inactive');
        }
    },

    addTitle: function () {
        document.title = title.textContent;
    },

    start: function () {
        // Сбрасываем значения, чтобы при нажатии на кнопку "Рассчитать" значения не суммировались с предыдущим расчетом
        appData.screens = [];
        appData.screenPrice = 0;
        appData.ServicePricesNumber = 0;
        appData.ServicePricesPercent = 0;
        appData.servicePercentPrice = 0;
        appData.addServicesPercent = {};
        appData.addServicesNumber = {};

        appData.addScreens();
        appData.addServices();
        appData.addPrices();

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
                price: +select.value * +input.value,
                count: +input.value,
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

        appData.checkInputs();

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

        appData.servicePercentPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)));

        rollbackPriceInput.value = appData.servicePercentPrice;

        amountOfScreensInput.value = appData.screens.reduce(function (sum, screen) {
            return sum + Number(screen.count);
        }, 0)

    },

    rollbackInput: function (event) {
        rollbackValue.textContent = rollbackRange.value + '%';
        appData.rollback = +rollbackRange.value;
    },

    logger: function () {
        for (const key in appData) {
            console.log(appData[key], typeof appData[key]);
        }
    },
}

appData.init();




