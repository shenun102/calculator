const displayResult = document.querySelector(".result");
const btnContainer = document.querySelector(".buttons-container");
// console.log(displayResult);

btnContainer.addEventListener("click", handleClick);

let operation = false;
let calcResult = false;
let operator;
let numOne = 0;
let numTwo = 0;
let firstOrSec = 1;

function handleClick(event) {
  let target = event.target;
  // if the target element doesnt have a class name of "btn", return
  if (!target.className.includes("btn")) return;
  // console.log(target.textContent);

  // checks if its clear display button AC
  if (target.className.includes("btn-c")) {
    handleClear();
    return;
  }

  // checks for dot
  if (target.className.includes("dot")) {
    if (!displayResult.textContent.includes(".")) {
      updateDisplay(".");
    } else return;
  }

  if (target.className.includes("operate-button")) {
    // Check if the button was an operator
    operation = true;
    operator = target.textContent;
  }
}

// Handle clear function

function handleClear() {
  displayResult.textContent = "0";
}

// Update the display function

function updateDisplay(text) {
  if (displayResult.textContent === "0") {
    // if its dot
    if (text === ".") {
      displayResult.textContent += text;
      return;
    } else displayResult.textContent = "";
  }

  displayResult.textContent += text;
}

// 1. Basic Math Operations
function add(num1, num2) {
  return parseFloat(num1) + parseFloat(num2);
}

function subtract(num1, num2) {
  return parseFloat(num1) - parseFloat(num2);
}

function multiply(num1, num2) {
  return parseFloat(num1) * parseFloat(num2);
}

function divide(num1, num2) {
  return parseFloat(num1) / parseFloat(num2);
}

// 3. Operate Function

function operate(operator, firstNum, secondNum) {
  let result;
  if (operator === "+") result = add(firstNum, secondNum);
  if (operator === "-") result = subtract(firstNum, secondNum);
  if (operator === "*") result = multiply(firstNum, secondNum);
  if (operator === "/") result = divide(firstNum, secondNum);
  return result;
}
