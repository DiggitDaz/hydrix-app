import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image } from 'react-native';
import CustomButton from '../../components/Join/CustomButton';
import axios from 'axios';
import RadialGradient from 'react-native-radial-gradient';
import { useNavigate } from 'react-router-native';
import { USER_DATA } from '@env';

/////////////////////////////////////////////////////////////////////////////////////

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [resetToken, setResetToken] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(`${USER_DATA}/reset-password`, { token: resetToken, password });
      navigate('/Login');
    } catch (error) {
      navigate('/ForgotPassword')
    }
  };

////////////////////////////////////////////////////////////////////////////////////////

  return (
    <View style={styles.container}>
      <RadialGradient
        style={{position: 'absolute', top: 800, right: 300, borderRadius: 150, width: 300, height: 300, zIndex: 10 }}  // Add width, height, and zIndex
        colors={['rgba(193, 2, 196, 0.3)', 'rgba(193, 2, 196, 0.1)', '#001B39' ]}
        center={[150, 150]}  
        radius={150}  
      />
      <RadialGradient
        style={{position: 'absolute', top: 260, left: 200, borderRadius: 150, width: 300, height: 300, zIndex: 10 }}  // Add width, height, and zIndex
        colors={['rgba(193, 2, 196, 0.3)', 'rgba(193, 2, 196, 0.1)', '#001B39' ]}
        center={[150, 150]}  
        radius={150}  
      />
      <RadialGradient
        style={{position: 'absolute', top: 275, left: -150, borderRadius: 150, width: 300, height: 300, zIndex: 10 }}  // Add width, height, and zIndex
        colors={['rgba(193, 2, 196, 0.3)', 'rgba(193, 2, 196, 0.1)', '#001B39' ]}
        center={[150, 150]}  
        radius={150}  
      />
      <RadialGradient
        style={{position: 'absolute', top: 525, right: -50, borderRadius: 150, width: 300, height: 300, zIndex: 10 }}  // Add width, height, and zIndex
        colors={['rgba(193, 2, 196, 0.3)', 'rgba(193, 2, 196, 0.1)', '#001B39' ]}
        center={[150, 150]}  
        radius={150}  
      />
      <RadialGradient
        style={{position: 'absolute', top: 0, left: 50, borderRadius: 150, width: 300, height: 300, zIndex: 10 }}  // Add width, height, and zIndex
        colors={['rgba(193, 2, 196, 0.3)', 'rgba(193, 2, 196, 0.1)', '#001B39' ]}
        center={[150, 150]} 
        radius={150}  
      />
      <View style={styles.form}>
        <Text style={styles.subtitle}>Enter a New Password</Text>
        <View style={styles.fomrRow}>
          <Text style={styles.forgotText}>New Password</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter New Password..."
            placeholderTextColor={"#8e8e8e"}
            value={password}
            onChangeText={setPassword}
          />
          </View>
          <CustomButton title="Submit" onPress={handleResetPassword} />
        </View>
    </View>
    );
};

//////////////////////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#001B39',
  },

  form: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 4,
    zIndex: 20,
    paddingBottom: 20,
    paddingTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },

  subtitle: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    width: '80%',
  },

  fomrRow: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 20,
  },

  forgotText: {
    fontFamily: 'white',
    color: 'white',
  },

  inputContainer: {
    height: 50,
    position: 'relative',
    width: '80%',
    marginTop: 10,
    marginBottom: 20,
  },

  input: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#8e8e8e',
    color: '#353542',
    fontSize: 14,
    height: '100%',
    width: '100%',
    paddingLeft: 25,
  },
});

export default ResetPassword;