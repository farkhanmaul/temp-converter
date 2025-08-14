'use client';

import { useState, useEffect } from 'react';

type TemperatureUnit = 'celsius' | 'fahrenheit' | 'kelvin' | 'reamur';

interface TemperatureInfo {
  name: string;
  symbol: string;
  description: string;
  formula: string;
  origin: string;
}


const temperatureInfo: Record<TemperatureUnit, TemperatureInfo> = {
  celsius: {
    name: 'Celsius',
    symbol: '°C',
    description: 'Skala suhu berdasarkan titik beku (0°C) dan titik didih air (100°C).',
    formula: 'C = (F-32)×5/9',
    origin: 'Dibuat oleh Anders Celsius (1742)'
  },
  fahrenheit: {
    name: 'Fahrenheit', 
    symbol: '°F',
    description: 'Skala suhu dengan titik beku air 32°F dan titik didih 212°F.',
    formula: 'F = C×9/5+32',
    origin: 'Dibuat oleh Daniel Gabriel Fahrenheit (1724)'
  },
  kelvin: {
    name: 'Kelvin',
    symbol: 'K', 
    description: 'Satuan SI untuk suhu termodinamika, dimulai dari nol mutlak.',
    formula: 'K = C+273.15',
    origin: 'Dibuat oleh William Thomson (Lord Kelvin) (1848)'
  },
  reamur: {
    name: 'Réaumur',
    symbol: '°Ré',
    description: 'Skala suhu dengan titik beku air 0°Ré dan titik didih 80°Ré.',
    formula: 'Ré = C×4/5',
    origin: 'Dibuat oleh René Antoine Ferchault de Réaumur (1730)'
  },
};

const TemperatureConverter = () => {
  const [mounted, setMounted] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<TemperatureUnit>('celsius');
  const [results, setResults] = useState<Record<TemperatureUnit, string>>({
    celsius: '',
    fahrenheit: '',
    kelvin: '',
    reamur: ''
  });
  const [darkMode, setDarkMode] = useState(false);
  const [showRangeTable, setShowRangeTable] = useState(false);
  const [rangeStart, setRangeStart] = useState<string>('0');
  const [rangeEnd, setRangeEnd] = useState<string>('100');
  const [showInfo, setShowInfo] = useState(false);
  const [showCredits, setShowCredits] = useState(false);

  // Define convertTemperature function before hooks
  const convertTemperature = (value: number, from: TemperatureUnit): Record<TemperatureUnit, number | string> => {
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
      const errorMsg = 'Below Absolute Zero!';
      return {
        celsius: errorMsg,
        fahrenheit: errorMsg,
        kelvin: errorMsg,
        reamur: errorMsg
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
    const formattedResults: Record<TemperatureUnit, string> = {} as Record<TemperatureUnit, string>;
    
    Object.keys(converted).forEach(key => {
      const k = key as TemperatureUnit;
      formattedResults[k] = typeof converted[k] === 'number' ? (converted[k] as number).toFixed(2) : converted[k] as string;
    });

    setResults(formattedResults);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleUnitChange = (unit: TemperatureUnit) => {
    setFromUnit(unit);
    if (inputValue && !isNaN(Number(inputValue))) {
      const numValue = parseFloat(inputValue);
      const converted = convertTemperature(numValue, unit);
      const formattedResults: Record<TemperatureUnit, string> = {} as Record<TemperatureUnit, string>;
      
      Object.keys(converted).forEach(key => {
        const k = key as TemperatureUnit;
        formattedResults[k] = typeof converted[k] === 'number' ? (converted[k] as number).toFixed(2) : converted[k] as string;
      });

      setResults(formattedResults);
    }
  };

  const resetConverter = () => {
    setInputValue('');
    setResults({ celsius: '', fahrenheit: '', kelvin: '', reamur: '' });
    setFromUnit('celsius');
  };




  const generateRangeTable = () => {
    const start = parseFloat(rangeStart);
    const end = parseFloat(rangeEnd);
    const step = Math.max(1, Math.floor((end - start) / 10));
    const table = [];
    for (let i = start; i <= end; i += step) {
      const converted = convertTemperature(i, 'celsius');
      const row: Record<string, number | string> = { celsius: i };
      Object.keys(converted).forEach(key => {
        if (key !== 'celsius') {
          const k = key as TemperatureUnit;
          row[k] = typeof converted[k] === 'number' ? (converted[k] as number).toFixed(1) : converted[k];
        }
      });
      table.push(row);
    }
    return table;
  };


  return (
    <div className={`min-h-screen transition-all duration-300 ${
      darkMode 
        ? 'bg-gray-900' 
        : 'bg-gray-50'
    } flex items-center justify-center p-4 relative`}>
      {/* Dark Mode Toggle - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`relative w-12 h-6 rounded-full transition-colors duration-200 shadow-lg ${
            darkMode ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        >
          <div className={`absolute w-5 h-5 rounded-full bg-white transition-transform duration-200 top-0.5 ${
            darkMode ? 'translate-x-6' : 'translate-x-0.5'
          }`}>
            <span className="absolute inset-0 flex items-center justify-center text-xs">
              {darkMode ? '🌙' : '☀️'}
            </span>
          </div>
        </button>
      </div>
      <div className="max-w-4xl w-full mx-auto">
        {/* Compact Main Card with Integrated Header */}
        <div className={`rounded-xl shadow-lg border p-4 sm:p-6 transition-all duration-300 ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          {/* Compact Header */}
          <div className="text-center mb-8">
            <div className="mb-6">
              <h1 className={`text-2xl sm:text-3xl font-bold mb-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <span className="hidden sm:inline">FarkhanTherm</span>
                <span className="sm:hidden">FTherm</span>
              </h1>
              <p className={`text-sm sm:text-lg ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <span className="hidden sm:inline">Convert temperatures instantly & accurately</span>
                <span className="sm:hidden">Instant temperature conversion</span>
              </p>
            </div>
          </div>
          {/* Input and Unit Selection Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div className="space-y-3">
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-white' : 'text-gray-700'
              }`}>
                Enter Temperature Value
              </label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Enter value"
                className={`w-full px-3 py-2 border rounded-lg transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                  darkMode 
                    ? 'bg-white/10 border-white/30 text-white placeholder-gray-300' 
                    : 'bg-white/90 border-gray-300 text-gray-800 placeholder-gray-500'
                }`}
              />
              <div className="space-y-3">
                <div className="relative mt-6">
                  <input
                    type="range"
                    min="-100"
                    max="200"
                    step="1"
                    value={inputValue || '0'}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      // Snap to zero if within 2 degrees
                      if (Math.abs(val) <= 2 && Math.abs(val) > 0) {
                        handleInputChange('0');
                      } else {
                        handleInputChange(e.target.value);
                      }
                    }}
                    className={`w-full h-2 rounded-lg appearance-none cursor-pointer slider ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}
                  />
                  {/* Zero marker - shows when near 0 */}
                  {Math.abs(parseFloat(inputValue) || 0) <= 5 && (
                    <div 
                      className={`absolute -top-4 w-0.5 h-6 pointer-events-none transition-opacity duration-300 ease-in-out ${
                        darkMode ? 'bg-yellow-400' : 'bg-blue-500'
                      } ${
                        Math.abs(parseFloat(inputValue) || 0) <= 2 ? 'opacity-100' : 'opacity-50'
                      }`}
                      style={{ left: `${((0 - (-100)) / (200 - (-100))) * 100}%`, transform: 'translateX(-50%)' }}
                    ></div>
                  )}
                  {Math.abs(parseFloat(inputValue) || 0) <= 5 && (
                    <div 
                      className={`absolute -top-10 text-xs font-semibold pointer-events-none px-2 py-1 rounded whitespace-nowrap transition-opacity duration-300 ease-in-out ${
                        darkMode ? 'text-yellow-400 bg-gray-800 border border-yellow-400/30' : 'text-blue-600 bg-blue-50 border border-blue-200'
                      } ${
                        Math.abs(parseFloat(inputValue) || 0) <= 2 ? 'opacity-100' : 'opacity-60'
                      }`}
                      style={{ left: `${((0 - (-100)) / (200 - (-100))) * 100}%`, transform: 'translateX(-50%)' }}
                    >
                      0°
                    </div>
                  )}
                </div>
                <div className={`flex justify-between items-center text-xs ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <span className="font-medium">-100°</span>
                  <span className="text-center font-medium opacity-60">Drag to set temperature</span>
                  <span className="font-medium">200°</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-white' : 'text-gray-700'
              }`}>
                From Unit
              </label>
              <div className="grid grid-cols-4 gap-1">
                {(['celsius', 'fahrenheit', 'kelvin', 'reamur'] as TemperatureUnit[]).map((unit) => (
                  <button
                    key={unit}
                    onClick={() => handleUnitChange(unit)}
                    className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                      fromUnit === unit
                        ? 'bg-blue-500 text-white shadow-md'
                        : darkMode
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {unit === 'celsius' ? 'C' : unit === 'fahrenheit' ? 'F' : unit === 'kelvin' ? 'K' : 'Ré'}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowRangeTable(!showRangeTable);
                    if (showInfo) setShowInfo(false);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm cursor-pointer ${
                    showRangeTable 
                      ? darkMode
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-blue-500 text-white shadow-md'
                      : darkMode 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600' 
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm'
                  }`}
                >
                  <span>📊</span>
                  <span>Range Table</span>
                </button>
                <button
                  onClick={() => {
                    setShowInfo(!showInfo);
                    if (showRangeTable) setShowRangeTable(false);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm cursor-pointer ${
                    showInfo 
                      ? darkMode
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-purple-500 text-white shadow-md'
                      : darkMode 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600' 
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm'
                  }`}
                >
                  <span>ℹ️</span>
                  <span>Scale Info</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Full Width Temperature Scale Info */}
        {showInfo && (
            <div className={`mb-6 rounded-xl border shadow-lg overflow-hidden ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className={`px-6 py-4 border-b ${
                darkMode ? 'bg-purple-600 border-purple-500' : 'bg-purple-500 border-purple-400'
              }`}>
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <span>ℹ️</span>
                  <span>Temperature Scale Reference</span>
                </h3>
              </div>
              <div className="p-6">
                <div className="grid gap-4">
                  {Object.entries(temperatureInfo).map(([key, info]) => (
                    <div key={key} className={`p-4 rounded-lg border ${
                      darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className={`font-semibold text-sm mb-2 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {info.name} ({info.symbol})
                      </div>
                      <p className={`text-sm leading-relaxed mb-2 ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {info.description}
                      </p>
                      <div className={`text-xs space-y-1 ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <div><strong>Formula:</strong> {info.formula}</div>
                        <div><strong>Origin:</strong> {info.origin}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
        )}

        {/* Results Section - New Card */}
        <div className={`rounded-xl shadow-lg border p-4 sm:p-6 mt-6 transition-all duration-300 ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          {/* Compact Results Grid */}
          <div>
            <h3 className={`text-lg font-bold mb-3 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>Results:</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { key: 'celsius', label: 'Celsius', value: results.celsius || '0.00', unit: '°C', color: 'red' },
                { key: 'fahrenheit', label: 'Fahrenheit', value: results.fahrenheit || '32.00', unit: '°F', color: 'blue' },
                { key: 'kelvin', label: 'Kelvin', value: results.kelvin || '273.15', unit: 'K', color: 'gray' },
                { key: 'reamur', label: 'Réaumur', value: results.reamur || '0.00', unit: '°Ré', color: 'yellow' }
              ].map((item) => {
                const isActive = fromUnit === item.key;
                
                return (
                  <div 
                    key={item.key}
                    className={`flex justify-between items-center p-4 rounded-lg border transition-all duration-300 ${
                      isActive 
                        ? darkMode
                          ? 'bg-blue-500 border-blue-400 shadow-lg'
                          : 'bg-blue-50 border-blue-300 shadow-md'
                        : darkMode
                          ? 'bg-white/5 border-white/20 hover:bg-white/10'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        isActive 
                          ? darkMode ? 'bg-white' : 'bg-blue-500'
                          : item.color === 'red' ? 'bg-red-400' :
                            item.color === 'blue' ? 'bg-blue-400' :
                            item.color === 'gray' ? 'bg-gray-400' :
                            'bg-yellow-400'
                      }`}></div>
                      <span className={`font-semibold text-sm ${
                        isActive 
                          ? darkMode ? 'text-white' : 'text-blue-700'
                          : darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>{item.label}</span>
                      {isActive && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          darkMode ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-600'
                        }`}>Active</span>
                      )}
                    </div>
                    <span className={`text-lg font-bold ${
                      isActive 
                        ? darkMode ? 'text-white' : 'text-blue-700'
                        : darkMode ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      {item.value}{item.unit}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Full Width Range Table */}
        {showRangeTable && (
            <div className={`mb-6 rounded-xl border shadow-lg overflow-hidden ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className={`px-6 py-4 border-b ${
                darkMode ? 'bg-blue-600 border-blue-500' : 'bg-blue-500 border-blue-400'
              }`}>
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <span>📊</span>
                  <span>Temperature Range Converter</span>
                </h3>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <label className={`text-sm font-medium ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>From:</label>
                    <input
                      type="number"
                      value={rangeStart}
                      onChange={(e) => setRangeStart(e.target.value)}
                      className={`w-20 px-3 py-2 text-sm rounded-lg border font-medium ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>°C</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className={`text-sm font-medium ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>To:</label>
                    <input
                      type="number"
                      value={rangeEnd}
                      onChange={(e) => setRangeEnd(e.target.value)}
                      className={`w-20 px-3 py-2 text-sm rounded-lg border font-medium ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>°C</span>
                  </div>
                </div>
                <div className={`rounded-lg border overflow-hidden ${
                  darkMode ? 'border-gray-600' : 'border-gray-300'
                }`}>
                  <div className={`max-h-64 overflow-y-auto ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <table className="w-full text-sm">
                      <thead className={`sticky top-0 ${
                        darkMode ? 'bg-gray-800' : 'bg-gray-200'
                      }`}>
                        <tr>
                          <th className={`px-4 py-3 text-left font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Celsius</th>
                          <th className={`px-4 py-3 text-left font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Fahrenheit</th>
                          <th className={`px-4 py-3 text-left font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Kelvin</th>
                          <th className={`px-4 py-3 text-left font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Réaumur</th>
                        </tr>
                      </thead>
                      <tbody>
                        {generateRangeTable().map((row, index) => (
                          <tr key={index} className={`border-t ${
                            darkMode ? 'border-gray-600 hover:bg-gray-650' : 'border-gray-200 hover:bg-white'
                          }`}>
                            <td className={`px-4 py-3 font-medium ${
                              darkMode ? 'text-red-400' : 'text-red-600'
                            }`}>{row.celsius}°C</td>
                            <td className={`px-4 py-3 font-medium ${
                              darkMode ? 'text-blue-400' : 'text-blue-600'
                            }`}>{row.fahrenheit}°F</td>
                            <td className={`px-4 py-3 font-medium ${
                              darkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>{row.kelvin}K</td>
                            <td className={`px-4 py-3 font-medium ${
                              darkMode ? 'text-yellow-400' : 'text-yellow-600'
                            }`}>{row.reamur}°Ré</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
        )}

        {/* Reset and Credits Section */}
        <div className={`rounded-xl shadow-lg border p-4 sm:p-6 mt-6 transition-all duration-300 ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div>
            <button
              onClick={resetConverter}
              className={`w-full py-3 px-6 font-semibold rounded-xl transition-all duration-200 text-sm tracking-wide ${
                darkMode 
                  ? 'bg-gradient-to-r from-gray-700 to-gray-600 text-gray-100 hover:from-gray-600 hover:to-gray-500 shadow-lg'
                  : 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-600 hover:from-gray-200 hover:to-gray-100 shadow-md border border-gray-200'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset Converter
              </span>
            </button>
            
            {/* Credits Toggle */}
            <div className={`mt-6 pt-4 text-center border-t ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <button
                onClick={() => setShowCredits(!showCredits)}
                className={`text-sm font-medium transition-colors duration-200 cursor-pointer ${ 
                  darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {showCredits ? 'Hide Credits' : 'Show Credits'}
              </button>
              
              {showCredits && (
                <div className={`mt-3 transition-all duration-300 ease-in-out ${
                  showCredits ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                }`}>
                  <p className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Built with ❤️ by{' '}
                    <a 
                      href="https://github.com/farkhanmaul" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`font-medium hover:underline ${
                        darkMode ? 'text-blue-400' : 'text-blue-600'
                      }`}
                    >
                      @farkhanmaul
                    </a>
                    {' '}and powered by{' '}
                    <a 
                      href="https://claude.ai" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`font-medium hover:underline ${
                        darkMode ? 'text-purple-400' : 'text-purple-600'
                      }`}
                    >
                      Claude AI
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemperatureConverter;