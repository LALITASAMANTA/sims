import React, { useState } from 'react';
import { Share2 } from 'lucide-react';

const ShareModal = ({ isOpen, onClose, iconData }) => {
  if (!isOpen) return null;

  const shareUrl = `${window.location.origin}/share/${iconData.id}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`Check out this smart home control: ${shareUrl}`)}`;

  const shareOptions = [
    { name: 'Copy Link', action: () => navigator.clipboard.writeText(shareUrl) },
    { name: 'WhatsApp', action: () => window.open(whatsappUrl, '_blank') },
    { name: 'Facebook', action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`) },
    { name: 'Twitter', action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`) },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-80">
        <h2 className="text-xl font-bold mb-4">Share {iconData.name}</h2>
        <div className="space-y-2">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              onClick={option.action}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
            >
              {option.name}
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-300 text-gray-800 p-2 rounded hover:bg-gray-400 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const ShareableIcon = ({ id, name, imageUrl, gradient, color, imageShape, toggleDevice, isActive, isFolder }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleShare = (e) => {
    e.stopPropagation();
    setIsShareModalOpen(true);
  };

  return (
    <div className="relative">
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
        <div className={`w-full h-full overflow-hidden ${imageShape === 'round' ? 'rounded-full' : 'rounded-lg'}`}>
          <img src={imageUrl} alt={name} className={`w-full h-full object-cover ${imageShape === 'round' ? 'rounded-full' : 'rounded-lg'}`} />
        </div>
      </div>
      <button
        onClick={handleShare}
        className="absolute top-0 right-0 bg-blue-500 text-white rounded-full p-1"
      >
        <Share2 size={12} />
      </button>
      <span className="mt-2 text-xs font-medium text-center text-white block">
        {name}
      </span>
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        iconData={{ id, name, isFolder }}
      />
    </div>
  );
};

export default ShareableIcon;