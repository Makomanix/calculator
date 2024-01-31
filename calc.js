let buffer = '';
let memory = '';
let bufferArray = [];
let equal = false;
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
  console.log(symbol);
  return (!(buttonValueArray.includes(symbol))) ? false : true
};

console.log(buttonValueArray);

function handleSymbol(symbol){
  
  switch (symbol) {
    case "Backspace":
      if ( buffer.substring(buffer.length -1, buffer.length) === " ") {
        console.log("hi");
        buffer = buffer.substring(0, buffer.length - 3)
      } else {
        buffer = buffer.substring(0, buffer.length - 1)
      }
      bufferArray.pop();
      rerender();
      break;

    case "Delete":
      buffer = '0';
      memory = '';
      bufferArray = [];
      rerender();
      break;
  }

  if (buffer.substring(buffer.length - 1) == ' '
      && symbol == '√') {
        bufferArray.push(symbol);
        buffer += symbol;
      } else if (
        
        bufferArray.length == 0
        && buffer.substring(buffer.length - 2) != '! '){
        return;

      }
  
    switch (symbol) {
      case "Enter":
        if ( buffer == "0" || buffer == "" ) {
          return;
        } else {
          memory = buffer + " ="
          doOperations(bufferArray);
        }
        break;

      case "+":
      case "-":
      case "/":
      case "*":
        bufferArray.push(symbol);
        buffer += ' ' +  symbol +  ' ' ;      
        break;

      case "!":
        bufferArray.push(symbol);
        buffer += symbol + ' ';      
        break;

      case "^":
        bufferArray.push(symbol);
        buffer += symbol;      
        break;
    }
    
  rerender();
};


function handleNumber(number) {
  console.log(buffer);
  console.log(number);
  if (buffer === '0') {
    buffer = number;
  } else {
    buffer += number
  }
  bufferArray.push(number)
  rerender();
};



function doOperations(array) {
  console.log("start", array)
  factorials(array);
  console.log(array);
  exponents(array);
  console.log(array);
  squared(array);
  divideAndMultiply(array);
  console.log(array);
} 

function factorials(array) {
  let factorial = array.indexOf('!');

  while (array.includes('!')) {
    let number = array[factorial - 1];
    console.log(number);
    for (let i = (number - 1); i > 1; i--) {
      number *= i;
      console.log(number)
    }
    array.splice(factorial - 1, 2, number);
    factorial = array.indexOf('!')
  }
  console.log(array);
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

function squared(array) {
  let radical = array.indexOf('√');

  while (array.includes('√')) {
    let number = array[radical + 1]
    let answer = Math.sqrt(number);

    array.splice(radical + 1, 2, answer);

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



function rerender() {
  const solution = document.querySelector('.solution');
  // max length 15
  const equation = document.querySelector('.equation');
  // max length 30

  if (onOff == false) {
    buffer = '';
    memory = '';
  }  
  
  if (buffer === '' && onOff == true) {
      buffer = '0';
  } 
    
    solution.innerText = buffer;
    equation.innerText = memory;
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
