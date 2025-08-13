'use client';

import { useState, useEffect } from 'react';

type TemperatureUnit = 'celsius' | 'fahrenheit' | 'kelvin' | 'reamur';

const TemperatureConverter = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<TemperatureUnit>('celsius');
  const [results, setResults] = useState({
    celsius: '',
    fahrenheit: '',
    kelvin: '',
    reamur: ''
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
      case 'reamur':
        celsius = value * 5/4;
        break;
      default:
        celsius = value;
    }

    // Validate absolute zero for Kelvin (minimum -273.15°C)
    const kelvinValue = celsius + 273.15;
    if (kelvinValue < 0) {
      return {
        celsius: 'Below Absolute Zero!',
        fahrenheit: 'Below Absolute Zero!',
        kelvin: 'Below Absolute Zero!',
        reamur: 'Below Absolute Zero!'
      };
    }

    return {
      celsius: celsius,
      fahrenheit: celsius * 9/5 + 32,
      kelvin: kelvinValue,
      reamur: celsius * 4/5
    };
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    
    if (value === '' || isNaN(Number(value))) {
      setResults({ celsius: '', fahrenheit: '', kelvin: '', reamur: '' });
      return;
    }

    const numValue = parseFloat(value);
    const converted = convertTemperature(numValue, fromUnit);

    setResults({
      celsius: typeof converted.celsius === 'number' ? converted.celsius.toFixed(2) : converted.celsius,
      fahrenheit: typeof converted.fahrenheit === 'number' ? converted.fahrenheit.toFixed(2) : converted.fahrenheit,
      kelvin: typeof converted.kelvin === 'number' ? converted.kelvin.toFixed(2) : converted.kelvin,
      reamur: typeof converted.reamur === 'number' ? converted.reamur.toFixed(2) : converted.reamur
    });
  };

  const handleUnitChange = (unit: TemperatureUnit) => {
    setFromUnit(unit);
    if (inputValue && !isNaN(Number(inputValue))) {
      const numValue = parseFloat(inputValue);
      const converted = convertTemperature(numValue, unit);
      
      setResults({
        celsius: typeof converted.celsius === 'number' ? converted.celsius.toFixed(2) : converted.celsius,
        fahrenheit: typeof converted.fahrenheit === 'number' ? converted.fahrenheit.toFixed(2) : converted.fahrenheit,
        kelvin: typeof converted.kelvin === 'number' ? converted.kelvin.toFixed(2) : converted.kelvin,
        reamur: typeof converted.reamur === 'number' ? converted.reamur.toFixed(2) : converted.reamur
      });
    }
  };

  const resetConverter = () => {
    setInputValue('');
    setResults({ celsius: '', fahrenheit: '', kelvin: '', reamur: '' });
    setFromUnit('celsius');
  };

  return (
    <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 flex items-center justify-center p-3">
      <div className="max-w-4xl w-full mx-auto">
        {/* Compact Main Card with Integrated Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-4 sm:p-6 animate-scale-in">
          {/* Compact Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-white">
                  Temperature Converter
                </h1>
                <p className="text-gray-400 text-xs">
                  ⚓ <span className="text-red-400">Farkhan</span> • ⚡ <span className="text-blue-400">Claude</span>
                </p>
              </div>
            </div>
          </div>
          {/* Input and Unit Selection Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Enter Temperature
              </label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Enter value"
                className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 backdrop-blur-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                From Unit
              </label>
              <div className="grid grid-cols-4 gap-1">
                {(['celsius', 'fahrenheit', 'kelvin', 'reamur'] as TemperatureUnit[]).map((unit, index) => (
                  <button
                    key={unit}
                    onClick={() => handleUnitChange(unit)}
                    className={`py-1.5 px-1 text-xs font-semibold rounded transition-all duration-300 ${
                      fromUnit === unit
                        ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
                        : 'bg-white/10 text-white border border-white/30 hover:bg-white/20'
                    }`}
                    style={{animationDelay: `${index * 50}ms`}}
                  >
                    {unit === 'celsius' ? 'C' : unit === 'fahrenheit' ? 'F' : unit === 'kelvin' ? 'K' : 'R'}
                  </button>
                ))}
              </div>
            </div>
          </div>


          {/* Compact Results Grid */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3">Results:</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex justify-between items-center p-3 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-lg border border-red-500/30 backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="font-semibold text-white text-sm">Celsius</span>
                </div>
                <span className="text-lg font-bold text-red-400">
                  {results.celsius || '0.00'}°C
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gradient-to-r from-white/10 to-white/20 rounded-lg border border-white/30 backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="font-semibold text-white text-sm">Fahrenheit</span>
                </div>
                <span className="text-lg font-bold text-white">
                  {results.fahrenheit || '32.00'}°F
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-700/50 to-black/50 rounded-lg border border-gray-500/30 backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="font-semibold text-white text-sm">Kelvin</span>
                </div>
                <span className="text-lg font-bold text-gray-300">
                  {results.kelvin || '273.15'}K
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-lg border border-yellow-500/30 backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="font-semibold text-white text-sm">Réaumur</span>
                </div>
                <span className="text-lg font-bold text-yellow-400">
                  {results.reamur || '0.00'}°Ré
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={resetConverter}
            className="w-full mt-4 py-2 px-4 bg-gradient-to-r from-gray-700 to-black text-white font-semibold rounded-lg hover:from-gray-600 hover:to-gray-900 transition-all duration-300"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemperatureConverter;