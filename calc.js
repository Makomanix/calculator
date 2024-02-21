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


function handleSymbol(symbol){
  
  switch (symbol) {

    case "Backspace":

      conditionBackspace(symbol);
      break;

    case "Delete":
      if (buffer == "Self Destruct Initiated") {
        buffer = "0";
        memory = "Bomb Deactivated";
      } else {

      buffer = "0";
      memory = "";
      bufferArray = [];
      savedNumber = '';
      };
      break;

    case "Enter":
      if (
        buffer == "0" ||
        buffer == "" ||
        buffer === "Self Destruct Initiated"
      ) {
        return;

      } else {

        pushSavedNumber();
        memory = buffer + " =";
        doOperations(bufferArray);
        buffer = bufferArray[0];
        savedNumber = "";
        
      }
      break;

    case "+":
    case "-":
    case "/":
    case "*":
      if (
        preventSymbols(symbol)
      ) {
        return;
      }

      pushSavedNumber();
      bufferArray.push(symbol);
      buffer += " " + symbol + " ";
      savedNumber = ''
      break;

    case "!":      
      if (
        preventSymbols(symbol)
      ) {
        return;
      }

      pushSavedNumber();
      bufferArray.push(symbol);
      buffer += symbol + " ";
      savedNumber = ''
      break;

    case "^":
      if (
        preventSymbols(symbol)
      ) {
        return;
      };

      
      if (bufferArray[bufferArray.length - 1] == "!") {

        buffer = buffer.substring(0, buffer.length -1);
        buffer += symbol;
      } else {

        buffer += symbol;
      }
      
      pushSavedNumber();
      bufferArray.push(symbol);
      savedNumber = ''
      break;

    case "√":
    
      if (preventSymbols(symbol)) {
        return;
      }
      
      pushSavedNumber();

      if (buffer == "0" || buffer == "") {
        buffer = symbol;
        bufferArray.push(symbol);
      } else if (buffer.substring(buffer.length - 1) == " " || buffer.substring(buffer.length - 1) == "^") {
        buffer += symbol;
        bufferArray.push(symbol);
      } 

      savedNumber = ''
      break;
  }

  rerender();
};


function handleNumber(number) {

  // console.log("savedNumber before handle#", savedNumber);
  // console.log('bufferArray in handle#', bufferArray);
  
  if (
    (number === '.' && savedNumber.includes('.')) || 
    (number === '.' && bufferArray[bufferArray.length - 1] == "^") ||
    (savedNumber == '' && bufferArray[bufferArray.length - 1] == "!")
    ) {
      return;
    }
    
    if (
      (bufferArray == [] && buffer !== "√") ||
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

  rerender();
};

function handleCommas() {

  let string = buffer;
  let commalessArray = string.split(' ');
  console.log('commalessArray', commalessArray);

  for (let i = 0; i < commalessArray.length; i++) {
    if (commalessArray[i].length > 3) {
      console.log("commaslessArray[i]", commalessArray[i]);
      let items = commalessArray[i].split('');
      let body = items;
      let radical = [];
      let carrot;
      let decimal;
      let tail;
      let cap;

      console.log("body before if's", body);


      if (items.includes('√')) {
        radical[0] = items.shift();
      }

      if (items.includes('.')) {
        decimal = items.indexOf('.');
        body = items.slice(0, decimal);
        tail = items.slice(decimal + 1);
      }

      if (items.includes('^')) {
        carrot = items.indexOf('^');
        cap = items.slice(carrot + 1)
        if (items.includes(".")) {
          decimal = items.indexOf(".");
          body = items.slice(0, decimal);
          tail = items.slice(decimal + 1, carrot);
          cap = addCommas(cap);
        } else {
        body = items.slice(0, carrot);
        cap = addCommas(cap);
        }
      }

      body = addCommas(body);
      // radical ? body = radical.concat(body) : null
      // console.log('body', body);
      
      // tail ? console.log('tail', tail.join('')) : null;
      // cap ? console.log("cap", cap.join("")) : null;

      // body = body.join('')
      


      commalessArray[i] = body;
      console.log(commalessArray[i]);
    }
    commalessArray.join('')
  }

  string = commalessArray.join(" ");
  console.log('string', string);
};

function addCommas(array) {
  console.log(array);
  let count = 0;

  for (let i = array.length - 1; i > 0; i--) {
    count++;
    if (count % 3 === 0) {
      array.splice(i, 0, ",")
    }
  }
  console.log(array);
  return array;
}


function doOperations(array) {
  factorials(array);
  squareRoot(array);
  exponents(array);
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
  let exponent = array.indexOf('^');

  while (array.includes('^')) {
    let base = array[exponent - 1];
    let power = array[exponent + 1];
    let answer = base ** power;
    
    answer = answer.toString();

    array.splice(exponent - 1, 3, answer)
    exponent = array.indexOf('^');
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


function orderOperations(array, operand1, operand2, symbol) {
  let answer;
  
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


function preventSymbols(symbol) {

  if ( buffer === "Self Destruct Initiated" ) {
    return true;
  }
  
  if (symbol == "√") {
    if (
      bufferArray[bufferArray.length - 1] == "^" ||
      bufferArray[bufferArray.length - 1] == "!" ||
      bufferArray[bufferArray.length - 1] == "√"
    ) {
      return true;
    } else {
      console.log(" ", symbol);
      return false;
    }
  }

  if (symbol == "+" || symbol == "-" || symbol == "/" || symbol == "*" || symbol == 'Backspace' ) {
    if (
      buffer == "0" ||
      buffer == "" ||
      (savedNumber == "" && bufferArray[bufferArray.length - 1] == "^") ||
      (savedNumber == "" && bufferArray[bufferArray.length - 1] == "+") ||
      (savedNumber == "" && bufferArray[bufferArray.length - 1] == "/") ||
      (savedNumber == "" && bufferArray[bufferArray.length - 1] == "*") ||
      (savedNumber == "" && bufferArray[bufferArray.length - 1] == "-") ||
      (savedNumber == "" && bufferArray[bufferArray.length - 1] == "√") ||
      (savedNumber != "" && bufferArray[bufferArray.length - 1] == "!")
    ) {
      return true;
    } else {
      return false;
    }
  }
  
  if (symbol == "^") {
    if (
      buffer == "0" ||
      buffer == "" ||
      (savedNumber == "" && bufferArray[bufferArray.length - 1] == "+") ||
      (savedNumber == "" && bufferArray[bufferArray.length - 1] == "-") ||
      (savedNumber == "" && bufferArray[bufferArray.length - 1] == "/") ||
      (savedNumber == "" && bufferArray[bufferArray.length - 1] == "*") ||
      (savedNumber == "" && bufferArray[bufferArray.length - 1] == "√") ||
      bufferArray[bufferArray.length - 1] == "^" ||
      bufferArray[bufferArray.length - 2] == "^" ||
      (savedNumber == "" && bufferArray[bufferArray.length - 3] == "^") 
    ) {
      return true;
    } else {
      return false;
    }
  };
    
    if (symbol == "!") {
      
      if (
        buffer == "0" ||
        buffer == "" ||
        bufferArray[bufferArray.length - 1] == "!" ||
        (savedNumber == "" && bufferArray[bufferArray.length - 1] == "√") ||
        (savedNumber == "" && bufferArray[bufferArray.length - 1] == "^") ||
        (savedNumber == "" && bufferArray[bufferArray.length - 1] == "+") ||
        (savedNumber == "" && bufferArray[bufferArray.length - 1] == "/") ||
        (savedNumber == "" && bufferArray[bufferArray.length - 1] == "*") ||
        (savedNumber == "" && bufferArray[bufferArray.length - 1] == "-")
      ) {
        return true;
      } else {
        return false;
      }
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
  
  let prettybuffer = handleCommas();

  solution.innerText = buffer;
  equation.innerText = memory;
};


function conditionBackspace(symbol) {
  backspaceBuffer(symbol);
  backspaceArray();
  backspaceSavedNumber();
};

function backspaceBuffer(symbol) {
  if (buffer.length == 1) {
    buffer = '0';
    return;
  };

  if (preventSymbols(symbol) &&
    bufferArray[bufferArray.length - 1] != "√" &&
    bufferArray[bufferArray.length - 1] != "!" &&
    bufferArray[bufferArray.length - 1] != "^" ) {
      
      buffer = buffer.substring(0, buffer.length - 3);
      return;  
  };
    
  if (buffer.substring(buffer.length - 2, buffer.length - 1) == "!" &&
    buffer.substring(buffer.length - 1, buffer.length) != '^') {

      buffer = buffer.substring(0, buffer.length - 2);
      return;
  };

  buffer = buffer.substring(0, buffer.length - 1);
};


function backspaceArray() {

  if (bufferArray[0] == undefined  || savedNumber != '') {
    return;
  }

  savedNumber = bufferArray.pop(); 
};


function backspaceSavedNumber() {

  if (savedNumber == '') {
    return
  } else {
    savedNumber = savedNumber.substring(0, savedNumber.length - 1)
  }
};


function pushSavedNumber() {

  console.log(savedNumber);

  if (!(isNaN(parseInt(bufferArray[bufferArray.length - 1])))) {
    let currentNumber = bufferArray.pop();
    savedNumber = currentNumber += savedNumber;
  }
  
  if (savedNumber.length > 0 && savedNumber != '') {
    bufferArray.push(savedNumber);
  }
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