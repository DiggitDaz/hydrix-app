import { Text, View, StyleSheet, TouchableOpacity, Platform, PermissionsAndroid, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigate } from 'react-router-native';
import { useImage } from '../utils/ImageContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import RadialGradient from 'react-native-radial-gradient';

//////////////////////////////////////////////////////////////////////////////////////////////

const ImageUpload = () => {
  const { setImageUri } = useImage();
  const navigate = useNavigate();
  const { imageUri } = useImage();

  const backButton = () => {
    navigate('/Home')
  }

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
          return true; // Not Android
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

      const handleCloseSuccessModal = () => {
    
      };

////////////////////////////////////////////////////////////////////////////////////////

    return (
        <View style={styles.container}>
          <RadialGradient
                style={{position: 'absolute', top: 260, left: 200, borderRadius: 150, width: 300, height: 300, zIndex: 10 }}  // Add width, height, and zIndex
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
            <View style={styles.uploadContainer}>
                <Text style={styles.titleNew}>Upload a Profile Image</Text>
                <TouchableOpacity 
                  style={styles.uploadInner}
                  onPress={pickImage}
                >
                  <Text style={styles.titleNew}>Upload</Text>
                  <FontAwesomeIcon icon={faUpload} color="#eee" size={20} style={{ marginTop: 5 }} />

                </TouchableOpacity>          
            <TouchableOpacity onPress={backButton} style={styles.buttonA}>
                <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
            </View>
            {imageUri && ( 
            <Image source={{ uri: imageUri }} style={styles.image} />
)}
  

        </View>
    );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#001B39', 
      position: 'relative',
      },

  button: {
      width: '60%',
      height: 50,
      backgroundColor: '#00FAD9',
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
      },

  buttonA: {
    width: '80%',
    height: 50,
    backgroundColor: '#45D9F4',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    },

  buttonText: {
      fontSize: 16,
      color: 'black',
      fontWeight: '600',
      },

  image: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 20,
      marginTop: 100,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
    },

  titleRow: {
      width: '90%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 50,
      zIndex: 20,
      },

  titleNew: {
      fontSize: 16,
      fontWeight: '600',
      color: 'white',
      },

  uploadContainer: {
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

  uploadInner: {
    width: '80%',
    marginBottom: 20,
    borderWidth: 2,
    height: 100,
    borderRadius: 4,
    borderStyle: 'dotted',
    borderColor: '#8e8e8e',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    },
  });

export default ImageUpload;