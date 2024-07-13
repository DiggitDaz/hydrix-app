import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Image } from 'react-native';
import CustomButton from '../../components/Join/CustomButton';
import axios from 'axios';
import { useAuth } from '../utils/AuthContext';
import { Link } from 'react-router-native';
import { useParams, useNavigate } from 'react-router-native';
import ResetImage from '../assets/ResetImage.png';


const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [resetToken, setResetToken] = useState('');

  const navigate = useNavigate();

  // Function to handle password reset
  const handleResetPassword = async () => {
    try {
      // Send a POST request to reset password endpoint with token in the request body
      const response = await axios.post('http://77.68.102.168:4000/reset-password', { token: resetToken, password });
      console.log(password);
      console.log(resetToken);
      // Log success message and navigate to Login screen
      console.log('Success', 'Your password has been updated');
      navigate('/Login');
    } catch (error) {
      // Log error message if request fails
      console.log('Error', 'Something went wrong. Please try again.');
      navigate('/ForgotPassword')
    }
  };

   

    return (
        <View style={styles.container}>
          <Text style={styles.topText}>Excellent</Text>
          <Text style={styles.subtitle}>Now reset your password by inserting it into the box below</Text>
          <Image 
            source={require('../assets/ResetImage.png')}
            style={styles.image}
          />
          <View style={styles.form}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },

  error: {
    color: '#8e8e8e',
  },

  image: {
    width: 300,
    height: 300,
  },

  form: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 20,
    padding: 20,
    width: 360,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    borderRadius: 7.5,
    marginBottom: '5%',
    marginTop: '5%',
    transition: 'all 0.4s ease-in-out',
    alignItems: 'center',
  },

  topText: {
    fontSize: 26,
    color: '#09022b',
    fontFamily: 'Montserrat-Bold',
    textShadowColor: '#eee',
    
    
  },

  subtitle: {
    color: '#09022b',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    width: '80%',
  },

  fomrRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  titleContainer: {
    width: '100%',
    justifyContent: 'flex-start',
  },

  forgotContainer: {
    width: '90%',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 15,
  },

  forgotText: {
    fontFamily: 'Montserrat-Bold',
    color: '#09022b',
  },

  orContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginTop: 40,
  },

  orMasterContainer: {
    height: 200,
    width: '100%',
  },

  orText: {
    fontFamily: 'notoserif',
    fontWeight: '500',
    color: '#8e8e8e',
  },

  title: {
    color: 'white',
    fontFamily: 'Montserrat-Bold',
    fontSize: 36,
    marginTop: 30,
    marginBottom: 30,
  },

  inputContainer: {
    height: 55,
    position: 'relative',
    width: '100%',
    marginTop: 15,
    marginBottom: 15,
  },

  input: {
    borderRadius: 7.5,
    backgroundColor: '#eee',
    color: '#8e8e8e',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    height: '100%',
    width: '100%',
    paddingLeft: 25,
  },

  fomrRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  button: {
    width: '100%',
    borderRadius: 7.5, //'#6f2cf5', 
    borderColor: 'rgba(175, 191, 29, 1)',
    borderWidth: 2,
    height: 55,
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: 'rgba(175, 191, 29, 1)',
    fontSize: 20,
    fontFamily: 'Poppins',
    fontWeight: '700',
  },

  
});

export default ResetPassword;