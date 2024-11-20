
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { View, 
StyleSheet, 
Dimensions, 
Animated, 
Text, 
Image, 
ScrollView, 
TouchableHighlight, 
TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell,
faBars, 
faChevronRight} from '@fortawesome/free-solid-svg-icons/';
import Footer2 from '../../components/Footer2';
import axios from 'axios';
import { useNavigate } from 'react-router-native';
import { useAuth } from '../utils/AuthContext';
import Logo from '../assets/Logo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SideMenu from '../../components/SideMenu';
import notifee, { TriggerType } from '@notifee/react-native';
import { useImage } from '../utils/ImageContext';
import HomeTeam from '../assets/homeTeam.png';
import HomeMultiplier from '../assets/homeMultiplier.png';
import HomeBonus from '../assets/homeBonus.png';
import HomeRate from '../assets/homeRate.png';
import RadialGradient from 'react-native-radial-gradient';
import UpdatesComponent from '../../components/updates';
import { Link } from 'react-router-native';
import mobileAds, { InterstitialAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';
import * as Progress from 'react-native-progress';
import { USER_DATA } from '@env';
import { INTERSTITIAL_AD_UNIT_ID } from '@env';

////////////////////////////////////////////////////////////////////////////////////////

const interstitial = InterstitialAd.createForAdRequest(INTERSTITIAL_AD_UNIT_ID, {
    requestNonPersonalizedAdsOnly: true,
  });

///////////////////////////////////////////////////////////////////////////////////////

const Home = () => {
    const { logout } = useAuth();
    const [userData, setUserData] = useState({ multiplier: 0, bonus: 0, balance: 0, username: 'Chicken' });
    const [communityUpdates, setCommunityUpdates] = useState([]);
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
    const [timerKey, setTimerKey] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const today = new Date().toLocaleDateString();
    const navigate = useNavigate();
    const { imageUri } = useImage();
    const teamMembers = userData && userData.team_members ? userData.team_members.split(',') : [];
    const contribution = teamMembers.length * 20;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const screenWidth = Dimensions.get('window').width;
    const menuWidth = screenWidth * 0.75;
    const translateX = useRef(new Animated.Value(-menuWidth)).current;
    const teamSize = teamMembers.length;
    const maxTeamSize = 15;
    const teamProgressValue = Math.min(teamSize / maxTeamSize, 1);
    const currentMultiplier = (userData.multiplier); 
    const maxMultiplier = 4;
    const multiplierProgressValue = (currentMultiplier) / (maxMultiplier);
    const currentBonus = userData && userData.bonus ? userData.bonus : 1; 
    const bonusPercentage = (currentBonus - 1) * 100; 
    const bonusProgressValue = currentBonus - 1; 
    const currentRate = dailyRate;
    const maxRate = 192;
    const rateProgessValue = (currentRate) / (maxRate);

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

    useEffect(() => {
        if (!interstitial) {
          console.error("Interstitial instance is not defined");
          return;
        }
    
        const loadListener = interstitial.addAdEventListener(AdEventType.LOADED, () => {
          setLoaded(true);
        });
    
        const closeListener = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
          handleButtonPress();
          interstitial.load(); 
        });
    
        interstitial.load(); 
    
        return () => {
          loadListener();
          closeListener();
        };
      }, []);

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
            const response = await axios.get(`${USER_DATA}/user`); 
            setUserData(response.data.userData);
            setDailyRate(response.data.userData.multiplier * 24 * response.data.userData.bonus); 
            setError(null);
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchToalUsers = async () => {
        try {
            const response = await axios.get(`${USER_DATA}/totalUsers`);
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
            const response = await axios.get(`${USER_DATA}/startMining`);
            
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
          setCountdown(86400); 
          setTimerKey((prevKey) => prevKey + 1); 
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

    useEffect(() => {
        let timerInterval = null;
      
        if (isMining && countdown > 0) {
          timerInterval = setInterval(() => {
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
        }
      
        return () => {
          if (timerInterval) clearInterval(timerInterval); 
        };
      }, [countdown, isMining]); 

    const checkMiningStatus = async () => {
        const startTime = await AsyncStorage.getItem('miningStartTime');
        if (startTime) {
          const startTimeDate = new Date(parseInt(startTime, 10));
          const currentTime = new Date();
          const elapsedTime = Math.floor((currentTime - startTimeDate) / 1000); 
          const remainingTime = 86400 - elapsedTime; 
    
          if (remainingTime > 0) {
            setIsMining(true);
            setCountdown(remainingTime);
            setTimerKey((prevKey) => prevKey + 1); 
          } else {
            
            await AsyncStorage.removeItem('miningStartTime');
            setIsMining(false);
            setCountdown(86400); 
          }
        }
      };

    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

  
    const handleButtonPress = async () => {
        startMining();
        handleTimerClick();
        try {
            const date = new Date();
            date.setHours(date.getHours() + 24);
            date.setMinutes(date.getMinutes() + 1);
    
            const trigger = {
                type: TriggerType.TIMESTAMP,  
                timestamp: date.getTime(),
            };
    
            await notifee.createTriggerNotification(
              {
                title: 'Mining Ended',
                body: 'Click the button to continue mining',
                android: {
                  channelId: 'default',
                },
              },
              trigger
            );
    
            
        } catch (error) {
            console.error('Error scheduling notification:', error);
        }
    };

///////////////////////////////////////////////////////////////////////////////////////////
return (
        
        <ScrollView contentContainerStyle={styles.container}>       
                <View style={styles.topContainer}>
                    <View style={styles.topTitleRow}>
                        <TouchableOpacity onPress={openMenu} style={styles.openButton}>
                            <FontAwesomeIcon icon={faBars} size={22.5} color={"#A2A2B5"} />
                        </TouchableOpacity>
                        <Text style={styles.titleText}>Home</Text>
                        <TouchableOpacity style={styles.openButton}>
                            <FontAwesomeIcon icon={faBell} size={22.5} color={"#A2A2B5"} />
                        </TouchableOpacity>
                    </View>
                </View>
            <RadialGradient
                style={{position: 'absolute', top: 800, right: 300, borderRadius: 150, width: 300, height: 300, zIndex: 10 }}  // Add width, height, and zIndex
                colors={['rgba(193, 2, 196, 0.3)', 'rgba(193, 2, 196, 0.1)', '#001B39' ]}
                center={[150, 150]}  // Adjust center relative to size
                radius={150}  
            />
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
            <RadialGradient
                style={{position: 'absolute', top: 900, right: 50, borderRadius: 150, width: 300, height: 300, zIndex: 10 }}  // Add width, height, and zIndex
                colors={['rgba(193, 2, 196, 0.3)', 'rgba(193, 2, 196, 0.1)', '#001B39' ]}
                center={[150, 150]}  // Adjust center relative to size
                radius={150}  
            />
            <View style={styles.sampleInnerRow}>
                <Text style={styles.userInfoTextA}>Hydrix Web2 Wallet</Text>
                <Text style={styles.userInfoTextA}>{today}</Text>

            </View>
            

            <View style={styles.balanceContainer}>
                
                <View style={styles.bcTopRow}>
                    <Text style={styles.userInfoTextA}>Hydrix</Text>
                    <Image 
                        source={Logo}
                        style={styles.bcTopRowImage}
                    />
                </View>
                <View style={styles.bcMiddleRow}>
{userData && (
                    <Text style={styles.bcBalanceText}>{userData.balance.toFixed(2)}</Text>
)}
                </View>
                <View style={styles.bcMiddleRowA}>
                    <Text style={styles.bcGrayTextA}>BALANCE</Text>
                </View>
                <View style={styles.bcMiddleRowB}>
{userData && (
                    <Text style={styles.userInfoTextA}>{userData.username.toUpperCase()}</Text>
)}
                    <TouchableHighlight 
                        onPress={() => {
                            handleButtonPress();
                                if (loaded) {
                                interstitial.show();
                                setLoaded(false); 
                            }
                          }}
                        
                        style={[styles.button, isMining && styles.disabledButton]}
                        underlayColor="transparent"
                        disabled={isMining} 
                    >
                        <Text style={styles.buttonText}>{isMining ? 'MINING!' : 'MINE'}</Text>
                    </TouchableHighlight>
                </View>
            </View>
            <Link to="/RewardAd" style={{ zIndex: 20 }}>
                <View style={styles.rewardRow}>
                    <Text style={styles.bcBalanceButtonRowColumnText}>Want to earn some extra Hydrix?</Text>
                    <FontAwesomeIcon icon={faChevronRight} color="#A2A2B5" size={10} style={{ marginLeft: 10, marginTop: 10 }} />
                </View>
            </Link>
            
            <View style={styles.sampleInnerRow}>
                <Text style={styles.userInfoTextA}>Mining Progress</Text>
            </View>
            <View style={styles.bcMiddleRowA}>
                <Text style={styles.bcBalanceText}>{formatTime(countdown)}</Text>
            </View>
            <View style={styles.progress}>
            <Progress.Bar
                borderColor='#45D9F4'
                height={10}
                borderWidth={2}
                width={300}
                color='#45D9F4'
                progress={(86400 - countdown) / 86400}
                >

            </Progress.Bar>
            </View>
            <View style={styles.bcMiddleRowA}>
                <Text style={styles.bcGrayTextA}>Time Remaining</Text>
            </View>

            <View style={styles.sampleInnerRow}>
                <Text style={styles.userInfoTextA}>Your Stats</Text>
            </View>

            <View style={styles.bcBalanceButtonRow}>
                <View style={styles.bcMiddleRowE}>
                    <View style={styles.bcBalanceButtonRowColumn}>
                        <Image 
                            source={HomeTeam}
                            style={styles.bcImage}
                        />
                        <Text style={styles.bcBalanceButtonRowColumnText}>TEAM</Text>
    {userData && (
                        <Text style={styles.bcGrayText}>{teamMembers.length}</Text>
    )}
                        <View style={styles.progressBarWrapper}>
                            <Progress.Bar 
                                borderColor='transparent'
                                height={10}
                                borderWidth={0}
                                width={null}
                                color='#FF4DCF'
                                progress={teamProgressValue}
                            />
                        </View>
                    </View>
                    <View style={styles.bcBalanceButtonRowColumn}>
{userData && (
<>
                        <Image 
                            source={HomeMultiplier}
                            style={styles.bcImage}
                        />
                        <Text style={styles.bcBalanceButtonRowColumnText}>MULTIPLIER</Text>
    
                        <Text style={styles.bcGrayText}>{userData.multiplier}</Text>
                        <View style={styles.progressBarWrapper}>
                            <Progress.Bar 
                                borderColor='transparent'
                                height={10}
                                borderWidth={0}
                                width={null}
                                color='#FF4DCF'
                                progress={multiplierProgressValue}
                            />
                        </View>
</>
)}    
                    </View>
                </View>
                <View style={styles.bcMiddleRowF}>
                    <View style={styles.bcBalanceButtonRowColumn}>
                        <Image 
                            source={HomeBonus}
                            style={styles.bcImage}
                        />
                        <Text style={styles.bcBalanceButtonRowColumnText}>BONUS</Text>
    {userData && (
                        <Text style={styles.bcGrayText}>{bonusPercentage}%</Text>
    )}                  
                        <View style={styles.progressBarWrapper}>
                            <Progress.Bar 
                                borderColor='transparent'
                                height={10}
                                borderWidth={0}
                                width={null}
                                color='#FF4DCF'
                                progress={bonusProgressValue}
                            />
                        </View>
                    </View>
                    <View style={styles.bcBalanceButtonRowColumn}>
                        <Image 
                            source={HomeRate}
                            style={styles.bcImage}
                        />
                        <Text style={styles.bcBalanceButtonRowColumnText}>RATE</Text>
                        <Text style={styles.bcGrayText}>{dailyRate.toFixed(0)}</Text>
                        <View style={styles.progressBarWrapper}>
                            <Progress.Bar 
                                borderColor='transparent'
                                height={10}
                                borderWidth={0}
                                width={null}
                                color='#FF4DCF'
                                progress={rateProgessValue}
                            />
                        </View>
                    </View>
                </View>
                
            </View>
                

            <View style={styles.sampleInnerRow}>
                <Text style={styles.userInfoTextA}>Hydrix Updates</Text>
            </View>
            <View style={styles.bottomContainer}>
                <UpdatesComponent />
                
            </View>
            <Footer2 userData={userData} />
            {isMenuOpen && (
                    <TouchableOpacity style={styles.overlay} onPress={closeMenu} />
                )}
                    <Animated.View style={[styles.sideMenu, { transform: [{ translateX }] }]}>
                        <SideMenu closeMenu={closeMenu} />
                    </Animated.View>
                

           
        </ScrollView>
    );
  };

///////////////////////////////////////////////////////////////////////////////////////////////////////
  
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#001B39',
        alignItems: 'center',
        paddingBottom: 150,
        },

    progress: {
        zIndex: 20,
        marginTop: 10,
        marginBottom: 10,
        },

    progressBarWrapper: {
        width: '100%',
        },

    balanceContainer: {
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

    bcTopRow: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        },

    bcMiddleRow: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 20,
        },

    bcMiddleRowA: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        zIndex: 20,
        },

    bcMiddleRowB: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 20,
        },

    bcMiddleRowE: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: 20,
        },

    bcMiddleRowF: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: 20,
        },

    bcTopRowImage: {
        width: 20,
        height: 20,
        },
    
    bcBalanceButtonRow: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 4,
        width: '90%',
        zIndex: 20,
        paddingTop: 20,
        paddingBottom: 20,
        },

    bcBalanceButtonRowColumn: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '45%',
        height: 150,
        position: 'relative',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        },

    bcBalanceButtonRowColumnText: {
        fontFamily: 'Inter',
        fontWeight: '600',
        color: '#A2A2B5',
        fontSize: 12,
        marginTop: 10,
        zIndex: 20,
        },
  
    bcBalanceText: {
        fontFamily: 'Inter',
        fontWeight: '700',
        color: 'white',
        fontSize: 28,
        },

    sampleInnerRow: {
        width: '92%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingBottom: 20,
        zIndex: 20,
        },

    userInfoTextA: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Inter',
        fontWeight: '600',
        lineHeight: 20,
        },

    bcImage: {
        width: 35,
        height: 35,
        marginTop: 30,
        },

    bcGrayText: {
        fontFamily: 'Inter',
        fontWeight: '400',
        fontSize: 14,
        color: 'white',
        marginTop: 5,
        marginBottom: 10,
        },

    bcGrayTextA: {
        fontFamily: 'Inter',
        fontWeight: '400',
        fontSize: 10,
        color: '#A2A2B5',
        },

    bottomContainer: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20, 
        marginBottom: 20,
        },

    titleText: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'Inter',
    },

    buttonText: {
        color: 'rgba(0, 0, 0, 0.9)',
        fontSize: 14,
        fontFamily: 'Inter',
        fontWeight: '800',
        lineHeight: 16,
        },

    button: {
        width: 80,
        height: 40, 
        borderRadius: 4,  
        justifyContent: 'center', 
        alignItems: 'center',
        zIndex: 20,
        backgroundColor: '#45D9F4',
        },

    topTitleRow: {
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

      overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        zIndex: 9998,
      },

      rewardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 20,
      }

      
});

export default Home;

 
