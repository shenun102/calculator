const displayResult = document.querySelector(".result");
const btnContainer = document.querySelector(".buttons-container");
console.log(displayResult);

btnContainer.addEventListener("click", handleClick);

function handleClick(event) {
  let target = event.target;
  // if the target element doesnt have a class name of "btn" return
  if (!target.className.includes("btn")) return;
  console.log(event.target.textContent);
  updateDisplay(target.textContent);
}

function updateDisplay(text) {
  if (displayResult.textContent === "0") {
    displayResult.textContent = "";
  }
  displayResult.textContent += text;
}

// 1. Basic Math Operations
function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

console.log(add(1, 1));

let operator = "";
let firstNum = 1;
let secondNum = 2;

// 3. Operate Function

function operate(operator, firstNum, secondNum) {
  let result;
  if (operator === "+") result = add(firstNum, secondNum);
  if (operator === "-") result = subtract(firstNum, secondNum);
  if (operator === "*") result = multiply(firstNum, secondNum);
  if (operator === "/") result = divide(firstNum, secondNum);
  updateDisplay(result);
}

operate("+", 1, 1);
