import React, { useState, useEffect } from 'react';
import { Activity, Sun, UserCheck } from 'lucide-react';

const SmartLightControl = ({ onClose }) => {
  const [isLightOn, setIsLightOn] = useState(false);
  const [isHumanPresent, setIsHumanPresent] = useState(false);
  const [isMovementDetected, setIsMovementDetected] = useState(false);

  useEffect(() => {
    let movementTimer, presenceTimer, lightOffTimer;

    if (isMovementDetected) {
      // After movement is detected, show human presence after 1 second
      presenceTimer = setTimeout(() => {
        setIsHumanPresent(true);
        setIsLightOn(true);

        // Remove human presence after 5 seconds
        lightOffTimer = setTimeout(() => {
          setIsHumanPresent(false);
          setIsMovementDetected(false);
          
          // Turn off light after 1 more second
          setTimeout(() => {
            setIsLightOn(false);
          }, 1000);
        }, 5000);
      }, 1000);
    }

    return () => {
      clearTimeout(movementTimer);
      clearTimeout(presenceTimer);
      clearTimeout(lightOffTimer);
    };
  }, [isMovementDetected]);

  const handleMovement = () => {
    setIsMovementDetected(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Smart Light Control</h2>
        <div className="flex justify-center mb-6">
          <div 
            className={`w-32 h-32 rounded-full flex items-center justify-center transition-colors duration-300 ${
              isLightOn ? 'bg-yellow-300' : 'bg-gray-300'
            }`}
          >
            {/* Light image placeholder */}
            <img src="/images/Smart light.gif" alt="Light" className="w-full h-full object-cover rounded-full" />
          </div>
        </div>
        <div className="flex justify-center space-x-4 mb-6">
          <div className="flex flex-col items-center">
            <UserCheck size={32} color={isHumanPresent ? 'green' : 'gray'} />
            <span className="text-sm mt-1">Human Presence</span>
          </div>
          <div className="flex flex-col items-center">
            <Activity size={32} color={isMovementDetected ? 'blue' : 'gray'} />
            <span className="text-sm mt-1">Movement Detected</span>
          </div>
        </div>
        <div className="text-center mb-6">
          <p className="text-lg font-semibold">
            {isLightOn ? 'Light is ON' : 'Light is OFF'}
          </p>
          <p className="text-sm text-gray-600">
            {isHumanPresent ? 'Human presence detected' : 'No human presence'}
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleMovement}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-300"
          >
            Simulate Movement
          </button>
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 text-gray-800 font-bold py-2 px-4 rounded transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmartLightControl;