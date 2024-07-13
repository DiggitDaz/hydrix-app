import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image } from 'react-native';
import CustomButton from '../../components/Join/CustomButton';
import axios from 'axios';
import { useAuth } from '../utils/AuthContext';
import { Link } from 'react-router-native';
import { useNavigate } from 'react-router-native';
import PasswordImage from  '../assets/PasswordImage.png';



const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [pin, setPin] = useState('');
    const navigate = useNavigate();

    const handleForgotPassword = async () => {
        try {
            const response = await axios.post('http://77.68.102.168:4000/forgot-password', { email, pin });
            console.log('beefface', email, pin);
            navigate('/ResetPassword');
        } catch (error) {
            console.log('Error', 'Something went wrong. Please try again.');
        }
    };

   

    return (
        <View style={styles.container}>

          <Image 
            source={PasswordImage}
            resizeMode='contain'
            style={styles.image}
          />

          <Text style={styles.topText}>No Worries</Text>
          <Text style={styles.subtitle}>Lets get this sorted for you</Text>


          <View style={styles.form}>
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

            <View style={styles.fomrRow}>
              <Text style={styles.forgotText}>Enter PIN</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="PIN..."
                placeholderTextColor={"#8e8e8e"}
                value={pin}
                onChangeText={setPin}
                
                
              />
            </View>
              <CustomButton title="Submit" onPress={handleForgotPassword} />
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

  topText: {
    fontSize: 26,
    color: '#09022b',
    fontFamily: 'Montserrat-Bold',
    textShadowColor: '#eee',
    
    
  },

  fomrRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
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

  subtitle: {
    color: '#09022b',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    marginTop: 10,
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

  image: {
    width: 350,
    height: 350,
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

export default ForgotPassword;