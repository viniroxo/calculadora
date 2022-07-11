const display = document.querySelector('#display');
const keys = document.querySelectorAll('[id*=key]');
const operators = document.querySelectorAll('[id*=Operator]');

let newNumber = true;
let operator;
let previousNumber;

function updateDisplay(number) {
    if (newNumber) {
        display.textContent = number;
        newNumber = false;
    } else display.textContent += number;
}

const insertNumber = ({target}) =>
    updateDisplay(target.textContent);

keys.forEach(key => key.addEventListener('click', insertNumber));

const selectOperator = (event) => {
    newNumber = true;
    operator = event.target.textContent;
    previousNumber = display.textContent.replace(",", ".");
}

operators.forEach(operator => operator.addEventListener("click", selectOperator));

const calculate = () => {
    if(operator !== undefined){
        const actualNumber = display.textContent.replace(",", ".");
        //calculo utilizando eval
        newNumber = true;
        const result = eval(`${previousNumber}${operator}${actualNumber}`);
        updateDisplay(result.toString().replace(".", ","));
        operator = undefined;
        //fazer a atualização do display com o resultado
    }
}

const equal = document.querySelector("#equal");

equal.addEventListener('click', calculate);

const clearDisplay = () => display.textContent = "";

document.querySelector("#clearDisplay").addEventListener("click", clearDisplay);

const clearCalc = () => {
    clearDisplay();
    newNumber = true;
    operator = undefined;
    previousNumber = undefined;
};

document.querySelector("#clearCalc").addEventListener("click", clearCalc);

const removeLastNumber = () => {
    newNumber = true;
    updateDisplay(display.textContent.slice(0, -1));
}

document.querySelector("#backspace").addEventListener("click", removeLastNumber);

const invertSignal = () => {
    newNumber = true;
    updateDisplay(display.textContent * -1);
}


document.querySelector("#inverter").addEventListener("click", invertSignal);

const hasContent = () => display.textContent.length > 0;
const hasDecimal = () => display.textContent.indexOf(",") !== -1;

const insertDecimal = () => {
    if (!hasDecimal()) {
        if (hasContent()) {
            updateDisplay(",");
        } else {
            updateDisplay("0,");
        }
    }
}

document.querySelector("#decimal").addEventListener("click", insertDecimal);
