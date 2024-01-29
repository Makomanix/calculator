let buffer = '';
let memory = '';
let bufferArray = [];
let lastOperator = '';
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
      console.log('in handleButton')
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

  if (buffer.substring(buffer.length - 1) == ' ' && buffer.substring(buffer.length - 2) != '! ') {
    return;
  }
  
  switch (symbol) {
    case "Enter":
      if ( buffer == "0" || buffer == "" ) {
        return;
      } else {
        memory = buffer + " ="
        firstOperations(bufferArray);
      }
      // rerender();
      break;
          
    case "+":
    case "-":
    case "/":
    case "*":
      bufferArray.push(symbol);
      buffer += ' ' +  symbol +  ' ' ;
      // rerender()
      break;
    case "!":
      bufferArray.push(symbol);
      buffer += symbol + ' ';
      // rerender();
      break;
    case "^":
      bufferArray.push(symbol);
      buffer += symbol;
      // rerender();
      break;
    case "√":
      bufferArray.push(symbol);
      console.log("in handleSymbol")
      // rerender();
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


// find index of * and /
// get -1 through +1 index of * /
// operate and replace -1 through +1 index
function firstOperations(array) {
  console.log("start", array)
  let division = array.indexOf('/');
  let multiplication = array.indexOf('*');
  console.log("before while", division, multiplication);
  while (array.includes('*') || array.includes('/')) {
    if(division < multiplication && division >= 0 || multiplication < 0) {
      let formula = array.slice(division-1, division+2);
      let answer = formula[0] / formula[2];
      console.log(formula);
      array.splice(division-1, 3, answer);
      console.log("splice", array)
    } else {
      let formula = array.slice(multiplication-1, multiplication+2);
      let answer = formula[0] * formula[2];
      console.log(formula);
      array.splice(multiplication-1, 3, answer);
      console.log("splice", array)
    }
    division = array.indexOf('/');
    multiplication = array.indexOf('*');
    console.log("in while", division, multiplication);
    
  }
} 

function checkFactorial(array) {
  
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
