document.addEventListener("keydown", toggleOnOff);

const power = document.querySelector('.power');
power.addEventListener('click', toggleOnOff);

const buttons = document.querySelector('.buttons-grid');
console.log(buttons);

const buttonValues = document.querySelectorAll('button');
buttonValueArray = Array.from(buttonValues).map((button) => {
    return button.value;
})

console.log(buttonValueArray);







// buttonArray = Array.from(buttons)
// console.log(buttonArray)

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
  console.log('activated');
  buttons.addEventListener('click', handleClick);
  document.addEventListener('keydown', handlePress);
};

function deactivate() {
  console.log('deactivated');
  buttons.removeEventListener('click', handleClick);
  document.removeEventListener('keydown', handlePress);
};

function handleClick(e){
  handleButton(e.target.value);
}

function handlePress(e) {
  handleButton(e.key);
}

function handleButton(value) {
  if ( isNaN(parseInt(value)) ) {
    console.log('symbol');
    console.log(value);
    if (!(buttonValueArray.includes(value))) {
        console.log(value)
        return;
    } else {
        handleSymbol(value);
    }
  } else {
    console.log('number')
    console.log(value);
  }
}

// function handleSymbol(symbol){
//     switch(symbol) {
//         case
//     }
// }