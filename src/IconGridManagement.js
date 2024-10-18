import React, { useState } from 'react';
import { Plus, X, Check } from 'lucide-react';

const iconOptions = [
  { name: 'AC', icon: 'air-conditioner.png', },
  { name: 'Smart Lights', icon: 'bulb.jpeg' },
  { name: 'Fans', icon: 'fan (1).png' },
  { name: 'Doors', icon: 'Door.gif' },
  { name: 'Geyser', icon: 'geyser.jpeg' },
  { name: 'Drip Systems', icon: 'drip (1).jpeg' },
  { name: 'Sprinklers', icon: 'sprink.jpeg' },
  { name: 'Plant Management', icon: 'plant.jpeg' },
  { name: 'Water Tanks', icon: 'Tank.jpeg' },
  { name: 'Water Sumps', icon: 'sump.jpeg' },
  { name: 'Water Motors', icon: 'motor(1).jpeg' },
  { name: 'Voltage Control Management', icon: 'High Voltage Warning Sign.gif' },
  { name: 'Valve', icon: 'valve.png' },
];

const IconGridManagement = ({ icons, setIcons }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedIcons, setSelectedIcons] = useState([]);

  const handleAddIcon = () => {
    const newIcons = selectedIcons.map((iconName) => {
      const iconOption = iconOptions.find((option) => option.name === iconName);
      return {
        id: icons.length + 1,
        name: iconName,
        imageUrl: `/images/${iconOption.icon}`,
        gradient: 'linear-gradient(45deg, #a7c6ed, #5e8d9b)',
        color: '#FFC107',
       
       
      };
    });

    setIcons([...icons, ...newIcons]);
    setSelectedIcons([]);
    setShowAddForm(false);
  };

  const handleRemoveIcon = (id) => {
    setIcons(icons.filter(icon => icon.id !== id));
  };

  const toggleIconSelection = (iconName) => {
    setSelectedIcons(prevSelected =>
      prevSelected.includes(iconName)
        ? prevSelected.filter(name => name !== iconName)
        : [...prevSelected, iconName]
    );
  };

  return (
    <div className="bg-gray-200 rounded-lg p-4 mb-4">
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-4">
        {icons.map((icon) => (
          <div key={icon.id} className="relative bg-white p-2 rounded-lg shadow-md">
            <button
              onClick={() => handleRemoveIcon(icon.id)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
            >
              <X size={12} />
            </button>
            <img src={icon.imageUrl} alt={icon.name} className="w-full h-16 object-contain mb-2" />
            <p className="text-xs text-center truncate">{icon.name}</p>
          </div>
        ))}
        <div className="flex items-center justify-center bg-white p-2 rounded-lg shadow-md cursor-pointer"
             onClick={() => setShowAddForm(true)}>
          <Plus size={24} className="text-gray-400" />
        </div>
      </div>
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-80 max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">Add New Icons</h3>
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
            </div>
            <div className="flex justify-end">
              <button onClick={() => setShowAddForm(false)} className="bg-gray-300 text-black px-4 py-2 rounded mr-2">
                Cancel
              </button>
              <button onClick={handleAddIcon} className="bg-blue-500 text-white px-4 py-2 rounded">
                Add Selected
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IconGridManagement;