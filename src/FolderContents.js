import React, { useState, useEffect } from 'react';
import { Plus, X, Check } from 'lucide-react';

const initialIconOptions = [
  { name: 'AC', icon: 'air-conditioner.png' },
  { name: 'Smart Lights', icon: 'bulb.jpeg' },
  { name: 'Fans', icon: 'fan (1).png' },
  { name: 'Doors', icon: 'Door.gif' },
  { name: 'Geyser', icon: 'geyser.jpeg' },
  { name: 'Drip Systems', icon: 'drip (1).jpeg' },
];

const FolderContents = ({ onClose, onAddIcons }) => {
  const [iconOptions, setIconOptions] = useState(initialIconOptions);
  const [selectedIcons, setSelectedIcons] = useState([]);

  const toggleIconSelection = (iconName) => {
    setSelectedIcons(prevSelected =>
      prevSelected.includes(iconName)
        ? prevSelected.filter(name => name !== iconName)
        : [...prevSelected, iconName]
    );
  };

  const handleAddSelectedIcons = () => {
    onAddIcons(selectedIcons);
    setIconOptions(prevOptions => 
      prevOptions.filter(option => !selectedIcons.includes(option.name))
    );
    setSelectedIcons([]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg w-80 max-h-[80vh] overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">Folder Contents</h3>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {iconOptions.map((option) => (
            <div
              key={option.name}
              className={`relative bg-gray-100 p-2 rounded-lg cursor-pointer ${
                selectedIcons.includes(option.name) ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => toggleIconSelection(option.name)}
            >
              <img src={`/images/${option.icon}`} alt={option.name} className="w-full h-12 object-contain mb-1" />
              <p className="text-xs text-center truncate">{option.name}</p>
              {selectedIcons.includes(option.name) && (
                <div className="absolute top-1 right-1 bg-blue-500 rounded-full p-1">
                  <Check size={12} className="text-white" />
                </div>
              )}
            </div>
          ))}
          <div className="flex items-center justify-center bg-gray-100 p-2 rounded-lg cursor-pointer">
            <Plus size={24} className="text-gray-400" />
          </div>
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded mr-2">
            Close
          </button>
          <button onClick={handleAddSelectedIcons} className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Selected
          </button>
        </div>
      </div>
    </div>
  );
};

export default FolderContents;