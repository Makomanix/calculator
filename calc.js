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
  
  if (savedNumber.length > 0 && savedNumber != '') {
    bufferArray.push(savedNumber);
    console.log('top of handleSymbol', bufferArray);
  }
  
  switch (symbol) {
    case "Backspace":
      if (bufferArray[0] == undefined && savedNumber == '') {
        return;
      }
      console.log('in Backspace');
      conditionBackspace();
      break;

    case "Delete":
      if (buffer == "Self Destruct Initiated") {
        buffer = "0";
        memory = "Bomb Deactivated";
      } else {
      buffer = "0";
      memory = "";
      }
      bufferArray = [];
      savedNumber = ''
      rerender();
      break;

    case "Enter":
      if (buffer == "0" || buffer == "") {
        return;
      } else {
        memory = buffer + " =";
        doOperations(bufferArray);
        buffer = bufferArray[0];
        savedNumber = ''
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
      savedNumber = ''
      break;

    case "!":
      if (buffer == "0" || buffer == "" || preventSymbols()) {
        return;
      }

      bufferArray.push(symbol);
      buffer += symbol + " ";
      savedNumber = ''
      break;

    case "^":
      if (buffer == "0" || buffer == "" || preventSymbols()) {
        return;
      }
      bufferArray.push(symbol);
      buffer += symbol;
      savedNumber = ''
      break;

    case "√":
      if (buffer === 'Self Destruct Initiated') {
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
      savedNumber = ''
      break;
  }

  rerender();
};


function handleNumber(number) {

  if (number === '.' && buffer.includes('.')) {
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


function conditionBackspace() {

  console.log("bufferArray", bufferArray);
  
  if (buffer === 'Self Destruct Initiated') {
    return;
    // buffer = '0';
    // memory = 'Bomb Deactivated';
  }

  let currentNumber;
  
  if (preventSymbols()) {
    console.log("am i in preventSymbols");

    if (buffer.substring(buffer.length - 2, buffer.length - 1) == "!") {

        buffer = buffer.substring(0, buffer.length - 2);
        bufferArray.pop();

    } else {

      buffer = buffer.substring(0, buffer.length - 3);
      bufferArray.pop();

    }

    console.log('buffer', buffer);
    console.log('bufferArray', bufferArray);

    return;

  } 

    console.log('buffer before mod', buffer);
    console.log('bufferArray before mod', bufferArray);
    console.log("bufferArray length", bufferArray.length);
    console.log('currentNumber before mod', currentNumber);
    
    if (bufferArray.length == 1) {
      currentNumber = bufferArray[0];
      console.log('what!',)
    } else {
      currentNumber = bufferArray.pop();
      console.log("bufferArray in else", bufferArray);
      // console.log("");
    }

    currentNumber = currentNumber.substring(0, currentNumber.length - 1);
    buffer = buffer.substring(0, buffer.length - 1);

    if (currentNumber == '') {
      console.log(currentNumber);
      return;
    } else if (bufferArray.length > 1){
    bufferArray.push(currentNumber);
    } else {
      savedNumber = currentNumber;
      bufferArray = [];
    };

        console.log("buffer after mod", buffer);
        console.log("bufferArray after mod", bufferArray);

    // if (bufferArray[0] == undefined) {
      
    //   buffer = savedNumber.substring(0, savedNumber.length - 1);
    //   savedNumber = savedNumber.substring(0, savedNumber.length - 1);
    // } else if (bufferArray.length >= 1) {
    //   currentNumber = bufferArray.pop();
    //   if (currentNumber.length >= 1 ) {
  
    //     currentNumber = currentNumber.substring(0, currentNumber.length - 1);
    //     bufferArray.push(currentNumber);
    //     buffer = buffer.substring(0, buffer.length - 1);
  
    //   } else {
    //     buffer = buffer.substring(0, buffer.length - 1);
    //   }
    // }

  // }

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




// function conditionBackspace() {
//   // if (bufferArray.length = 1) {
//   //   bufferArray = [];
//   //   console.log('empty');
//   // }

//   console.log("");
  
//   if (buffer === 'Self Destruct Initiated') {
//     buffer = '0';
//     memory = 'Bomb Deactivated';
//   }

//   let currentNumber;
  
//   if (preventSymbols()) {
//     console.log("am i in preventSymbols");

//     buffer = buffer.substring(0, buffer.length - 3);

//     currentNumber = bufferArray.pop();

//   } else if (buffer.substring(buffer.length - 2, buffer.length - 1) == "!") {

//     buffer = buffer.substring(0, buffer.length - 2);

//     currentNumber = bufferArray.pop();
    
//   } else {



//     console.log('buffer before mod', buffer);
//     console.log('bufferArray before mod', bufferArray);
//     console.log("bufferArray length", bufferArray.length);
//     console.log('currentNumber before mod', currentNumber);
    
//     if (bufferArray.length == 1) {
//       currentNumber = bufferArray[0];
//       console.log('what!',)
//     } else {
//       currentNumber = bufferArray.pop();
//       console.log("bufferArray in else", bufferArray);
//       // console.log("");
//     }

//     currentNumber = currentNumber.substring(0, currentNumber.length - 1);
//     buffer = buffer.substring(0, buffer.length - 1);

//     if (currentNumber == '') {
//       console.log(currentNumber);
//       return;
//     } else {
//     bufferArray.push(currentNumber);
//     }

//         console.log("buffer after mod", buffer);
//         console.log("bufferArray after mod", bufferArray);

//   }

// };

function replaceInPlace(string) {
  if (string.length > 1) {

  }
}