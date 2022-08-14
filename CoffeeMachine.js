//User gets an overview of the general menu and which products of the menu can be made.
//User can still choose the beverages which can't be made to see what utilities have to be refilled for that beverage
//Some validation for not valid inputs and errorMessages in case that happens

let startUtilities = [400, 0, 120, 9, 550];
let utilityNames = ["water", "milk", "beans", "disposable cups"];

const input = require('readline-sync');

start();

function start() {
  let action = input.question("\nWrite action (buy, fill, take, remaining, exit):\n");

  if (action === "buy") {
    buy();
  } else if (action === "fill") {
    fill();
  } else if (action === "take") {
    take();
  } else if (action === "remaining") {
    displayUtilityStatus();
  } else if (action === "exit") {
    exit();
  } else {
    console.log("This isn't an option");
    start();
  }
}

function buy() {
  const allBeverageNames = ["Espresso (#1)", "Latte (#2)", "Cappuccino (#3)"];

  //individual arrays of all utilities per beverage and a negative number for the cost of the beverage
  const espresso = [250, 0, 16, 1, -4];
  const latte = [350, 75, 20, 1, -7];
  const cappuccino = [200, 100, 12, 1, -6];

  //array of arrays of all utilities per beverage and a negative number for the cost of the beverage
  const allBeverages = [[250, 0, 16, 1, -4], [350, 75, 20, 1, -7], [200, 100, 12, 1, -6]];

  let inputMessage = "\nI have enough utility to serve you at least 1: ";
  let beveragesOnOffer = "";

  //initialize overview of beverages which can be served
  whichBeveragesCanBeServed(allBeverages, startUtilities);

  //inventorize which beverages can be served according to the utilities in stock
  function whichBeveragesCanBeServed(array1, array2) {
    let enoughUtility = true;
    let index = 0;
    //iterate over allBeverages array so that utility inventory is checked for available beverages
    for (let [indexOfAllbeverages, beverage1] of array1.entries()) {
      //index storage to use later in the function
      index = indexOfAllbeverages;
      //iterate over the startUtilities array and check if there is enough to make the beverage
      for (let [index, utility] of array2.entries()) {
        //if a utility is out-of-stock, set boolean to true and break out of the loop to go to next section
        if (utility < beverage1[index]) {
          enoughUtility = false;
          break;
        }
      }
      //check if boolean is true or false, if true, then add the beverage to the menu where user can choose from
    if (enoughUtility) {
      beveragesOnOffer += allBeverageNames[indexOfAllbeverages] + " ";
      //reset boolean for next iteration
      enoughUtility = true;
    }
    }
  }

  //display of the menu and input request to the user
  console.log(`\nOur menu consists of: \n${allBeverageNames[0]}, ${allBeverageNames[1]} and ${allBeverageNames[2]} \n${inputMessage} ${beveragesOnOffer}`
      + "\nFor the other beverages, input the number to find out what utility is missing. To go back, input 'back'");
  let userCoffeeChoice = input.question("Your input:\n");

  if (userCoffeeChoice == 1) {
    if(startUtilities.at(0) >= espresso.at(0) &&
          startUtilities.at(2) >= espresso.at(2) &&
          startUtilities.at(3) >= espresso.at(3)) {
      console.log("\nI have enough resources, making you a coffee!")
      for (let i = 0; i <= startUtilities.length; i++) {
        startUtilities.fill(startUtilities.at(i) - espresso.at(i), i, i + 1);
      }
    } else {
      //if user choooses to know what utility is out of stock for a particular beverage (which is fed into the function), this function constructs the outputmessage
      //function can be found at the end of this function
      displayWhichUtilIsOutOfStock(espresso);
    }
  } else if (userCoffeeChoice == 2) {
    if (startUtilities.at(0) >= latte.at(0) &&
          startUtilities.at(1) >= latte.at(1) &&
          startUtilities.at(2) >= latte.at(2) &&
          startUtilities.at(3) >= latte.at(3)) {
      console.log("\nI have enough resources, making you a coffee!")
      for (let i = 0; i <= startUtilities.length; i++) {
        startUtilities.fill(startUtilities.at(i) - latte.at(i), i, i + 1);
      }
    } else {
      displayWhichUtilIsOutOfStock(latte);
    }
  } else if (userCoffeeChoice == 3) {
    if (startUtilities.at(0) >= cappuccino.at(0) &&
          startUtilities.at(1) >= cappuccino.at(1) &&
          startUtilities.at(2) >= cappuccino.at(2) &&
          startUtilities.at(3) >= cappuccino.at(3)) {
      console.log("\nI have enough resources, making you a coffee!")
      for (let i = 0; i <= startUtilities.length; i++) {
        startUtilities.fill(startUtilities.at(i) - cappuccino.at(i), i, i + 1);
      }
    } else {
      displayWhichUtilIsOutOfStock(cappuccino);
    }
  } else if (userCoffeeChoice === "back") {
    start();
  } else {
    console.log("This isn't an option\n");
    buy();
  }


  function displayWhichUtilIsOutOfStock(beverage) {
    let outOfStockUtility = false;
    let errorMessage = "Sorry, not enough: ";
    //iterate over the startUtilities array + getting the index of where the loop is in the array to use down the line
    for (let [index, utility] of startUtilities.entries()) {
      //check if the iterated start-utility is more then the utility needed for the beverage, if not, then add it to the errorMessage
      if (utility < beverage[index]) {
        //from here there is a check if there has already been an addition of an out-of-stock utility to the output string. If so, then a "," is added
        if (outOfStockUtility) {
          errorMessage += " and ";
          outOfStockUtility = false;
        }
        //adding the out-of-stock utility from the utilityNames array to the output errorMessage with the index of the utility checked from the startUtilities array
        errorMessage += utilityNames[index];
        outOfStockUtility = true;
      }
    }
    console.log(errorMessage + "!");
  }

  //stay inside the buy menu after input is finished
  buy();
}

function fill() {
  let fillUpValues = new Array(5);

  fillUpValues.fill(parseInt(input.question("Write how many ml of water you want to add:\n")),0,1);

  fillUpValues.fill(parseInt(input.question("Write how many ml of milk you want to add:\n")), 1, 2);

  fillUpValues.fill(parseInt(input.question("Write how many grams of coffee beans you want to add:\n")),2,3);

  fillUpValues.fill(parseInt(input.question("Write how many disposable coffee cups you want to add:\n")),3,4);

  fillUpValues.fill(0,4);

  for (let i = 0; i <= startUtilities.length; i++) {
    startUtilities.fill(startUtilities.at(i) + fillUpValues.at(i), i, i + 1);
  }
  start();
}

function take() {
  let moneyToGive = startUtilities.at(4);
  console.log(`I gave you $${moneyToGive}\n`)
  startUtilities.fill(0,4);
  start();
}

function displayUtilityStatus() {
  console.log(`\nThe coffee machine has:
${startUtilities.at(0)} ml of water
${startUtilities.at(1)} ml of milk
${startUtilities.at(2)} g of coffee beans
${startUtilities.at(3)} disposable cups
$${startUtilities.at(4)} of money\n`)
  start();
}

function exit() {
  process.exit();
}

