import { StyleSheet, View, TouchableOpacity, Modal, Text, TouchableHighlight } from "react-native";
import { Link } from "react-router-native";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faGear, faLink, faPlus, faUserPlus, faX } from "@fortawesome/free-solid-svg-icons";
import LinearGradient from "react-native-linear-gradient";
import { Shadow } from "react-native-shadow-2";
import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigate } from "react-router-native";


const Footer2 = ({ userData }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate();

    const copyToClipboard = () => {
        if (userData && userData.username) {
            Clipboard.setString(userData.username);
            
        }
    };

    const handleAdWatch = () => {
        navigate('/RewardAd');
    };
    

    return (
        <View style={styles.main}>
            <View style={styles.rectangle}>
                <View style={styles.iconFooterContainer}>
                    <Link to="/Home">
                        <View style={styles.iconwrapper}>
                            <FontAwesomeIcon icon={faHouse} size={27.5} color="#A2A2B5" />
                        </View>
                    </Link>
                    <Link to="/TeamList">
                        <View style={styles.iconwrapper}>
                            <FontAwesomeIcon icon={faUserPlus} size={27.5} color="#A2A2B5" />
                        </View>
                    </Link>
                </View>
                <View style={styles.iconFooterContainer}>
                    <Link to="/QuickLinks">
                        <View style={styles.iconwrapper}>
                            <FontAwesomeIcon icon={faLink} size={27.5} color="#A2A2B5" />
                        </View>
                    </Link>
                    <Link to="/Settings">
                        <View style={styles.iconwrapper}>
                            <FontAwesomeIcon icon={faGear} size={27.5} color="#A2A2B5" />
                        </View>
                    </Link>
                </View>

            </View>
            <View style={styles.mainIconContainer}>
            <Shadow
                distance={7.5}
                startColor={'rgba(0, 97, 255, 1)'} // Start color of the shadow
                finalColor={'rgba(0, 97, 255, 0.5)'}  // End color, typically transparent
                offset={[0, 0]} // Horizontal and vertical offset
                radius={32.5}
                style={styles.containerShadow}// Border radius of the shadow (should match the component)
            >
                <TouchableOpacity style={styles.innerIconContainer} onPress={() => setModalVisible(true)}>
                    <LinearGradient
                        colors={['#00FAD9', '#45D9F4']}  
                        style={styles.gradient}
                    >
                        <FontAwesomeIcon icon={faPlus} size={30} color="white" />
                    </LinearGradient>
                </TouchableOpacity>
            </Shadow>

            </View>

            <Modal
                animationType="slide" 
                transparent={true} 
                visible={modalVisible} 
                onRequestClose={() => setModalVisible(false)} 
            >
                <TouchableOpacity 
                    style={styles.modalBackground}
                    onPress={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Reward Ads</Text>
                        <Text style={styles.modalText}>Earn extra Hydrix by watching reward ads</Text>
                        <View style={styles.modalButtonRowA}>
                            <TouchableHighlight style={styles.modalButtonA} onPress={handleAdWatch}>
                                <Text style={styles.ModalButtonTextA}>Watch</Text>
                            </TouchableHighlight>
                        </View>
                        <Text style={styles.modalTitle}>Grow your team.</Text>
                        <Text style={styles.modalText}>YOUR username is the referral code used by Hydrix 
                            to identify your team members. 
                        </Text>
                        <Text style={styles.modalText}>Distribute your username to friends and family to grow your 
                            team and increase your mining returns!
                        </Text>
                        <View style={styles.modalButtonRow}>
                            <TouchableOpacity
                                style={styles.modalButtonA}
                                onPress={copyToClipboard}
                            >
                            <Text style={styles.ModalButtonTextA}>Copy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalButtonB}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.ModalButtonTextB}>Close</Text>
                        </TouchableOpacity>
                    </View>


                    {userData && (
                    <View style={styles.modalFinalRow}>
                    <Text style={styles.modalText}>{userData.username}</Text>
                    </View>
                    )}

                    </View>
                </TouchableOpacity>
            </Modal>
        </View>

    )
}

const styles = StyleSheet.create ({
    main: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0,
        position: 'absolute',
        marginBottom: 10,
        marginTop: 25,
        zIndex: 20,
    },
    containerShadow: {
        zIndex: 999999,
    },

    rectangle: {
        width: '90%',
        height: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',//'#353542',
        borderRadius: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        
    },

    closeIconContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#555555',
        position: 'absolute',
        top: 0,
        right: 0,
        marginRight: 10,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    iconFooterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '40%',
    },

    mainIconContainer: {
        position: 'absolute',
        height: 80,
        width: 80,
        borderRadius: 40,
        backgroundColor: '#1C1C23',
        bottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },

    innerIconContainer: {
        width: 65,
        height: 65,
        borderRadius: 32.5,
        backgroundColor: '#FF7966',
        alignItems: 'center',
        justifyContent: 'center',
    },



    iconwrapper: {
        
        alignItems: 'center',
        justifyContent: 'center',
        
      },

      modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#001B39', // Semi-transparent background
      },

      modalContainer: {
        width: '90%',
        padding: 30,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        borderRadius: 4, 
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        alignItems: 'center',
      },

      modalText: {
        fontSize: 16,
        color: '#A2A2B5',
        fontFamily: 'Inter',
        fontWeight: '400',
        lineHeight: 30,
        marginBottom: 20,
      },

      modalTextLarge: {
        fontSize: 24,
        color: 'white',
        fontFamily: 'Inter',
        fontWeight: '600',
        lineHeight: 30,
      },

      modalTitle: {
        fontSize: 24,
        color: 'white',
        fontFamily: 'Inter',
        fontWeight: '600',
        lineHeight: 30,
        marginBottom: 20,
      },

      closeButton: {
        color: 'blue',
        fontSize: 16,
        marginTop: 10,
      },

      modalButtonRow: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 20,
        marginTop: 20,
      },

      modalButtonRowA: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 40,
      },

      modalFinalRow: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        
      },

      modalButtonA: {
        width: '45%',
        height: 45,
        borderRadius: 4,
        backgroundColor: '#45D9F4',
        alignItems: 'center',
        justifyContent: 'center',
      },

      ModalButtonTextA: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
      },

      ModalButtonTextB: {
        fontSize: 16,
        fontWeight: '600',
        color: '#45D9F4',
      },

      modalButtonB: {
        width: '45%',
        height: 45,
        borderRadius: 4,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#45D9F4',
        alignItems: 'center',
        justifyContent: 'center',
      },

      gradient: {
        flex: 1,                    
        justifyContent: 'center',    
        alignItems: 'center',
        width: 65,
        height: 65,
        borderRadius: 32.5,
      },
})

export default Footer2;