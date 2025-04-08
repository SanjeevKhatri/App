// components/projects/CalculatorProject.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const ProjectContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
`;

const Title = styled.h1`
    font-size: 2rem;
    text-align: center;
    margin-bottom: 20px;
    color: ${props => props.isDarkTheme ? 'var(--dark-text)' : 'var(--light-text)'};
`;

const Description = styled.p`
    text-align: center;
    margin-bottom: 30px;
    max-width: 800px;
    margin: 0 auto 30px;
    color: ${props => props.isDarkTheme ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
`;

const CalculatorsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;

    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

const CalculatorCard = styled.div`
    background-color: ${props => props.isDarkTheme ? 'var(--dark-component-bg)' : 'var(--light-component-bg)'};
    border: 1px solid ${props => props.isDarkTheme ? 'var(--dark-border)' : 'var(--light-border)'};
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: box-shadow 0.3s ease;

    &:hover {
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    }
`;

const CalculatorHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const CalculatorTitle = styled.h2`
    font-size: 1.4rem;
    color: ${props => props.isDarkTheme ? 'var(--dark-text)' : 'var(--light-text)'};
`;

const CalculatorIcon = styled.span`
    font-size: 1.5rem;
    color: ${props => props.isDarkTheme ? 'var(--dark-accent)' : 'var(--light-accent)'};
`;

const DisplayContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
`;

const Expression = styled.div`
    font-size: 1rem;
    height: 24px;
    text-align: right;
    color: ${props => props.isDarkTheme ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
    margin-bottom: 4px;
    font-family: monospace;
    overflow-x: auto;
`;

const Display = styled.div`
    background-color: ${props => props.isDarkTheme ? 'var(--dark-input-bg)' : 'var(--light-input-bg)'};
    color: ${props => props.isDarkTheme ? 'var(--dark-text)' : 'var(--light-text)'};
    border-radius: 8px;
    padding: 15px;
    text-align: right;
    font-size: 1.6rem;
    font-family: monospace;
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    overflow-x: auto;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ButtonGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
`;

const Button = styled.button`
    padding: 14px 6px;
    border-radius: 8px;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.2s ease;

    ${props => props.span && `
    grid-column: span ${props.span};
  `}

    background-color: ${props => {
        if (props.isOperator) {
            return props.isDarkTheme ? 'rgba(255, 165, 0, 0.8)' : 'rgba(245, 124, 0, 0.1)';
        } else if (props.isEquals) {
            return props.isDarkTheme ? 'rgba(76, 175, 80, 0.8)' : 'rgba(76, 175, 80, 0.15)';
        } else if (props.isClear) {
            return props.isDarkTheme ? 'rgba(244, 67, 54, 0.8)' : 'rgba(244, 67, 54, 0.1)';
        } else {
            return props.isDarkTheme ? 'rgba(51, 51, 51, 0.8)' : 'rgba(238, 238, 238, 0.8)';
        }
    }};

    color: ${props => {
        if (props.isOperator) {
            return props.isDarkTheme ? '#ffffff' : 'var(--light-accent)';
        } else if (props.isEquals) {
            return props.isDarkTheme ? '#ffffff' : '#4caf50';
        } else if (props.isClear) {
            return props.isDarkTheme ? '#ffffff' : '#f44336';
        } else {
            return props.isDarkTheme ? 'var(--dark-text)' : 'var(--light-text)';
        }
    }};

    &:hover {
        background-color: ${props => {
            if (props.isOperator) {
                return props.isDarkTheme ? 'rgba(255, 165, 0, 0.9)' : 'rgba(245, 124, 0, 0.2)';
            } else if (props.isEquals) {
                return props.isDarkTheme ? 'rgba(76, 175, 80, 0.9)' : 'rgba(76, 175, 80, 0.25)';
            } else if (props.isClear) {
                return props.isDarkTheme ? 'rgba(244, 67, 54, 0.9)' : 'rgba(244, 67, 54, 0.2)';
            } else {
                return props.isDarkTheme ? 'rgba(51, 51, 51, 0.9)' : 'rgba(238, 238, 238, 0.9)';
            }
        }};
    }

    &:active {
        transform: scale(0.97);
    }
`;

// Percentage Calculator Styled Components
const PercentageForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const ModeButtonsContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
`;

const ModeButton = styled.button`
    flex: 1;
    padding: 10px;
    border-radius: 8px;
    border: none;
    background-color: ${props =>
            props.isActive
                    ? (props.isDarkTheme ? 'rgba(255, 165, 0, 0.8)' : 'rgba(245, 124, 0, 0.15)')
                    : (props.isDarkTheme ? 'rgba(51, 51, 51, 0.6)' : 'rgba(238, 238, 238, 0.8)')
    };
    color: ${props =>
            props.isActive
                    ? (props.isDarkTheme ? '#ffffff' : 'var(--light-accent)')
                    : (props.isDarkTheme ? 'var(--dark-text)' : 'var(--light-text)')
    };
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: ${props =>
                props.isActive
                        ? (props.isDarkTheme ? 'rgba(255, 165, 0, 0.9)' : 'rgba(245, 124, 0, 0.25)')
                        : (props.isDarkTheme ? 'rgba(51, 51, 51, 0.7)' : 'rgba(238, 238, 238, 0.9)')
        };
    }

    &:active {
        transform: scale(0.98);
    }
`;

const FormGroup = styled.div`
    margin-bottom: 10px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    color: ${props => props.isDarkTheme ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
    font-size: 0.9rem;
`;

const Input = styled.input`
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid ${props => props.isDarkTheme ? 'var(--dark-border)' : 'var(--light-border)'};
    background-color: ${props => props.isDarkTheme ? 'var(--dark-input-bg)' : 'var(--light-input-bg)'};
    color: ${props => props.isDarkTheme ? 'var(--dark-text)' : 'var(--light-text)'};
    font-size: 1rem;
    transition: border-color 0.2s;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);

    &:focus {
        outline: none;
        border-color: ${props => props.isDarkTheme ? 'var(--dark-accent)' : 'var(--light-accent)'};
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

const ButtonRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 10px;
`;

const InfoBox = styled.div`
    background-color: ${props => props.isDarkTheme ? 'rgba(51, 51, 51, 0.4)' : 'rgba(238, 238, 238, 0.6)'};
    padding: 15px;
    border-radius: 8px;
    margin-top: 20px;
`;

const InfoTitle = styled.h3`
  margin-bottom: 10px;
  color: ${props => props.isDarkTheme ? 'var(--dark-text)' : 'var(--light-text)'};
  font-size: 1rem;
`;

const InfoText = styled.p`
  color: ${props => props.isDarkTheme ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
  font-size: 0.9rem;
`;

function StandardCalculator({ id, title, icon }) {
    const { isDarkTheme } = useTheme();
    const [display, setDisplay] = useState('0');
    const [expression, setExpression] = useState('');
    const [storedValue, setStoredValue] = useState(null);
    const [operator, setOperator] = useState(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);

    const inputDigit = (digit) => {
        if (waitingForOperand) {
            setDisplay(String(digit));
            setWaitingForOperand(false);
        } else {
            setDisplay(display === '0' ? String(digit) : display + digit);
        }
    };

    const inputDecimal = () => {
        if (waitingForOperand) {
            setDisplay('0.');
            setWaitingForOperand(false);
        } else if (display.indexOf('.') === -1) {
            setDisplay(display + '.');
        }
    };

    const clearDisplay = () => {
        setDisplay('0');
    };

    const clearAll = () => {
        setDisplay('0');
        setExpression('');
        setStoredValue(null);
        setOperator(null);
        setWaitingForOperand(false);
    };

    const performOperation = (nextOperator) => {
        const inputValue = parseFloat(display);

        if (storedValue === null) {
            setStoredValue(inputValue);
            setExpression(`${inputValue} ${nextOperator} `);
        } else if (operator) {
            const result = calculate(storedValue, inputValue, operator);
            setExpression(`${result} ${nextOperator} `);
            setDisplay(String(result));
            setStoredValue(result);
        }

        setWaitingForOperand(true);
        setOperator(nextOperator);
    };

    const calculate = (firstOperand, secondOperand, operator) => {
        switch (operator) {
            case '+':
                return firstOperand + secondOperand;
            case '-':
                return firstOperand - secondOperand;
            case '*':
                return firstOperand * secondOperand;
            case '/':
                return firstOperand / secondOperand;
            case '%':
                return (firstOperand * secondOperand) / 100;
            default:
                return secondOperand;
        }
    };

    const calculateResult = () => {
        if (operator && storedValue !== null) {
            const inputValue = parseFloat(display);
            const result = calculate(storedValue, inputValue, operator);
            setExpression(`${storedValue} ${operator} ${inputValue} = `);
            setDisplay(String(result));
            setStoredValue(null);
            setOperator(null);
            setWaitingForOperand(true);
        }
    };

    const getOperatorSymbol = (op) => {
        switch (op) {
            case '+': return '+';
            case '-': return '−';
            case '*': return '×';
            case '/': return '÷';
            case '%': return '%';
            default: return op;
        }
    };

    useEffect(() => {
        if (operator && !waitingForOperand) {
            setExpression(`${storedValue} ${getOperatorSymbol(operator)} ${display}`);
        }
    }, [display, waitingForOperand]);

    return (
        <CalculatorCard isDarkTheme={isDarkTheme}>
            <CalculatorHeader>
                <CalculatorTitle isDarkTheme={isDarkTheme}>{title}</CalculatorTitle>
                <CalculatorIcon isDarkTheme={isDarkTheme}>{icon}</CalculatorIcon>
            </CalculatorHeader>

            <DisplayContainer>
                <Expression isDarkTheme={isDarkTheme}>{expression}</Expression>
                <Display isDarkTheme={isDarkTheme}>{display}</Display>
            </DisplayContainer>

            <ButtonGrid>
                <Button isDarkTheme={isDarkTheme} isClear onClick={clearAll}>AC</Button>
                <Button isDarkTheme={isDarkTheme} isClear onClick={clearDisplay}>C</Button>
                <Button isDarkTheme={isDarkTheme} isOperator onClick={() => performOperation('%')}>%</Button>
                <Button isDarkTheme={isDarkTheme} isOperator onClick={() => performOperation('/')}>÷</Button>

                <Button isDarkTheme={isDarkTheme} onClick={() => inputDigit(7)}>7</Button>
                <Button isDarkTheme={isDarkTheme} onClick={() => inputDigit(8)}>8</Button>
                <Button isDarkTheme={isDarkTheme} onClick={() => inputDigit(9)}>9</Button>
                <Button isDarkTheme={isDarkTheme} isOperator onClick={() => performOperation('*')}>×</Button>

                <Button isDarkTheme={isDarkTheme} onClick={() => inputDigit(4)}>4</Button>
                <Button isDarkTheme={isDarkTheme} onClick={() => inputDigit(5)}>5</Button>
                <Button isDarkTheme={isDarkTheme} onClick={() => inputDigit(6)}>6</Button>
                <Button isDarkTheme={isDarkTheme} isOperator onClick={() => performOperation('-')}>−</Button>

                <Button isDarkTheme={isDarkTheme} onClick={() => inputDigit(1)}>1</Button>
                <Button isDarkTheme={isDarkTheme} onClick={() => inputDigit(2)}>2</Button>
                <Button isDarkTheme={isDarkTheme} onClick={() => inputDigit(3)}>3</Button>
                <Button isDarkTheme={isDarkTheme} isOperator onClick={() => performOperation('+')}>+</Button>

                <Button isDarkTheme={isDarkTheme} span={2} onClick={() => inputDigit(0)}>0</Button>
                <Button isDarkTheme={isDarkTheme} onClick={inputDecimal}>.</Button>
                <Button isDarkTheme={isDarkTheme} isEquals onClick={calculateResult}>=</Button>
            </ButtonGrid>
        </CalculatorCard>
    );
}

function PercentageCalculator() {
    const { isDarkTheme } = useTheme();
    const [number, setNumber] = useState('');
    const [percentage, setPercentage] = useState('');
    const [result, setResult] = useState('');
    const [mode, setMode] = useState('findPercentage'); // Changed default to findPercentage

    const calculate = () => {
        const num = parseFloat(number);
        const pct = parseFloat(percentage);
        const res = parseFloat(result);

        if (mode === 'findResult' && !isNaN(num) && !isNaN(pct)) {
            setResult((num * pct / 100).toFixed(2));
        } else if (mode === 'findPercentage' && !isNaN(num) && !isNaN(res)) {
            setPercentage(((res / num) * 100).toFixed(2));
        } else if (mode === 'findNumber' && !isNaN(pct) && !isNaN(res)) {
            setNumber((res / (pct / 100)).toFixed(2));
        }
    };

    const clearFields = () => {
        setNumber('');
        setPercentage('');
        setResult('');
    };

    const handleModeChange = (newMode) => {
        setMode(newMode);
        clearFields();
    };

    return (
        <CalculatorCard isDarkTheme={isDarkTheme}>
            <CalculatorHeader>
                <CalculatorTitle isDarkTheme={isDarkTheme}>Percentage Calculator</CalculatorTitle>
                <CalculatorIcon isDarkTheme={isDarkTheme}>%</CalculatorIcon>
            </CalculatorHeader>

            <PercentageForm>
                <ModeButtonsContainer>
                    <ModeButton
                        isDarkTheme={isDarkTheme}
                        isActive={mode === 'findResult'}
                        onClick={() => handleModeChange('findResult')}
                    >
                        Find Result
                    </ModeButton>
                    <ModeButton
                        isDarkTheme={isDarkTheme}
                        isActive={mode === 'findPercentage'}
                        onClick={() => handleModeChange('findPercentage')}
                    >
                        Find %
                    </ModeButton>
                    <ModeButton
                        isDarkTheme={isDarkTheme}
                        isActive={mode === 'findNumber'}
                        onClick={() => handleModeChange('findNumber')}
                    >
                        Find Number
                    </ModeButton>
                </ModeButtonsContainer>

                <FormGroup>
                    <Label isDarkTheme={isDarkTheme}>Number</Label>
                    <Input
                        type="number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        disabled={mode === 'findNumber'}
                        isDarkTheme={isDarkTheme}
                        placeholder="Enter number"
                    />
                </FormGroup>

                <FormGroup>
                    <Label isDarkTheme={isDarkTheme}>Percentage (%)</Label>
                    <Input
                        type="number"
                        value={percentage}
                        onChange={(e) => setPercentage(e.target.value)}
                        disabled={mode === 'findPercentage'}
                        isDarkTheme={isDarkTheme}
                        placeholder="Enter percentage"
                    />
                </FormGroup>

                <FormGroup>
                    <Label isDarkTheme={isDarkTheme}>Result</Label>
                    <Input
                        type="number"
                        value={result}
                        onChange={(e) => setResult(e.target.value)}
                        disabled={mode === 'findResult'}
                        isDarkTheme={isDarkTheme}
                        placeholder="Enter result"
                    />
                </FormGroup>

                <ButtonRow>
                    <Button
                        isDarkTheme={isDarkTheme}
                        isEquals
                        onClick={calculate}
                    >
                        Calculate
                    </Button>
                    <Button
                        isDarkTheme={isDarkTheme}
                        isClear
                        onClick={clearFields}
                    >
                        Clear
                    </Button>
                </ButtonRow>
            </PercentageForm>

            <InfoBox isDarkTheme={isDarkTheme}>
                <InfoTitle isDarkTheme={isDarkTheme}>How it works:</InfoTitle>
                <InfoText isDarkTheme={isDarkTheme}>
                    {mode === 'findResult' && "Enter a number and percentage to calculate what percent of the number is."}
                    {mode === 'findPercentage' && "Enter a number and result to find what percentage of the number gives that result."}
                    {mode === 'findNumber' && "Enter a percentage and result to find what number, when taking that percentage, gives the result."}
                </InfoText>
            </InfoBox>
        </CalculatorCard>
    );
}

const CalculatorProject = () => {
    const { isDarkTheme } = useTheme();

    return (
        <ProjectContainer>
            <Title isDarkTheme={isDarkTheme}>Triple Calculator</Title>
            <Description isDarkTheme={isDarkTheme}>
                A set of powerful calculators: two standard calculators and a specialized percentage calculator.
                Use the standard calculators for everyday arithmetic or try the percentage calculator to solve
                various percentage-related problems.
            </Description>

            <CalculatorsGrid>
                <StandardCalculator id="calc1" title="Calculator 1" icon="🧮" />
                <StandardCalculator id="calc2" title="Calculator 2" icon="🔢" />
                <PercentageCalculator />
            </CalculatorsGrid>
        </ProjectContainer>
    );
};

export default CalculatorProject;