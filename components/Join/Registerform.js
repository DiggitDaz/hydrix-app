import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import CustomButton from './CustomButton';
import axios from 'axios';
import SuccessModal from './SuccessModal'; // Import the SuccessModal component
import ErrorModal from './ErrorModal';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigate } from 'react-router-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-native';
import JoinImage from '../../src/assets/JoinImage.png';



const RegisterForm = () => {
  const [referrer, setReferrer] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [pin, setPin] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State for success modal
  const [showErrorModal, setShowErrorModal] = useState(false); // State for error modal
  const navigate = useNavigate();


  

  const handleSubmit = async () => {
    const userData = { userName, email, password, referrer, pin };

    try {
      const response = await axios.post('http://77.68.102.168:4000/register', userData);
      if (response.status === 200) {
        console.log(response.data);
        console.log(userData);
        setSuccess(true);
        setShowSuccessModal(true); // Show success modal on successful registration
        navigate('/');
      } else {
        console.error('Failed to register user:', response.statusText);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setShowErrorModal(true); // Show error modal on registration error
    }
  };

  

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <ScrollView style={styles.Container}>
      <View style={styles.form}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Let's create your account!</Text>
        </View>
        <Image
          source={require('../../src/assets/JoinImage.png')}
          style={styles.image}
        />
        <View style={styles.fomrRow}>
          <Text style={styles.forgotText}>Referral code</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Referral Code..."
            placeholderTextColor={"#8e8e8e"}
            value={referrer}
            onChangeText={setReferrer}
          />
        </View>
        <View style={styles.fomrRow}>
          <Text style={styles.forgotText}>Username</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username..."            
            placeholderTextColor={"#8e8e8e"}
            value={userName}
            onChangeText={setUserName}
          />
        </View>
        <View style={styles.fomrRow}>
          <Text style={styles.forgotText}>Email</Text>
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
        <View style={styles.fomrRow}>
          <Text style={styles.forgotText}>Password</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password..."
            placeholderTextColor={"#8e8e8e"}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.fomrRow}>
          <Text style={styles.forgotText}>Set a Pin</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Set PIN..."
            placeholderTextColor={"#8e8e8e"}
            secureTextEntry
            value={pin}
            onChangeText={setPin}
          />
        </View>
       
        <CustomButton onPress={handleSubmit} title="JOIN" style={styles.submit} />
        <View style={styles.orContainer}>
                  
                <Text style={styles.forgotText}>Already joined?</Text>

                  <Link to="/Login">
                    <Text style={styles.forgotTextAnd}>Login</Text>
                  </Link>
                
      </View>
      </View>
      
      <SuccessModal visible={showSuccessModal} onClose={handleCloseSuccessModal} />
      <ErrorModal visible={showErrorModal} onClose={handleCloseErrorModal} />
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    
  },

  image: {
    width: 300,
    height: 300,
    marginBottom: 75,
},

  titleRow: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },

  forgotText: {
    fontFamily: 'Montserrat-Bold',
    color: 'rgba(0, 0, 0, 0.75)',
  },

  forgotTextAnd: {
    fontFamily: 'Montserrat-Bold',
    color: 'rgba(52, 66, 199, 1)',
  },

  form: {
    backgroundColor: 'rgba(255, 255, 255,, 1)',
    borderRadius: 20,
    flex: 1,
    fontFamily: 'Montserrat-Bold',
    height: '100%',
    padding: 20,
    width: 360,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    borderRadius: 20,
    marginBottom: '5%',
    marginTop: '5%',
    transition: 'all 0.4s ease-in-out',
    alignItems: 'center',
  },

  orContainer: {
    width: '55%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 40,
  },

  title: {
    fontSize: 26,
    color: '#09022b',
    fontFamily: 'Montserrat-Bold',
    textShadowColor: '#eee',
    marginTop: 30,
  },

  subtitle: {
    color: '#09022b',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    marginTop: 10,
  },

  inputContainer: {
    height: 55,
    position: 'relative',
    width: '100%',
    marginTop: 5,
    marginBottom: 15,
  },

  fomrRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  forgotText: {
    fontFamily: 'Montserrat-Bold',
    color: 'rgba(0, 0, 0, 0.75)',
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

  submit: {
    marginTop: 38,
    width: '100%',
  },

  photoButton: {
    width: '100%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: 'white',
  },
});

export default RegisterForm;
