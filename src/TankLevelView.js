import React, { useState, useEffect } from 'react';
import { Droplet } from 'lucide-react';

const TankLevelView = ({ onClose }) => {
  const [tankLevel, setTankLevel] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setTankLevel(prevLevel => {
        const newLevel = prevLevel - 5;
        return newLevel > 0 ? newLevel : 100;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getColor = (level) => {
    if (level > 75) return '#4CAF50'; // Vibrant Green
    if (level > 50) return '#2196F3'; // Bright Blue
    if (level > 25) return '#FFC107'; // Amber
    return '#FF5722'; // Deep Orange
  };

  const getLevelText = (level) => {
    if (level > 75) return 'Full';
    if (level > 50) return 'Sufficient';
    if (level > 25) return 'Moderate';
    return 'Low';
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Water Tank Status</h2>
        <div className="relative h-80 w-56 mx-auto bg-gray-100 rounded-2xl overflow-hidden shadow-inner">
          {/* Tank border */}
          <div className="absolute inset-0 border-4 border-gray-300 rounded-2xl"></div>

          {/* Water */}
          <div
            className="absolute bottom-0 left-0 right-0 transition-all duration-500 ease-in-out"
            style={{
              height: `${tankLevel}%`,
              background: `linear-gradient(0deg, ${getColor(tankLevel)} 0%, ${getColor(tankLevel)}88 100%)`,
            }}
          >
            {/* Water surface animation */}
            <div className="absolute top-0 left-0 right-0 h-3 animate-wave"
              style={{
                background: 'linear-gradient(90deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.7) 100%)',
                backgroundSize: '200% 100%',
                animation: 'wave 3s linear infinite',
              }}
            ></div>
          </div>

          {/* Percentage text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-white drop-shadow-lg mb-2">
              {tankLevel}%
            </span>
            <span className="text-xl font-semibold text-white drop-shadow-md">
              {getLevelText(tankLevel)}
            </span>
          </div>

          {/* Level indicators */}
          <div className="absolute inset-y-0 left-4 w-1 bg-gray-300 rounded-full">
            {[25, 50, 75].map((level) => (
              <div
                key={level}
                className="absolute w-3 h-0.5 bg-gray-500 -left-1"
                style={{ bottom: `${level}%` }}
              ></div>
            ))}
          </div>

          {/* Droplet icon */}
          <div className="absolute top-4 right-4">
            <Droplet
              size={24}
              color={getColor(tankLevel)}
              fill={getColor(tankLevel)}
              className="drop-shadow-md"
            />
          </div>
        </div>
        <div className="mt-4 text-center text-gray-600">
          <p className="font-semibold">{getLevelText(tankLevel)} Water Level</p>
          <p>Current capacity: {tankLevel}%</p>
        </div>
        <button
          onClick={onClose}
          className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 w-full font-semibold text-lg shadow-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TankLevelView;