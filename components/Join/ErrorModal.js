import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ErrorModal = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>

      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.successMessage}>Error Adding User!</Text>
            
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  modalContent: {
    backgroundColor: 'rgba(26, 31, 57, 1)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  successMessage: {
    fontSize: 18,
    marginBottom: 10,
    color: '#eee',
  },

  button4: {
    width: 150,
    height: 35,
    backgroundColor: 'rgba(100, 248, 253, 0.8)', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    
  },

  button4Text: {
    color: 'black',
  }

});

export default ErrorModal;
