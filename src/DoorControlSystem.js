import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

const DoorControlSystem = ({ onClose }) => {
  const [doorState, setDoorState] = useState('closed');
  const [personType, setPersonType] = useState(null);

  const simulatePersonApproach = () => {
    const isAuthorized = Math.random() > 0.5;
    setPersonType(isAuthorized ? 'authorized' : 'unauthorized');

    // Initial state
    setDoorState('closed');

    setTimeout(() => {
      if (isAuthorized) {
        setDoorState('opened');
      } else {
        setDoorState('locked');
      }
    }, 3000);
  };

  useEffect(() => {
    simulatePersonApproach();
    const interval = setInterval(simulatePersonApproach, 12000);
    return () => clearInterval(interval);
  }, []);

  // Use placeholder images with a reasonable size
  const openDoorImageUrl = "/images/Businessman going on the Future way (1).gif";
  const closedDoorImageUrl = "/images/Close Door (1).gif";

  const getBgColor = () => {
    switch (doorState) {
      case 'opened':
        return 'bg-green-500';
      case 'closed':
      case 'locked':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Door Control System</h2>
        <div className={`relative h-80 ${getBgColor()} rounded-lg overflow-hidden transition-colors duration-1000`}>
          {/* Door */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src={doorState === 'opened' ? openDoorImageUrl : closedDoorImageUrl} 
              alt={doorState === 'opened' ? "Open Door" : "Closed Door"}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Access Denied Icon */}
          {doorState === 'locked' && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <AlertTriangle size={64} color="white" />
            </div>
          )}
        </div>
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold">
            {doorState === 'closed' && 'Door Closed'}
            {doorState === 'opened' && 'Welcome! Access Granted'}
            {doorState === 'locked' && 'Access Denied! Door Locked'}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            {personType === 'authorized'
              ? 'Authorized person detected.'
              : personType === 'unauthorized'
              ? 'Unauthorized person detected.'
              : 'Detecting person...'}
          </p>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DoorControlSystem;