import { X } from 'lucide-react';
import React, { useState } from 'react';

const EnhancedGardenSprinklerControl = ({ onClose }) => {
  const [isWatering, setIsWatering] = useState(false);

  const toggleWatering = () => {
    setIsWatering(!isWatering);
  };

  const Sprinkler = ({ x, y, rotation }) => (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="-2" y="-30" width="4" height="30" fill="#381f18"/>
      <g transform={`rotate(${rotation})`}>
        <rect x="-10" y="-35" width="20" height="10" fill="#381f18" rx="2"/>
      </g>
      <g className="water-spray" opacity={isWatering ? "1" : "0"}>
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 0 -30`}
            to={`360 0 -30`}
            dur="8s"
            repeatCount="indefinite"
          />
          {[...Array(72)].map((_, i) => {
            const angle = i * 5;
            const startRadius = 10;
            const endRadius = 100;
            const startX = Math.cos(angle * Math.PI / 180) * startRadius;
            const startY = Math.sin(angle * Math.PI / 180) * startRadius;
            const endX = Math.cos(angle * Math.PI / 180) * endRadius;
            const endY = Math.sin(angle * Math.PI / 180) * endRadius;
            const controlX = Math.cos(angle * Math.PI / 180) * (endRadius / 2);
            const controlY = Math.sin(angle * Math.PI / 180) * (endRadius / 2) - 60;
            return (
              <g key={`spray-${i}`}>
                <path 
                  d={`M${startX},${startY} Q${controlX},${controlY} ${endX},${endY}`}
                  stroke="url(#water-gradient)" 
                  fill="none" 
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <animate 
                    attributeName="d" 
                    dur={`${2 + i * 0.01}s`}
                    repeatCount="indefinite"
                    values={`M${startX},${startY} Q${controlX},${controlY} ${endX},${endY};
                             M${startX},${startY} Q${controlX * 1.1},${controlY * 1.1} ${endX * 1.05},${endY * 1.05};
                             M${startX},${startY} Q${controlX},${controlY} ${endX},${endY}`}
                  />
                </path>
                <circle r="1.5" fill="#ffffff">
                  <animateMotion 
                    dur={`${2 + i * 0.01}s`}
                    repeatCount="indefinite"
                    path={`M${startX},${startY} Q${controlX},${controlY} ${endX},${endY}`}
                  />
                </circle>
              </g>
            );
          })}
        </g>
      </g>
    </g>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Garden Sprinkler Control</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="relative h-64 rounded-lg overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" className="w-full h-full">
            <defs>
              <radialGradient id="water-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#a0e6ff" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#4db8ff" stopOpacity="0.2" />
              </radialGradient>
              <clipPath id="scene-clip">
                <rect width="400" height="300" />
              </clipPath>
            </defs>
            
            <image 
              href="/images/hpp.JPG"
              width="400" 
              height="300" 
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#scene-clip)"
            />

            <g id="sprinkler-system">
              <Sprinkler x={100} y={200} rotation={-15} />
              <Sprinkler x={290} y={220} rotation={15} />
            </g>

            <g className="water-droplets" opacity={isWatering ? "1" : "0"}>
              {[...Array(400)].map((_, i) => (
                <g key={`droplet-${i}`}>
                  <circle r="1.5" fill="#ffffff">
                    <animate
                      attributeName="cx"
                      values={`${50 + Math.random() * 300};${25 + Math.random() * 350}`}
                      dur={`${0.5 + Math.random()}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="cy"
                      values="50;250"
                      dur={`${0.5 + Math.random()}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                  <animate
                    attributeName="opacity"
                    values="0;1;0"
                    dur={`${0.5 + Math.random()}s`}
                    repeatCount="indefinite"
                  />
                </g>
              ))}
            </g>

           
            <g className="ripples" opacity={isWatering ? "0.7" : "0"}>
              {[...Array(40)].map((_, i) => (
                <circle key={`ripple-${i}`} r="0" fill="none" stroke="#ffffff" strokeWidth="0.5">
                  <animate
                    attributeName="r"
                    values="0;30"
                    dur={`${2 + Math.random() * 2}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.7;0"
                    dur={`${2 + Math.random() * 2}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cx"
                    values={`${50 + Math.random() * 300}`}
                    dur="0.1s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cy"
                    values="280"
                    dur="0.1s"
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
            </g>
          </svg>
        </div>
        <div className="mt-4 flex justify-center">
          <button 
            onClick={toggleWatering}
            className={`px-6 py-3 rounded-full text-white font-bold text-lg transition-all duration-300 ease-in-out
              ${isWatering 
                ? 'bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800' 
                : 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700'}`}
          >
            {isWatering ? 'Stop Watering' : 'Start Watering'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedGardenSprinklerControl;