import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { Menu, X, Search, Home, Settings, Bell, User, LogOut, Folder, Minus, Plus } from 'lucide-react';
import TankLevelView from './TankLevelView';
import WaterManagementSystem from './WaterManagementSystem';
import DripIrrigationSystem from './DripIrrigationSystem';
import "./App.css";
import AnimatedDroneSprinklerControl from './AnimatedDroneSprinklerControl';
import ValveControlPage from './ValveControlPage';
import SmartLightControl from './SmartLightControl';
import DoorControlSystem from './DoorControlSystem';
import FanControlSystem from './FanControlSystem';
import ACControlSystem from './ACControlSystem';
import GeyserControlSystem from './GeyserControlSystem';
import SumpControlSystem from './SumpControlSystem';
import MotorControlSystem from './MotorControlSystem';
import IconGridManagement from './IconGridManagement';





const isTouchDevice = () => {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  );
};

const backendForDND = isTouchDevice() ? TouchBackend : HTML5Backend;

const DragPreview = ({ name }) => {
  return (
    <div className="bg-white p-2 rounded shadow-md">
      {name}
    </div>
  );
};


const Icon = ({ id, name, index, moveIcon, toggleDevice, isActive, imageUrl, gradient, color, imageShape = 'square', room }) => {
  const [showWaterManagement, setShowWaterManagement] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'icon',
    item: { id, name, index, room },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: 'icon',
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveIcon(dragIndex, hoverIndex, room);
      item.index = hoverIndex;
    },
  }));

  const ref = React.useRef(null);
  const dragDropRef = drag(drop(ref));

  const handleClick = () => {
    if (name === 'Water Motors') {
      setShowWaterManagement(true);
    } else {
      toggleDevice(name);
    }
  };

  const getImageShapeClass = (shape) => {
    switch (shape) {
      case 'round':
        return 'rounded-full';
      case 'square':
        return 'rounded-lg';
      case 'hexagon':
        return 'clip-path-hexagon';
      default:
        return 'rounded-lg';
    }
  };

  const imageShapeClass = getImageShapeClass(imageShape);


  const isAC = name === 'AC';
  const iconSize = isAC ? 'h-24 w-24' : 'h-16 w-16';
  const fontSize = isAC ? 'text-sm' : 'text-xs';
  return (
    <div 
      ref={(node) => drag(drop(node))} 
      className="flex flex-col items-center touch-none"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div 
        onClick={() => toggleDevice(name)}
        className={`p-2 rounded-lg shadow-md flex items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-lg`}
        style={{
          height: '64px',
          width: '64px',
          background: gradient,
          borderColor: isActive ? color : 'transparent',
          borderWidth: '2px',
          borderStyle: 'solid',
        }}
      >
        <div className={`w-full h-full overflow-hidden ${imageShapeClass}`}>
          <img src={imageUrl} alt={name} className={`w-full h-full object-cover ${imageShapeClass}`} />
        </div>
      </div>
      <span className="mt-2 text-xs font-medium text-center text-white">
        {name}
      </span>
    </div>
  );
}

const FolderIcon = ({ toggleFolder }) => (
  <div 
    onClick={toggleFolder}
    className="flex flex-col items-center cursor-pointer"
  >
    <div 
      className="p-2 rounded-lg shadow-md flex items-center justify-center transition-all duration-300 hover:shadow-lg"
      style={{
        height: '64px',
        width: '64px',
        background: 'linear-gradient(45deg, #fceabb, #f8b500)',
        borderColor: 'transparent',
        borderWidth: '2px',
        borderStyle: 'solid',
      }}
    >
      <Folder size={40} color="#FFC107" />
    </div>
    <span className="mt-2 text-xs font-medium text-center text-white">
      Folder
    </span>
  </div>
);
const FolderContent = ({ folderIcons, toggleDevice, addNewIcon, removeIcon, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto relative text-black">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold mb-4">Folder Contents</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          
          {folderIcons.map((icon) => (
            <div key={icon.id} className="relative">
              <div className="flex flex-col items-center">
                <div 
                  onClick={() => toggleDevice(icon.name)}
                  className={`p-2 rounded-lg shadow-md flex items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-lg`}
                  style={{
                    height: '64px',
                    width: '64px',
                    background: icon.gradient,
                    borderColor: 'transparent',
                    borderWidth: '2px',
                    borderStyle: 'solid',
                  }}
                >
                  <div className={`w-full h-full overflow-hidden ${icon.imageShape === 'round' ? 'rounded-full' : 'rounded-lg'}`}>
                    <img src={icon.imageUrl} alt={icon.name} className={`w-full h-full object-cover ${icon.imageShape === 'round' ? 'rounded-full' : 'rounded-lg'}`} />
                  </div>
                </div>
                <span className="mt-2 text-xs font-medium text-center text-black block">
                  {icon.name}
                </span>
              </div>
              <button
                onClick={() => removeIcon(icon.id)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
              >
                <Minus size={12} />
              </button>
            </div>
          ))}
          <div 
            onClick={addNewIcon}
            className="flex flex-col items-center justify-center cursor-pointer bg-gray-200 rounded-lg p-2"
            style={{ height: '64px', width: '64px' }}
          >
            <Plus size={32} />
            <span className="text-xs mt-1 text-black">Add</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddNewIconModal = ({ availableIcons, onAddIcon, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto text-black">
        <h2 className="text-xl font-bold mb-4">Add New Icon</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {availableIcons.map((icon) => (
            <div key={icon.id} onClick={() => onAddIcon(icon)} className="cursor-pointer">
              <div className="flex flex-col items-center">
                <div 
                  className={`p-2 rounded-lg shadow-md flex items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-lg`}
                  style={{
                    height: '64px',
                    width: '64px',
                    background: icon.gradient,
                    borderColor: 'transparent',
                    borderWidth: '2px',
                    borderStyle: 'solid',
                  }}
                >
                  <div className={`w-full h-full overflow-hidden ${icon.imageShape === 'round' ? 'rounded-full' : 'rounded-lg'}`}>
                    <img src={icon.imageUrl} alt={icon.name} className={`w-full h-full object-cover ${icon.imageShape === 'round' ? 'rounded-full' : 'rounded-lg'}`} />
                  </div>
                </div>
                <span className="mt-2 text-xs font-medium text-center text-black block">
                  {icon.name}
                </span>
              </div>
            </div>
          ))}
        </div>
        <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  );
};


 const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
      <div className={`fixed top-0 left-0 h-full bg-green-100 text-gray-800 transition-all duration-300 ${isOpen ? 'w-64' : 'w-0'} overflow-hidden shadow-lg z-50`}>
        <button onClick={toggleSidebar} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
          <X size={24} />
        </button>
        <div className="p-4 mt-12">
          <h2 className="text-xl font-bold mb-4">Menu</h2>
          <ul>
            <li className="mb-4 flex items-center"><Home size={20} className="mr-2" /> Dashboard</li>
            <li className="mb-4 flex items-center"><Settings size={20} className="mr-2" /> Settings</li>
            <li className="mb-4 flex items-center"><User size={20} className="mr-2" /> Profile</li>
            <li className="mb-4 flex items-center"><Bell size={20} className="mr-2" /> Notifications</li>
          </ul>
        </div>
      </div>
    );
  };
  
  const TemperatureDisplay = ({ room, temperature }) => {
    const getTemperatureColor = (temp) => {
      if (temp < 18) return 'text-blue-500';
      if (temp > 25) return 'text-red-500';
      return 'text-green-500';
    };
  
    return (
      <div className="bg-white px-2 py-1 rounded-lg shadow-md mr-2 text-xs whitespace-nowrap">
        <span className="font-medium">{room}:</span>
        <span className={`ml-1 font-bold ${getTemperatureColor(temperature)}`}>
          {temperature}°C
        </span>
      </div>
    );
  };
const BottomNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = ['Dashboard', 'LivingRoom', 'Bathroom', 'Garden', 'Utility'];

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center">
      <div className="container mx-auto px-4 mb-4">
        <div className="bg-gray-800 shadow-lg rounded-t-lg px-2 py-1 flex justify-center space-x-1">
          {tabs.map((tab) => (
            <button 
              key={tab}
              className={`px-2 py-1 rounded-md text-xs transition-colors duration-200 ${
                activeTab === tab 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const EventsDisplay = ({ events, currentDate }) => {
  const getGradientColor = () => {
    const colors = [
      'from-purple-500 to-pink-500',
      'from-blue-500 to-indigo-500',
      'from-green-500 to-teal-500',
      'from-yellow-500 to-orange-500',
      'from-teal-500 to-pink-500' 
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="w-full bg-opacity-90 bg-gray-700 p-2 rounded-b-lg shadow-md text-white overflow-x-auto duration-300 cursor-pointer bg-gradient-to-r from-purple-500 to-blue-500">
      <div className="flex items-center space-x-4">
        <span className="font-bold">{currentDate}</span>
        {events.map((event, index) => (
          <div 
            key={index}
            className={`px-3 py-1 rounded-full text-sm transition-all 
              ${event.isImportant ? 'bg-lightpink-500' : 'bg-blue-500'}
              hover:bg-gradient-to-r hover:${getGradientColor()}`}
          >
            {event.name}
          </div>
        ))}
      </div>
    </div>
  );
};

const ThoughtOfDay = ({ quote }) => {
  return (
    <div className="thought-of-day w-full max-w-md mx-auto bg-white bg-opacity-75 rounded-md shadow-md p-4 transition-all duration-300 hover:shadow-lg hover:bg-opacity-100 hover:bg-teal-100">
      <h3 className="text-sm font-bold mb-2 text-center">Thought of the Day...!!!</h3>
      <q className="text-sm italic block text-center">{quote.text}</q>
      <p className="text-xs text-right mt-2">- {quote.author}</p>
    </div>
  );
};


const RoomPage = ({ room, icons, moveIcon, toggleDevice, activeDevices, searchTerm }) => {
  const filteredIcons = icons.filter(icon => 
    icon.room === room && icon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredIcons.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-white text-lg">No icons found in this room.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
      {filteredIcons.map((icon) => (
        <Icon 
          key={icon.id}
          id={icon.id}
          name={icon.name} 
          moveIcon={moveIcon} 
          toggleDevice={toggleDevice}
          isActive={activeDevices[icon.name]}
          imageUrl={icon.imageUrl}
          gradient={icon.gradient}
          color={icon.color}
          imageShape={icon.imageShape}
          room={icon.room}
          size={icon.name === 'AC' ? 'large' : 'normal'}
        />
      ))}
    </div>
  );
};

const App = () => {
  const [showTankLevel, setShowTankLevel] = useState(false);
  const [showSprinklerControl, setShowSprinklerControl] = useState(false);
  const [showValveControl, setShowValveControl] = useState(false);
  const [showDripIrrigationSystem, setShowDripIrrigationSystem] = useState(false);
  const [showSmartLightControl, setShowSmartLightControl] = useState(false);
  const [showDoorControlSystem, setShowDoorControlSystem] = useState(false);
  const [showGeyserControl, setShowGeyserControl] = useState(false);
  const [showSumpControl, setShowSumpControl] = useState(false);
  const [showMotorControl, setShowMotorControl] = useState(false);
const [currentDate, setCurrentDate] = useState('');
const [showACControl, setShowACControl] = useState(false);
  const [events, setEvents] = useState([]);
  const [quote, setQuote] = useState({ text: '', author: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [password, setPassword] = useState('');
 
 
  const [showFanControl, setShowFanControl] = useState(false);
const [showFolderContents, setShowFolderContents] = useState(false);
 
  const [icons, setIcons] = useState([
    { id: 1, name: 'AC', imageUrl: "/images/air-conditioner.png", gradient: 'linear-gradient(45deg, #a7c6ed, #5e8d9b)', color: '#FFC107', room: 'LivingRoom', imageShape: 'square' },
    { id: 2, name: 'Smart Lights', imageUrl: '/images/bulb.jpeg', gradient: 'linear-gradient(45deg, #C8E6C9, #B2EBF2)', color: '#FFC107', room: 'LivingRoom', imageShape: 'round' },
  { id: 3, name: 'Fans', imageUrl: '/images/fan (1).png', gradient: 'linear-gradient(45deg, #B3E5FC, #4FC3F7)', color: '#03A9F4', room: 'LivingRoom', imageShape: 'round' },
    { id: 4, name: 'Doors', imageUrl: '/images/Door.gif', gradient: 'linear-gradient(45deg, #E1BEE7, #BA68C8)', color: '#9C27B0', room: 'LivingRoom', imageShape: 'square' },
   {  id: 5, name: 'Geyser', imageUrl: '/images/geyser.jpeg', gradient: 'linear-gradient(45deg, #FFCDD2, #EF5350)', color: '#F44336', room: 'Bathroom' },
    { id: 6, name: 'Drip Systems', imageUrl: '/images/drip (1).jpeg', gradient: 'linear-gradient(45deg, #B2EBF2, #4DD0E1)', color: '#00BCD4', room: 'Garden', imageShape: 'square' },
    { id: 7, name: 'Sprinklers', imageUrl: '/images/sprink.jpeg', gradient: 'linear-gradient(45deg, #C8E6C9, #66BB6A)', color: '#4CAF50', room: 'Garden', imageShape: 'square' },
    { id: 8, name: 'Plant Management', imageUrl: '/images/plant.jpeg', gradient: 'linear-gradient(45deg, #DCEDC8, #AED581)', color: '#8BC34A', room: 'Garden',  imageShape: 'round' },
    { id: 9, name: 'Water Tanks', imageUrl: '/images/Tank.jpeg', gradient: 'linear-gradient(45deg, #d2dadd, #e1e3e9)', color: '#03A9F4', room: 'Utility',  imageShape: 'round' },
    { id: 10, name: 'Water Sumps', imageUrl: '/images/sump.jpeg', gradient: 'linear-gradient(45deg, #CFD8DC, #90A4AE)', color: '#607D8B', room: 'Utility', imageShape: 'square' },
    { id: 11, name: 'Water Motors', imageUrl: '/images/motor(1).jpeg', gradient: 'linear-gradient(45deg, #FFE0B2, #FFB74D)', color: '#FF9800', room: 'Utility', imageShape: 'round' },
    { id: 12, name: 'Voltage Control Management', imageUrl: '/images/High Voltage Warning Sign.gif', gradient: 'linear-gradient(45deg, #F0F4C3, #DCE775)', color: '#CDDC39', room: 'Utility' },
    { id: 13, name: 'Valve', imageUrl: '/images/valve.png', gradient: 'linear-gradient(45deg, #F0F4C3, #DCE775)', color: '#CDDC39', room: 'Garden' },
     //{ id: 14, name: 'Folder', imageUrl: "/images/folder.png", gradient: 'linear-gradient(45deg,#fceabb,#f8b500)', color: '#FFC107', room: 'Dashboard', imageShape: 'square' },
  ]);

 
  const [isFolderOpen, setIsFolderOpen] = useState(false);

 const [showFolder, setShowFolder] = useState(false);
  const [folderIcons, setFolderIcons] = useState([
    { id: 'folder-1', name: 'Smart Lights', imageUrl: "/images/bulb.jpeg", gradient: 'linear-gradient(45deg, #C8E6C9, #B2EBF2)', color: '#FFC107', room: 'Folder', imageShape: 'round' },
    { id: 'folder-2', name: 'Fans', imageUrl: '/images/fan (1).png', gradient: 'linear-gradient(45deg, #B3E5FC, #4FC3F7)', color: '#03A9F4', room: 'Folder', imageShape: 'round' },
    { id: 'folder-3', name: 'AC', imageUrl: "/images/air-conditioner.png", gradient: 'linear-gradient(45deg, #a7c6ed, #5e8d9b)', color: '#FFC107', room: 'Folder', imageShape: 'square' },
    { id: 'folder-4', name: 'Doors', imageUrl: '/images/Door.gif', gradient: 'linear-gradient(45deg, #E1BEE7, #BA68C8)', color: '#9C27B0', room: 'Folder', imageShape: 'square' },
    { id: 'folder-5', name: 'Geysers', imageUrl: '/images/geyser.jpeg', gradient: 'linear-gradient(45deg, #FFCDD2, #EF5350)', color: '#F44336', room: 'Folder' },
    { id: 'folder-6', name: 'Drips', imageUrl: '/images/drip (1).jpeg', gradient: 'linear-gradient(45deg, #B2EBF2, #4DD0E1)', color: '#00BCD4', room: 'Folder', imageShape: 'square' },
  ]);
  const [showAddNewIcon, setShowAddNewIcon] = useState(false);

  const addToFolder = (icon) => {
    setFolderIcons(prevIcons => [...prevIcons, { ...icon, id: `folder-${prevIcons.length + 1}` }]);
  };

  const removeFromFolder = (icon) => {
    setFolderIcons(prevIcons => prevIcons.filter(i => i.id !== icon.id));
  };

  
  const toggleFolder = () => {
    setShowFolder(!showFolder);
  };

  const addNewIcon = () => {
    setShowAddNewIcon(true);
  };

  const handleAddIcon = (icon) => {
    setFolderIcons([...folderIcons, { ...icon, id: `folder-${folderIcons.length + 1}` }]);
    setShowAddNewIcon(false);
  };

  const removeIcon = (id) => {
    setFolderIcons(folderIcons.filter(icon => icon.id !== id));
  };

  const getAvailableIcons = () => {
    const folderIconNames = folderIcons.map(icon => icon.name);
    return icons.filter(icon => !folderIconNames.includes(icon.name));
  };

  // ... (previous useEffect and other functions remain the same)
 
  const [activeDevices, setActiveDevices] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Dashboard');
  
  

  // ... (rest of the component logic remains the same)


  // Split icons into two rows
  const firstRowIcons = icons.slice(0, Math.ceil(icons.length / 2));
  const secondRowIcons = icons.slice(Math.ceil(icons.length / 2));

  const [environmentData, setEnvironmentData] = useState({
    Room: { temperature: 22, humidity: 45 },
    Living: { temperature: 23, humidity: 50 },
    Outside: { temperature: 18, humidity: 60 }
  });
  
 const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
    { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
    { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
    { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu" }
  ];

  const getEventsForDate = (date) => {
    const events = [];
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    if (month === 7 && day === 14) {
      events.push({ name: "Independence Day (Pakistan)", isImportant: false });
    }
    if (month === 7 && day === 15) {
      events.push({ name: "Independence Day (India)", isImportant: true });
    }
    const nthDayOfMonth = Math.floor((day - 1) / 7) + 1;
    const dayOfWeek = date.getDay();
    if (month === 0 && nthDayOfMonth === 3 && dayOfWeek === 1) {
      events.push({ name: "Martin Luther King Jr. Day", isImportant: false });
    }
    if (month === 4 && nthDayOfMonth === 5 && dayOfWeek === 1) {
      events.push({ name: "Memorial Day", isImportant: false });
    }
    if (month === 2 && day === 20) {
      events.push({ name: "First Day of Spring", isImportant: false });
    }
    return events;
  };

  const displayTodayEvents = () => {
    const today = new Date();
    const todayEvents = getEventsForDate(today);
    if (todayEvents.length > 0) {
      setEvents(todayEvents);
    } else {
      setEvents([{ name: 'No notable events today', isImportant: false }]);
    }
  };

  const newQuote = () => {
    const randomNumber = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomNumber]);
  };


  useEffect(() => {
    const savedLoginState = localStorage.getItem('isLoggedIn');
    if (savedLoginState) {
      setIsLoggedIn(JSON.parse(savedLoginState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    const updateTemperatures = () => {
      setEnvironmentData(prev => ({
        Room: { ...prev.Room, temperature: Math.floor(Math.random() * (28 - 18 + 1)) + 18 },
        Humidity: { ...prev.Living, temperature: Math.floor(Math.random() * (28 - 18 + 1)) + 18 },
        Outside: { ...prev.Outside, temperature: Math.floor(Math.random() * (35 - 15 + 1)) + 15 },
      }));
    };

    updateTemperatures();
    const intervalId = setInterval(updateTemperatures, 60000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Set current date
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));

    // Display today's events
    displayTodayEvents();

    // Set initial quote
    newQuote();

  

    // Fetch a random quote
    fetch('https://api.quotable.io/random')
      .then(response => response.json())
      .then(data => setQuote({ text: data.content, author: data.author }))
      .catch(() => setQuote({ text: "The only way to do great work is to love what you do.", author: "Steve Jobs" }));

 }, []);

 const handleLogin = (e) => {
    e.preventDefault();
    if (password === '1234') {
      setIsLoggedIn(true);
      setActiveTab('Dashboard');
    } else {
      alert('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPassword('');
    setActiveTab('Dashboard');
  };

  const moveIcon = (dragIndex, hoverIndex, room) => {
    setIcons(prevIcons => {
      const newIcons = [...prevIcons];
      const [removedIcon] = newIcons.splice(dragIndex, 1);
      newIcons.splice(hoverIndex, 0, { ...removedIcon, room });
      return newIcons;
    });
  };
 
 
 
  const toggleDevice = (deviceName) => {
    let ComponentToShow;
    switch (deviceName) {
      case 'Folder Light':
      case 'Smart Lights':
        ComponentToShow = SmartLightControl;
        break;
      case 'Folder Fan':
      case 'Fans':
        ComponentToShow = FanControlSystem;
        break;
      case 'Folder AC':
      case 'AC':
        ComponentToShow = ACControlSystem;
        break;
      case 'Folder Door':
      case 'Doors':
        ComponentToShow = DoorControlSystem;
        break;
      case 'Folder Geyser':
      case 'Geyser':
        ComponentToShow = GeyserControlSystem;
        break;
      case 'Folder Drip':
      case 'Drip Systems':
        ComponentToShow = DripIrrigationSystem;
        break;
      case 'Water Tanks':
        ComponentToShow = TankLevelView;
        break;
      case 'Sprinklers':
        ComponentToShow = AnimatedDroneSprinklerControl;
        break;
      case 'Valve':
        ComponentToShow = ValveControlPage;
        break;
      case 'Water Sumps':
        ComponentToShow = SumpControlSystem;
        break;
      case 'Water Motors':
        ComponentToShow = MotorControlSystem;
        break;
      default:
        setActiveDevices(prev => ({
          ...prev,
          [deviceName]: !prev[deviceName]
        }));
        return;
    }
    setActiveComponent(<ComponentToShow onClose={() => setActiveComponent(null)} />);
  };


  const [activeComponent, setActiveComponent] = useState(null);
 
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-4">
        <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xs">
          <h2 className="text-xl mb-4 text-center font-bold text-gray-800">Smart Home Login</h2>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

 
  const renderIcons = (iconList, isInFolder = false) => {
    return iconList
      .filter(icon => icon.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .map((icon) => (
        <div key={icon.id} className="relative">
          <Icon 
            id={icon.id}
            name={icon.name} 
            moveIcon={moveIcon} 
            toggleDevice={isInFolder ? () => removeFromFolder(icon) : () => addToFolder(icon)}
            isActive={activeDevices[icon.name]}
            imageUrl={icon.imageUrl}
            gradient={icon.gradient}
            color={icon.color}
            imageShape={icon.imageShape}
            room={icon.room}
          />
          {!isInFolder && icon.name !== 'Folder' && (
            <button
              onClick={() => addToFolder(icon)}
              className="absolute top-0 right-0 bg-blue-500 text-white rounded-full p-1 text-xs"
            >
              <Plus size={12} />
            </button>
          )}
        </div>
      ));
  };

  return (
    <DndProvider backend={backendForDND}>
      <div className="min-h-screen bg-cover bg-center bg-fixed" style={{backgroundImage: 'url("https://img.freepik.com/premium-photo/smart-home-living-room-with-patio-night_118124-340496.jpg")'}}>
        {/* ... (previous JSX remains the same) */}
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="container mx-auto px-2 py-4 min-h-screen flex flex-col">
          {/* ... (header and main content remain the same) */}
 <header className="bg-opacity-90 bg-gray-800 shadow rounded-t-lg mb-0 p-2">
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex items-center mb-2 w-full sm:w-auto sm:mb-0">
                <button onClick={toggleSidebar} className="text-white mr-2">
                  <Menu size={20} />
                </button>
                <img src="/api/placeholder/24/24" alt="Logo" className="h-6 w-6 mr-2" />
                <h1 className="text-lg font-bold text-white">Smart Home</h1>
              </div>
              <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto justify-between">
                <div className="relative w-full sm:w-auto mb-2 sm:mb-0 sm:mr-2">
                  <input
                    type="text"
                    placeholder="Search devices..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full sm:w-48 p-1 pl-6 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <Search size={16} className="absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <div className="flex overflow-x-auto pb-2 sm:pb-0 max-w-full">
                  {Object.entries(environmentData).map(([room, data]) => (
                    <TemperatureDisplay key={room} room={room} temperature={data.temperature} />
                  ))}
                </div>
              </div>
              <button onClick={handleLogout} className="text-white flex items-center text-sm mt-2 sm:mt-0">
                <LogOut size={16} className="mr-1" />
                Logout
                
              </button>
            </div>
          </header>
          
          {/*<IconGridManagement icons={icons} setIcons={setIcons} />*/}

          <EventsDisplay events={events} currentDate={currentDate} />
         
          <main className="flex-grow bg-black bg-opacity-50 rounded-lg shadow-lg p-2 mb-16 mt-4 flex flex-col justify-between">
          {activeComponent ? (
            activeComponent
          ) : (
            activeTab === 'Dashboard' ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {icons
                  .filter(icon => icon.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((icon) => (
                    <Icon 
                      key={icon.id}
                      id={icon.id}
                      name={icon.name} 
                      moveIcon={moveIcon} 
                      toggleDevice={toggleDevice}
                      isActive={activeDevices[icon.name]}
                      imageUrl={icon.imageUrl}
                      gradient={icon.gradient}
                      color={icon.color}
                      imageShape={icon.imageShape}
                      room={icon.room}
                    />
                  ))
                }
                <FolderIcon toggleFolder={toggleFolder} />
              </div>
            ) : (
              <RoomPage 
                room={activeTab}
                icons={icons}
                moveIcon={moveIcon}
                toggleDevice={toggleDevice}
                activeDevices={activeDevices}
                searchTerm={searchTerm}
              />
            )
          )}
        </main>
        
        
        {/* ... (rest of the JSX remains the same) */}
       <div className="mb-10">
            <ThoughtOfDay quote={quote} />
          </div>
        </div>
        <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
        {showTankLevel && <TankLevelView onClose={() => setShowTankLevel(false)} />}
    
        {showSprinklerControl && <AnimatedDroneSprinklerControl onClose={() => setShowSprinklerControl(false)} />}
        {showValveControl && <ValveControlPage onClose={() => setShowValveControl(false)} />}
        {showDripIrrigationSystem && <DripIrrigationSystem onClose={() => setShowDripIrrigationSystem(false)} />}
      {showSmartLightControl && <SmartLightControl onClose={() => setShowSmartLightControl(false)} />}
   {showDoorControlSystem && <DoorControlSystem onClose={() => setShowDoorControlSystem(false)} />}
   {showFanControl && <FanControlSystem onClose={() => setShowFanControl(false)} />}
   {showACControl && <ACControlSystem onClose={() => setShowACControl(false)} />}
   {showGeyserControl && <GeyserControlSystem onClose={() => setShowGeyserControl(false)} />}
   {showSumpControl && <SumpControlSystem onClose={() => setShowSumpControl(false)} />}
   {showMotorControl && <MotorControlSystem onClose={() => setShowMotorControl(false)} />}
   
        {showFolder && !activeComponent && (
          <FolderContent 
            folderIcons={folderIcons} 
            toggleDevice={toggleDevice} 
            addNewIcon={addNewIcon}
            removeIcon={removeIcon}
            onClose={() => setShowFolder(false)}
          />
        )}
        
        {showAddNewIcon && !activeComponent && (
          <AddNewIconModal 
            availableIcons={getAvailableIcons()} 
            onAddIcon={handleAddIcon} 
            onClose={() => setShowAddNewIcon(false)} 
          />
        )}
    </DndProvider>
  );
};

export default App;