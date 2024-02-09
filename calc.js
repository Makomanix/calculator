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


function handleSymbol(symbol){
  
  switch (symbol) {

    case "Backspace":
      if (buffer === "Self Destruct Initiated") {
        return;
      };

      conditionBackspace();
      break;

    case "Delete":
      if (buffer == "Self Destruct Initiated") {
        buffer = "0";
        memory = "Bomb Deactivated";
      } else {

      buffer = "0";
      memory = "";
      bufferArray = [];
      savedNumber = '';
      };
      break;

    case "Enter":
      if (
        buffer == "0" ||
        buffer == "" ||
        buffer === "Self Destruct Initiated"
      ) {
        return;

      } else {

        pushSavedNumber();
        memory = buffer + " =";
        doOperations(bufferArray);
        buffer = bufferArray[0];
        savedNumber = "";
      }
      break;

    case "+":
    case "-":
    case "/":
    case "*":
      if (
        buffer == "0" ||
        buffer == "" ||
        preventSymbols() ||
        buffer === "Self Destruct Initiated"
      ) {
        return;
      }

      pushSavedNumber();
      bufferArray.push(symbol);
      buffer += " " + symbol + " ";
      savedNumber = ''
      break;

    case "!":
      if (
        buffer == "0" ||
        buffer == "" ||
        preventSymbols() ||
        buffer === "Self Destruct Initiated"
      ) {
        return;
      }

      pushSavedNumber();
      bufferArray.push(symbol);
      buffer += symbol + " ";
      savedNumber = ''
      break;

    case "^":
      if (
        buffer == "0" ||
        buffer == "" ||
        preventSymbols() ||
        buffer === "Self Destruct Initiated"
      ) {
        return;
      };

      pushSavedNumber();
      bufferArray.push(symbol);
      buffer += symbol;
      savedNumber = ''
      break;

    case "√":
      if (buffer === 'Self Destruct Initiated') {
        return;
      }

      pushSavedNumber();

      if (buffer == "0" || buffer == "") {
        buffer = symbol;
        bufferArray.push(symbol);
      } else if (buffer.substring(buffer.length - 1) == " ") {
        buffer += symbol;
        bufferArray.push(symbol);
      } else if (buffer === bufferArray[0]) {
        buffer = symbol + buffer;
        bufferArray.unshift(symbol);
      }
      savedNumber = ''
      break;
  }

  rerender();
};


function handleNumber(number) {

  if (number === '.' && savedNumber.includes('.')) {
    return;
  }

  if (
    (buffer === bufferArray[0] && buffer !== "√") ||
    buffer === "0" ||
    buffer === "Self Destruct Initiated"
  ) {
    buffer = number;
    memory = "";
    bufferArray = [];
  } else {
    buffer += number;
  }
  savedNumber += number;
  console.log('savedNumber in handleNumber',savedNumber);
  

  rerender();
};

function handleCommas(number) {
  let prettyBuffer;
  let prettyMemory;
  let wholeNumber = buffer;
  let decimal;
  if (buffer.includes(".")) {
    let parts = buffer.split(".");
    wholeNumber = parts[0];
    afterDecimal = parts[1];
  }
}


function doOperations(array) {
  factorials(array);
  exponents(array);
  squareRoot(array);
  divideAndMultiply(array); 
  addAndSubtract(array);  
} 

function factorials(array) {
  let factorial = array.indexOf('!');

  while (array.includes('!')) {
    let number = array[factorial - 1];
    
    for (let i = (number - 1); i > 1; i--) {
      number *= i;
      number = number.toString();
      
    }
    array.splice(factorial - 1, 2, number);
    factorial = array.indexOf('!')
  }
};

function exponents(array) {
  let carrot = array.indexOf('^');

  while (array.includes('^')) {
    let base = array[carrot - 1];
    let power = array[carrot + 1];
    let answer = base ** power;
    
    answer = answer.toString();

    array.splice(carrot - 1, 3, answer)
    carrot = array.indexOf('^');
  }
};


function squareRoot(array) {
  let radical = array.indexOf('√');
  
  while (array.includes('√')) {
    let number = array[radical + 1]
    let answer = Math.sqrt(number);
    
    answer = answer.toString();
    array.splice(radical, 2, answer);
    radical = array.indexOf('√');
  }
};



function divideAndMultiply(array) {
  let division = array.indexOf("/");
  let multiplication = array.indexOf("*");
  let symbol = "divide";

  while (array.includes("*") || array.includes("/")) {

    orderOperations(array, division, multiplication, symbol);
    division = array.indexOf("/");
    multiplication = array.indexOf("*");
  }
};


function addAndSubtract(array) {
  let plus = array.indexOf("+");
  let minus = array.indexOf("-");
  let symbol = "minus";

  while (array.includes("+") || array.includes("-")) {

    orderOperations(array, minus, plus, symbol);
    plus = array.indexOf("+");
    minus = array.indexOf("-");
  }
};


function orderOperations(array, operand1, operand2, symbol) {
  let answer;
  console.log('hi in operations');
  if ((operand1 < operand2 && operand1 >= 0) || operand2 < 0) {
    let formula = array.slice(operand1 - 1, operand1 + 2);
      if (symbol == "divide") {

    answer = formula[0] / formula[2];
    answer = answer.toString();
      } else {

        answer = formula[0] - formula[2];
        answer = answer.toString();
      }
    
    array.splice(operand1 - 1, 3, answer);
    
  } else {

    let formula = array.slice(operand2 - 1, operand2 + 2);

    if (symbol == "divide") {
    answer = (parseFloat(formula[0])) * (parseFloat(formula[2]));
    answer = answer.toString();

    } else if (symbol == 'minus'){
      answer = (parseFloat(formula[0]) + parseFloat(formula[2]))
      answer = answer.toString();
    }
    
    array.splice(operand2 - 1, 3, answer);
  }
};


function preventSymbols() {
  if (
    buffer.substring(buffer.length - 2, buffer.length - 1) == "+" ||
    buffer.substring(buffer.length - 2, buffer.length - 1) == "-" ||
    buffer.substring(buffer.length - 2, buffer.length - 1) == "/" ||
    buffer.substring(buffer.length - 2, buffer.length - 1) == "*" ||
    buffer.substring(buffer.length - 1, buffer.length) == "√" ||
    buffer === "Self Destruct Initiated"
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

  if (buffer === 'Infinity') {
    buffer = "Self Destruct Initiated"
  }

  // if (buffer.length >)
  // handleCommas();

    
    solution.innerText = buffer;
    equation.innerText = memory;

    console.log("buffer", buffer);
    console.log('bufferArray', bufferArray);
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

function conditionBackspace() {
  backspaceBuffer();
  backspaceArray();
  backspaceSavedNumber();
};

function backspaceBuffer() {
  if (buffer.length == 1) {
    buffer = '0';
    return;
  };

  if (preventSymbols() && 
    buffer.substring(buffer.length - 1, buffer.length) != '√') {

    buffer = buffer.substring(0, buffer.length - 3);
    return;  
  };

  if (buffer.substring(buffer.length - 2, buffer.length - 1) == "!") {

    buffer = buffer.substring(0, buffer.length - 2);
    return;
  }; 
      
    console.log("buffer in preventSymbols", buffer);
    buffer = buffer.substring(0, buffer.length - 1);
};


function backspaceArray() {

  if (bufferArray[0] == undefined  || savedNumber != '') {
    console.log('savedNumber in backspaceArray', savedNumber)
    return;
  }

  console.log('In backspaceArray');
  console.log(parseInt((bufferArray[bufferArray.length - 1])));

  if (parseInt((bufferArray[bufferArray.length - 1])) == NaN) {

    console.log(bufferArray.pop());
  } else {

    savedNumber = bufferArray.pop();
  } 
};


function backspaceSavedNumber() {
  if (savedNumber == '') {
    return
  } else {
    savedNumber = savedNumber.substring(0, savedNumber.length - 1)
  }
};


function pushSavedNumber() {
  if (savedNumber.length > 0 && savedNumber != '') {
    bufferArray.push(savedNumber);
  }
};