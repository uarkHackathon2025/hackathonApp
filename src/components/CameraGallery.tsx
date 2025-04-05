// src/components/CameraGallery.tsx
import React from 'react';

interface CameraGalleryProps {
  photos: string[];
}

const CameraGallery: React.FC<CameraGalleryProps> = ({ photos }) => {
  return (
    <div>
      {photos.map((photo, index) => (
        <img key={index} src={photo} alt={`Photo ${index}`} style={{ width: '100%', marginBottom: '10px' }} />
      ))}
    </div>
  );
};

export default CameraGallery;
