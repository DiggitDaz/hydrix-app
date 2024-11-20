import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, Text, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import SideMenu from '../../components/SideMenu';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faBell, faCertificate, faChevronRight, faDollarSign, faEnvelope, faEye, faImage, faKey, faShield, faTrophy, faUser, faUserPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Footer2 from '../../components/Footer2';
import { Link } from 'react-router-native';
import { Shadow } from 'react-native-shadow-2';
import { useImage } from '../utils/ImageContext';
import RadialGradient from 'react-native-radial-gradient';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-native';
import { USER_DATA} from '@env';

//////////////////////////////////////////////////////////////////////////////////



const Settings = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const { imageUri } = useImage();
    const teamMembers = userData && userData.team_members ? userData.team_members.split(',') : [];
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const screenWidth = Dimensions.get('window').width;
    const menuWidth = screenWidth * 0.75;
    const translateX = useRef(new Animated.Value(-menuWidth)).current;
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserData();
        const intervalId = setInterval(() => {
            fetchUserData();
        }, 30000);
            return () => clearInterval(intervalId);
        }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${USER_DATA}/user`);
            setUserData(response.data.userData);
            setDailyRate(response.data.userData.multiplier * 24 * response.data.userData.bonus); 
            setError(null); 
        } catch (error) {
            setError(error.message);
        }
    };

    const openMenu = () => {
        setIsMenuOpen(true);
        Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        }).start();
    };

    const closeMenu = () => {
        Animated.timing(translateX, {
        toValue: -menuWidth,
        duration: 300,
        useNativeDriver: true,
        }).start(() => {
        setIsMenuOpen(false);
        });
    };

    const handleLogout = async () => {
        try {
            
            logout();
            navigate('/');
            } catch (error) {
                error(error);
                }
            };

/////////////////////////////////////////////////////////////////////////////////
    
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.topRow}>
                    <TouchableOpacity onPress={openMenu} style={styles.openButton}>
                        <FontAwesomeIcon icon={faBars} size={22.5} color={"#A2A2B5"} />
                    </TouchableOpacity>
                    <Text style={styles.titleText}>Settings</Text>
                    <TouchableOpacity style={styles.openButton}>
                        <FontAwesomeIcon icon={faBell} size={22.5} color={"#A2A2B5"} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.faceContainer}>
                <Shadow
                    distance={10}
                    startColor={'rgba(255, 255, 255, 0.3)'} 
                    finalColor={'rgba(255, 255, 255, 0.1)'}  
                    offset={[0, 0]} 
                    radius={70} 
                >
                    <View style={styles.picContainer}>
                        <Image source={{ uri: imageUri }} style={styles.pic} />
                    </View>
                </Shadow>
{userData &&(
<>
                <Text style={styles.userName}>{userData.username}</Text>
                <Text style={styles.userEmail}>{userData.email}</Text>
    </>
)}
            </View>
            <RadialGradient
                style={{position: 'absolute', top: 300, left: '70%', borderRadius: 150, width: 300, height: 300, zIndex: 10 }}  // Add width, height, and zIndex
                colors={['rgba(193, 2, 196, 0.3)', 'rgba(193, 2, 196, 0.1)', '#001B39' ]}
                center={[150, 150]}  // Adjust center relative to size
                radius={150}  
            />
            <RadialGradient
                style={{position: 'absolute', top: 50, left: -100, borderRadius: 150, width: 300, height: 300, zIndex: 10 }}  // Add width, height, and zIndex
                colors={['rgba(193, 2, 196, 0.3)', 'rgba(193, 2, 196, 0.1)', '#001B39' ]}
                center={[150, 150]}  // Adjust center relative to size
                radius={150}  
            />
            <RadialGradient
                style={{position: 'absolute', top: 600, left: 50, borderRadius: 150, width: 300, height: 300, zIndex: 10 }}  // Add width, height, and zIndex
                colors={['rgba(193, 2, 196, 0.3)', 'rgba(193, 2, 196, 0.1)', '#001B39' ]}
                center={[150, 150]}  // Adjust center relative to size
                radius={150}  
            />
            <RadialGradient
                style={{position: 'absolute', top: 950, right: -155, borderRadius: 150, width: 300, height: 300, zIndex: 10 }}  // Add width, height, and zIndex
                colors={['rgba(193, 2, 196, 0.3)', 'rgba(193, 2, 196, 0.1)', '#001B39' ]}
                center={[150, 150]}  // Adjust center relative to size
                radius={150}  
            />
            <RadialGradient
                style={{position: 'absolute', top: 950, left: -155, borderRadius: 150, width: 300, height: 300, zIndex: 10 }}  // Add width, height, and zIndex
                colors={['rgba(193, 2, 196, 0.3)', 'rgba(193, 2, 196, 0.1)', '#001B39' ]}
                center={[150, 150]}  // Adjust center relative to size
                radius={150}  
            />
            <View style={styles.titleRow}>
                <Text style={styles.titleNew}>User Info</Text>
            </View>
            <View style={styles.userInfoContainer}>
                <View style={styles.userInfoRow}>
                    <View style={styles.userInfoRowComponent}>
                        <FontAwesomeIcon icon={faUser} size={15} color="#A2A2B5" />
                        <Text style={styles.userInfoText}>Username</Text>
                    </View>
                    <View style={styles.userInfoRowComponentA}>
{userData && (
                        <Text style={styles.userInfoTextA}>{userData.username}</Text>

)}
                    </View>

                </View>
            <View style={styles.userInfoRow}>
                <View style={styles.userInfoRowComponent}>
                    <FontAwesomeIcon icon={faEnvelope} size={15} color="#A2A2B5" />
                    <Text style={styles.userInfoText}>Email</Text>
                </View>

                <View style={styles.userInfoRowComponentA}>
{userData && (
                    <Text style={styles.userInfoTextA}>{userData.email}</Text>

)}
                </View>
            </View>
            <Link to="/ForgotPassword">
            <View style={styles.userInfoRow}>
                <View style={styles.userInfoRowComponent}>
                    <FontAwesomeIcon icon={faKey} size={15} color="#A2A2B5" />
                    <Text style={styles.userInfoText}>Password</Text>
                </View>

                <View style={styles.userInfoRowComponentA}>
{userData && (
    <>
                    <Text style={styles.userInfoTextB}>Change</Text>
                    <FontAwesomeIcon icon={faChevronRight} size={15} color="#45D9F4" />
    </>
)}
                </View>

            </View>
            </Link>
            <Link to="/imageUpload">
                <View style={styles.userInfoRow}>
                    <View style={styles.userInfoRowComponent}>
                        <FontAwesomeIcon icon={faImage} size={15} color="#A2A2B5" />
                        <Text style={styles.userInfoText}>Profile image</Text>
                    </View>
                    <View style={styles.userInfoRowComponentA}>
{userData && (
    <>
                        <Text style={styles.userInfoTextB}>Update</Text>
                        <FontAwesomeIcon icon={faChevronRight} size={15} color="#45D9F4" />
    </>
)}
                    </View>
                </View>
            </Link>
            </View>
            <View style={styles.titleRow}>
                <Text style={styles.titleNew}>App Info</Text>
            </View>
            <View style={styles.userInfoContainer}>
                <View style={styles.userInfoRow}>
                    <View style={styles.userInfoRowComponent}>
                        <FontAwesomeIcon icon={faCertificate} size={15} color="#A2A2B5" />
                        <Text style={styles.userInfoText}>Verified</Text>
                    </View>
                    <View style={styles.userInfoRowComponentA}>
{userData && (
    <>
                        <Text style={styles.userInfoTextA}>Coming Soon</Text>
    </>
)}
                    </View>
                </View>
                <View style={styles.userInfoRow}>
                    <View style={styles.userInfoRowComponent}>
                        <FontAwesomeIcon icon={faShield} size={15} color="#A2A2B5" />
                        <Text style={styles.userInfoText}>KYC</Text>
                    </View>
                    <View style={styles.userInfoRowComponentA}>
                        <Text style={styles.userInfoTextA}>Coming soon</Text>
                    </View>
                </View>
                <View style={styles.userInfoRow}>
                    <View style={styles.userInfoRowComponent}>
                        <FontAwesomeIcon icon={faEye} size={15} color="#A2A2B5" />
                        <Text style={styles.userInfoText}>Verify method</Text>
                    </View>
                    <View style={styles.userInfoRowComponentA}>
                        <Text style={styles.userInfoTextA}>Coming Soon</Text>
                    </View>
                </View>
            </View>
            <View style={styles.titleRow}>
                <Text style={styles.titleNew}>Progress</Text>
            </View>
            <View style={styles.userInfoContainer}>
                <View style={styles.userInfoRow}>
                    <View style={styles.userInfoRowComponent}>
                        <FontAwesomeIcon icon={faDollarSign} size={15} color="#A2A2B5" />
                        <Text style={styles.userInfoText}>Balance</Text>
                    </View>
                        <View style={styles.userInfoRowComponentA}>
{userData && (
    <>
                            <Text style={styles.userInfoTextA}>{userData.balance.toFixed(2)}</Text>
    </>
)}
                        </View>
                </View>
                <View style={styles.userInfoRow}>
                    <View style={styles.userInfoRowComponent}>
                        <FontAwesomeIcon icon={faUserPlus} size={15} color="#A2A2B5" />
                        <Text style={styles.userInfoText}>Team size</Text>
                    </View>
                        <View style={styles.userInfoRowComponentA}>
{userData && (
                            <Text style={styles.userInfoTextA}>{teamMembers.length}</Text>
)}
                        </View>
                </View>
                <View style={styles.userInfoRow}>
                    <View style={styles.userInfoRowComponent}>
                        <FontAwesomeIcon icon={faXmark} size={15} color="#A2A2B5" />
                        <Text style={styles.userInfoText}>Multiplier</Text>
                    </View>
                        <View style={styles.userInfoRowComponentA}>
{userData && (
                            <Text style={styles.userInfoTextA}>{userData.multiplier}</Text>
)}
                        </View>
                </View>
                <View style={styles.userInfoRow}>
                    <View style={styles.userInfoRowComponent}>
                        <FontAwesomeIcon icon={faTrophy} size={15} color="#A2A2B5" />
                        <Text style={styles.userInfoText}>Bonus</Text>
                    </View>
                        <View style={styles.userInfoRowComponentA}>
{userData && (
                            <Text style={styles.userInfoTextA}>{userData.bonus}</Text>
)}
                        </View>
                </View>
                <View style={styles.userInfoRow}>
                    <View style={styles.userInfoRowComponent}>
                        <FontAwesomeIcon icon={faUserPlus} size={15} color="#A2A2B5" />
                        <Text style={styles.userInfoText}>Referrer</Text>
                    </View>
                        <View style={styles.userInfoRowComponentA}>
{userData && (
                            <Text style={styles.userInfoTextA}>{userData.referrer}</Text>
)}
                        </View>
                </View>
            </View>

            <TouchableOpacity onPress={handleLogout} style={styles.button}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>

            <View style={styles.versionRow}>
                <Text style={styles.versionText}>V 12.0.6</Text>
            </View>
            {isMenuOpen && (
                <TouchableOpacity style={styles.overlay} onPress={closeMenu} />
            )}
                    <Animated.View style={[styles.sideMenu, { transform: [{ translateX }] }]}>
                        <SideMenu closeMenu={closeMenu} />
                    </Animated.View>
                <Footer2 userData={userData} />
        </ScrollView>
    );
};

////////////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create ({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        paddingBottom: 280,
        backgroundColor: '#001B39',
        },

    openButton: {
        padding: 10,
        borderRadius: 5,
        margin: 10,
        },

    button: {
        width: '90%',
        height: 50,
        borderRadius: 4,
        backgroundColor: '#00FAD9',
        alignItems: 'center',
        justifyContent: 'center',
        },

    buttonText: {
        fontFamily: 'Inter',
        fontWeight: '800',
        fontSize: 20,
        color: 'rgba(0, 0, 0, 1)',
    },

    topRow: {
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        },
    
    versionText: {
        fontFamily: 'Inter',
        fontWeight: '400',
        fontSize: 10,
        color: '#A2A2B5',
        },

    versionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        },

    topContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',//'#353542',
        width: '90%',
        height: 50,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginTop: 10,
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        zIndex: 20,
        },

    titleText: {
        fontSize: 16,
        color: 'white',
        },

    titleRow: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 10,
        zIndex: 20,
        },

    titleNew: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        },

    picContainer: {
        height: 140,
        width: 140,
        borderRadius: 70,
        borderWidth: 3,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 20,
        },

    pic: {
        height: 138,
        width: 138,
        borderRadius: 69,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
        },

    userInfoContainer: {
        width: '90%', 
        paddingLeft: 20, 
        paddingRight: 20, 
        paddingTop: 16, 
        paddingBottom: 16, 
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        borderRadius: 4, 
        flexDirection: 'column', 
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        gap: 10, 
        display: 'inline-flex',
        marginBottom: 40,
        zIndex: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        },

    userInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        marginTop: 15,
        marginBottom: 15,
        },

    userInfoRowComponent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        },

    userInfoRowComponentA: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        },

    userInfoText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Inter',
        fontWeight: '600',
        lineHeight: 20,
        marginLeft: 20,
        },

    userInfoTextA: {
        color: '#A2A2B5',
        fontSize: 16,
        fontFamily: 'Inter',
        fontWeight: '600',
        lineHeight: 20,
        },

    
    userInfoTextB: {
        color: '#A2A2B5',
        fontSize: 16,
        fontFamily: 'Inter',
        fontWeight: '600',
        lineHeight: 20,
        marginRight: 15,
        },

    faceContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: '25%',
        zIndex: 20,
        },

    userName: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Inter',
        fontWeight: '700',
        lineHeight: 32,
        marginTop: 10,
        },

    userEmail: {
        color: '#A2A2B5',
        fontSize: 14,
        fontFamily: 'Inter',
        fontWeight: '500',
        lineHeight: 16,
        marginTop: 15,    
        },

    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba( 255, 255, 255, 0.5)',
        zIndex: 999,
        },
      
    sideMenu: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: '75%',
        backgroundColor: 'white',
        zIndex: 999,
        },
});

export default Settings;
