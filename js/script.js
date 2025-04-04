'use strict';

const title = document.getElementsByTagName('h1')[0];
const addButton = document.querySelector('.screen-btn');
const percents = document.querySelectorAll('.other-items.percent');
const numbers = document.querySelectorAll('.other-items.number');

const calculateButton = document.getElementsByClassName('handler_btn')[0];
const resetButton = document.getElementsByClassName('handler_btn')[1];

const rollbackRange = document.querySelector('.rollback input[type=range]');
const rollbackValue = document.querySelector('.rollback span.range-value');

const totalInputs = document.querySelectorAll('.total-input');
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
        this.addTitle();
        this.checkInputs();
        this.emptyState();

        calculateButton.addEventListener('click', this.start);
        resetButton.addEventListener('click', this.reset);
        rollbackRange.addEventListener('input', this.rollbackInput);
        addButton.addEventListener('click', this.addScreenBlock);
    },

    checkInputs: function () {
        const screenTypes = document.querySelectorAll('.screen');

        const validateScreen = (screen) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            return select.value !== '' && input.value !== '';
        };

        const checkAllScreensValid = () => {
            let allValid = true;
            screenTypes.forEach(screen => {
                if (!validateScreen(screen)) {
                    allValid = false;
                }
            });
            return allValid;
        };

        screenTypes.forEach(screen => {
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

    emptyState: function () {
        // Сбрасываем значения, чтобы при нажатии на кнопку "Рассчитать" значения не суммировались с предыдущим расчетом
        // обращаемся напрямую к appData, т.к. иначе ломается контекст вызова
        appData.screens = [];
        appData.screenPrice = 0;
        appData.fullPrice = 0;
        appData.ServicePricesNumber = 0;
        appData.ServicePricesPercent = 0;
        appData.servicePercentPrice = 0;
        appData.addServicesPercent = {};
        appData.addServicesNumber = {};
        rollbackRange.value = 0;
        rollbackValue.textContent = '0%';
        appData.rollback = 0;


        totalInputs.forEach(el => {
            el.value = '0';
        })

        calculateButton.classList.add('inactive');
        addButton.classList.remove('inactive');

    },

    start: function () {
        appData.screens = [];
        appData.addScreens();
        appData.addServices();
        appData.addPrices();
        // appData.logger();

        appData.showResult();
        appData.disableFields();
    },

    reset: function () {
        const leftInputs = document.querySelectorAll('.screen input');
        const screenSelect = document.querySelectorAll('.screen select');
        const screenTypes = document.querySelectorAll('.screen');
        const check = document.querySelectorAll('input[type=checkbox]');

        leftInputs.forEach(el => {
            el.value = '';
            el.removeAttribute('disabled');
        })

        screenSelect.forEach(el => {
            el.value = '';
            el.removeAttribute('disabled');
        })

        check.forEach(el => {
            el.checked = false;
        })

        addButton.classList.remove('inactive');
        calculateButton.style.display = "block";
        resetButton.style.display = "none";
        appData.emptyState();

        appData.screens.splice(0, appData.screens.length);

        screenTypes.forEach((el, index) => {
            if (index !== 0) {
                el.remove();
            }
        })

        appData.checkInputs();
    },

    showResult: function () {
        fullPriceInput.value = this.screenPrice;
        servicesPriceInput.value = this.ServicePricesPercent + this.ServicePricesNumber;
        finalPriceInput.value = this.fullPrice
    },

    addScreens: function () {

        screenTypes = document.querySelectorAll('.screen');

        screenTypes.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            this.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: +input.value,
            });

        })

    },

    addServices: function () {
        percents.forEach(item => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label')
            const input = item.querySelector('input[type=text]')

            if (check.checked) {
                this.addServicesPercent[label.textContent] = +input.value
            };
        });

        numbers.forEach(item => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label')
            const input = item.querySelector('input[type=text]')

            if (check.checked) {
                this.addServicesNumber[label.textContent] = +input.value
            };
        });

    },

    addScreenBlock: function () {
        const screenTypes = document.querySelectorAll('.screen');
        const firstScreen = document.querySelector('.screen'); // Всегда берем первый элемент из DOM, чтобы клонировать первый элемент после сброса
        const cloneScreen = firstScreen.cloneNode(true);

        screenTypes[screenTypes.length - 1].after(cloneScreen);
        cloneScreen.querySelector('input[type=text]').value = "";

        appData.checkInputs();

    },

    disableFields: function () {
        const leftInputs = document.querySelectorAll('.screen input[type="text"]');
        const screenSelect = document.querySelectorAll('.screen select');

        leftInputs.forEach((el) => {
            el.setAttribute('disabled', 'true');
        });

        screenSelect.forEach((el) => {
            el.setAttribute('disabled', 'true');
        });

        addButton.classList.add('inactive');
        calculateButton.style.display = "none";
        resetButton.style.display = "block";

    },

    addPrices: function () {

        this.screenPrice = this.screens.reduce((sum, screen) => sum + Number(screen.price), 0)

        for (let key in this.addServicesNumber) {
            this.ServicePricesNumber += this.addServicesNumber[key];
        }

        for (let key in this.addServicesPercent) {
            this.ServicePricesPercent += this.screenPrice * (this.addServicesPercent[key] / 100);
        }

        this.fullPrice = +this.screenPrice + this.ServicePricesNumber + this.ServicePricesPercent;

        this.servicePercentPrice = Math.ceil(this.fullPrice - (this.fullPrice * (this.rollback / 100)));

        rollbackPriceInput.value = this.servicePercentPrice;

        amountOfScreensInput.value = this.screens.reduce((sum, screen) => sum + Number(screen.count), 0)

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




