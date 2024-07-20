const buttons = document.getElementById('buttons');
const buttonSymbols = [
    ['C', '()', '%', '/'],
    [7, 8, 9, '*'],
    [4, 5, 6, '-'],
    [1, 2, 3, '+'],
    [0, '.', 'x', '=']
];
const numbers = [1,2,3,4,5,6,7,8,9,0];
const operators = ['+', '-', '*', '/', '='];
const screen = document.getElementById('screen-text');
const misc = ['C', '()', '%', 'x', '.'];
let operandOne = '';
let operandTwo = '';
let operator = null;
let operationMade = false;
let parenthesisNum = 0;

function operate(operandOne, operandTwo, operator){
    operandOne.includes('.') ? operandOne = parseFloat(operandOne) : operandOne = parseInt(operandOne);
    operandTwo.includes('.') ? operandTwo = parseFloat(operandTwo) : operandTwo = parseInt(operandTwo);
    if (operator == '+'){
        return operandOne + operandTwo;
    }else if (operator == '-'){
        return operandOne - operandTwo;
    }else if (operator == '*'){
        return operandOne * operandTwo;
    } else if (operator == '/'){
        return operandOne / operandTwo;
    }
}

for (let row = 0; row < 5; row++){
    for (let pos = 0; pos < 4; pos++){
        let button = document.createElement('button');
        button.id = buttonSymbols[row][pos];
        button.textContent = button.id;
        button.style.flexBasis = `${25}%`;
        button.style.fontSize = `${14}pt`
        buttons.appendChild(button);
     
        if (numbers.includes(parseInt(button.id))){
            let text = parseInt(button.id);
            button.addEventListener('click', () => {
                if (screen.textContent == ''){
                    screen.textContent = text;
                }else {
                    if (operandTwo != '' && operationMade == true){
                        screen.textContent = text;
                        operandOne = '';
                        operandTwo = '';
                        operator = null;
                        operationMade = false;
                    }else if (operationMade == false) {
                        screen.textContent += text;
                    }else {
                        screen.textContent = text;
                    }
                }
                if (operator == null){
                    operandOne += text.toString();
                }else {
                    operandTwo += text.toString();
                }
            });
        }else if (operators.includes(button.id)){
            button.addEventListener('click', () => {
                if (operandOne == ''){
                    alert('Enter a number before an operator');
                } else if(button.id != '=') {
                    screen.textContent += ' ' + button.id + ' ';
                    if (operator != '' && operandOne != '' && operandTwo != ''){
                        screen.textContent = operate(operandOne, operandTwo, operator);
                        operandOne = screen.textContent;
                        operationMade = true;
                        operandTwo = '';
                        operator = button.id;
                    }else {
                        operator = button.id;
                    }
                } else {
                    screen.textContent = operate(operandOne, operandTwo, operator);
                    operationMade = true;
                }
            });
        }else {
            button.addEventListener('click', () => {
                if (button.id == 'C'){
                    screen.textContent = '';
                    operandOne = '';
                    operandTwo = '';
                    operator = null;
                }else if (button.id == '()'){
                    if (parenthesisNum % 2 == 0){
                        screen.textContent += '(';
                    }else {
                        screen.textContent += ')';
                    }
                    parenthesisNum += 1;
                }else if (button.id == '%'){
                    if (operator == null){
                        operandOne = parseInt(operandOne) / 100;
                        operandOne = operandOne.toString();
                        screen.textContent = operandOne;
                    }
                }else if (button.id == 'x'){
                    screen.textContent = screen.textContent.slice(0, -1);
                } else {
                    screen.textContent += '.';
                    if (operandOne != '' && operandTwo == ''){
                        operandOne += '.';
                    }else if (operandOne != '' && operandTwo != ''){
                        operandTwo += '.';
                    }
                }
            });
        }
    }
}