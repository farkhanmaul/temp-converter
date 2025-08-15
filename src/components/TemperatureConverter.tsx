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

const temperatureFunFacts = [
  {
    emoji: '🥶',
    fact: 'Nol mutlak (-273.15°C) adalah suhu terdingin yang mungkin dicapai dimana semua gerakan molekul berhenti!'
  },
  {
    emoji: '☀️',
    fact: 'Suhu inti Matahari mencapai sekitar 15 juta°C - cukup panas untuk menyatukan atom hidrogen!'
  },
  {
    emoji: '🌡️',
    fact: 'Termometer raksa dapat mengukur suhu dari -39°C hingga 357°C sebelum raksa membeku atau mendidih.'
  },
  {
    emoji: '❄️',
    fact: 'Suhu terdingin yang pernah dicatat di Antartika adalah -89.2°C di Stasiun Vostok pada tahun 1983.'
  },
  {
    emoji: '🔥',
    fact: 'Petir dapat mencapai suhu 30.000°C - 5 kali lebih panas dari permukaan Matahari!'
  },
  {
    emoji: '🧊',
    fact: 'Es sebenarnya memiliki 19 struktur kristal berbeda tergantung kondisi suhu dan tekanan.'
  },
  {
    emoji: '🌊',
    fact: 'Air memiliki densitas maksimum pada suhu 4°C, itulah mengapa es mengapung di atas air!'
  },
  {
    emoji: '🦅',
    fact: 'Burung memiliki suhu tubuh lebih tinggi dari manusia - biasanya sekitar 40-42°C.'
  },
  {
    emoji: '🏜️',
    fact: 'Suhu udara terpanas yang pernah tercatat di Bumi adalah 54.4°C di Death Valley, California.'
  },
  {
    emoji: '🌌',
    fact: 'Suhu luar angkasa sekitar 2.7 Kelvin (-270.45°C), sedikit di atas nol mutlak!'
  },
  {
    emoji: '🌋',
    fact: 'Lava gunung berapi dapat mencapai suhu 1.200°C, lebih panas dari titik lebur tembaga!'
  },
  {
    emoji: '🔬',
    fact: 'Nitrogen cair memiliki suhu -196°C dan sering digunakan untuk eksperimen kriogenik.'
  },
  {
    emoji: '🌡️',
    fact: 'Suhu tubuh manusia normal adalah 37°C, tetapi dapat bervariasi 0.5°C sepanjang hari.'
  },
  {
    emoji: '🧪',
    fact: 'Air mendidih pada suhu yang berbeda tergantung ketinggian - di puncak Everest air mendidih pada 72°C!'
  },
  {
    emoji: '🔥',
    fact: 'Api lilin biasa memiliki suhu sekitar 1000°C di bagian inti yang berwarna biru.'
  }
];

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
  const [showCredits, setShowCredits] = useState(false);
  const [selectedResultUnit, setSelectedResultUnit] = useState<TemperatureUnit | null>(null);
  const [currentFactIndex, setCurrentFactIndex] = useState(() => Math.floor(Math.random() * temperatureFunFacts.length));

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
    } relative`}>
      {/* Dark Mode Toggle - Fixed Position */}
      <div className="fixed top-6 right-6 z-50">
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
      
      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-4 max-w-4xl">
        {/* Main Title - At the top */}
        <div className="text-center mb-4">
        <h1 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-1 transition-colors duration-300 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          🌡️ Temperature Converter
        </h1>
        <p className={`text-xs sm:text-sm lg:text-base transition-colors duration-300 ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Convert temperatures instantly & accurately
        </p>
        {/* Small Credits */}
        <div className={`text-xs mt-1 transition-colors duration-300 ${
          darkMode ? 'text-gray-500' : 'text-gray-400'
        }`}>
          <div className="flex flex-row items-center justify-center gap-1">
            <span>by{' '}
              <a 
                href="https://github.com/farkhanmaul" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`font-medium hover:underline transition-colors ${
                  darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                @farkhanmaul
              </a>
            </span>
            <span>•</span>
            <span>
              <a 
                href="https://claude.ai" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`font-medium hover:underline transition-colors ${
                  darkMode ? 'text-orange-400 hover:text-orange-300' : 'text-orange-600 hover:text-orange-700'
                }`}
              >
                Claude AI
              </a>
            </span>
          </div>
        </div>
      </div>

        {/* Main Input Card */}
        <div className={`rounded-xl shadow-lg border p-4 transition-all duration-300 ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          {/* Input and Unit Selection - Stack on mobile */}
          <div className="space-y-4">
            {/* Temperature Input Section */}
            <div className="space-y-2">
              <label className={`block text-sm font-medium ${
                darkMode ? 'text-white' : 'text-gray-700'
              }`}>
                Temperature Value
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder="Enter value"
                  className={`flex-1 px-3 py-2 border rounded-lg transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                    darkMode 
                      ? 'bg-white/10 border-white/30 text-white placeholder-gray-300' 
                      : 'bg-white/90 border-gray-300 text-gray-800 placeholder-gray-500'
                  }`}
                />
                <button
                  onClick={resetConverter}
                  className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 text-sm whitespace-nowrap flex items-center gap-1 ${
                    darkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300'
                  }`}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Reset</span>
                </button>
              </div>
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

            {/* Unit Selection Section */}
            <div className="space-y-2">
              <label className={`block text-sm font-medium ${
                darkMode ? 'text-white' : 'text-gray-700'
              }`}>
                From Unit
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['celsius', 'fahrenheit', 'kelvin', 'reamur'] as TemperatureUnit[]).map((unit) => (
                  <button
                    key={unit}
                    onClick={() => handleUnitChange(unit)}
                    className={`py-2 px-3 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                      fromUnit === unit
                        ? 'bg-blue-500 text-white shadow-md transform scale-105'
                        : darkMode
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
                    }`}
                  >
                    {unit === 'celsius' ? '°C' : unit === 'fahrenheit' ? '°F' : unit === 'kelvin' ? 'K' : '°Ré'}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setShowRangeTable(!showRangeTable);
                    if (showCredits) setShowCredits(false);
                  }}
                  className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium transition-all text-sm cursor-pointer ${
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
                  <span className="hidden sm:inline">Range Table</span>
                  <span className="sm:hidden">Range</span>
                </button>
                <button
                  onClick={() => {
                    setShowCredits(!showCredits);
                    if (showRangeTable) setShowRangeTable(false);
                  }}
                  className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium transition-all text-sm cursor-pointer ${
                    showCredits 
                      ? darkMode
                        ? 'bg-green-600 text-white shadow-lg'
                        : 'bg-green-500 text-white shadow-md'
                      : darkMode 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600' 
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm'
                  }`}
                >
                  <span>🎉</span>
                  <span className="hidden sm:inline">Fun Facts</span>
                  <span className="sm:hidden">Facts</span>
                </button>
              </div>
            </div>
          </div>

        </div>


        {/* Result Info Popup */}
        {selectedResultUnit && (
          <>
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 ease-in-out"
              onClick={() => setSelectedResultUnit(null)}
            />
            
            {/* Popup */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className={`max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-xl border shadow-2xl transform transition-all duration-300 ease-out scale-100 ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className={`px-6 py-4 border-b flex items-center justify-between ${
                  darkMode ? 'bg-blue-600 border-blue-500' : 'bg-blue-500 border-blue-400'
                }`}>
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <span>ℹ️</span>
                    <span>{temperatureInfo[selectedResultUnit].name}</span>
                  </h3>
                  <button
                    onClick={() => setSelectedResultUnit(null)}
                    className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                  <div className={`p-4 rounded-lg border ${
                    darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className={`font-semibold text-sm mb-2 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {temperatureInfo[selectedResultUnit].name} ({temperatureInfo[selectedResultUnit].symbol})
                    </div>
                    <p className={`text-sm leading-relaxed mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {temperatureInfo[selectedResultUnit].description}
                    </p>
                    <div className={`text-xs space-y-1 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <div><strong>Formula:</strong> {temperatureInfo[selectedResultUnit].formula}</div>
                      <div><strong>Origin:</strong> {temperatureInfo[selectedResultUnit].origin}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Fun Facts Popup */}
        {showCredits && (
          <>
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 ease-in-out"
              onClick={() => setShowCredits(false)}
            />
            
            {/* Popup */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className={`max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-xl border shadow-2xl transform transition-all duration-300 ease-out scale-100 ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className={`px-6 py-4 border-b flex items-center justify-between ${
                  darkMode ? 'bg-blue-600 border-blue-500' : 'bg-blue-500 border-blue-400'
                }`}>
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <span>🎉</span>
                    <span>Temperature Fun Facts</span>
                  </h3>
                  <button
                    onClick={() => setShowCredits(false)}
                    className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                  <div className="space-y-4">
                    {/* Show current fact */}
                    <div className={`p-6 rounded-lg border transform transition-all duration-300 ease-out hover:scale-[1.02] text-center ${
                      darkMode ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-700' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}>
                      <div className="text-4xl mb-4">{temperatureFunFacts[currentFactIndex].emoji}</div>
                      <h3 className={`font-semibold text-lg mb-3 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>Fakta Menarik Hari Ini!</h3>
                      <p className={`text-sm leading-relaxed ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {temperatureFunFacts[currentFactIndex].fact}
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <p className={`text-xs mb-4 ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Klik tombol di bawah untuk melihat fakta lainnya!
                      </p>
                    </div>
                  </div>
                  
                  {/* Random fact button */}
                  <div className="mt-6 text-center">
                    <button
                      onClick={() => {
                        let newIndex;
                        do {
                          newIndex = Math.floor(Math.random() * temperatureFunFacts.length);
                        } while (newIndex === currentFactIndex && temperatureFunFacts.length > 1);
                        setCurrentFactIndex(newIndex);
                      }}
                      className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                        darkMode 
                          ? 'bg-green-600 hover:bg-green-500 text-white shadow-lg hover:shadow-xl' 
                          : 'bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg'
                      }`}
                    >
                      🎲 Fakta Acak
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
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
                    onClick={() => setSelectedResultUnit(item.key as TemperatureUnit)}
                    className={`flex justify-between items-center p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
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

        {/* Range Table Popup */}
        {showRangeTable && (
          <>
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 ease-in-out"
              onClick={() => setShowRangeTable(false)}
            />
            
            {/* Popup */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className={`max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-xl border shadow-2xl transform transition-all duration-300 ease-out scale-100 ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className={`px-6 py-4 border-b flex items-center justify-between ${
                  darkMode ? 'bg-blue-600 border-blue-500' : 'bg-blue-500 border-blue-400'
                }`}>
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <span>📊</span>
                    <span>Temperature Range Converter</span>
                  </h3>
                  <button
                    onClick={() => setShowRangeTable(false)}
                    className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 opacity-0 animate-slideInUp" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
                    <div className="flex items-center gap-2">
                      <label className={`text-sm font-medium whitespace-nowrap ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>From:</label>
                      <input
                        type="number"
                        value={rangeStart}
                        onChange={(e) => setRangeStart(e.target.value)}
                        className={`w-24 px-3 py-2 text-sm rounded-lg border font-medium transition-all duration-200 focus:ring-2 focus:ring-blue-400 ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-400'
                        }`}
                      />
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>°C</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className={`text-sm font-medium whitespace-nowrap ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>To:</label>
                      <input
                        type="number"
                        value={rangeEnd}
                        onChange={(e) => setRangeEnd(e.target.value)}
                        className={`w-24 px-3 py-2 text-sm rounded-lg border font-medium transition-all duration-200 focus:ring-2 focus:ring-blue-400 ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-400'
                        }`}
                      />
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>°C</span>
                    </div>
                  </div>
                  <div className={`rounded-lg border overflow-hidden opacity-0 animate-slideInUp ${
                    darkMode ? 'border-gray-600' : 'border-gray-300'
                  }`} style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
                    <div className={`max-h-80 overflow-y-auto overflow-x-hidden ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}>
                      <table className="w-full text-sm table-fixed">
                        <thead className={`sticky top-0 z-10 ${
                          darkMode ? 'bg-gray-800 shadow-md' : 'bg-gray-200 shadow-sm'
                        }`}>
                          <tr>
                            <th className={`w-1/4 px-2 py-4 text-left font-semibold border-b-2 text-xs sm:text-sm ${darkMode ? 'text-white border-gray-600' : 'text-gray-900 border-gray-300'}`}>°C</th>
                            <th className={`w-1/4 px-2 py-4 text-left font-semibold border-b-2 text-xs sm:text-sm ${darkMode ? 'text-white border-gray-600' : 'text-gray-900 border-gray-300'}`}>°F</th>
                            <th className={`w-1/4 px-2 py-4 text-left font-semibold border-b-2 text-xs sm:text-sm ${darkMode ? 'text-white border-gray-600' : 'text-gray-900 border-gray-300'}`}>K</th>
                            <th className={`w-1/4 px-2 py-4 text-left font-semibold border-b-2 text-xs sm:text-sm ${darkMode ? 'text-white border-gray-600' : 'text-gray-900 border-gray-300'}`}>°Ré</th>
                          </tr>
                        </thead>
                        <tbody>
                          {generateRangeTable().map((row, index) => (
                            <tr 
                              key={index} 
                              className={`border-t transition-all duration-200 hover:scale-[1.01] ${
                                darkMode ? 'border-gray-600 hover:bg-gray-600/50' : 'border-gray-200 hover:bg-blue-50'
                              }`}
                              style={{
                                animationDelay: `${300 + index * 50}ms`,
                                animation: 'fadeInScale 0.4s ease-out forwards',
                                opacity: 0,
                                transform: 'scale(0.95)'
                              }}
                            >
                              <td className={`w-1/4 px-2 py-3 font-medium transition-colors duration-200 text-xs sm:text-sm truncate ${
                                darkMode ? 'text-red-400' : 'text-red-600'
                              }`}>{row.celsius}</td>
                              <td className={`w-1/4 px-2 py-3 font-medium transition-colors duration-200 text-xs sm:text-sm truncate ${
                                darkMode ? 'text-blue-400' : 'text-blue-600'
                              }`}>{row.fahrenheit}</td>
                              <td className={`w-1/4 px-2 py-3 font-medium transition-colors duration-200 text-xs sm:text-sm truncate ${
                                darkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}>{row.kelvin}</td>
                              <td className={`w-1/4 px-2 py-3 font-medium transition-colors duration-200 text-xs sm:text-sm truncate ${
                                darkMode ? 'text-yellow-400' : 'text-yellow-600'
                              }`}>{row.reamur}</td>
                            </tr>
                          ))}
                        </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </>
        )}

      </div>
    </div>
  );
};

export default TemperatureConverter;