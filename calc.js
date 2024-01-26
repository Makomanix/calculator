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
  (!(buttonValueArray.includes(symbol))) ? false : true
};

function handleSymbol(symbol){
  
  switch (symbol) {
    case "=":
      break;
      
    case "Backspace":
      break;
        
    case "Delete":
      break;
          
    case "+":
    case "-":
    case "/":
    case "*":
    case "^":
    case "!":
    case "√":
      break;
  }
};


function handleNumber(number) {
  console.log(buffer)
  if (buffer === '0') {
    buffer = number;
  } else {
    buffer += number
  }
  rerender();
};


function rerender() {
  const solution = document.querySelector('.solution');
  // max length 15
  const equation = documnet.querySelector('.equation');
  // max length 30

  if (onOff == false) {
    buffer = '';
    memory = '';
  }  
  
  if (buffer === '' && onOff == true) {
      buffer = '0';
  } 
    
    solution.innerText = buffer;
  
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
