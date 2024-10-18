import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ShareableIcon from './ShareableIcon';
import TankLevelView from './TankLevelView';
import AnimatedDroneSprinklerControl from './AnimatedDroneSprinklerControl';
import ValveControlPage from './ValveControlPage';
import DripIrrigationSystem from './DripIrrigationSystem';
import SmartLightControl from './SmartLightControl';
import DoorControlSystem from './DoorControlSystem';
import FanControlSystem from './FanControlSystem';
import ACControlSystem from './ACControlSystem';
import GeyserControlSystem from './GeyserControlSystem';
import SumpControlSystem from './SumpControlSystem';
import MotorControlSystem from './MotorControlSystem';
import FolderContent from './FolderContent';

const SharedIconHandler = () => {
  const { iconId } = useParams();
  const [iconData, setIconData] = useState(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Fetch icon data based on iconId
    // This is a placeholder. Replace with actual API call.
    const fetchIconData = async () => {
      // Simulating API call
      const data = {
        id: iconId,
        name: 'Sample Icon',
        imageUrl: '/path/to/image.png',
        gradient: 'linear-gradient(45deg, #a7c6ed, #5e8d9b)',
        color: '#FFC107',
        imageShape: 'square',
        isFolder: iconId === 'folder'
      };
      setIconData(data);
    };

    fetchIconData();
  }, [iconId]);

  const toggleDevice = () => {
    setIsActive(!isActive);
  };

  const renderComponent = () => {
    if (!iconData) return null;

    if (iconData.isFolder) {
      return <FolderContent folderIcons={[]} toggleDevice={toggleDevice} />;
    }

    switch (iconData.name.toLowerCase()) {
      case 'water tanks':
        return <TankLevelView onClose={() => {}} />;
      case 'sprinklers':
        return <AnimatedDroneSprinklerControl onClose={() => {}} />;
      case 'valve':
        return <ValveControlPage onClose={() => {}} />;
      case 'drip systems':
        return <DripIrrigationSystem onClose={() => {}} />;
      case 'smart lights':
        return <SmartLightControl onClose={() => {}} />;
      case 'doors':
        return <DoorControlSystem onClose={() => {}} />;
      case 'fans':
        return <FanControlSystem onClose={() => {}} />;
      case 'ac':
        return <ACControlSystem onClose={() => {}} />;
      case 'geyser':
        return <GeyserControlSystem onClose={() => {}} />;
      case 'water sumps':
        return <SumpControlSystem onClose={() => {}} />;
      case 'water motors':
        return <MotorControlSystem onClose={() => {}} />;
      default:
        return null;
    }
  };

  if (!iconData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Shared Smart Home Control</h1>
      <div className="mb-4">
        <ShareableIcon
          id={iconData.id}
          name={iconData.name}
          imageUrl={iconData.imageUrl}
          gradient={iconData.gradient}
          color={iconData.color}
          imageShape={iconData.imageShape}
          toggleDevice={toggleDevice}
          isActive={isActive}
          isFolder={iconData.isFolder}
        />
      </div>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
        {renderComponent()}
      </div>
    </div>
  );
};

export default SharedIconHandler;