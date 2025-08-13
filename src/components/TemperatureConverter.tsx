'use client';

import { useState } from 'react';

type TemperatureUnit = 'celsius' | 'fahrenheit' | 'kelvin';

const TemperatureConverter = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<TemperatureUnit>('celsius');
  const [results, setResults] = useState({
    celsius: '',
    fahrenheit: '',
    kelvin: ''
  });

  const convertTemperature = (value: number, from: TemperatureUnit) => {
    let celsius: number;

    switch (from) {
      case 'celsius':
        celsius = value;
        break;
      case 'fahrenheit':
        celsius = (value - 32) * 5/9;
        break;
      case 'kelvin':
        celsius = value - 273.15;
        break;
      default:
        celsius = value;
    }

    return {
      celsius: celsius,
      fahrenheit: celsius * 9/5 + 32,
      kelvin: celsius + 273.15
    };
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    
    if (value === '' || isNaN(Number(value))) {
      setResults({ celsius: '', fahrenheit: '', kelvin: '' });
      return;
    }

    const numValue = parseFloat(value);
    const converted = convertTemperature(numValue, fromUnit);

    setResults({
      celsius: converted.celsius.toFixed(2),
      fahrenheit: converted.fahrenheit.toFixed(2),
      kelvin: converted.kelvin.toFixed(2)
    });
  };

  const handleUnitChange = (unit: TemperatureUnit) => {
    setFromUnit(unit);
    if (inputValue && !isNaN(Number(inputValue))) {
      const numValue = parseFloat(inputValue);
      const converted = convertTemperature(numValue, unit);
      
      setResults({
        celsius: converted.celsius.toFixed(2),
        fahrenheit: converted.fahrenheit.toFixed(2),
        kelvin: converted.kelvin.toFixed(2)
      });
    }
  };

  const resetConverter = () => {
    setInputValue('');
    setResults({ celsius: '', fahrenheit: '', kelvin: '' });
    setFromUnit('celsius');
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Temperature Converter
        </h1>
        <p className="text-gray-600 text-sm">
          Convert between Celsius, Fahrenheit, and Kelvin
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Temperature
          </label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Enter temperature value"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From Unit
          </label>
          <div className="flex space-x-2">
            {(['celsius', 'fahrenheit', 'kelvin'] as TemperatureUnit[]).map((unit) => (
              <button
                key={unit}
                onClick={() => handleUnitChange(unit)}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                  fromUnit === unit
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {unit.charAt(0).toUpperCase() + unit.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-800">Results:</h3>
          
          <div className="grid gap-3">
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
              <span className="font-medium text-red-700">Celsius (°C)</span>
              <span className="text-xl font-bold text-red-600">
                {results.celsius || '0.00'}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="font-medium text-blue-700">Fahrenheit (°F)</span>
              <span className="text-xl font-bold text-blue-600">
                {results.fahrenheit || '32.00'}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="font-medium text-green-700">Kelvin (K)</span>
              <span className="text-xl font-bold text-green-600">
                {results.kelvin || '273.15'}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={resetConverter}
          className="w-full py-2 px-4 bg-gray-500 text-white font-medium rounded-md hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default TemperatureConverter;