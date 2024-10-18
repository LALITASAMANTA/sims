import React, { useState, useEffect } from 'react';
import { Fan, User, ThermometerSun } from 'lucide-react';

const FanControlSystem = ({ onClose }) => {
  const [isHumanPresent, setIsHumanPresent] = useState(false);
  const [fanSpeed, setFanSpeed] = useState(0);
  const [temperature, setTemperature] = useState(22);

  const speedLevels = [
    { speed: 0, image: "/images/f1.JPG", label: "Off" },
    { speed: 1, image: "/images/Electric Fan.gif", label: "Low" },
    { speed: 3, image: "/images/Ceiling Fan (3).gif", label: "Medium" },
    { speed: 5, image: "/images/Indoor Fan.gif", label: "High" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTemperature(prevTemp => {
        const newTemp = prevTemp + (Math.random() - 0.5);
        return Number(newTemp.toFixed(1));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isHumanPresent) {
      setFanSpeed(0);
    }
  }, [isHumanPresent]);

  const toggleHumanPresence = () => {
    setIsHumanPresent(!isHumanPresent);
  };

  const handleSpeedChange = (speed) => {
    if (isHumanPresent) {
      setFanSpeed(speed);
    } else {
      alert("Please turn on human presence before changing fan speed.");
    }
  };

  const getFanImage = () => {
    const level = speedLevels.find(level => level.speed === fanSpeed) || speedLevels[0];
    return level.image;
  };

  const getSpeedLabel = () => {
    const level = speedLevels.find(level => level.speed === fanSpeed) || speedLevels[0];
    return level.label;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Fan Control System</h2>
        
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <User size={24} className={isHumanPresent ? "text-green-500" : "text-gray-400"} />
            <span className="ml-2">{isHumanPresent ? "Human Present" : "No Human"}</span>
          </div>
          <button 
            onClick={toggleHumanPresence}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            {isHumanPresent ? "Turn Off" : "Turn On"}
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span>Fan Speed: {getSpeedLabel()}</span>
            <Fan 
              size={24} 
              className={`transition-transform ${fanSpeed > 0 ? 'animate-spin' : ''}`} 
              style={{animationDuration: `${5 / (fanSpeed || 1)}s`}}
            />
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {speedLevels.map((level) => (
              <button
                key={level.speed}
                onClick={() => handleSpeedChange(level.speed)}
                className={`px-3 py-1 rounded ${
                  fanSpeed === level.speed ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                } ${!isHumanPresent && 'opacity-50 cursor-not-allowed'}`}
                disabled={!isHumanPresent}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <ThermometerSun size={24} className="text-red-500" />
            <span className="ml-2">Temperature: {temperature}°C</span>
          </div>
        </div>

        <div className="text-center">
          <img 
            src={getFanImage()}
            alt={`Fan Speed: ${getSpeedLabel()}`} 
            className="mx-auto mb-4 w-32 h-32"
          />
        </div>

        <button 
          onClick={onClose}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FanControlSystem;