import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CustomButton = ({ onPress, title, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      
        <Text style={styles.buttonText}>{title}</Text>

      
      
    </TouchableOpacity>
    
  );
};

const styles = StyleSheet.create({
  button: {
        width: '80%',
        borderRadius: 4,
        backgroundColor: '#45D9F4', 
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
  },

 

  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    zIndex: 5,
  },
});

export default CustomButton;