// default calculator values
displayValue = 0;
first = null; 
second = null;
currentOperation = ''
overwrite = 'off'

//calculator DOM manipulations
const display = document.getElementById('display')
const gridNum = Array.from(document.querySelectorAll('.grid-number'));
const gridOperators = Array.from(document.querySelectorAll('.grid-operator'))
const clearButton = document.querySelector('#grid-clear')
const enterButton = document.querySelector('#grid-enter')

//operations functions
function add(first, second) {
    solution =  parseFloat(first) + parseFloat(second);
    return solution;
}

function subtract(first, second) {
    solution =  parseFloat(first) - parseFloat(second);
    return solution;
}

function multiply(first, second) {
    solution =  parseFloat(first) * parseFloat(second);
    return solution;
}

function divide(first, second) {
    solution =  parseFloat(first) / parseFloat(second);
    return solution;
}

function operate(operatorString, first, second) {
    switch(operatorString) {
        case '+':
            operation = 'add';
            break 
        case '-':
            operation = 'subtract';
            break
        case '*':
            operation = 'multiply';
            break    
        case '/':
            operation = 'divide';
            break    
    }
    if (operation == 'divide' && second == 0) {
        alert("Nice try, you can't divide by 0!")
        return
    }
    if (operation != '') {
    return window[operation](first,second);
    }
    else {
        return
    }
}

// display a number as you click through
function returnNumClick() {
    //subsequent operators
    if (overwrite == 'on' && first != null) {
        overwrite = 'off';
        display.textContent = this.textContent;
        second = display.textContent
        return
    }
    //first operator
    else if (overwrite == 'on') {
        overwrite = 'off';
        display.textContent = this.textContent;
        return
    }
    //first entry
    else if (first == null) {
        if (this.textContent == '.' && display.textContent[display.textContent.length-1] == '.') {
            return    
        }
        else if (display.textContent == '0') {
            display.textContent = this.textContent
        }
        else {
            display.textContent += this.textContent;   
        }
    }
    //all subsequent operators that are not the first digit with overwrite
    else {
        if (this.textContent == '.' && display.textContent[display.textContent.length-1] == '.') {
            return    
        }
        else {
            display.textContent += this.textContent;    
            second = display.textContent;
        }
    }
}

gridNum.forEach(num => num.addEventListener('click', returnNumClick))

function operateCalculator() {
    if (second == null && currentOperation == '') {
        overwrite = 'on';
        currentOperation = this.textContent;
        first = display.textContent;
    }
    else {
        overwrite = 'on';
        second = display.textContent;
        display.textContent = Math.round(operate(currentOperation, first, second) * 1000000)/ 1000000 //round to digits
        currentOperation = this.textContent; 
        first = display.textContent;
    }
}

gridOperators.forEach(operator => operator.addEventListener('click', operateCalculator))

function clearCalculator() {
    display.textContent = 0;
    first = null;
    second = null;
    currentOperation = ''
    overwrite = 'off'
}

clearButton.addEventListener('click', clearCalculator)

function enterOperation() {
    if (currentOperation == '' || second == null || first == null)
        return;
    else {
        overwrite = 'on';
        second = display.textContent;
        display.textContent = Math.round(operate(currentOperation, first, second) * 1000000)/ 1000000 //round to digits
        currentOperation = this.textContent; 
        first = display.textContent;
        second = null   
        currentOperation = '';
    }
}

enterButton.addEventListener('click', enterOperation)