import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const ValveControlPage = ({ onClose }) => {
  const [isValveOpen, setIsValveOpen] = useState(false);
  const [waterFlowLeft, setWaterFlowLeft] = useState(false);
  const [waterFlowRight, setWaterFlowRight] = useState(false);
  const [sprinklersActive, setSprinklersActive] = useState(false);
  const [processStage, setProcessStage] = useState(0);

  useEffect(() => {
    if (isValveOpen) {
      setWaterFlowLeft(true);
      setProcessStage(1);
      setTimeout(() => {
        setProcessStage(2);
        setWaterFlowRight(true);
      }, 2000);
      setTimeout(() => {
        setSprinklersActive(true);
        setProcessStage(3);
      }, 4000);
    } else {
      setWaterFlowLeft(false);
      setWaterFlowRight(false);
      setSprinklersActive(false);
      setProcessStage(0);
    }
  }, [isValveOpen]);

  const getStatusText = () => {
    switch (processStage) {
      case 0: return "System is off";
      case 1: return "Water flowing from left side";
      case 2: return "Left side blocked. Water flowing from right side";
      case 3: return "Sprinklers active";
      default: return "";
    }
  };

  const getProcessText = () => {
    if (!isValveOpen) return "System is off. Click the switch to start the water flow.";
    if (processStage === 1) return "Water flowing from left side. Stone moving to block...";
    if (processStage >= 2) return "Left side blocked. Water flowing from right side to sprinkler.";
    return "";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Valve Control System</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="mb-4 text-center">
          <button
            className={`px-4 py-2 rounded-full text-white font-bold text-sm ${
              isValveOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            }`}
            onClick={() => setIsValveOpen(!isValveOpen)}
          >
            {isValveOpen ? 'Close Valve' : 'Open Valve'}
          </button>
        </div>

        <div className="mb-2 text-center text-sm font-semibold">
          Status: <span className={isValveOpen ? 'text-green-500' : 'text-red-500'}>{getStatusText()}</span>
        </div>

        <div className="relative mb-4">
          <svg viewBox="0 0 300 200" className="w-full h-auto">
            {/* Left pipe */}
            <path d="M10,100 H120" stroke="#666" strokeWidth="10" fill="none" />
            
            {/* Valve */}
            <g transform="translate(120, 55) scale(1.5)">
              <path fill="#d75c1e" d="M19.779 10.645h8.012v4.529h-8.012z"></path>
              <path fill="#f60" d="M27.791 11.635h-4.849a1.678 1.678 0 0 0-1.678 1.678v1.861h6.527Z"></path>
              <path fill="#556881" d="m31.635 18.616-3.846-3.702h-8.008l-3.846 3.702v4.003h15.7v-4.003z"></path>
              <path fill="#5e738e" d="M27.789 14.914h-6.525l-1.219 1.242a2.726 2.726 0 0 0-.781 1.911 2.888 2.888 0 0 0 2.888 2.888h9.483v-2.339Z"></path>
              <path fill="#556881" d="M47.25 24.7H36.084V37.113H47.25zm-35.766.015v-.02H.75v12.418h10.736v-.02z"></path>
              <path fill="#5e738e" d="M38.92 24.7v5.171a5.623 5.623 0 0 0 5.609 5.623l2.721.007V24.7zM11.484 35.5V24.695H4.079v5.178A5.623 5.623 0 0 0 9.7 35.5z"></path>
              <rect width="17.305" height="2.328" x="15.132" y="8.511" fill="#556881" rx="1.164"></rect>
              <rect width="25.201" height="17.17" x="11.185" y="22.319" fill={isValveOpen ? "#f60" : "#d75c1e"} rx="2.395"></rect>
              <path fill={isValveOpen ? "#ffa511" : "#f60"} d="M36.386 24.715a2.4 2.4 0 0 0-2.4-2.4H14.313a2.376 2.376 0 0 0-.1.646v7.619a7.159 7.159 0 0 0 7.158 7.159h14.915a2.338 2.338 0 0 0 .1-.646Z"></path>
              <path fill="#ffa511" d="M32.735 37.739h-6.3a.75.75 0 0 1 0-1.5h6.305a.4.4 0 0 0 .4-.4V34a.75.75 0 0 1 1.5 0v1.835a1.9 1.9 0 0 1-1.905 1.904zm1.151-5.433a.75.75 0 0 1-.75-.75v-1.092a.75.75 0 1 1 1.5 0v1.092a.75.75 0 0 1-.75.75z"></path>
            </g>
            
            {/* Right pipe */}
            <path d="M190,100 H270" stroke="#666" strokeWidth="10" fill="none" />
            
            {/* Sprinkler stand */}
            <path d="M270,100 V30" stroke="#666" strokeWidth="5" fill="none" />
            
            {/* Sprinkler head (rectangle) */}
            <rect x="260" y="20" width="20" height="10" fill="#666" />
            
            {/* Water droplets */}
            <g className="water-droplets" opacity={sprinklersActive ? "1" : "0"}>
              {[...Array(200)].map((_, i) => (
                <circle key={`droplet-${i}`} r="1.5" fill="#a6d8ff">
                  <animate
                    attributeName="cx"
                    values={`${260 + Math.random() * 20};${210 + Math.random() * 100}`}
                    dur={`${0.5 + Math.random()}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cy"
                    values="30;200"
                    dur={`${0.5 + Math.random()}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
            </g>
            
            {/* Mist effect */}
            
            {/* Blockage */}
            <rect x={processStage >= 2 ? "80" : "140"} y="95" width="15" height="10" fill="#8B4513">
              <animate
                attributeName="x"
                from="140"
                to="80"
                dur="2s"
                begin={isValveOpen ? "0s" : "indefinite"}
                fill="freeze"
              />
            </rect>
            
            {/* Enhanced Water flow animation */}
            <g>
              {/* Left side flow (from start of pipe) */}
              {waterFlowLeft && (
                <g>
                  <rect x="10" y="97.5" width="110" height="5" fill="#4FC3F7">
                    <animate attributeName="width" from="0" to="110" dur="0.5s" repeatCount="indefinite" />
                  </rect>
                  {[...Array(15)].map((_, i) => (
                    <circle key={`flow-left-start-${i}`} r="2" fill="#4FC3F7">
                      <animate
                        attributeName="cx"
                        values="10;120"
                        dur={`${0.5 + Math.random() * 0.5}s`}
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="cy"
                        values={`${98 + Math.random() * 4};${98 + Math.random() * 4}`}
                        dur={`${0.5 + Math.random() * 0.5}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  ))}
                </g>
              )}
              
              {/* Left side flow (after valve) */}
              {waterFlowLeft && (
                <g>
                  <rect x="190" y="97.5" width="20" height="5" fill="#4FC3F7">
                    <animate attributeName="width" from="0" to="20" dur="0.5s" repeatCount="indefinite" />
                  </rect>
                  {[...Array(5)].map((_, i) => (
                    <circle key={`flow-left-${i}`} r="2" fill="#4FC3F7">
                      <animate
                        attributeName="cx"
                        values="190;210"
                        dur={`${0.5 + Math.random() * 0.5}s`}
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="cy"
                        values={`${98 + Math.random() * 4};${98 + Math.random() * 4}`}
                        dur={`${0.5 + Math.random() * 0.5}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  ))}
                </g>
              )}
              
              {/* Right side flow */}
              {waterFlowRight && (
                <g>
                  <rect x="190" y="97.5" width="80" height="5" fill="#4FC3F7">
                    <animate attributeName="width" from="0" to="80" dur="0.5s" repeatCount="indefinite" />
                  </rect>
                  {[...Array(10)].map((_, i) => (
                    <circle key={`flow-right-${i}`} r="2" fill="#4FC3F7">
                      <animate
                        attributeName="cx"
                        values="190;270"
                        dur={`${0.5 + Math.random() * 0.5}s`}
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="cy"
                        values={`${98 + Math.random() * 4};${98 + Math.random() * 4}`}
                        dur={`${0.5 + Math.random() * 0.5}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  ))}
                </g>
              )}
            </g>
          </svg>
        </div>

        <div className="mt-4 text-center text-sm">
          {getProcessText()}
        </div>
      </div>
    </div>
  );
};

export default ValveControlPage;