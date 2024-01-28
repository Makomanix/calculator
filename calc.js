let buffer = '';
let memory = '';
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

  if (symbol == buffer.substring( buffer.length - 2, buffer.length - 1)) {
    return;
  }
  
  switch (symbol) {
    case "Enter":
      console.log('hi equal');
      if ( buffer == "0" || buffer == "" ) {
        return;
      } else {
        memory = buffer
      }
      rerender();
      break;
      
    case "Backspace":
      if ( buffer.substring(buffer.length -1, buffer.length) === " ") {
        console.log("hi");
        buffer = buffer.substring(0, buffer.length - 3)
      } else {
      buffer = buffer.substring(0, buffer.length - 1)
      }
      rerender();
      break;
        
    case "Delete":
      buffer = '0';
      memory = '';
      rerender();
      break;
          
    case "+":
    case "-":
    case "/":
    case "*":
    case "^":
    case "!":
    case "√":
      lastOperator = symbol;
      console.log("in handleSymbol")
      buffer += ' ' +  symbol +  ' ' ;
      rerender();
      break;
  }
};


function handleNumber(number) {
  console.log(buffer);
  console.log(number);
  if (buffer === '0') {
    buffer = number;
  } else {
    buffer += number
  }
  rerender();
};

// function 


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
