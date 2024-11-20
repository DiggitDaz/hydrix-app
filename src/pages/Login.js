import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import CustomButton from '../../components/Join/CustomButton';
import axios from 'axios';
import { useAuth } from '../utils/AuthContext';
import { Link } from 'react-router-native';
import { useNavigate } from 'react-router-native';
import Logo from '../assets/Logo.png';
import { USER_DATA } from '@env';

//////////////////////////////////////////////////////////////////////////////////////////

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const usernameRef = useRef(username);
  const passwordRef = useRef(password);

  useEffect(() => {
    usernameRef.current = username;
    passwordRef.current = password;
  }, [username, password]);

  const handleLogin = async (username, password) => {
    try {
      
      const response = await axios.post(`${USER_DATA}/login`, {
        username,
        password,
      });
      
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
      
    }
  };

/////////////////////////////////////////////////////////////////////////////////////////

  return (
    <View style={styles.background}>
      <View style={styles.backgroundOverlay} />
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
        <CustomButton title="Login" onPress={() => handleLogin(username, password)}/>   
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

//////////////////////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#001B39',
    },

  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  
  logo: {
    width: 150,
    height: 150,
  },

  error: {
    color: '#8e8e8e',
  },

  topText: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Inter',
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
    width: '90%',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    borderRadius: 7.5,
    marginBottom: '5%',
    transition: 'all 0.4s ease-in-out',
    alignItems: 'center',
  },

  forgotContainer: {
    width: '90%',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 50,
  },

  forgotText: {
    fontFamily: 'Inter',
    color: 'white',
  },

  forgotTextAnd: {
    fontFamily: 'Inter',
    color: '#83839C',
  },

  orContainer: {
    width: '60%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 40,
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
    borderRadius: 4,
    borderColor: '#444444',
    borderWidth: 1,
    color: '#E2DFD0',
    fontSize: 14,
    fontFamily: 'Inter',
    height: '100%',
    width: '100%',
    paddingLeft: 25,
  },
});

export default Login; 