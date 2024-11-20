import { View, StyleSheet, Text, Animated, Dimensions,  ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faBell } from '@fortawesome/free-solid-svg-icons/';
import Footer2 from '../../components/Footer2';
import RadialGradient from 'react-native-radial-gradient';
import SideMenu from '../../components/SideMenu';
import axios from 'axios';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { USER_DATA } from '@env';

/////////////////////////////////////////////////////////////////////////////////////

const TeamList = () => {
    const [userData, setUserData] = useState(null);
    const [percentage, setPercentage] = useState(null);
    const [error, setError] = useState(null);
    const [dailyRate, setDailyRate] = useState(0);
    const teamMembers = userData && userData.team_members ? userData.team_members.split(',') : [];
    const contribution = teamMembers.length * 20;
    const [modalVisible, setModalVisible] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const screenWidth = Dimensions.get('window').width;
    const menuWidth = screenWidth * 0.75;
    const translateX = useRef(new Animated.Value(-menuWidth)).current;
    const [memberColors, setMemberColors] = useState([]);

    const getInitials = (name) => {
        if (!name) return '';
        return name[0].toUpperCase();
    };

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${USER_DATA}/user`); 
            setUserData(response.data.userData);
            setDailyRate(response.data.userData.multiplier * 24); 
            setError(null); 
        } catch (error) {
            setError(error.message);
        }
    };

    const updatePercentage = () => {
        if (userData && userData.base_rate) {
            const currentRate = userData.base_rate * userData.multiplier;
            const baseRatePercentage = (userData.base_rate / currentRate) * 100;
            const teamContributionPercentage = 100 - baseRatePercentage;
            setPercentage(teamContributionPercentage.toFixed(0));
        }
    };

    useEffect(() => {
        fetchUserData();
        const intervalId = setInterval(() => {
            fetchUserData();
            updatePercentage();
        }, 30000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (userData) {
            updatePercentage();
        }
    }, [userData]);

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

    const colors = [
        'rgba(97, 0, 255, 1)',
        'rgba(0, 97, 255, 1)',
        '#00FAD9'
    ];
    
    const getRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    };
      
    useEffect(() => {
        if (userData && userData.team_members) {
            const members = userData.team_members.split(',');  
            const randomColors = members.map(() => getRandomColor());  
            setMemberColors(randomColors);  
        }
    }, [userData]);

////////////////////////////////////////////////////////////////////////////////////////
    
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.topRow}>
                    <TouchableOpacity onPress={openMenu} style={styles.openButton}>
                        <FontAwesomeIcon icon={faBars} size={22.5} color={"#A2A2B5"} />
                    </TouchableOpacity>
                    <Text style={styles.titleText}>Team</Text>
                    <TouchableOpacity style={styles.openButton}>
                        <FontAwesomeIcon icon={faBell} size={22.5} color={"#A2A2B5"} />
                    </TouchableOpacity>
                </View>
            </View>
            <RadialGradient
                style={{position: 'absolute', bottom: 250, left: 200, borderRadius: 150, width: 300, height: 300, zIndex: 10 }}  // Add width, height, and zIndex
                colors={['rgba(193, 2, 196, 0.3)', 'rgba(193, 2, 196, 0.1)', '#001B39' ]}
                center={[150, 150]}  
                radius={150}  
            />
            <RadialGradient
                style={{position: 'absolute', top: 600, left: 50, borderRadius: 150, width: 300, height: 300, zIndex: 10 }}  // Add width, height, and zIndex
                colors={['rgba(193, 2, 196, 0.3)', 'rgba(193, 2, 196, 0.1)', '#001B39' ]}
                center={[150, 150]}  
                radius={150}  
            />
            <RadialGradient
                style={{position: 'absolute', top: 950, right: -155, borderRadius: 150, width: 300, height: 300, zIndex: 10 }}  // Add width, height, and zIndex
                colors={['rgba(193, 2, 196, 0.3)', 'rgba(193, 2, 196, 0.1)', '#001B39' ]}
                center={[150, 150]}  
                radius={150}  
            />
            <RadialGradient
                style={{position: 'absolute', top: 950, left: -155, borderRadius: 150, width: 300, height: 300, zIndex: 10 }}  // Add width, height, and zIndex
                colors={['rgba(193, 2, 196, 0.3)', 'rgba(193, 2, 196, 0.1)', '#001B39' ]}
                center={[150, 150]}  
                radius={150}  
            />
            <View style={styles.progressContainer}>
                <AnimatedCircularProgress
                    size={250}
                    width={10}
                    fill={percentage}  
                    tintColor="#00FAD9"
                    backgroundColor="rgba(78, 78, 97, 0.20)"
                    arcSweepAngle={180}     
                    rotation={270}          
                    lineCap="round"
                />
                <Text style={styles.percentText}>{percentage} %</Text>
                <Text style={styles.smallBalanceText}>Team contribution</Text>
                <View style={styles.firstCircle} />
                <View style={styles.secondCircle} />
                <View style={styles.overlayCircle} />
            </View>
            <View style={styles.titleRow}>
                <Text style={styles.titleNew}>Your team</Text>
            </View>
            {userData && (<>
                <View style={styles.MasterDataContainer}>
                    {userData && userData.team_members ? (
                        <View style={styles.gridContainer}>
                            {userData.team_members.split(',').map((item, index) => (
                                <View key={index} style={styles.dataColumn}>
                                    <View style={styles.dataColumnRow}>
                                        <View style={styles.initialContainer}>                                    
                                            <Text style={styles.inviteText}>{getInitials(item)}</Text>
                                        </View>
                                    </View>
                                <View style={styles.dataColumnRow}>
                                    <Text style={styles.largeText}>{item}</Text>
                                </View>
                                </View>
                        ))}
                        </View>
                ) : (
                    <Text style={styles.bottomText1}>No user data available.</Text>
                )}
                </View>
            </>)}        
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

//////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: '#001B39',
        paddingBottom: 125,
        },

    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '90%',
        },

    openButton: {
        padding: 10,
        borderRadius: 5,
        margin: 10,
        },

    topRow: {
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        },

    topContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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

    progressContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
        zIndex: 20,
        },

    firstCircle: { 
        opacity: 0.10, 
        borderWidth: 5,
        borderColor: '#00FAD9',
        borderStyle: 'dotted',
        position: 'absolute',
        top: 70,
        width: 220,
        height: 220,
        borderRadius: 110,
        },

    secondCircle: { 
        opacity: 0.10, 
        borderWidth: 3,
        borderStyle: 'dotted',
        borderTopColor: '#AD7BFF',
        borderRightColor: '#AD7BFF',
        borderLeftColor: '#AD7BFF',
        borderBottomColor: '#1C1C23',
        position: 'absolute',
        top: 30,
        width: 300,
        height: 300,
        borderRadius: 150,
        },

    percentText: {
        textAlign: 'center', 
        color: 'white', 
        fontSize: 40, 
        fontWeight: '600',
        position: 'absolute',
        fontFamily: 'Inter',
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
    
    overlayCircle: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '49%',  
        backgroundColor: '#001B39',
        },

    inviteText: {
        fontSize: 22,
        fontFamily: 'Inter',
        fontWeight: '600',
        color: '#A2A2B5',
        },

    initialContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        },

    titleText: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'Inter',
        },

    sideMenu: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: '75%',
        backgroundColor: 'white',
        elevation: 15,
        zIndex: 9999,
        },

    MasterDataContainer: {
        flex: 1,
        padding: 10,
        zIndex: 20,
        },

    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        zIndex: 999,
        },

    dataColumn: {
        width: '48%',  
        marginBottom: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 4,
        height: 130,
        flexDirection: 'column',
        border: 1,
        borderColor: 'rgba(255, 255, 255, 1)',
        },

    dataColumnRow: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        },
    
    smallBalanceText: {
        color: '#83839C',
        fontSize: 12,
        fontFamily: 'Inter',
        fontWeight: '600',
        lineHeight: 16,
        position: 'absolute',
        top: 110,
        },

    largeText: {
        fontSize: 16,
        color: 'white',
        fontWeight: '600',
        fontFamily: 'Inter',
        },
});

export default TeamList;