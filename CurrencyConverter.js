const input = require('readline-sync');
let currencyList = {"USD" : 1.0,"JPY" : 113.5,"EUR" : 0.89,"RUB" : 74.36,"GBP": 0.75};
console.log("Welcome to Currency Converter!");

for (const currency in currencyList) {
    console.log(`1 USD equals ${currencyList[currency]} ${currency}`);
}

let userChoice = Number;
let userCurrencyToConvert = String;
let userCurrencyToReceive = String;
let amount = Number;

chooseProgram();

function chooseProgram() {
    console.log("What do you want to do?");
    userChoice = input.question("1-Convert currencies 2-Exit program\n");
    if (isNaN(userChoice) || userChoice > 2 || userChoice < 0) {
        console.log("Unknown input");
        chooseProgram();
    } else if (userChoice == 1) {
        askUserCurrencyToConvert();
    } else {
        console.log("Have a nice day!")
        process.exit();
    }
}

function askUserCurrencyToConvert() {
    console.log("What do you want to convert?")
    userCurrencyToConvert = input.question("From: ").toUpperCase();
    if (!(userCurrencyToConvert in currencyList)) {
        console.log("Unknown currency");
        chooseProgram();
    } else askUserCurrencyToReceive();
}

function askUserCurrencyToReceive() {
    userCurrencyToReceive = input.question("To: ").toUpperCase();
    if (!(userCurrencyToReceive in currencyList)) {
        console.log("Unknown currency");
        askUserCurrencyToReceive();
    } else askUserAmount();
}

function askUserAmount() {
    amount = Number(input.question("Amount: "));
    if (isNaN(amount)) {
        console.log("The amount has to be a number");
        askUserAmount();
    } else if (amount < 1) {
        console.log("The amount cannot be less than 1");
        askUserAmount();
    } else {
        convert(userCurrencyToConvert, userCurrencyToReceive, amount);
        chooseProgram();
    }
}

function convert(currencyToConvert, currencyToReceive, amount) {
    console.log(`Result: ${amount} ${currencyToConvert} equals ${(currencyList[currencyToReceive] / currencyList[currencyToConvert] * amount).toFixed(4)} ${currencyToReceive}`);
}