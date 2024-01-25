const equation = document.querySelector('.equation');
// max length 30

const solution = document.querySelector('.solution');
// max length 15 then use powers

let onOff = false;

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
    solution.innerText = '0'

  } else if (bool == false) {

    buttons.removeEventListener("click", handleClick);
    document.removeEventListener("keydown", handlePress);
    solution.innerText = "";
    equation.innerText = "";
  }
};

function handleClick(e){
  handleButton(e.target.value);
  e.target.blur();
};

function handlePress(e) {
  handleButton(e.key);
};

function handleButton(value) {
  if ( isNaN(parseInt(value)) && value != '.') {
    if (getButtonValueArray(value)) {
      handleSymbol(value);
    } else {
      return;
    }
  } else {
    handleNumber(value);
  }
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
      
  }
};


function handleNumber(number) {
  solution.innerText = number;
};


function getButtonValueArray(value) {

  const buttonValues = document.querySelectorAll('button');

  buttonValueArray = Array.from(buttonValues).map((button) => {
      return button.value;
  });
  
  buttonValueArray.push("Enter");

  if ( !(buttonValueArray.includes(value)) ) {
    return false;
  } else {
    return true;
  }
};

function init() {
  document.addEventListener("keydown", toggleOnOff);

  const power = document.querySelector(".power");
  power.addEventListener("click", toggleOnOff);
};

init();