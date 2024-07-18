const buttons = document.getElementById('buttons');
const buttonSymbols = [
    ['C', '()', '%', '/'],
    [7, 8, 9, '*'],
    [4, 5, 6, '-'],
    [1, 2, 3, '+'],
    [0, '.', 'x', '=']
];
const screen = document.getElementById('screen-text');

for (let row = 0; row < 5; row++){
    for (let pos = 0; pos < 4; pos++){
        let button = document.createElement('button');
        button.id = buttonSymbols[row][pos];
        button.textContent = button.id;
        button.style.flexBasis = `${25}%`;
        button.style.fontSize = `${14}pt`
        buttons.appendChild(button);
        
        if (Number.isInteger(button.id)){
            button.addEventListener('click', () => {
                if (screen.textContent == ''){
                    screen.textContent = button.id;
                }else {
                    screen.textContent += button.id;
                }
            })
        }
    }
}