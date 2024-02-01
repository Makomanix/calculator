let buffer = '';
let memory = '';
let bufferArray = [];
let savedNumber = ''
let onOff = false;


const buttonValues = document.querySelectorAll("button");

let buttonValueArray = Array.from(buttonValues).map((button) => {
  return button.value;
});


function handleClick(e){
  handleButton(e.target.value);
  e.target.blur();
};

function handlePress(e) {
  handleButton(e.key);
};

function handleButton(value) {
  if ( isNaN(parseInt(value)) && value != '.' ) {
    if (checkSymbol(value)) {
      handleSymbol(value);
    } else {
      return;
    }
  } else {
    handleNumber(value);
  }
};


function checkSymbol(symbol) {
  return (!(buttonValueArray.includes(symbol))) ? false : true
};

console.log(buttonValueArray);

function handleSymbol(symbol){
  if (savedNumber.length > 0) {
    bufferArray.push(savedNumber);
    savedNumber = '';
  };
  
  switch (symbol) {
    case "Backspace":
      conditionBackspace();
      break;

    case "Delete":
      buffer = "0";
      memory = "";
      bufferArray = [];
      rerender();
      break;

    case "Enter":
      if (buffer == "0" || buffer == "") {
        return;
      } else {
        memory = buffer + " =";
        doOperations(bufferArray);
      }
      break;

    case "+":
    case "-":
    case "/":
    case "*":
      if (buffer == "0" || buffer == "" || preventSymbols()) {
        return;
      }

      bufferArray.push(symbol);
      buffer += " " + symbol + " ";
      break;

    case "!":
      if (buffer == "0" || buffer == "" || preventSymbols()) {
        return;
      }

      bufferArray.push(symbol);
      buffer += symbol + " ";
      break;

    case "^":
      if (buffer == "0" || buffer == "" || preventSymbols()) {
        return;
      }
      bufferArray.push(symbol);
      buffer += symbol;
      break;

    case "√":
      if (buffer == "0" || buffer == "") {
        buffer = symbol;
      } else if (buffer.substring(buffer.length - 1) == " ") {
        buffer += symbol;
        bufferArray.push(symbol);
      }
      break;
  }

  rerender();
};


function handleNumber(number) {

  if (buffer === '0') {
    buffer = number;
  } else {
    buffer += number
  }
  savedNumber += number;

  rerender();
};



function doOperations(array) {
  console.log(array);
  factorials(array);
  console.log(array);
  exponents(array);
  console.log(array);
  squareRoot(array);
  console.log(array);
  divideAndMultiply(array);
  console.log(array);
} 

function factorials(array) {
  let factorial = array.indexOf('!');

  while (array.includes('!')) {
    let number = array[factorial - 1];
    
    for (let i = (number - 1); i > 1; i--) {
      number *= i;
      
    }
    array.splice(factorial - 1, 2, number);
    factorial = array.indexOf('!')
  }
  
  return array;
};

function exponents(array) {
  let carrot = array.indexOf('^');

  while (array.includes('^')) {
    let base = array[carrot - 1];
    let power = array[carrot + 1];
    
    let answer = base ** power;
    array.splice(carrot - 1, 3, answer)
    carrot = array.indexOf('^');
  }
  return array;
};

function squareRoot(array) {
  let radical = array.indexOf('√');
  
  while (array.includes('√')) {
    let number = array[radical + 1]
    let answer = Math.sqrt(number);

    array.splice(radical, 2, answer);

    radical = array.indexOf('√');
  }
  return array;
};

function divideAndMultiply(array) {
  let division = array.indexOf("/");
  let multiplication = array.indexOf("*");
  while (array.includes("*") || array.includes("/")) {

    if ((division < multiplication && division >= 0) || multiplication < 0) {
      let formula = array.slice(division - 1, division + 2);
      let answer = formula[0] / formula[2];

      array.splice(division - 1, 3, answer);

    } else {
      let formula = array.slice(multiplication - 1, multiplication + 2);
      let answer = formula[0] * formula[2];

      array.splice(multiplication - 1, 3, answer);
    }
    division = array.indexOf("/");
    multiplication = array.indexOf("*");
  }
  return array;
};


function conditionSquareRoot() {

};


function conditionBackspace() {
  
  if (preventSymbols()) {

    buffer = buffer.substring(0, buffer.length - 3);
    bufferArray.pop();

  } else if (buffer.substring(buffer.length - 2, buffer.length - 1) == "!") {

    buffer = buffer.substring(0, buffer.length - 2);
    bufferArray.pop();
    
  } else {

    let currentNumber;

    if (bufferArray.length >= 1) {
      currentNumber = bufferArray.pop();
    }

    if (currentNumber.length > 1 ) {

      currentNumber = currentNumber.substring(0, currentNumber.length - 1);
      bufferArray.push(currentNumber);
      buffer = buffer.substring(0, buffer.length - 1);

    } else {
      buffer = buffer.substring(0, buffer.length - 1);
    }
  }

  rerender();
};


function preventSymbols() {
  if (
    buffer.substring(buffer.length - 2, buffer.length - 1) == "+" ||
    buffer.substring(buffer.length - 2, buffer.length - 1) == "-" ||
    buffer.substring(buffer.length - 2, buffer.length - 1) == "/" ||
    buffer.substring(buffer.length - 2, buffer.length - 1) == "*" ||
    buffer.substring(buffer.length - 1, buffer.length) == "√"
  ) {
    return true;
  } else {
    return false;
  }
}


function rerender() {
  const solution = document.querySelector('.solution');
  // max length 15
  const equation = document.querySelector('.equation');
  // max length 30

  if (onOff == false) {
    buffer = '';
    memory = '';
    bufferArray = [];
  }  
  
  if (buffer === '' && onOff == true) {
      buffer = '0';
  } 
    
    solution.innerText = buffer;
    equation.innerText = memory;
};


function toggleOnOff(e) {
  if (e.key === "p" || e.target.innerText === 'Pow') {
    onOff ? onOff = false : onOff = true;
    if (onOff == true) {
      activation(true);
    } else {
      activation(false);
    }
  }    
};


function activation(bool) {
  
  const buttons = document.querySelector(".buttons-grid");
  
  if (bool == true) {
    
    buttons.addEventListener('click', handleClick);
    document.addEventListener('keydown', handlePress);
    rerender();
    
  } else if (bool == false) {
    
    buttons.removeEventListener("click", handleClick);
    document.removeEventListener("keydown", handlePress);
    rerender();
    
  }
};


function init() {
  document.addEventListener("keydown", toggleOnOff);
  
  const power = document.querySelector(".power");
  power.addEventListener("click", toggleOnOff);
};

init();