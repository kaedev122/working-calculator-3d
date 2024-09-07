import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { CalculatorBody, CalculatorScreen, CalculatorButton } from './components/index.jsx';
import { OrbitControls } from '@react-three/drei';
import './App.css';

const App = () =>{
	const [screenText, setScreenText] = useState('0');
	const [subScreenText, setSubScreenText] = useState('');
	const [operation, setOperation] = useState(null);

	const CalculatorButtons = () => {
		const buttons = [
			['7', '8', '9', 'AC', 'C'],
			['4', '5', '6', '+', '-'],
			['1', '2', '3', 'x', '='],
			['0', '00', '.', '/'],
		];

		return (
			<group position={[-0.75, 0.2, 0.11]}>
				{buttons.map((row, rowIndex) =>
					row.map((label, colIndex) => {
						if (label === '=') {
							return (<CalculatorButton
								key={label}
								label={label}
								position={[colIndex * 0.38, -rowIndex * 0.5, 0]}
								handleClick={handleButtonClick}
							/>)
						}
						if (label === 'AC' || label === 'C') {
							return (<CalculatorButton
								key={label}
								label={label}
								color={"#FF6600"}
								position={[colIndex * 0.38, -rowIndex * 0.5, 0]}
								handleClick={handleButtonClick}
							/>)
						}
						return (<CalculatorButton
							key={label}
							label={label}
							position={[colIndex * 0.38, -rowIndex * 0.4, 0]}
							handleClick={handleButtonClick}
						/>)
					})
				)}
			</group>
		);
	}

	const handleButtonClick = (label) => {
		switch (label) {
			case 'AC':
				setScreenText('0');
				setSubScreenText('');
				setOperation(null);
				break;
			case 'C':
				setScreenText('0');
				break;
			case '=':
				if (operation) {
					let result = eval(`${subScreenText}${operation == 'x' ? '*' : operation}${screenText}`);
					if (result.toFixed(14).length > 15) {
						// Tính số chữ số cần giữ lại sau dấu '.'
						result = result.toPrecision(10);  // Loại bỏ số 0 và dấu '.'
					} else {
						result = result.toExponential(10);
					}
					result = result.replace(/\.?0+$/, '');
					setScreenText(result);
					setSubScreenText('');
					setOperation(null);
				}
				break;
			case '.':
				if (screenText.length > 14) return;
				if (!screenText.includes('.')) {
					setScreenText(screenText + label);
				}
				break;
			default:
				if (['+', '-', 'x', '/'].includes(label)) {
					if (operation) {
						if (screenText === '0') {
							setOperation(label);
							break;
						}
						let result = eval(`${subScreenText}${operation == 'x' ? '*' : operation}${screenText}`);
						if (result.toFixed(14).length > 15) {
							// Tính số chữ số cần giữ lại sau dấu '.'
							let decimalPlaces = 14 - (result.toString().split('.')[0].length);
							result = result.toFixed(decimalPlaces).replace(/\.?0+$/, '');  // Loại bỏ số 0 và dấu '.'
						}
						result = result.replace(/\.?0+$/, '');
						setScreenText(result);
						setSubScreenText(result);
					} else {
						setSubScreenText(screenText);
					}
					setOperation(label);
					setScreenText('0');
					break;
				}
				if (screenText === '0') {
					if (label === '0' || label === '00') {
						setScreenText('0');
						break
					}
					setScreenText(label);
				} else {
					if (screenText.length > 14) break;
					setScreenText(screenText + label);
				}
				break;
		}
	}

	return (
		<Canvas 
			style={{ width: '100vw', height: '100vh', backgroundColor: 'white' }}
			camera={{ position: [0, 0, 5] }}
		>
			<ambientLight intensity={0.5} />
			<directionalLight position={[5, 5, 5]} />
			<CalculatorBody screenText={screenText} setSubScreenText={setSubScreenText} setOperation={setOperation} setScreenText={setScreenText}/>
			<CalculatorScreen screenText={screenText} operation={operation} subText={subScreenText}/>
			<CalculatorButtons />
			<OrbitControls />
		</Canvas>
	);
}

export default App;