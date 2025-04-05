import { useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export function usePhotoGallery() {
  const [photos, setPhotos] = useState<string[]>([]); // Declare photos state

  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    if (photo.webPath) {
      setPhotos([...photos, photo.webPath]); // Add the new photo to the state
    }

    return photo;
  };

  return { photos, takePhoto }; // Return both photos and takePhoto
}
