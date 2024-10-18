import React, { useState, useEffect } from 'react';
import { User, X } from 'lucide-react';

const GeyserControlSystem = ({ onClose }) => {
  const [isOn, setIsOn] = useState(false);
  const [humanDetected, setHumanDetected] = useState(false);
  const [command, setCommand] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setHumanDetected(Math.random() > 0.5);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (humanDetected && !isOn) {
      setCommand('Human detected. Turning on the geyser...');
      setTimeout(() => {
        setIsOn(true);
        setCommand('Geyser turned on.');
      }, 2000);
    } else if (!humanDetected && isOn) {
      setCommand('No human detected. Turning off the geyser...');
      setTimeout(() => {
        setIsOn(false);
        setCommand('Geyser turned off.');
      }, 5000);
    }
  }, [humanDetected]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Geyser Control System</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-center mb-2">
            <User size={24} className={humanDetected ? "text-green-500" : "text-red-500"} />
            <span className="ml-2">{humanDetected ? "Human Detected" : "No Human Detected"}</span>
          </div>
          <img 
            src={isOn ? "/images/ggn.JPG" : "/images/ggn.JPG"} 
            alt={isOn ? "Geyser On" : "Geyser Off"} 
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
        
        <div className="mb-4">
          <div className={`p-2 rounded-lg ${isOn ? "bg-green-100" : "bg-red-100"}`}>
            <div className={`w-4 h-4 rounded-full ${isOn ? "bg-green-500" : "bg-red-500"} mb-2`}></div>
            <p className="text-sm font-semibold">{isOn ? "Geyser is ON" : "Geyser is OFF"}</p>
          </div>
        </div>
        
        <div className="bg-gray-100 p-2 rounded-lg">
          <p className="text-sm font-semibold">Command:</p>
          <p className="text-sm">{command}</p>
        </div>
      </div>
    </div>
  );
};

export default GeyserControlSystem;