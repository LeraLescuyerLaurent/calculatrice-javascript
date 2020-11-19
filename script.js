class Calculator{
    constructor(PreviousOperandTextElement,currentOperandTextElement){
        this.PreviousOperandTextElement = PreviousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear(){
        this.currentOperand = '';
        this.previousOperand = '0';
        this.operation = undefined;
    };

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    };

    appendNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    };

    chooseOperation(operation) {
        console.log(operation);
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand 
        this.currentOperand = ""
    }
    compute() {
        let computation ;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev || isNaN(current))) return
        switch (this.operation) {
            case '+':
                computation = prev + current
            break
            case '-':
                computation = prev - current
            break
            case '÷':
                computation = prev / current
            break
            case '*':
                computation = prev * current
            break
            default:
            return
                break;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = ''
        this.updateDisplay()
    }

    getDisplayNumber(number){
        const stringNumber =  number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigit = stringNumber.split('.')[1]
        let integerDisplay ;
        if (isNaN(integerDigits)) {
            integerDisplay = ""
        }else{
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimalDigit != null) {
            return `${integerDisplay}.${decimalDigit}`
        }else{
            return integerDisplay
        }
    }
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.PreviousOperandTextElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation} ${this.getDisplayNumber(this.currentOperand)}`;
        }else{
            this.PreviousOperandTextElement.innerText = ''
        }

    }
}



const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const clearAllButton = document.querySelector('[data-all-clear]');
const equalButton = document.querySelector('[data-equal]');
const PreviousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(PreviousOperandTextElement,currentOperandTextElement);


numberButtons.forEach(button => {
    button.addEventListener('click',() =>{

        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    } )
})
operationButtons.forEach(button => {
    button.addEventListener('click',() =>{
        calculator.chooseOperation(button.innerText)
        
        calculator.updateDisplay()
    } )
})
equalButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})
clearAllButton.addEventListener('click', button =>{
    calculator.clear();
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', button =>{
    calculator.delete();
    calculator.updateDisplay()
})