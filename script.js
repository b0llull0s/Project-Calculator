// script.js

// Step 1: Set up the variable to store the display value
let displayValue = '0';

// Step 2: Select the display element
const display = document.getElementById('display');

// Step 3: Function to update the display
function updateDisplay() {
    display.textContent = displayValue;
}

// Step 4: Select all number buttons
const numberButtons = document.querySelectorAll('[data-number]');

// Step 5: Add click event listeners to number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', function() {
        const number = button.getAttribute('data-number');
        
        // Prevent multiple leading zeroes
        if (displayValue === '0') {
            displayValue = number;
        } else {
            displayValue += number;
        }
        
        // Update the display after clicking a number
        updateDisplay();
    });
});

// Step 6: Add event listener for the "Clear" button
const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', function() {
    displayValue = '0'; // Reset the display value to 0
    updateDisplay();
});

// Initialize the display with 0
updateDisplay();
