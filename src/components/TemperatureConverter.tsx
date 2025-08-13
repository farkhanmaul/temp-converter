'use client';

import { useState, useEffect } from 'react';

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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-lg w-full mx-auto">
        {/* Header with Farkhan Identity */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <span className="text-white font-bold text-xl">F</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 animate-slide-up">
            Temperature Converter
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm lg:text-base animate-slide-up-delay px-4">
            by <span className="text-red-400 font-semibold">Farkhan Maul</span> • Convert with precision
          </p>
        </div>

        {/* Main Converter Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-8 space-y-6 animate-scale-in">
          <div>
            <label className="block text-sm font-medium text-white mb-3">
              Enter Temperature
            </label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Enter temperature value"
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 backdrop-blur-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-3">
              From Unit
            </label>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {(['celsius', 'fahrenheit', 'kelvin'] as TemperatureUnit[]).map((unit, index) => (
                <button
                  key={unit}
                  onClick={() => handleUnitChange(unit)}
                  className={`py-2.5 px-2 sm:py-3 sm:px-4 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 ${
                    fromUnit === unit
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/50'
                      : 'bg-white/10 text-white border border-white/30 hover:bg-white/20'
                  }`}
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  {unit.charAt(0).toUpperCase() + unit.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Results:</h3>
            
            <div className="grid gap-4">
              <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-lg border border-red-500/30 backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-white text-sm sm:text-base">Celsius</span>
                  <span className="text-red-300 text-xs sm:text-sm">°C</span>
                </div>
                <span className="text-xl sm:text-2xl font-bold text-red-400 animate-number-change">
                  {results.celsius || '0.00'}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-white/10 to-white/20 rounded-lg border border-white/30 backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  <span className="font-semibold text-white text-sm sm:text-base">Fahrenheit</span>
                  <span className="text-gray-300 text-xs sm:text-sm">°F</span>
                </div>
                <span className="text-xl sm:text-2xl font-bold text-white animate-number-change">
                  {results.fahrenheit || '32.00'}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-gray-700/50 to-black/50 rounded-lg border border-gray-500/30 backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-3 h-3 bg-gray-400 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-white text-sm sm:text-base">Kelvin</span>
                  <span className="text-gray-300 text-xs sm:text-sm">K</span>
                </div>
                <span className="text-xl sm:text-2xl font-bold text-gray-300 animate-number-change">
                  {results.kelvin || '273.15'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={resetConverter}
            className="w-full py-3 px-4 bg-gradient-to-r from-gray-700 to-black text-white font-semibold rounded-lg hover:from-gray-600 hover:to-gray-900 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
          >
            Reset Converter
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 sm:mt-8 animate-fade-in-delay">
          <p className="text-gray-400 text-xs sm:text-sm px-4">
            Made with ❤️ by <span className="text-red-400 font-semibold">Farkhan Maul</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TemperatureConverter;