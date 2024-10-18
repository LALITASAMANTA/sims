import React, { useState, useEffect } from 'react';
import { Snowflake, Sun, Wind, Power, X, Plus, Minus, Thermometer } from 'lucide-react';

const ACControlSystem = ({ onClose }) => {
  const [power, setPower] = useState(false);
  const [temperature, setTemperature] = useState(24);
  const [mode, setMode] = useState('cool');
  const [fanSpeed, setFanSpeed] = useState('auto');
  const [isHumanPresent, setIsHumanPresent] = useState(false);
  const [autoControl, setAutoControl] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHumanPresent = Math.random() > 0.5;
      setIsHumanPresent(newHumanPresent);
      
      if (autoControl) {
        setPower(newHumanPresent);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [autoControl]);

  const handlePower = () => setPower(!power);
  const handleTemperatureChange = (newTemp) => {
    setTemperature(Math.min(Math.max(newTemp, 16), 30));
  };

  const getTemperatureColor = (temp) => {
    const percentage = (temp - 16) / (30 - 16);
    const hue = ((1 - percentage) * 240).toFixed(0);
    return `hsl(${hue}, 100%, 50%)`;
  };

  const ModeButton = ({ modeName, icon }) => (
    <button
      onClick={() => setMode(modeName)}
      className={`flex flex-col items-center justify-center w-12 h-12 rounded-full ${
        mode === modeName
          ? modeName === 'cool'
            ? 'bg-blue-500'
            : modeName === 'heat'
            ? 'bg-red-500'
            : 'bg-green-500'
          : 'bg-gray-200'
      } text-white`}
    >
      {icon}
      <span className="text-xs mt-1">{modeName}</span>
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 w-full max-w-sm">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold">AC Control</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm">Power</span>
            <button
              onClick={handlePower}
              className={`p-1 rounded-full ${power ? 'bg-green-500' : 'bg-red-500'} text-white`}
            >
              <Power size={20} />
            </button>
          </div>

          <div className="space-y-2">
            <div className="h-24 bg-white rounded-lg flex items-center justify-center">
              <img
                src={power ? (isHumanPresent ? "/images/ac.gif?text=AC+ON+Human" : "/images/aa.JPG?text=AC+ON+No+Human") : "/images/aa.JPG?text=AC+OFF"}
                alt={power ? (isHumanPresent ? "AC ON (Human)" : "AC ON (No Human)") : "AC OFF"}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className={`text-center p-1 rounded text-xs ${isHumanPresent ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {isHumanPresent ? 'Human Detected' : 'No Human Detected'}
            </div>
          </div>

          <div className="relative w-40 h-40 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-2xl font-bold" style={{ color: getTemperatureColor(temperature) }}>
                {temperature}°C
              </div>
            </div>
            <div
              className="absolute w-0.5 h-6 bg-black rounded-full origin-bottom"
              style={{
                left: '50%',
                bottom: '50%',
                transform: `rotate(${((temperature - 16) / 14) * 270 - 135}deg)`
              }}
            ></div>
          </div>

          <div className="flex justify-center items-center space-x-2">
            <button 
              onClick={() => handleTemperatureChange(temperature - 1)}
              className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
            >
              <Minus size={16} />
            </button>
            <button 
              className={`flex items-center justify-center w-10 h-10 rounded-full text-white`}
              style={{ backgroundColor: getTemperatureColor(temperature) }}
            >
              <Thermometer size={20} />
            </button>
            <button 
              onClick={() => handleTemperatureChange(temperature + 1)}
              className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="flex justify-around">
            <ModeButton modeName="cool" icon={<Snowflake size={16} />} />
            <ModeButton modeName="heat" icon={<Sun size={16} />} />
            <ModeButton modeName="fan" icon={<Wind size={16} />} />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm">Fan Speed</span>
            <select
              value={fanSpeed}
              onChange={(e) => setFanSpeed(e.target.value)}
              className="border rounded p-1 text-sm"
            >
              <option value="auto">Auto</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ACControlSystem;