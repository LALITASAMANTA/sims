import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';

const MotorControlSystem = ({ onClose }) => {
  const [sumpLevel, setSumpLevel] = useState(100);
  const [tankLevel, setTankLevel] = useState(0);
  const [motorOn, setMotorOn] = useState(false);
  const [notification, setNotification] = useState('');
  const [processStarted, setProcessStarted] = useState(false);
  const [command, setCommand] = useState('');

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
    if (tankLevel >= 85 && motorOn) {
      setCommand('Tank level high or sump level low. Turning off motor...');
      setTimeout(() => {
        setMotorOn(false);
        setCommand('Motor turned off.');
      }, 3000);
    } else if (tankLevel <= 25 && !motorOn) {
      setCommand('Tank level low and sump level high. Turning on motor...');
      setTimeout(() => {
        setMotorOn(true);
        setCommand('Motor turned on.');
      }, 3000);
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
      <div className="relative h-28 w-16 bg-gray-300 rounded-lg overflow-hidden border-2 border-gray-500">
        <div
          className="absolute bottom-0 left-0 right-0 transition-all duration-500"
          style={{
            height: `${level}%`,
            backgroundColor: getColor(level),
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 animate-wave"
            style={{
              background: 'linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.5) 100%)',
              backgroundSize: '200% 100%',
              animation: 'wave 3s linear infinite',
            }}
          ></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-white drop-shadow-lg">
            {level}%
          </span>
        </div>
      </div>
      <span className="mt-1 text-xs font-semibold">{label}</span>
    </div>
  );

  const Motor = () => (
    <div className="flex flex-col items-center mx-2">
      <div 
        className={`w-16 h-16 rounded-full border-4 ${motorOn ? 'border-green-500' : 'border-red-500'} flex items-center justify-center relative overflow-hidden`}
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
        className={`mt-2 px-3 py-1 rounded-full ${motorOn ? 'bg-green-500' : 'bg-red-500'} text-white font-bold text-xs transition-colors duration-300`}
      >
        {motorOn ? 'ON' : 'OFF'}
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 m-4 overflow-y-auto max-h-[90vh]">
        <h2 className="text-lg font-bold mb-4 text-center">Water Management System</h2>
        <div className="flex justify-between items-end w-full mb-4">
          <WaterContainer level={sumpLevel} label="Sump" />
          <Motor />
          <WaterContainer level={tankLevel} label="Tank" />
        </div>
        {notification && (
          <div className="flex items-center bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-2 mb-2 w-full">
            <Bell className="mr-2 h-3 w-3" />
            <p className="text-xs">{notification}</p>
          </div>
        )}
        <div className="bg-gray-100 p-2 rounded-lg w-full mb-2">
          <p className="text-xs font-semibold">Status:</p>
          <p className="text-xs">{command}</p>
        </div>
        <button
          onClick={onClose}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600 transition-colors w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MotorControlSystem;