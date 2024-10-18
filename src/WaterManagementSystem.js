import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';

const WaterManagementSystem = ({ onClose }) => {
  const [sumpLevel, setSumpLevel] = useState(100);
  const [tankLevel, setTankLevel] = useState(0);
  const [motorOn, setMotorOn] = useState(false);
  const [notification, setNotification] = useState('');
  const [processStarted, setProcessStarted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (motorOn) {
        setSumpLevel(prev => Math.max(0, prev - 5));
        setTankLevel(prev => Math.min(100, prev + 5));
      } else {
        setSumpLevel(prev => Math.min(100, prev + 2));
        setTankLevel(prev => Math.max(0, prev - 2));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [motorOn]);

  useEffect(() => {
    if (tankLevel >= 75 && motorOn) {
      setMotorOn(false);
      setNotification('Tank full. Motor turned off.');
    } else if (tankLevel <= 25 && !motorOn) {
      setMotorOn(true);
      setNotification('Tank low. Motor turned on.');
    }
  }, [tankLevel, motorOn]);

  useEffect(() => {
    if (processStarted) {
      const timer = setTimeout(() => {
        setMotorOn(true);
        setNotification('Motor started automatically after 3 seconds.');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [processStarted]);

  const getColor = (level) => {
    if (level > 75) return '#4CAF50';
    if (level > 50) return '#FFA500';
    if (level > 25) return '#FFFF00';
    return '#FF0000';
  };

  const WaterContainer = ({ level, label }) => (
    <div className="flex flex-col items-center">
      <div className="relative h-64 w-32 bg-gray-300 rounded-lg overflow-hidden border-2 border-gray-500">
        <div
          className="absolute bottom-0 left-0 right-0 transition-all duration-500"
          style={{
            height: `${level}%`,
            backgroundColor: getColor(level),
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-2 animate-wave"
            style={{
              background: 'linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.5) 100%)',
              backgroundSize: '200% 100%',
              animation: 'wave 3s linear infinite',
            }}
          ></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white drop-shadow-lg">
            {level}%
          </span>
        </div>
      </div>
      <span className="mt-2 text-lg font-semibold">{label}</span>
    </div>
  );

  const Motor = () => (
    <div className="flex flex-col items-center">
      <div 
        className={`w-32 h-32 rounded-full border-4 ${motorOn ? 'border-green-500' : 'border-red-500'} flex items-center justify-center relative overflow-hidden`}
        style={{
          background: `url('/images/motor(1).jpeg') center/cover no-repeat`,
        }}
      >
        {motorOn && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full animate-spin" style={{
              background: 'conic-gradient(from 0deg, rgba(0,0,255,0.2) 0%, rgba(0,0,255,0) 25%, rgba(0,0,255,0) 50%, rgba(0,0,255,0.2) 75%, rgba(0,0,255,0.2) 100%)',
            }}></div>
          </div>
        )}
      </div>
      <button
        onClick={() => {
          if (!processStarted) {
            setProcessStarted(true);
            setNotification('Motor will start in 3 seconds...');
          } else {
            setMotorOn(!motorOn);
          }
        }}
        className={`mt-4 px-6 py-2 rounded-full ${motorOn ? 'bg-green-500' : 'bg-red-500'} text-white font-bold transition-colors duration-300`}
      >
        {motorOn ? 'ON' : 'OFF'}
      </button>
    </div>
  );

  const WaterFlow = () => (
    <div className="absolute inset-0 pointer-events-none">
      <div className={`h-full w-1 bg-blue-300 absolute left-1/4 transform -translate-x-1/2 ${motorOn ? 'animate-water-flow' : ''}`}></div>
      <div className={`h-full w-1 bg-blue-300 absolute right-1/4 transform translate-x-1/2 ${motorOn ? 'animate-water-flow' : ''}`}></div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-gray-100 flex flex-col items-center justify-center z-50 p-4">
      <h2 className="text-2xl font-bold mb-8">Water Management System</h2>
      <div className="flex justify-between items-center w-full max-w-3xl mb-8 relative">
        <WaterContainer level={sumpLevel} label="Sump" />
        <Motor />
        <WaterContainer level={tankLevel} label="Tank" />
        <WaterFlow />
      </div>
      {notification && (
        <div className="flex items-center bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4">
          <Bell className="mr-2" />
          <p>{notification}</p>
        </div>
      )}
      <button
        onClick={onClose}
        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Close
      </button>
    </div>
  );
};

export default WaterManagementSystem;