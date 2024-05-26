const calculator = document.getElementById('calculator');
const displayCurrent = document.getElementById('current-operand');
const displayPrevious = document.getElementById('previous-operand');
const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');
const decimalButton = document.getElementById('decimal');

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.innerText);
        updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperation(button.innerText);
        updateDisplay();
    });
});

clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNumber);
equalsButton.addEventListener('click', compute);
decimalButton.addEventListener('click', appendDecimal);

function clear() {
    currentOperand = '';
    previousOperand = '';
    operation = null;
    updateDisplay();
}

function deleteNumber() {
    currentOperand = currentOperand.toString().slice(0, -1);
    updateDisplay();
}

function appendDecimal() {
    if (currentOperand.includes('.')) return;
    if (currentOperand === '') currentOperand = '0';
    currentOperand += '.';
    updateDisplay();
}

let currentOperand = '';
let previousOperand = '';
let operation = null;

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand = currentOperand.toString() + number.toString();
}

function chooseOperation(selectedOperation) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = selectedOperation;
    previousOperand = currentOperand;
    currentOperand = '';
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch(operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case 'x':
            computation = prev * current;
            break;
        case '%':
            computation = prev / current;
            break;
        case '√':
            computation = Math.sqrt(current);
            break;
        case '^':
            computation = Math.pow(prev, current);
            break;
        default:
            return;
    }

    currentOperand = computation;
    operation = undefined;
    previousOperand = '';
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('current-operand').innerText = currentOperand;
    document.getElementById('previous-operand').innerText = previousOperand + ' ' + (operation || '');
}

document.addEventListener('keydown', (event) => {
    if (event.key >= 0 && event.key <= 9) appendNumber(event.key);
    if (event.key === '.') appendDot();
    if (event.key === 'Enter' || event.key === '=') compute();
    if (event.key === 'Backspace') deleteNumber();
    if (event.key === 'Escape') clear();
    // Map other keys to operations
    updateDisplay();
  });

  let memoryValue = 0;

  function memoryAdd() {
    memoryValue += parseFloat(currentOperand);
  }
  
  function memorySubtract() {
    memoryValue -= parseFloat(currentOperand);
  }
  
  function memoryRecall() {
    currentOperand = memoryValue.toString();
    updateDisplay();
  }
  
  function memoryClear() {
    memoryValue = 0;
  }