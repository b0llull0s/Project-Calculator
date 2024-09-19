// script.js

// Step 1: Set up variables to store the values
let displayValue = '0';  // What's shown on the display
let firstNumber = null;  // First number entered
let secondNumber = null; // Second number entered
let operator = null;     // Operator selected (+, -, *, /)
let waitingForSecondNumber = false; // To handle chaining operations

// Select the display element
const display = document.getElementById('display');

// Function to update the display
function updateDisplay() {
    display.textContent = displayValue;
}

// Step 2: Function to handle the calculation
function operate(operator, num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num2 !== 0 ? num1 / num2 : 'Error'; // Handle division by zero
        default:
            return num2;
    }
}

// Step 3: Handle number button clicks
const numberButtons = document.querySelectorAll('[data-number]');
numberButtons.forEach(button => {
    button.addEventListener('click', function() {
        const number = button.getAttribute('data-number');
        
        // If waiting for the second number, clear the display
        if (waitingForSecondNumber) {
            displayValue = number;
            waitingForSecondNumber = false;
        } else {
            // Prevent multiple leading zeroes
            displayValue = displayValue === '0' ? number : displayValue + number;
        }
        
        updateDisplay();
    });
});

// Step 4: Handle operator button clicks
const operatorButtons = document.querySelectorAll('.button:not([data-number]):not(#equals):not(#clear)');
operatorButtons.forEach(button => {
    button.addEventListener('click', function() {
        const clickedOperator = button.textContent;
        
        // If we already have a first number and operator, perform the calculation
        if (firstNumber === null) {
            firstNumber = displayValue;
        } else if (operator && !waitingForSecondNumber) {
            secondNumber = displayValue;
            displayValue = operate(operator, firstNumber, secondNumber).toString();
            updateDisplay();
            firstNumber = displayValue;
        }
        
        operator = clickedOperator;
        waitingForSecondNumber = true; // Ready for the next number
    });
});

// Step 5: Handle equals button click
const equalsButton = document.getElementById('equals');
equalsButton.addEventListener('click', function() {
    if (firstNumber !== null && operator !== null) {
        secondNumber = displayValue;
        displayValue = operate(operator, firstNumber, secondNumber).toString();
        updateDisplay();
        firstNumber = displayValue; // Store result as the first number for further operations
        operator = null; // Reset operator after calculation
        waitingForSecondNumber = true; // Ready for new operation
    }
});

// Step 6: Handle clear button click
const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', function() {
    displayValue = '0';
    firstNumber = null;
    secondNumber = null;
    operator = null;
    waitingForSecondNumber = false;
    updateDisplay();
});

// Initialize the display with 0
updateDisplay();
