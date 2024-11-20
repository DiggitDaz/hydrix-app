import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ErrorModal = ({ visible, onClose, errorMessage }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      {/* TouchableOpacity to detect background clicks */}
      <TouchableOpacity 
        style={styles.modalContainer} 
        activeOpacity={1} 
        onPress={onClose} // Close modal when background is pressed
      >
        <View style={styles.modalContent}>

          {/* TouchableOpacity here to prevent modal content from closing the modal */}
          <TouchableOpacity activeOpacity={1} style={styles.modalContentInner}>
            <Text style={styles.successMessage}>{errorMessage || 'An error occurred'}</Text>
          </TouchableOpacity>
            
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Darken the background for better visibility
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  modalContentInner: {
    backgroundColor: 'rgba(78, 78, 97, 0.8)', 
    borderRadius: 4, 
    borderWidth: 1,
    borderColor: 'rgba(207, 207, 252, 0.75)',
    padding: 20,
  },
  successMessage: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Inter',
  },
});

export default ErrorModal;
