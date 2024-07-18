const buttons = document.getElementById('buttons');
const buttonSymbols = [
    ['C', '()', '%', '/'],
    [7, 8, 9, '*'],
    [4, 5, 6, '-'],
    [1, 2, 3, '+'],
    [0, '.', 'x', '=']
];
const numbers = [1,2,3,4,5,6,7,8,9,0];
const operators = ['+', '-', '*', '/', '%', '='];
const screen = document.getElementById('screen-text');
let operand_one = '';
let operand_two = '';
let operator = null;

function operate(operand_one, operand_two, operator){
    if (operator == '+'){
        return parseInt(operand_one) + parseInt(operand_two);
    }else if (operator == '-'){
        return parseInt(operand_one) - parseInt(operand_two);
    }else if (operator == '*'){
        return parseInt(operand_one) * parseInt(operand_two);
    } else if (operator == '/'){
        return parseInt(operand_one) - parseInt(operand_two);
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
                    if (operand_two == '') {
                        screen.textContent += text;
                    }else {
                        screen.textContent = text;
                        operand_one = '';
                        operand_two = '';
                        operator = null;
                    }
                }
                if (operator == null){
                    operand_one += text.toString();
                }else {
                    operand_two += text.toString();
                }
            });
        }else if (operators.includes(button.id)){
            button.addEventListener('click', () => {
                if (operand_one == ''){
                    alert('Enter a number before an operator');
                } else if(button.id != '=') {
                    screen.textContent += ' ' + button.id + ' ';
                    if (operator != '' && operand_one != '' && operand_two != ''){
                        screen.textContent = operate(operand_one, operand_two, operator);
                        operand_one = operate(operand_one, operand_two, operator);
                        operand_two = '';
                    }else {
                        operator = button.id;
                    }
                } else {
                    screen.textContent = operate(operand_one, operand_two, operator);
                }
            });
        }
    }
}