const btnContainer = document.querySelector(".buttons-container");
const displayResult = document.querySelector(".result");
const clearBtn = document.querySelector(".ac");

btnContainer.addEventListener("click", handleClick);
window.addEventListener("keypress", handleKey);

// Basic Operator Functions



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
