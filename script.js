// script.js

let displayValue = '0';  // What's shown on the display
let firstNumber = null;  // First number entered
let secondNumber = null; // Second number entered
let operator = null;     // Operator selected (+, -, *, /)
let waitingForSecondNumber = false; // To handle chaining operations

const display = document.getElementById('display');

// Function to update the display
function updateDisplay() {
    display.textContent = displayValue;
}

// Rounding long decimal answers
function roundResult(result) {
    return Math.round((result + Number.EPSILON) * 100000) / 100000; // Round to 5 decimal places
}

// Operate function to handle basic operations
function operate(operator, num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    
    if (operator === '/' && num2 === 0) {
        return 'Error: Div by 0';
    }
    
    switch (operator) {
        case '+':
            return roundResult(num1 + num2);
        case '-':
            return roundResult(num1 - num2);
        case '*':
            return roundResult(num1 * num2);
        case '/':
            return roundResult(num1 / num2);
        default:
            return num2;
    }
}

// Handle number button clicks
const numberButtons = document.querySelectorAll('[data-number]');
numberButtons.forEach(button => {
    button.addEventListener('click', function() {
        const number = button.getAttribute('data-number');
        
        if (waitingForSecondNumber) {
            displayValue = number;
            waitingForSecondNumber = false;
        } else {
            displayValue = displayValue === '0' ? number : displayValue + number;
        }
        
        updateDisplay();
    });
});

// Handle operator button clicks
const operatorButtons = document.querySelectorAll('.button:not([data-number]):not(#equals):not(#clear):not(#backspace):not(#decimal)');
operatorButtons.forEach(button => {
    button.addEventListener('click', function() {
        const clickedOperator = button.textContent;
        
        if (firstNumber === null) {
            firstNumber = displayValue;
        } else if (operator && !waitingForSecondNumber) {
            secondNumber = displayValue;
            const result = operate(operator, firstNumber, secondNumber);
            
            if (result === 'Error: Div by 0') {
                displayValue = result;
                operator = null;
                firstNumber = null;
                secondNumber = null;
                waitingForSecondNumber = false;
            } else {
                displayValue = result.toString();
                firstNumber = displayValue; // Store result as first number
            }
            
            updateDisplay();
        }
        
        operator = clickedOperator;
        waitingForSecondNumber = true; 
    });
});

// Handle equals button click
const equalsButton = document.getElementById('equals');
equalsButton.addEventListener('click', function() {
    if (firstNumber !== null && operator !== null) {
        secondNumber = displayValue;
        const result = operate(operator, firstNumber, secondNumber);
        
        if (result === 'Error: Div by 0') {
            displayValue = result;
        } else {
            displayValue = result.toString();
            firstNumber = displayValue;
        }
        
        operator = null;
        waitingForSecondNumber = true;
        updateDisplay();
    }
});

// Handle clear button click
const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', function() {
    displayValue = '0';
    firstNumber = null;
    secondNumber = null;
    operator = null;
    waitingForSecondNumber = false;
    updateDisplay();
});

// Handle decimal button click
const decimalButton = document.getElementById('decimal');
decimalButton.addEventListener('click', function() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
        updateDisplay();
    }
});

// Handle backspace button click
const backspaceButton = document.getElementById('backspace');
backspaceButton.addEventListener('click', function() {
    if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
    } else {
        displayValue = '0'; // Reset to 0 if all digits are deleted
    }
    updateDisplay();
});

// Handle keyboard input
window.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (/\d/.test(key)) { // If key is a digit
        document.querySelector(`[data-number="${key}"]`).click();
    } else if (key === '.') {
        decimalButton.click();
    } else if (key === 'Backspace') {
        backspaceButton.click();
    } else if (key === 'Enter' || key === '=') {
        equalsButton.click();
    } else if (['+', '-', '*', '/'].includes(key)) {
        const operatorButton = Array.from(operatorButtons).find(btn => btn.textContent === key);
        if (operatorButton) operatorButton.click();
    } else if (key === 'Escape') {
        clearButton.click();
    }
});

// Initialize the display with 0
updateDisplay();
