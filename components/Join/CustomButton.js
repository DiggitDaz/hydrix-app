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
        width: '100%',
        borderRadius: 7.5,
        backgroundColor: '#09022b', 
        height: 55,
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: 'rgba(255, 255, 255, 0.5)',
        
  
  },

 

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    zIndex: 5,
  },
});

export default CustomButton;