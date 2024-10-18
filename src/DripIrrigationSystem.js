import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const DripIrrigationSystem = ({ onClose }) => {
  const [isValveOpen, setIsValveOpen] = useState(false);
  const [waterFlow, setWaterFlow] = useState(0);

  useEffect(() => {
    let interval;
    if (isValveOpen) {
      interval = setInterval(() => {
        setWaterFlow(prev => (prev < 100 ? prev + 1 : 100));
      }, 50);
    } else {
      setWaterFlow(0);
    }
    return () => clearInterval(interval);
  }, [isValveOpen]);

  const toggleValve = () => {
    setIsValveOpen(!isValveOpen);
  };

  const Plant = ({ x, y }) => (
    <g transform={`translate(${x}, ${y})`}>
      {/* Stem and leaves */}
      <path d="M0,0 Q-5,-10 -10,-15 T-15,-30" stroke="green" fill="none" strokeWidth="2" />
      <path d="M0,0 Q5,-10 10,-15 T15,-30" stroke="green" fill="none" strokeWidth="2" />
      <path d="M0,0 V-40" stroke="green" strokeWidth="2" />
      <circle cx="-10" cy="-20" r="5" fill="lightgreen" />
      <circle cx="10" cy="-20" r="5" fill="lightgreen" />
      <circle cx="0" cy="-35" r="5" fill="lightgreen" />
      
      {/* Roots */}
      <g className="roots">
        <path d="M0,0 Q-5,5 -10,10 T-15,20" stroke="brown" fill="none" strokeWidth="1" />
        <path d="M0,0 Q5,5 10,10 T15,20" stroke="brown" fill="none" strokeWidth="1" />
        <path d="M0,0 V20" stroke="brown" strokeWidth="1" />
      </g>

      {/* Wet roots (initially hidden) */}
      <g className="wet-roots" opacity="0">
        <path d="M0,0 Q-5,5 -10,10 T-15,20" stroke="#5c4033" fill="none" strokeWidth="2">
          <animate attributeName="opacity" from="0" to="1" dur="2s" begin="indefinite" fill="freeze" id={`wet-root-${x}`} />
        </path>
        <path d="M0,0 Q5,5 10,10 T15,20" stroke="#5c4033" fill="none" strokeWidth="2">
          <animate attributeName="opacity" from="0" to="1" dur="2s" begin="indefinite" fill="freeze" id={`wet-root-${x}`} />
        </path>
        <path d="M0,0 V20" stroke="#5c4033" strokeWidth="2">
          <animate attributeName="opacity" from="0" to="1" dur="2s" begin="indefinite" fill="freeze" />
        </path>
      </g>
    </g>
  );

  const WaterPath = ({ startX, startY, endX, endY, delay }) => {
    const midX = (startX + endX) / 2;
    const midY = startY + (endY - startY) / 3;
    const path = `M${startX},${startY} Q${midX},${midY} ${endX},${endY}`;
    
    return (
      <g>
        {[0, 1, 2, 3].map((index) => (
          <circle key={index} r="2" fill="#1e90ff">
            <animateMotion
              path={path}
              dur="1s"
              begin={`${delay + index * 0.25}s`}
              repeatCount="indefinite"
            >
              <mpath href={`#water-path-${startX}-${endX}`} />
            </animateMotion>
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur="1s"
              begin={`${delay + index * 0.25}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
        <path id={`water-path-${startX}-${endX}`} d={path} stroke="none" fill="none" />
      </g>
    );
  };

  const plantPositions = [1, 2, 3, 4].map(col => 150 + col * 100);
  const lastPlantX = plantPositions[plantPositions.length - 1];
  const mainPipeEndX = lastPlantX + 50;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-green-700">Drip Irrigation System</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <svg viewBox="0 0 600 300" className="w-full h-auto">
          {/* Background */}
          <rect x="0" y="0" width="800" height="300" fill="#f0e6d2" />
          
          {/* Soil */}
          <rect x="0" y="200" width="800" height="100" fill="#926829" />
          
          {/* Valve */}
          <g transform="translate(30, 145) scale(1.8)">
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

          {/* Connecting pipe from valve to main pipe */}
          <path d="M100,200 Q110,200 120,190 T140,180" stroke="black" strokeWidth="4" fill="none" />

          {/* Main pipe */}
          <line x1="140" y1="180" x2={mainPipeEndX} y2="180" stroke="black" strokeWidth="4" />

          {/* Vertical pipes and plants */}
          {plantPositions.map((x, index) => {
            const y = 200;
            return (
              <g key={`plant-${index}`}>
                <line x1={x} y1="180" x2={x} y2={y} stroke="black" strokeWidth="2" />
                <circle cx={x} cy={y} r="2" fill="black" />
                <Plant x={x} y={y} />
                {isValveOpen && (
                  <>
                    <WaterPath startX={x} startY={180} endX={x} endY={y} delay={index * 0.28} />
                    <WaterPath startX={x} startY={y} endX={x-15} endY={y+20} delay={index * 0.28 + 0.5} />
                    <WaterPath startX={x} startY={y} endX={x+15} endY={y+20} delay={index * 0.28 + 0.5} />
                    <WaterPath startX={x} startY={y} endX={x} endY={y+20} delay={index * 0.28 + 0.5} />
                    <animate
                      xlinkHref={`#wet-root-${x}`}
                      attributeName="begin"
                      from="indefinite"
                      to="0s"
                      dur="0.1s"
                      begin={`${index * 0.25 + 1}s`}
                      fill="freeze"
                    />
                  </>
                )}
              </g>
            );
          })}

          {/* Flowing water */}
          {isValveOpen && (
            <g>
              <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e90ff" stopOpacity="0.2">
                  <animate attributeName="offset" from="-1" to="1" dur="2s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" stopColor="#1e90ff" stopOpacity="0.7">
                  <animate attributeName="offset" from="-0.5" to="1.5" dur="2s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#1e90ff" stopOpacity="0.2">
                  <animate attributeName="offset" from="0" to="2" dur="2s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
              <path d={`M100,200 Q110,200 120,190 T140,180 L${mainPipeEndX},180`} fill="none" stroke="url(#waterGradient)" strokeWidth="6" />
              
              {/* Additional water flow inside the pipe */}
              <g>
                {[0, 1, 2, 3, 4, 5].map((_, index) => (
                  <circle key={index} r="3" fill="#1e90ff">
                    <animateMotion
                      path={`M100,200 Q110,200 120,190 T140,180 L${mainPipeEndX},180`}
                      dur="3s"
                      begin={`${index * 0.5}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                ))}
              </g>
            </g>
          )}
        </svg>
        
        <div className="mt-4 flex justify-center">
          <button
            onClick={toggleValve}
            className={`px-6 py-2 rounded-full text-white font-bold transition-colors duration-300 ${
              isValveOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isValveOpen ? 'Turn Off Valve' : 'Turn On Valve'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DripIrrigationSystem;