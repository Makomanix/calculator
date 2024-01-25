document.addEventListener("keydown", toggleOnOff);

const power = document.querySelector('.power');
power.addEventListener('click', toggleOnOff);

const buttons = document.querySelector('.buttons-grid');
console.log(buttons);

const buttonValues = document.querySelectorAll('button');

buttonValueArray = Array.from(buttonValues).map((button) => {
    return button.value;
});

buttonValueArray.push("Enter");

console.log(buttonValueArray);

let onOff = false;

function toggleOnOff(e) {
  if (e.key === "p" || e.target.innerText === 'Pow') {
    onOff ? onOff = false : onOff = true;
    console.log(onOff)
    if (onOff == true) {
            activate();
        } else {
            deactivate();
        }
    }    
};

function activate() {
  console.log('Power On');
  buttons.addEventListener('click', handleClick);
  document.addEventListener('keydown', handlePress);
};

function deactivate() {
  console.log('Power Off');
  buttons.removeEventListener('click', handleClick);
  document.removeEventListener('keydown', handlePress);
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
    if (!(buttonValueArray.includes(value))) {
        console.log("beat it loser", value)
        return;
    } else {
        handleSymbol(value);
    }
  } else {
    handleNumber(value);
  }
};

function handleSymbol(symbol){
  console.log("we made it", symbol);

  switch (symbol) {
    case "=":
      break;
    case "+":
      break;
    case "-":
      break;
    case "/":
      break;
    case "*":
      break;
    case "^":
      break;
    case "!":
      break;
    case "√":
      break;
  }
};

function handleNumber(number) {
  console.log("in number", number);
}