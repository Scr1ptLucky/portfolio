import { useState, useCallback } from "react";

export function Calculator() {
  const [display, setDisplay] = useState("0");
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = useCallback((digit: string) => {
    setDisplay((prev) => {
      if (prev === "0" && digit !== ".") {
        return digit;
      }
      if (waitingForOperand) {
        setWaitingForOperand(false);
        return digit;
      }
      return prev + digit;
    });
  }, [waitingForOperand]);

  const handleClear = useCallback(() => {
    setDisplay("0");
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  }, []);

  const handleEquals = useCallback(() => {
    const currentValue = parseFloat(display);
    
    if (prevValue !== null && operator) {
      let result = 0;
      switch (operator) {
        case "+":
          result = prevValue + currentValue;
          break;
        case "-":
          result = prevValue - currentValue;
          break;
        case "×":
          result = prevValue * currentValue;
          break;
        case "÷":
          result = currentValue !== 0 ? prevValue / currentValue : 0;
          break;
        default:
          result = currentValue;
      }
      setDisplay(String(result));
      setPrevValue(null);
      setOperator(null);
      setWaitingForOperand(true);
    }
  }, [display, prevValue, operator, waitingForOperand]);

  const handleOperation = useCallback((nextOp: string) => {
    const currentValue = parseFloat(display);

    if (nextOp === "=") {
      handleEquals();
      return;
    }

    if (prevValue === null) {
      setPrevValue(currentValue);
    } else if (operator && !waitingForOperand) {
      let result = 0;
      switch (operator) {
        case "+":
          result = prevValue + currentValue;
          break;
        case "-":
          result = prevValue - currentValue;
          break;
        case "×":
          result = prevValue * currentValue;
          break;
        case "÷":
          result = currentValue !== 0 ? prevValue / currentValue : 0;
          break;
        default:
          result = currentValue;
      }
      setDisplay(String(result));
      setPrevValue(result);
    } else {
      setPrevValue(currentValue);
    }

    setOperator(nextOp);
    setWaitingForOperand(true);
  }, [display, prevValue, operator, waitingForOperand, handleEquals]);

  const handleToggleSign = useCallback(() => {
    setDisplay((prev) => String(parseFloat(prev) * -1));
  }, []);

  const handlePercent = useCallback(() => {
    setDisplay((prev) => String(parseFloat(prev) / 100));
  }, []);

  const handleDot = useCallback(() => {
    setDisplay((prev) => {
      if (waitingForOperand) {
        setWaitingForOperand(false);
        return "0.";
      }
      if (prev.includes(".")) return prev;
      return prev + ".";
    });
  }, [waitingForOperand]);

  const ButtonClass = "bg-[#333333] hover:bg-[#4d4d4d] active:bg-[#555555] text-white h-12 md:h-14 text-lg md:text-2xl font-medium rounded-full flex items-center justify-center transition-all cursor-pointer";
  const OperatorClass = "bg-[#FF9F0A] hover:bg-[#FFB23F] active:bg-[#E68A00] text-white h-12 md:h-14 text-lg md:text-2xl font-medium rounded-full flex items-center justify-center transition-all cursor-pointer";
  const FunctionClass = "bg-[#A5A5A5] hover:bg-[#D4D4D2] active:bg-[#8B8B8B] text-black h-12 md:h-14 text-lg md:text-2xl font-medium rounded-full flex items-center justify-center transition-all cursor-pointer";

  return (
    <div className="w-full h-full bg-black flex flex-col p-3 md:p-4 select-none">
      <div className="flex-1 flex items-end justify-end pb-3 md:pb-4">
        <div className="text-white text-4xl md:text-6xl font-light truncate tracking-tight">
          {display}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-2 md:gap-3">
        {/* Row 1 */}
        <button onClick={handleClear} className={FunctionClass}>
          {display === "0" ? "AC" : "C"}
        </button>
        <button onClick={handleToggleSign} className={FunctionClass}>±</button>
        <button onClick={handlePercent} className={FunctionClass}>%</button>
        <button onClick={() => handleOperation("÷")} className={OperatorClass}>÷</button>

        {/* Row 2 */}
        <button onClick={() => inputDigit("7")} className={ButtonClass}>7</button>
        <button onClick={() => inputDigit("8")} className={ButtonClass}>8</button>
        <button onClick={() => inputDigit("9")} className={ButtonClass}>9</button>
        <button onClick={() => handleOperation("×")} className={OperatorClass}>×</button>

        {/* Row 3 */}
        <button onClick={() => inputDigit("4")} className={ButtonClass}>4</button>
        <button onClick={() => inputDigit("5")} className={ButtonClass}>5</button>
        <button onClick={() => inputDigit("6")} className={ButtonClass}>6</button>
        <button onClick={() => handleOperation("-")} className={OperatorClass}>-</button>

        {/* Row 4 */}
        <button onClick={() => inputDigit("1")} className={ButtonClass}>1</button>
        <button onClick={() => inputDigit("2")} className={ButtonClass}>2</button>
        <button onClick={() => inputDigit("3")} className={ButtonClass}>3</button>
        <button onClick={() => handleOperation("+")} className={OperatorClass}>+</button>

        {/* Row 5 */}
        <button onClick={() => inputDigit("0")} className={`${ButtonClass} col-span-2 pl-7 text-left`}>0</button>
        <button onClick={handleDot} className={ButtonClass}>.</button>
        <button onClick={() => handleOperation("=")} className={OperatorClass}>=</button>
      </div>
    </div>
  );
}
