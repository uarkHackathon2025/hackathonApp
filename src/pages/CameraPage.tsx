import React from 'react';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import CameraGallery from '../components/CameraGallery';

const CameraPage: React.FC = () => {
  const { photos, takePhoto } = usePhotoGallery();

  return (
    <div>
      <button onClick={takePhoto}>Take Photo</button>
      <CameraGallery photos={photos} /> {/* ✅ pass photos prop here */}
    </div>
  );
};

export default CameraPage;
