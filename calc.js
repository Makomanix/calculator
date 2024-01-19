document.addEventListener("keydown", toggleOnOff);

const power = document.querySelector('.power');
power.addEventListener('click', toggleOnOff);

const buttons = document.querySelector('.buttons-grid');

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
  handleButton(e.target.innerText);
}

function handlePress(e) {
  handleButton(e.key);
}

function handleButton(value) {
  if ( isNaN(parseInt(value)) ) {
    console.log('symbol');
    console.log(value);
  } else {
    console.log('number')
    console.log(value);
  }
}
