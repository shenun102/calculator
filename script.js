const btnContainer = document.querySelector(".buttons-container");
const displayResult = document.querySelector(".result");
const clearBtn = document.querySelector(".ac");
const equalBtn = document.querySelector(".equal");

btnContainer.addEventListener("click", handleClick);
window.addEventListener("keypress", handleKey);
equalBtn.addEventListener("click", handleEqual);

// Basic Operator Functions

/*

// Add
function add(expression) {
  let result = 0;
  let splitExp = expression.split("+");
  for (let item of splitExp) {
    let number = parseFloat(item);
    // console.log(number);
    // console.log(Number.isNaN(number), number);
    result += number;
  }
  return result;
}

// Subtract
function subtract(expression) {
  // Case where expression starts with a negative number
  if (expression.startsWith("-")) expression = "0" + expression;

  // Split the expression by the '-' operator, keeping track of the signs
  let splitExp = expression.split(/(?=\-)/);

  // Initialize result with the first number (including its sign)
  let result = parseFloat(splitExp[0]);

  // Iterate through the remaining parts of the result
  for (let i = 1; i < splitExp.length; i++) {
    // converts string to float num
    let number = parseFloat(splitExp[i]);
    // since the values are split with a negative prepended i.e. "-80-20-30" becomes "-80","-20","-30", we can take the sum of them for subtraction
    // Which may be a little counter-intuitive
    result += number;
    console.log(result);
  }
  return result;
}

*/

function evaluateExp(expression) {
  const splitExp = splitExpression(expression);

  console.log(splitExp);
  // Check if the first expression is negative or not
  if (splitExp[0] === "-" && splitExp[1] !== "-") {
    const firstNum = "-" + splitExp[1];
    console.log(firstNum);
    splitExp.splice(0, 2, firstNum);
    console.log(splitExp);
  } // Return Error if first character is anything other than negative or number
  else {
    const isNum = parseFloat(splitExp[0]);
    console.log(isNum, Number.isNaN(isNum));
    if (Number.isNaN(isNum)) {
      return "Error!";
    }
  }

  // Look for multiplication and division first
  for (let i = 0; i < splitExp.length; i++) {
    // if the current char is = * or /
    if (splitExp[i] === "*" || splitExp[i] === "/") {
      // if the current char is multiply
      if (splitExp[i] === "*") {
        const multiResult =
          parseFloat(splitExp[i - 1]) * parseFloat(splitExp[i + 1]);
        splitExp.splice(i - 1, 3, multiResult);
        console.log(splitExp);
        i--; // We removed one element before the current element so minus 1 to index
      } else {
        // Divide uses the same concepts
        const diviResult =
          parseFloat(splitExp[i - 1]) / parseFloat(splitExp[i + 1]);
        splitExp.splice(i - 1, 3, diviResult);
        console.log(splitExp);
        i--;
      }
    }
  }

  // For Addition and Subtraction
  for (let i = 0; i < splitExp.length; i++) {
    // if the current char is = * or /
    if (splitExp[i] === "+" || splitExp[i] === "-") {
      if (splitExp[i] === "+") {
        if (splitExp[i + 1] === "-") {
          const addResult =
            parseFloat(splitExp[i - 1]) - parseFloat(splitExp[i + 2]);
          splitExp.splice(i - 1, 4, addResult);
          console.log(splitExp);
          i--;
        } else {
          const addResult =
            parseFloat(splitExp[i - 1]) + parseFloat(splitExp[i + 1]);
          splitExp.splice(i - 1, 3, addResult);
          console.log(splitExp);
          i--;
        }
      } else {
        if (splitExp[i + 1] === "-") {
          const subResult =
            parseFloat(splitExp[i - 1]) + parseFloat(splitExp[i + 2]);
          splitExp.splice(i - 1, 4, subResult);
          console.log(splitExp);
          i--;
        } else {
          const subResult =
            parseFloat(splitExp[i - 1]) - parseFloat(splitExp[i + 1]);
          splitExp.splice(i - 1, 3, subResult);
          console.log(splitExp);
          i--;
        }
      }
    }
  }

  const result = splitExp[0].toString();
  return result;
}

function splitExpression(expression) {
  // Regular expression to match numbers (including decimals) and operators
  // Breakdown:
  // \d+      - Matches one or more digits (0-9). This part handles whole numbers.
  // (\.\d+)? - Matches an optional decimal point followed by one or more digits.
  //            The group (\.\d+)? is optional because of the ? quantifier, allowing for decimal numbers.

  // |        - This is the alternation operator, which works like a logical "OR".
  // [\+\-]  - Matches either a plus (+) or minus (-) sign. The backslashes escape the + and - because they have special meanings in regex.
  const regex = /\d+(\.\d+)?|[\+\-\*\/]/g;

  // Use the match method to extract all substrings that match the regex pattern
  // This will return an array where numbers and operators are split as individual elements.
  const parts = expression.match(regex);

  return parts;
}

// evaluateExp("-1+2")
// evaluateExp("5+2-3");
// evaluateExp("5.5+2*2/3*3");
// evaluateExp("7.2-3.5*4+2.8/1.4*2-5");

// Button Click function

function handleClick(event) {
  const doNotDisplay = ["plusminus", "equal"];
  const target = event.target;
  if (!target.className.includes("btn")) return;

  const shouldIgnore = doNotDisplay.some((item) => {
    return target.className.includes(item);
  });

  if (shouldIgnore) return;

  if (target.className.includes("ac")) {
    handleClear();
    return;
  }

  updateDisplay(target.textContent);
}

// Key press function

function handleKey(event) {
  const invalidKeys = "=[]#;',./";
  console.log(event.key, event.keyCode);
  let buttonClass = invalidKeys.includes(event.key)
    ? "hello"
    : `.button-${event.key}`;

  if (event.key === "c") {
    handleClear();
    return;
  }
  if (event.key === ".") buttonClass = `.dot`;
  const btn = document.querySelector(buttonClass);
  console.log(btn);

  if (!btn) return;
  // window cannot listen for special keys meta, shift, backspace etxc.
  // if(event.key === "Backspace") console.log("BackSpace!!!")
  updateDisplay(btn.textContent);
}

// Clear calculator

function handleClear() {
  displayResult.textContent = "0";
}

// Remove initial zero if necessary, and update display

function updateDisplay(text) {
  // if the first number is zero and not followed by decimal point
  if (
    displayResult.textContent[0] === "0" &&
    displayResult.textContent[1] !== "."
  ) {
    // if the button was dot, add the text, dont remove 0
    if (text === ".") {
      displayResult.textContent += text;
      // else remove 0
    } else {
      displayResult.textContent = text;
    }
    // if not 0 else just add the text
  } else {
    displayResult.textContent += text;
  }
}

function handleError() {
  displayResult.textContent = "";
  // Display the error message
  updateDisplay("Error!");
  // Change the textContent back to "0" after 1.5 second
  setTimeout(() => {
    displayResult.textContent = "0";
  }, 1500); // 1000 milliseconds = 1 second
}

function handleEqual() {
  const result = evaluateExp(displayResult.textContent);
  console.log("HandleEqual", result, Number.isNaN(result));
  if (Number.isNaN(parseFloat(result))) {
    handleError();
    return;
  }
  displayResult.textContent = result;
}

5 + 5 - 6 + 1;
