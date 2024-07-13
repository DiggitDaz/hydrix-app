import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Animated, Linking, Text, Image, ScrollView, TouchableHighlight, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsis, faXmark, faSackDollar, faShare, faCopy, faQrcode, faUserXmark, faCheck, faUserPlus, faBell, faConciergeBell, faBellConcierge, faBellSlash, faEllipsisVertical, faMoneyBillTransfer, faChevronRight, faQuestionCircle, faQuestion, faCircleQuestion } from '@fortawesome/free-solid-svg-icons/';
import Footer from '../../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-native';
import { useAuth } from '../utils/AuthContext';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import Logo from '../assets/Logo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = () => {

    const { logout } = useAuth();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [dailyRate, setDailyRate] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [link, setLink] = useState('');
    const [isMining, setIsMining] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [showContacts, setShowContacts] = useState(false);
    const [showContactsModal, setShowContactsModal] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [ExpandmodalVisible, setExpandModalVisible] = useState(false);
    const [visible, setVisible] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;

    const today = new Date().toLocaleDateString();
    const navigate = useNavigate();

    const teamMembers = userData && userData.team_members ? userData.team_members.split(',') : [];
    const contribution = teamMembers.length * 20;

    const toggleInfoBox = () => {
        if (visible) {
            Animated.timing(animation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setVisible(false));
        } else {
            setVisible(true);
            Animated.timing(animation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };

    const toggleTeamBox = () => {
        if (visible) {
            Animated.timing(animation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setVisible(false));
        } else {
            setVisible(true);
            Animated.timing(animation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };

    const infoBoxStyle = {
        opacity: animation,
        transform: [
            {
                scale: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                }),
            },
        ],
    };
    

    // encode QR link
    const generateQRCode = () => {
        const qrCodeLink = 'https://www.hydrix.me';
        setLink(qrCodeLink);
      };

    useEffect(() => {
        fetchUserData();
        fetchToalUsers();
        const intervalId = setInterval(() => {
            fetchUserData();
        }, 30000);

        return () => clearInterval(intervalId);
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://77.68.102.168:4000/user'); 
            //console.log('userData', data.userData);
            setUserData(response.data.userData);
            setDailyRate(response.data.userData.multiplier * 24 * response.data.userData.bonus); 
            console.log(response.headers.authorization); 
            setError(null); // Reset error state if successful
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchToalUsers = async () => {
        try {
            const response = await axios.get('http://77.68.102.168:4000/totalUsers');
            console.log('total users =', response.data);
            setTotalUsers(response.data);
        } catch (error) {
            setError(error.message);
        }
    };

    const handlePressIn = () => {
    setIsHovered(true);
    };

    const handlePressOut = () => {
    setIsHovered(false);
    };

    const startMining = async () => {
        try {
            const response = await axios.get('http://77.68.102.168:4000/startMining');
            
        } catch (error) {
            console.error('Error starting mining:', error.message);
        }
    };

    useEffect(() => {
        checkMiningStatus();
    }, []);

    const handleTimerClick = async () => {
        if (!isMining) {
            const startTime = new Date().getTime();
            await AsyncStorage.setItem('miningStartTime', startTime.toString());
            setIsMining(true);
            setCountdown(24 * 60 * 60); // Set countdown for 24 hours
            startTimer();
        }
    };

    const startTimer = () => {
        const timerInterval = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown <= 1) {
                    clearInterval(timerInterval);
                    setIsMining(false);
                    AsyncStorage.removeItem('miningStartTime');
                    return 0;
                }
                return prevCountdown - 1;
            });
        }, 1000);
    };

    const checkMiningStatus = async () => {
        const startTime = await AsyncStorage.getItem('miningStartTime');
        if (startTime) {
            const startTimeDate = new Date(parseInt(startTime, 10));
            const currentTime = new Date();
            const elapsedTime = Math.floor((currentTime - startTimeDate) / 1000);
            const remainingTime = 24 * 60 * 60 - elapsedTime;

            if (remainingTime > 0) {
                setIsMining(true);
                setCountdown(remainingTime);
                startTimer();
            } else {
                AsyncStorage.removeItem('miningStartTime');
            }
        }
    };

    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

  
    const handleButtonPress = () => {
            startMining();
            handleTimerClick();
            
    };

    const handleLogout = async () => {
        try {
            console.log('Attempting Logout');
            logout();
            navigate('/');


        } catch (error) {
            error(error);
        }
    };

    const getInitials = (name) => {
        if (!name) return '';
        return name[0].toUpperCase();
    };

    const handleWalletPressIn = () => {
        setModalVisible(true);
    };

    const handleWalletPressOut = () => {
        setModalVisible(false);
    };

    const handleExpandPressIn = () => {
        setExpandModalVisible(true);
    };

    const handleExpandPressOut = () => {
        setExpandModalVisible(false);
    };

    const colors = [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
        'rgba(199, 199, 199, 0.5)'
    ];
    
    const getRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    };


        const [memberColors, setMemberColors] = useState([]);
    
        useEffect(() => {
            if (userData && userData.team_members) {
                const members = userData.team_members.split(',');
                const colors = members.map(() => getRandomColor());
                setMemberColors(colors);
            }
        }, [userData]);

    
    
    
    return (
        <ScrollView contentContainerStyle={styles.container}>
{userData && (
    <>
        <View style={styles.topRow}>
            <View style={styles.topRowLeft}>
                <View style={styles.topIconContainer}>
                    <Text style={styles.iconText}>{getInitials(userData.username)}</Text>
                </View>
                <View style={styles.topRowLeftColumn}>
                    <Text style={styles.smallText2}>Welcome {userData.username}</Text>
                    <Text style={styles.smallText6}>Balance: {userData.balance.toFixed(2)}</Text>
                </View> 
            </View>    
            <View style={styles.iconContainer4}>
                <FontAwesomeIcon icon={faBell} color="#8e8e8e" size={30} />
            </View>
        </View>
    </>
)}

{userData && (
    <>
           
            <View style={styles.MiningContainer}>
                <View style={styles.myRow}>
                    <View style={styles.myRowColumn}>
                        <Text style={styles.myTopText}>Manage your mining</Text>

                        <TouchableHighlight 
                        onPress={handleButtonPress}
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                        style={[styles.button, isMining && styles.disabledButton]}
                        underlayColor="transparent"
                        disabled={isMining} >

                        <Text style={styles.ButtonText}>{isMining ? 'MINING!' : 'MINE'}</Text>
                        </TouchableHighlight>

                    </View>

                    <View style={styles.myRowColumn}>
                        <TouchableWithoutFeedback onPress={toggleInfoBox}>

                            <View style={styles.myRowColumnRow}>
                                <FontAwesomeIcon icon={faEllipsisVertical} size={25} color="white" />
                            </View>
                        </TouchableWithoutFeedback>
                        {visible && (
                            <Animated.View style={[styles.infoBox, infoBoxStyle]}>
                                <Text style={styles.infoText}>You are earning {dailyRate.toFixed(1)} daily</Text>
                                

                            </Animated.View>
                        )}
                        <View style={styles.myRowColumnRowAlt}>
                            <CountdownCircleTimer
                            isPlaying={isMining}
                            duration={86400}
                            colors="#02a2ad"
                            size={100}
                            trailColor='#09022b'
                            
                            >
                                {({ remainingTime }) => (
                                    <Text style={styles.timerText}>
                                        {formatTime(remainingTime)}
                                    </Text>
                )}
                            </CountdownCircleTimer>
                        </View>

                    
                        
                    
                </View>
                </View>
                
            
            </View>
</> 
)}          
{userData && (
<>          
            
            <View style={styles.MiningContainer1}>
                <View style={styles.divvyDiv}>
                    <View style={styles.myIconContainer}>
                        <FontAwesomeIcon icon={faXmark} size={20} color="#02a2ad" />
                    </View>
                    <Text style={styles.myForgotText}>Multiplier</Text>
                    <Text style={styles.myForgotText}>{userData.multiplier}</Text>

                </View>
            
                <View style={styles.divvyDiv}>
                    <View style={styles.myIconContainer}>
                        <FontAwesomeIcon icon={faCheck} size={20} color="#02a2ad" />
                    </View>
                    <Text style={styles.myForgotText}>Bonus</Text>
                    <Text style={styles.myForgotText}>{userData.bonus}</Text>

                </View>

                <View style={styles.divvyDiv}>
                    <View style={styles.myIconContainer}>
                        <FontAwesomeIcon icon={faUserPlus} size={20} color="#02a2ad" />
                    </View>
                    <Text style={styles.myForgotText}>Team</Text>
                    <Text style={styles.myForgotText}>{teamMembers.length}</Text>

                </View>
            </View>

            <View style={styles.masterBalanceContainer}>
                <View style={styles.balanceContainer}>
                <TouchableWithoutFeedback
                    onPressIn={handleWalletPressIn}
                >
                        <View style={styles.myRowAltAltAlt}>
                        <Text style={styles.smallText5}>Your Digital Wallet</Text>
                        <FontAwesomeIcon icon={faMoneyBillTransfer} size={35} color="white" />
                    </View>
                </TouchableWithoutFeedback>

                <View style={styles.myRowAltAlt}>
                    <View style={styles.iconContainer1}>
                        <Image 
                            source={Logo}
                            style={styles.image}
                        />
                    </View>
                    <Text style={styles.smallText4}>{userData.balance.toFixed(2)}</Text>
                </View>
                </View>
            </View>
                
                <Modal
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <TouchableWithoutFeedback onPress={handleWalletPressOut}>
                        <View style={styles.modalBackground}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modaltext}>This is your digital wallet. Upon TGE you 
                                    can migrate your tokens between web2 and web3 versions!
                                </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            

            <View style={styles.MiningTitleContainer}>
                <Text style={styles.smallText3}>Your team</Text>
                    <TouchableWithoutFeedback onPressIn={toggleTeamBox}>
                        <View style={styles.teamIconContainer}>
                            <FontAwesomeIcon icon={faCircleQuestion} size={20} color="rgba(9, 2, 43, 1)" />
                        </View>
                    </TouchableWithoutFeedback>
                        <Animated.View style={[styles.infoBox, infoBoxStyle]}>
                            <Text style={styles.infoText}>You have {teamMembers.length} members who
                                contribute {contribution} % of your earnings
                            </Text>
                        </Animated.View>
            </View>

            <View style={styles.MasterTeamContainer}>
            {userData && userData.team_members ? (
                userData.team_members.split(',').map((item, index) => (
                    <View key={index} style={styles.dataRow}>
                        <View style={styles.dataRowRow}>
                            <View style={styles.topIconContainer}>
                                <Text style={styles.iconText}>{getInitials(item)}</Text>
                            </View>
                            <Text style={styles.largeText}>{item}</Text>
                        </View>
                        <FontAwesomeIcon icon={faEllipsisVertical} size={25} color="#09022b" />

                    </View>
                ))
            ) : (
                <Text style={styles.bottomText1}>No user data available.</Text>
            )}
        </View>
            <TouchableWithoutFeedback onPressIn={handleExpandPressIn}>
            <View style={styles.inviteDiv}>
                <Text style={styles.ButtonText}>Expand your team</Text>
                <FontAwesomeIcon icon={faChevronRight} color="white" size={20} />
            </View>
            </TouchableWithoutFeedback>
                <Modal
                    transparent={true}
                    visible={ExpandmodalVisible}
                    onRequestClose={() => setExpandModalVisible(false)}
                >
                    <TouchableWithoutFeedback onPress={handleExpandPressOut}>
                        <View style={styles.modalBackground}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modaltext}>This is for testing purposes only!
                                </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
</>
)}                
            
           
  
         
            

           
            <Footer />
            
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        margin: 0,
        padding: 0,
        
    },

    buttonInner: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
        
    },

    masterBalanceContainer: {
        width: '95%',
        backgroundColor: 'rgba(9, 2, 43, 0.1)',
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 30,
    },

    socialsTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '90%',
    },

    lineContainer: {
        width: '35%',
        borderWidth: 1,
        borderBottomColor: 'black',
    },

    gradient: {
        flex: 1,
    },

    Logos: {
        width: 55,
        height: 55,
        
    },

    myTopText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 19,
        color: 'white',
    },

    timerText: {
        color: 'white',
        fontSize: 14,
    },

    MasterTeamContainer: {
        width: '95%',
        height: 'auto',
        marginBottom: 25,
        backgroundColor: 'rgba(9, 2, 43, 0.1)',
        alignItems: 'center',
        paddingBottom: 25,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },

    mySecondText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 18,
        color: 'rgba(0, 0, 0, 0.6)',
    },

    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },

    buttonOverlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    GreenTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        height: 55,
        backgroundColor: 'rgba(52, 66, 199, 1)',
        borderRadius: 7.5,
        marginBottom: 30,
        
    },

    myRowColumnRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end',
    },

    myRowColumnRowAlt: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
    },

    forgotText: {
        fontFamily: 'Montserrat-Bold',
        color: 'rgba(0, 0, 0, 0.75)',
        textAlign: 'center',
      },

      myForgotText: {
        fontFamily: 'Montserrat-Bold',
        color: 'rgba(0, 0, 0, 0.75)',
        textAlign: 'center',
        marginBottom: 10,
      },

    GreenText: {
        fontSize: 24,
        fontFamily: 'Montserrat-Bold',
        color: 'rgba(255, 255, 255, 1)', 
    },


    MasterDataContainer: {
        width: '90%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 7.5,
        paddingBottom: 30,
        marginBottom: 10,
        marginTop: 30,
        elevation: 5,
        shadowColor: 'rgba(255, 255, 255, 1)',
    },

    input: {
        borderRadius: 7.5,
        backgroundColor: '#eee',
        fontSize: 14,
        fontFamily: 'Montserrat-Regular',
        height: 55,
        width: '100%',
        paddingLeft: 25,
        paddingRight: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 30,
        // borderWidth: 1.5,
        // borderColor: 'rgba(22, 40, 199, 1)',
      },

    disabledButton: {
        backgroundColor: 'transparent',
    },

   

    fomrRow: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },

    topRow: {
        flexDirection: 'row',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 75,
        marginBottom: 25,
    },

    topRowLeft: {
        flexDirection: 'row',
        width: '70%',
    },

    topRowLeftColumn: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 15,

    },

    topIconContainer: {
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 22.5,
        backgroundColor: '#09022b',
        
    },

    inviteDiv: {
        flexDirection: 'row',
        width: '90%',
        height: 70,
        borderRadius: 30,
        borderWidth: 1.5,
        borderColor: '#09022b',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#09022b', 
        paddingLeft: 25,
        paddingRight: 25,
        marginTop: 25,
        
    },

    inviteIconContainer: {
        width: 45,
        height: 45,
        backgroundColor: '#222222',
        borderRadius: 7.5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    circle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 10,
    },

    iconContainer4: {
        width: 70,
        height: 70,
        borderRadius: 35, // Remove quotes
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },

    iconContainer1: {
        width: 55,
        height: 55,
        borderRadius: 27.5, // Remove quotes
        backgroundColor: '#09022b',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 30,
        
    },

    smallText2: {
        fontSize: 18,
        color: 'black',
        fontFamily: 'Montserrat-Bold',
    },

    iconText: {
        fontSize: 24,
        color: '#02a2ad',
        fontFamily: 'Montserrat-Bold',
    },

    smallText3: {
        fontSize: 18,
        color: '#09022b',
        fontFamily: 'Montserrat-Bold',
    },


    smallText4: {
        fontSize: 19,
        color: '#09022b',
        fontFamily: 'Montserrat-ExtraBold',
    },

    smallText5: {
        fontSize: 19,
        color: 'white',
        fontFamily: 'Montserrat-Bold',
    },

    smallText6: {
        fontSize: 13,
        color: '#09022b',
        fontFamily: 'Montserrat-Bold',
    },



    topText: {
        fontSize: 26,
        color: 'rgba(0, 0, 0, 1)',
        fontFamily: 'Montserrat-Bold',
        textShadowColor: '#eee',
        
        
      },

      topTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
      },

    MiningContainer: {
        alignItems: 'center',
        marginBottom: 30,
        borderRadius: 35,
        overflow: 'hidden',
        width: '90%',
        flexDirection: 'column',
        //justifyContent: 'center',
        backgroundColor: '#09022b',
        elevation: 5,
        shadowColor: 'rgba(255, 255, 255, 1)',
        },
    
        balanceContainer: {
            //alignItems: 'center',
            marginBottom: 50,
            borderRadius: 35,
            overflow: 'hidden',
            width: '90%',
            flexDirection: 'column',
            //justifyContent: 'center',
            paddingBottom: 25,
            paddingLeft: 25,
            paddingRight: 25,
            backgroundColor: 'rgba(9, 2, 43, 1)',
            marginTop: 50,
            },

    myRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginTop: 25,
    },

    myRowAltAltAlt: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 25,
    },

    myRowAltAlt: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '80%',
        marginTop: 15,
        backgroundColor: '#02a2ad',
        height: 70,
        borderRadius: 30,
        alignItems: 'center',
        paddingLeft: 15,
    },

    myRowColumn: {
        flexDirection: 'column',
        width: '50%',

    },

    mySecondRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 15,
        width: '90%',
        
    },

    myThirdRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 15,
        width: '90%',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 25,
        height: 90,
        marginBottom: 25,
        marginTop: 50,
        
    },

    imageBack: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    MiningContainer1: {
        height: 'auto',
        alignItems: 'center',
        marginBottom: 25,
        overflow: 'hidden',
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        
    },

    divvyDiv: {
        width: '30%',
        height: 'auto',
        backgroundColor: 'rgba(9, 2, 43, 0.1)',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,

    },

    myIconContainer: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(9, 2, 43, 1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        marginBottom: 10,
    },

    miningContainerRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '90%',
        marginTop: 15,
        marginLeft: 15,
    },

    miningContainerRow1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        marginTop: 25,
    },

    miningContainerColumn: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
       
    },

    largeText: {
        fontSize: 20,
        color: '#09022b',
        fontFamily: 'Montserrat-Bold',
        marginLeft: 25,
    },

    middleText: {
        fontSize: 16,
        fontFamily: 'Montserrat-Bold',
        color: '#6f2cf5',
    },

    bottomText1: {
        fontSize: 16,
        fontFamily: 'Montserrat-Bold',
        color: '#e6e2d8',
    },

    bottomText3: {
        fontSize: 16,
        fontFamily: 'Montserrat-Bold',
        color: 'rgba(52, 66, 199, 1)',
    },

    bottomText2: {
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
        color: 'white',
    },

    countdownText: {
        marginTop: 20,
        fontSize: 16,
        color: 'white',
        marginBottom: 20,
        fontFamily: 'Montserat-Bold',
    },

    MiningTitleContainer: {
        flexDirection: 'row',
        width: '95%',
        marginTop: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(9, 2, 43, 0.1)',
        padding: 15,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingLeft: 30,
        paddingRight: 30,
    },

    dataRow: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '90%',
        marginBottom: 0,
        marginTop: 15,
        backgroundColor: 'white',
        borderRadius: 30,
    },

    dataRowRow: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        width: '70%',
        paddingLeft: 15,
        paddingTop: 15,
        paddingBottom: 15,
       
        
    
    },

    dataBottomRow: {
        width: '85%',
        height: 7.5,
        backgroundColor: 'rgba(252, 3, 107, 1)',
    },
   
    
    button: {
        width: '80%',
        borderRadius: 30,
        backgroundColor: '#02a2ad',
        height: 50,
        marginTop: 50,
        marginBottom: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#02a2ad',
        
    
    },

    ButtonText: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        letterSpacing: 1,
    },

    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 200,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        
    },

    modaltext: {
        color: 'black',
    },

    infoBox: {
        position: 'absolute',
        right: 25,
        transform: [{ translateX: -75 }],
        width: 200,
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        zIndex: 999,
    },
    infoText: {
        color: 'black',
        
    },

 

});

export default Home; 

 {/*}  <View style={styles.inviteIconContainer}>
                    <FontAwesomeIcon icon={faShare} size={25} color="#eee" />
                </View>

                <View style={styles.inviteIconContainer}>
                    <FontAwesomeIcon icon={faCopy} size={25} color="#eee" />
                </View>

                <View style={styles.inviteIconContainer}>
                    <FontAwesomeIcon icon={faQrcode} size={25} color="#eee" />
</View> */}
