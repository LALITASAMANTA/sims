import React, { useState, useEffect } from 'react';
import { X, Droplet } from 'lucide-react';

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

const SumpControlSystem = ({ onClose }) => {
  const [waterLevel, setWaterLevel] = useState(0); // Start with empty sump
  const [isIncreasing, setIsIncreasing] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaterLevel(prevLevel => {
        if (isIncreasing) {
          if (prevLevel >= 100) {
            setIsIncreasing(false);
            return 100;
          }
          return Math.min(100, prevLevel + 2); // Increase by 2% each step
        } else {
          if (prevLevel <= 0) {
            setIsIncreasing(true);
            return 0;
          }
          return Math.max(0, prevLevel - 2); // Decrease by 2% each step
        }
      });
    }, 500); // Update every 100ms for smooth animation

    return () => clearInterval(interval);
  }, [isIncreasing]);

  const color = getColor(waterLevel);
  const levelText = getLevelText(waterLevel);
  const isSystemOn = waterLevel > 25; // System is on when water level is above 25%

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-xs w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold"> Sump Control</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <div className="mb-4 flex justify-center">
          <div className="w-24 h-40 bg-gray-100 border-2 border-gray-300 rounded-lg relative overflow-hidden">
            <div 
              className="absolute bottom-0 left-0 right-0 transition-all duration-100"
              style={{ height: `${waterLevel}%`, backgroundColor: color }}
            ></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Droplet size={24} className="text-white mb-1" />
              <span className="text-sm font-bold text-white">{Math.round(waterLevel)}%</span>
            </div>
          </div>
        </div>
        
        <div className={`p-3 rounded-md ${isSystemOn ? 'bg-green-100' : 'bg-red-100'}`}>
          <h3 className="text-sm font-semibold mb-1">
            {isSystemOn ? 'System ON' : 'System OFF'}
          </h3>
          <p className="text-xs">
            Water Level: {levelText} ({Math.round(waterLevel)}%)
            {!isSystemOn && ' - Low water level'}
          </p>
        </div>
        
        <div className="mt-2 text-xs text-gray-600">
          Status: {isIncreasing ? 'Filling' : 'Draining'}
        </div>
      </div>
    </div>
  );
};

export default SumpControlSystem;