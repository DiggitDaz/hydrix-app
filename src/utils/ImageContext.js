import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ImageContext = createContext();

export const useImage = () => useContext(ImageContext);

export const ImageProvider = ({ children }) => {
  const [imageUri, setImageUri] = useState(null);

  // Load the image URI from AsyncStorage when the app starts
  useEffect(() => {
    const loadImageUri = async () => {
      try {
        const savedImageUri = await AsyncStorage.getItem('imageUri');
        if (savedImageUri) {
          setImageUri(savedImageUri);
        }
      } catch (error) {
        console.error('Failed to load image URI:', error);
      }
    };

    loadImageUri();
  }, []);

  // Save the image URI to AsyncStorage whenever it changes
  const saveImageUri = async (uri) => {
    try {
      setImageUri(uri);
      await AsyncStorage.setItem('imageUri', uri);
    } catch (error) {
      console.error('Failed to save image URI:', error);
    }
  };

  return (
    <ImageContext.Provider value={{ imageUri, setImageUri: saveImageUri }}>
      {children}
    </ImageContext.Provider>
  );
};
