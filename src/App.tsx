import { useState } from 'react'

function App() {

  const [currentOperand, setCurrentOperand] = useState('0')
  const [previousOperand, setPreviousOperand] = useState('')
  const [operation, setOperation] = useState<string | undefined>(undefined)

  const clear = () => {
    setCurrentOperand('0')
    setPreviousOperand('')
    setOperation(undefined)
  }

  const deleteLast = () => {
    if (currentOperand === '0') return
    if (currentOperand.length === 1) {
      setCurrentOperand('0')
    } else {
      setCurrentOperand(currentOperand.slice(0, -1))
    }
  }

  const appendNumber = (number: string) => {
    if (number === '.' && currentOperand.includes('.')) return
    if (currentOperand === '0' && number !== '.') {
      setCurrentOperand(number)
    } else {
      setCurrentOperand(currentOperand + number)
    }
  }

  const chooseOperation = (op: string) => {
    if (currentOperand === '') return
    if (previousOperand !== '') {
      compute()
    }
    setOperation(op)
    setPreviousOperand(currentOperand)
    setCurrentOperand('')
  }

  const compute = () => {
    let computation
    const prev = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '/':
        computation = prev / current
        break
      default:
        return
    }
    setCurrentOperand(computation.toString())
    setOperation(undefined)
    setPreviousOperand('')
  }

  const formatOperand = (operand: string) => {
    if (operand == null || operand === '') return
    const [integer, decimal] = operand.split('.')
    if (decimal == null) return parseInt(integer).toLocaleString()
    return `${parseInt(integer).toLocaleString()}.${decimal}`
  }

  return (
    <>
      <div className="blob" />
      <div className="blob-2" />
      <div className="app-container">
        <div className="calculator">
          <div className="calculator-header">
            <h1>Calc</h1>
          </div>

          <div className="display-container">
            <div className="previous-operand">
              {formatOperand(previousOperand)} {operation}
            </div>
            <div className="current-operand">
              {formatOperand(currentOperand) || '0'}
            </div>
          </div>

          <div className="keypad">
            <button className="clear span-two" onClick={clear}>AC</button>
            <button className="delete" onClick={deleteLast}>DEL</button>
            <button className="operator" onClick={() => chooseOperation('/')}>÷</button>

            <button onClick={() => appendNumber('1')}>1</button>
            <button onClick={() => appendNumber('2')}>2</button>
            <button onClick={() => appendNumber('3')}>3</button>
            <button className="operator" onClick={() => chooseOperation('*')}>×</button>

            <button onClick={() => appendNumber('4')}>4</button>
            <button onClick={() => appendNumber('5')}>5</button>
            <button onClick={() => appendNumber('6')}>6</button>
            <button className="operator" onClick={() => chooseOperation('-')}>-</button>

            <button onClick={() => appendNumber('7')}>7</button>
            <button onClick={() => appendNumber('8')}>8</button>
            <button onClick={() => appendNumber('9')}>9</button>
            <button className="operator" onClick={() => chooseOperation('+')}>+</button>

            <button onClick={() => appendNumber('.')}>.</button>
            <button onClick={() => appendNumber('0')}>0</button>
            <button className="equals" onClick={compute}>=</button>
          </div>
        </div>
      </div>

    </>
  )

}

export default App
