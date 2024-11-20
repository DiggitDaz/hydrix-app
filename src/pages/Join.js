import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, Text, ScrollView, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';
import CustomButton from '../../components/Join/CustomButton';
import axios from 'axios';
import SuccessModal from '../../components/Join/SuccessModal'; 
import ErrorModal from '../../components/Join/ErrorModal';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigate } from 'react-router-native';
import { Link } from 'react-router-native';
import { useImage } from '../../src/utils/ImageContext';
import { USER_DATA } from '@env';

////////////////////////////////////////////////////////////////////////////////////////////////

const Join = () => {
  const [referrer, setReferrer] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const { setImageUri } = useImage();
  const navigate = useNavigate();
  const { imageUri } = useImage();

  const requestStoragePermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const permission = Platform.Version >= 33 
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES 
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

        const granted = await PermissionsAndroid.request(permission, {
          title: 'Storage Permission',
          message: 'This app needs access to your storage to select images.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        });

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          
          return true;
        } else {
        
          return false;
        }
      }
      return true; 
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const pickImage = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      
      return;
    }

    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        
      } else if (response.errorCode) {
        
      } else if (response.assets && response.assets.length > 0) {
        const selectedImageUri = response.assets[0].uri;
        setImageUri(selectedImageUri);
      }
    });
  };
  
const handleSubmit = async () => {
    const userData = { userName, email, password, referrer };
    try {
      const response = await axios.post(`${USER_DATA}/register`, userData);
      if (response.status === 200) {
        setSuccess(true);
        setShowSuccessModal(true); 
        navigate('/');
      } else {
        console.error('Failed to register user:', response.statusText);
      }
    } catch (error) {
        setErrorMessage(error.response?.data?.error || 'An unexpected error occurred');
        console.error('Error registering user:', error);
        setShowErrorModal(true); 
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

/////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.backgroundOverlay} />
      <View style={styles.form}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Let's create your account!</Text>
        </View>
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
        <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>Select Profile Image</Text>
      </TouchableOpacity>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
        <CustomButton onPress={handleSubmit} title="Join" style={styles.submit} />
        <View style={styles.orContainer}>
            <Text style={styles.forgotText}>Already joined?</Text>
            <Link to="/Login">
                <Text style={styles.forgotTextAnd}>Login</Text>
            </Link>
        </View>
      </View>
      <SuccessModal visible={showSuccessModal} onClose={handleCloseSuccessModal} />
      <ErrorModal errorMessage={errorMessage} visible={showErrorModal} onClose={handleCloseErrorModal} />
    </ScrollView>
  );
};

/////////////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#001B39',
    width: '100%',
    },

  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

  button: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleRow: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },

  forgotText: {
    fontFamily: 'Inter',
    color: 'white',
  },

  forgotTextAnd: {
    fontFamily: 'Inter',
    color: '#83839C',
  },

  form: {
    borderRadius: 20,
    flex: 1,
    fontFamily: 'Inter',
    height: '100%',
    padding: 20,
    width: '90%',
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
    color: 'white',
    fontFamily: 'Inter',
    textShadowColor: '#eee',
    marginTop: 30,
  },

  subtitle: {
    color: 'white',
    fontFamily: 'Inter',
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

  input: {
    borderRadius: 4,
    color: '#353542',
    fontSize: 14,
    fontFamily: 'Inter',
    height: '100%',
    width: '100%',
    paddingLeft: 25,
    borderWidth: 1,
    borderColor: '#353542',
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

export default Join;
