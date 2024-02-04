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
      if (bufferArray[0] == undefined) {
        return;
      }
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
        console.log(bufferArray[0]);
        buffer = bufferArray[0];
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
      if (buffer === 'Self Destruct Started') {
        return;
      }
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
      break;
  }

  rerender();
};


function handleNumber(number) {
  if (buffer === bufferArray[0] || buffer === '0' || buffer === 'Self Destruct Started'){
    buffer = number;
    memory = '';
    bufferArray = [];
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
  addAndSubtract(array);
  console.log(array);
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
  
  return array;
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
  return array;
};

function squareRoot(array) {
  let radical = array.indexOf('√');
  console.log('hello');
  console.log(array);
  
  while (array.includes('√')) {
    let number = array[radical + 1]
    console.log('number', number)
    let answer = Math.sqrt(number);
    console.log('answer', answer)
    answer = answer.toString();

    array.splice(radical, 2, answer);

    radical = array.indexOf('√');
  }
  return array;
};



function divideAndMultiply(array) {
  let division = array.indexOf("/");
  let multiplication = array.indexOf("*");
  // let symbol = "divide";
  while (array.includes("*") || array.includes("/")) {
    // orderOperations(array, division, multiplication, symbol);
    if ((division < multiplication && division >= 0) || multiplication < 0) {
      let formula = array.slice(division - 1, division + 2);
      let answer = formula[0] / formula[2];
      answer = answer.toString();
      
      array.splice(division - 1, 3, answer);
      
    } else {
      let formula = array.slice(multiplication - 1, multiplication + 2);
      // let answer = formula[0] * formula[2];
      let answer = (parseFloat(formula[0]) * parseFloat(formula[2]));

      answer = answer.toString();
      
      array.splice(multiplication - 1, 3, answer);
    }
    division = array.indexOf("/");
    multiplication = array.indexOf("*");
  }
  return array;
};


function addAndSubtract(array) {
  let plus = array.indexOf("+");
  let minus = array.indexOf("-");
  // let symbol = "minus";

  console.log('hi in add');

  while (array.includes("+") || array.includes("-")) {
    console.log('hi in while');
    // orderOperations(array, minus, plus, symbol);
    if ((plus < minus && plus >= 0) || minus < 0) {
      let formula = array.slice(plus - 1, plus + 2);
      let answer = (parseFloat(formula[0]) + parseFloat(formula[2]));
      answer = answer.toString();

      array.splice(plus - 1, 3, answer);
    } else {
      let formula = array.slice(minus - 1, minus + 2);
      let answer = formula[0] - formula[2];
      answer = answer.toString();

      array.splice(minus - 1, 3, answer);
    }
    plus = array.indexOf("+");
    minus = array.indexOf("-");
  }
  return array;
};


function conditionBackspace() {
  
  if (buffer === 'Self Destruct Started') {
    buffer = '0';
    memory = 'Bomb Deactivated';
  }

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

function orderOperations(array, operand1, operand2, symbol) {
  let answer;
  console.log('hi in operations');
  if ((operand1 < operand2 && operand1 >= 0) || operand2 < 0) {
    let formula = array.slice(operand1 - 1, operand1 + 2);
      if (symbol == "divide") {
        console.log("division");
    answer = formula[0] / formula[2];
    answer = answer.toString();
      } else {
        console.log("minus");
        answer = formula[0] - formula[2];
        answer = answer.toString();
      }
    
    array.splice(operand1 - 1, 3, answer);
    
  } else {
    console.log('hi before adding');
    let formula = array.slice(operand2 - 1, operand2 + 2);
    console.log(formula);
    if (symbol == "divide") {
      console.log('multiplication');
    answer = (parseFloat(formula[0])) * (parseFloat(formula[2]));
    answer = answer.toString();
    } else if (symbol == 'minus'){
      console.log('plus');
      answer = (parseFloat(formula[0]) + parseFloat(formula[2]))
      answer = answer.toString();
    }
    
    array.splice(operand2 - 1, 3, answer);
  }
  operation1 = array.indexOf("/");
  operation2 = array.indexOf("*");
};


function preventSymbols() {
  if (
    buffer.substring(buffer.length - 2, buffer.length - 1) == "+" ||
    buffer.substring(buffer.length - 2, buffer.length - 1) == "-" ||
    buffer.substring(buffer.length - 2, buffer.length - 1) == "/" ||
    buffer.substring(buffer.length - 2, buffer.length - 1) == "*" ||
    buffer.substring(buffer.length - 1, buffer.length) == "√" ||
    buffer === "Self Destruct Started"
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
    buffer = "Self Destruct Started"
  }
    
    solution.innerText = buffer;
    equation.innerText = memory;

    console.log(buffer);
    console.log(bufferArray);
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