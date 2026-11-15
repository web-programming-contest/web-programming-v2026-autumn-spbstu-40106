import {useState} from 'react';

export default function App() {
  const [display, setDisplay] = useState('0');
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [operator, setOperator] = useState(null);
  const [value, setValue] = useState(null);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : `${display}${digit}`);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(`${display}.`);
    }
  };

  const clearDisplay = () => {
    setDisplay('0');
    setOperator(null);
    setValue(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const inputPercent = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (value === null) {
      setValue(inputValue);
    } else if (operator) {
      const currentValue = value || 0;
      let newValue = currentValue;

      switch (operator) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '*':
          newValue = currentValue * inputValue;
          break;
        case '/':
          newValue = currentValue / inputValue;
          break;
        default:
          break;
      }
      setValue(newValue);
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const handleEquals = () => {
    if (!operator || value === null) {
      return;
    }
    performOperation(null);
    setOperator(null);
  };

  return (
    <div className="calculator">
      <div className="display" data-testid="calculator-display">
        {display}
      </div>
      <div className="keypad">
        {/* ИСПРАВЛЕНИЕ: У кнопки С теперь свой уникальный data-testid */}
        <button
          data-testid="calculator-clear"
          data-value="C"
          onClick={clearDisplay}
          className="key-clear"
        >
          C
        </button>
        <button
          data-testid="calculator-key"
          data-value="+/-"
          onClick={toggleSign}
          className="key-function"
        >
          +/-
        </button>
        <button
          data-testid="calculator-key"
          data-value="%"
          onClick={inputPercent}
          className="key-function"
        >
          %
        </button>
        <button
          data-testid="calculator-key"
          data-value="/"
          data-operation="divide"
          onClick={() => performOperation('/')}
          className="key-operator"
        >
          /
        </button>

        <button
          data-testid="calculator-key"
          data-value="7"
          onClick={() => inputDigit(7)}
        >
          7
        </button>
        <button
          data-testid="calculator-key"
          data-value="8"
          onClick={() => inputDigit(8)}
        >
          8
        </button>
        <button
          data-testid="calculator-key"
          data-value="9"
          onClick={() => inputDigit(9)}
        >
          9
        </button>
        <button
          data-testid="calculator-key"
          data-value="*"
          data-operation="multiply"
          onClick={() => performOperation('*')}
          className="key-operator"
        >
          *
        </button>

        <button
          data-testid="calculator-key"
          data-value="4"
          onClick={() => inputDigit(4)}
        >
          4
        </button>
        <button
          data-testid="calculator-key"
          data-value="5"
          onClick={() => inputDigit(5)}
        >
          5
        </button>
        <button
          data-testid="calculator-key"
          data-value="6"
          onClick={() => inputDigit(6)}
        >
          6
        </button>
        <button
          data-testid="calculator-key"
          data-value="-"
          data-operation="subtract"
          onClick={() => performOperation('-')}
          className="key-operator"
        >
          -
        </button>

        <button
          data-testid="calculator-key"
          data-value="1"
          onClick={() => inputDigit(1)}
        >
          1
        </button>
        <button
          data-testid="calculator-key"
          data-value="2"
          onClick={() => inputDigit(2)}
        >
          2
        </button>
        <button
          data-testid="calculator-key"
          data-value="3"
          onClick={() => inputDigit(3)}
        >
          3
        </button>
        <button
          data-testid="calculator-key"
          data-value="+"
          data-operation="add"
          onClick={() => performOperation('+')}
          className="key-operator"
        >
          +
        </button>

        <button
          data-testid="calculator-key"
          data-value="0"
          onClick={() => inputDigit(0)}
          className="key-zero"
        >
          0
        </button>
        <button data-testid="calculator-key" data-value="." onClick={inputDot}>
          .
        </button>
        <button
          data-testid="calculator-equals"
          data-value="="
          onClick={handleEquals}
          className="key-equals"
        >
          =
        </button>
      </div>
    </div>
  );
}
