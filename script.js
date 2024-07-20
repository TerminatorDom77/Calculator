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
let lastButtonPressed = null;

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
        button.style.cssText = `flex-basis: ${94}px; font-size: ${14}pt; background-color: #fffdde;
        border-radius: 25px; border-color: none; border-style: outset; margin: 3px;`
        buttons.appendChild(button);
     
        if (numbers.includes(parseInt(button.id))){
            button.onmousedown = () => button.style.backgroundColor = '#fcfcf2';
            button.onmouseup = () => button.style.backgroundColor = '#fffdde';
            let text = parseInt(button.id);
            button.addEventListener('click', () => {
                lastButtonPressed=  'number';

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
            button.onmousedown = () => button.style.backgroundColor = '#ffdb6e';
            button.onmouseup = () => button.style.backgroundColor = 'orange';
            button.style.backgroundColor = 'orange';
            button.addEventListener('click', () => {
                lastButtonPressed = 'operator';

                if (operandOne == ''){
                    alert('Enter a number before an operator');
                } else if(button.id != '=') {
                    screen.textContent += ' ' + button.id + ' ';
                    if (operator != '' && operandOne != '' && operandTwo != ''){
                        if (parenthesisNum == 0){
                            screen.textContent = operate(operandOne, operandTwo, operator);
                            operandOne = screen.textContent;
                            operationMade = true;
                            operandTwo = '';
                            operator = button.id;
                        }else {
                            
                        }
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
                button.onmousedown = () => button.style.backgroundColor = '#ffdb6e';
                button.onmouseup = () => button.style.backgroundColor = 'orange';
                if (button.id == 'C'){
                    screen.textContent = '';
                    operandOne = '';
                    operandTwo = '';
                    operator = null;
                    lastButtonPressed = 'C';
                }else if (button.id == '()'){
                    lastButtonPressed = '()'
                    if (parenthesisNum < 4){
                        if (parenthesisNum % 2 == 0){
                            screen.textContent += '(';
                        }else {
                            screen.textContent += ')';
                        }
                        parenthesisNum += 1;
                    }else {
                        alert("You can only have two sets of parenthesis.")
                    }
                }else if (button.id == '%'){
                    if (operator == null){
                        operandOne = parseInt(operandOne) / 100;
                        operandOne = operandOne.toString();
                        screen.textContent = operandOne;
                        lastButtonPressed = '%';
                    }
                }else if (button.id == 'x'){
                    screen.textContent = screen.textContent.slice(0, -1);
                    if (lastButtonPressed == '()'){
                        parenthesisNum -= 1;
                    }
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