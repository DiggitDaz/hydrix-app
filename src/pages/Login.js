import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import CustomButton from '../../components/Join/CustomButton';
import axios from 'axios';
import { useAuth } from '../utils/AuthContext';
import { Link } from 'react-router-native';
import { useNavigate } from 'react-router-native';
import Logo from '../assets/Logo.png';









const Login = () => {

    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const handleLogin = async () => {
        try {
              console.log('Attempting login...');
              const response = await axios.post('http://77.68.102.168:4000/login', {
                  username,
                  password,
              });
              console.log('Login response:', response.data);
              login(response.data.token, response.data.userData);
              navigate('/Home');
              } catch (error) {
              if (error.response && error.response.data) {
                  setError(error.response.data.message); 
              } else {
                  setError('An unexpected error occurred during login.');
              }
            }
    };

    const handleNavigateToForgotScreen = async () => {
      try {
          navigate('/ForgotPassword');
      } catch (error) {
          console.log('Error', 'Something went wrong. Please try again.');
      }
  };

    return (
      
        <View style={styles.background}>

          
        <Image
          source={Logo}
          style={styles.logo} 
        />
        <Text style={styles.topText}>Welcome Back</Text>
          
          
          <View style={styles.form}>
            <View style={styles.fomrRow}>
              <Text style={styles.forgotText}>Username</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder=" Enter username..."
                placeholderTextColor={"#8e8e8e"}
                value={username}
                onChangeText={setUsername}
              />
            </View>
            <View style={styles.fomrRow}>
              <Text style={styles.forgotText}>Password</Text>
            </View>
            <View style={styles.inputContainer1}>
              <TextInput
                style={styles.input}
                placeholder=" Enter password..."
                placeholderTextColor={"#8e8e8e"}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <TouchableHighlight style={styles.forgotContainer} onPress={handleNavigateToForgotScreen}>
              <Text style={styles.forgotText}>Forgotten Password?</Text>
            </TouchableHighlight>
              <CustomButton title="LOGIN" onPress={handleLogin} />
            
              
                <View style={styles.orContainer}>
                  
                <Text style={styles.forgotText}>Not signed up yet?</Text>

                  <Link to="/Join">
                    <Text style={styles.forgotTextAnd}>Join</Text>
                  </Link>
                
                </View>
                {error ? <Text style={styles.error}>{error}</Text> : null}
              </View>
            </View>
            
          
    );
};

const styles = StyleSheet.create({
  

  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    },
  
  logo: {
    width: 150,
    height: 150,
  },

  hazeContainer: {
    height: 300,
    width: '100%',
    marginBottom: 100,
  },

  outerGradient: {
    borderRadius: 50,
    padding: 2,
    width: '90%',
    height: 150,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  innerGradient: {
    borderRadius: 50,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    height: '100%',
    zIndex: 15,
  },

  
  error: {
    color: '#8e8e8e',
  },

  topText: {
    fontSize: 24,
    color: '#09022b',
    fontFamily: 'Montserrat-Bold',
    textShadowColor: '#eee',
    marginBottom: 50,
    
  },
  fomrRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  form: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    height: 400,
    padding: 20,
    width: 360,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    borderRadius: 7.5,
    marginBottom: '5%',
    transition: 'all 0.4s ease-in-out',
    alignItems: 'center',
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
    marginBottom: 50,
  },

  forgotText: {
    fontFamily: 'Montserrat-Bold',
    color: '#09022b',
  },

  forgotTextAnd: {
    fontFamily: 'Montserrat-Bold',
    color: 'rgba(52, 66, 199, 1)',
  },

  orContainer: {
    width: '60%',
    alignItems: 'center',
    justifyContent: 'space-around',
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
    fontFamily: 'notoserif',
    fontSize: 36,
    fontWeight: '900',
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

  inputContainer1: {
    height: 55,
    position: 'relative',
    width: '100%',
    marginTop: 15,
    
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
    // borderWidth: 1.5,
    // borderColor: 'rgba(22, 40, 199, 1)',
  },

  button: {
    width: '100%',
    borderRadius: 7.5, //'#6f2cf5', 
    borderColor: 'rgba(2, 242, 234, 1)',
    borderWidth: 2,
    height: 55,
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    letterSpacing: 10,
  },

  buttonText: {
    color: 'rgba(2, 242, 234, 1)',
    fontSize: 20,
    fontFamily: 'Poppins',
    fontWeight: '700',
  },

  
});

export default Login; 