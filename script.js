const btnContainer = document.querySelector(".buttons-container");
const displayResult = document.querySelector(".result");
const clearBtn = document.querySelector(".ac");
const equalBtn = document.querySelector(".equal");

btnContainer.addEventListener("click", handleClick);
window.addEventListener("keypress", handleKey);
equalBtn.addEventListener("click", handleEqual);

// Heading  Basic Operator Functions

function evaluateExp(expression) {
  const splitExp = splitExpression(expression);

  // Check if the first expression is negative or not
  if (splitExp[0] === "-" && splitExp[1] !== "-") {
    const firstNum = "-" + splitExp[1];

    splitExp.splice(0, 2, firstNum);
  } // Return Error if first character is anything other than negative or number
  else {
    const isNum = parseFloat(splitExp[0]);

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

        i--; // We removed one element before the current element so minus 1 to index
      } else {
        // Divide uses the same concepts
        const diviResult =
          parseFloat(splitExp[i - 1]) / parseFloat(splitExp[i + 1]);
        splitExp.splice(i - 1, 3, diviResult);

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

          i--;
        } else {
          const addResult =
            parseFloat(splitExp[i - 1]) + parseFloat(splitExp[i + 1]);
          splitExp.splice(i - 1, 3, addResult);

          i--;
        }
      } else {
        if (splitExp[i + 1] === "-") {
          const subResult =
            parseFloat(splitExp[i - 1]) + parseFloat(splitExp[i + 2]);
          splitExp.splice(i - 1, 4, subResult);

          i--;
        } else {
          const subResult =
            parseFloat(splitExp[i - 1]) - parseFloat(splitExp[i + 1]);
          splitExp.splice(i - 1, 3, subResult);

          i--;
        }
      }
    }
  }

  const result = splitExp[0].toString();
  return result;
}

// Function to split the expression

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

// Flag to track if Enter key was pressed
let enterPressed = false;

function handleKey(event) {
  const invalidKeys = "=[]#;',./";

  // Determine the button class based on the key pressed
  let buttonClass = invalidKeys.includes(event.key)
    ? "hello"
    : `.button-${event.key}`;

  // Handle specific keys with their respective classes
  if (event.key === "c") {
    handleClear();
    return;
  }
  if (event.key === ".") buttonClass = `.dot`;
  if (event.key === "+") buttonClass = `.add`;
  if (event.key === "-") buttonClass = `.minus`;
  if (event.key === "*") buttonClass = `.multiply`;
  if (event.key === "/") buttonClass = `.divide`;

  // Find the button element based on the key pressed
  const btn = document.querySelector(buttonClass);

  // Handle Enter key
  if (event.key === "Enter") {
    handleEqual();
    enterPressed = true; // Set flag to true when Enter is pressed
    return;
  }

  // Reset the displayResult if Enter was pressed before this number key
  if (enterPressed && !isNaN(event.key)) {
    displayResult.textContent = "0"; // Reset displayResult
    enterPressed = false; // Reset the flag
  }

  // If the button element is found, update the display
  if (!btn) return;
  updateDisplay(btn.textContent);
}

// Clear calculator display function

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

// Handles errors

function handleError() {
  displayResult.textContent = "";
  // Display the error message
  updateDisplay("Error!");
  // Change the textContent back to "0" after 1.5 second
  setTimeout(() => {
    displayResult.textContent = "0";
  }, 1500); // 1000 milliseconds = 1 second
}

// Handles equal button

function handleEqual() {
  const result = evaluateExp(displayResult.textContent);

  if (Number.isNaN(parseFloat(result))) {
    handleError();
    return;
  }
  displayResult.textContent = result;
}






/* Doesn't work, doesnt take operator prcedence into account

function evaluateExp(expression) {
  let splitExp = splitExpression(expression);

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

  // let result;
  // Look for multiplication and division first
  for (let i = 0; i < splitExp.length; i++) {
    let prevChar = splitExp[i - 1];
    let currChar = splitExp[i];
    let nextChar = splitExp[i + 1];
    let nextCharTwo = splitExp[i + 2];
    let operators = "*%/+-";
    console.log(`${i} iteration`);

    // if the current character is an operator
    if (operators.includes(currChar)) {
      switch (currChar) {
        case "*":
          splitExp = nextOpMinus(nextChar, nextCharTwo, splitExp, i);
          nextChar = splitExp[i + 1];
          result = parseFloat(prevChar) * parseFloat(nextChar);
          splitExp.splice(i - 1, 3, result);
          i--;
          break;
        case "/":
          splitExp = nextOpMinus(nextChar, nextCharTwo, splitExp, i);
          nextChar = splitExp[i + 1];
          result = parseFloat(prevChar) / parseFloat(nextChar);
          splitExp.splice(i - 1, 3, result);
          i--;
          break;
        case "+":
          splitExp = nextOpMinus(nextChar, nextCharTwo, splitExp, i);
          nextChar = splitExp[i + 1];
          result = parseFloat(prevChar) + parseFloat(nextChar);
          splitExp.splice(i - 1, 3, result);
          i--;
          break;
        case "-":
          splitExp = nextOpMinus(nextChar, nextCharTwo, splitExp, i);
          nextChar = splitExp[i + 1];
          result = parseFloat(prevChar) - parseFloat(nextChar);
          splitExp.splice(i - 1, 3, result);
          i--;
          break;
      }
    }

    console.log(splitExp);
  }
  // console.log(result);
  return result;
}

function nextOpMinus(nextChar, nextCharTwo, splitExp, index) {
  console.log("splitExp", splitExp);
  if (nextChar === "-") {
    splitExp.splice(index + 1, 2, `-${nextCharTwo}`);
    console.log(splitExp, "if 2 negs");
    return splitExp;
  } else {
    return splitExp;
  }
}

*/
