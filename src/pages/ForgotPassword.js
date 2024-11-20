import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image } from 'react-native';
import CustomButton from '../../components/Join/CustomButton';
import axios from 'axios';
import RadialGradient from 'react-native-radial-gradient';
import { useNavigate } from 'react-router-native';
import { USER_DATA } from '@env';

///////////////////////////////////////////////////////////////////////

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(`${USER_DATA}/forgot-password`, { email });
      navigate('/ResetPassword');
        } catch (error) {}
    };

  const goBack = () => {
    navigate("/Home");
    };

////////////////////////////////////////////////////////////////////////////////////

  return (
    <View style={styles.container}>
      <RadialGradient
        style={{position: 'absolute', top: 220, left: 200, borderRadius: 150, width: 300, height: 300, zIndex: 10 }}  // Add width, height, and zIndex
        colors={['rgba(193, 2, 196, 0.3)', 'rgba(193, 2, 196, 0.1)', '#001B39' ]}
        center={[150, 150]}  // Adjust center relative to size
        radius={150}  
      />
      <RadialGradient
          style={{position: 'absolute', top: 275, left: -150, borderRadius: 150, width: 300, height: 300, zIndex: 10 }}  // Add width, height, and zIndex
          colors={['rgba(193, 2, 196, 0.3)', 'rgba(193, 2, 196, 0.1)', '#001B39' ]}
          center={[150, 150]}  // Adjust center relative to size
          radius={150}  
      />
      <RadialGradient
          style={{position: 'absolute', top: 525, right: -50, borderRadius: 150, width: 300, height: 300, zIndex: 10 }}  // Add width, height, and zIndex
          colors={['rgba(193, 2, 196, 0.3)', 'rgba(193, 2, 196, 0.1)', '#001B39' ]}
          center={[150, 150]}  // Adjust center relative to size
          radius={150}  
      />
      <RadialGradient
          style={{position: 'absolute', top: 0, left: 50, borderRadius: 150, width: 300, height: 300, zIndex: 10 }}  // Add width, height, and zIndex
          colors={['rgba(193, 2, 196, 0.3)', 'rgba(193, 2, 196, 0.1)', '#001B39' ]}
          center={[150, 150]}  // Adjust center relative to size
          radius={150}  
      />
      <View style={styles.form}>
        <Text style={styles.subtitle}>Password Reset</Text>
        <View style={styles.fomrRow}>
          <Text style={styles.forgotText}>Enter Email</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email..."
            placeholderTextColor={"#8e8e8e"}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <CustomButton title="Submit" onPress={handleForgotPassword} style={{ marginBottom: 20 }} />
        <CustomButton title="Go Back" onPress={goBack} />
      </View>
    </View>
    );
};

///////////////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#001B39',
  },

  fomrRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 20,
    width: '80%',
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
    fontWeight: '600',
    fontSize: 16,
  },

  forgotText: {
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
    borderColor: '#8e8e8e',
    borderWidth: 1,
    color: '#353542',
    fontSize: 14,
    height: '100%',
    width: '100%',
    paddingLeft: 25,
  },  
});

export default ForgotPassword;