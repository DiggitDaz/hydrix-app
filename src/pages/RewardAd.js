import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import CustomButton from '../../components/Join/CustomButton';
import { useNavigate } from 'react-router-native';
import RadialGradient from 'react-native-radial-gradient';
import {
  RewardedAd,
  TestIds,
  RewardedAdEventType,
} from 'react-native-google-mobile-ads';

//////////////////////////////////////////////////////////////////////////////////////////

const RewardAd = () => {
  const navigate = useNavigate();
  const [rewardedAd, setRewardedAd] = useState(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [rewardAmount, setRewardAmount] = useState('');
  const [rewardType, setRewardType] = useState('');

  const adUnitId = TestIds.REWARDED; // Test ad unit ID: 'ca-app-pub-3940256099942544/5224354917'

  useEffect(() => {
    const ad = RewardedAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
    });

    const unsubscribeLoaded = ad.addAdEventListener(
      RewardedAdEventType.LOADED, // Use RewardedAdEventType instead of AdEventType
      () => setAdLoaded(true)
    );

    const unsubscribeEarnedReward = ad.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD, // Use RewardedAdEventType.EARNED_REWARD
      reward => {
        console.log('Reward earned:', reward);
        alert(`You earned ${reward.amount} ${reward.type}!`);
        setRewardAmount(reward.amount);
        setRewardType(reward.type);
        setModalVisible(true);
      }
    );

    ad.load();
    setRewardedAd(ad);

    return () => {
      unsubscribeLoaded();
      unsubscribeEarnedReward();
      setRewardedAd(null);
    };
  }, []);

  const handlePlayPress = () => {
    if (rewardedAd) {
      if (adLoaded) {
        try {
          rewardedAd.show();
        } catch (error) {
          console.error('Failed to show ad:', error);
          alert('An error occurred while trying to display the ad. Please try again later.');
        }
      } else {
        alert('Ad not loaded yet. Please try again later.');
      }
    } else {
      alert('Ad instance is not available. Please come back later.');
    }
  };

  const goBack = () => {
    navigate('/Home');
  };
/////////////////////////////////////////////////////////////////////////////////////////

    return (
        <View style={styles.container}>
            <RadialGradient
                style={{position: 'absolute', top: '80%', left: -155, borderRadius: 150, width: 300, height: 300, zIndex: 10 }}  // Add width, height, and zIndex
                colors={['rgba(193, 2, 196, 0.3)', 'rgba(193, 2, 196, 0.1)', '#001B39' ]}
                center={[150, 150]}  // Adjust center relative to size
                radius={150}  
            />
            <RadialGradient
                style={{position: 'absolute', top: '5%', left: 0, borderRadius: 125, width: 250, height: 250, zIndex: 10 }}  // Add width, height, and zIndex
                colors={['rgba(193, 2, 196, 0.3)', 'rgba(193, 2, 196, 0.1)', '#001B39' ]}
                center={[125, 125]}  // Adjust center relative to size
                radius={125}  
            />
            <RadialGradient
                style={{position: 'absolute', top: '50%', right: -100, borderRadius: 150, width: 300, height: 300, zIndex: 10 }}  // Add width, height, and zIndex
                colors={['rgba(193, 2, 196, 0.3)', 'rgba(193, 2, 196, 0.1)', '#001B39' ]}
                center={[150, 150]}  // Adjust center relative to size
                radius={150}  
            />
            <View style={styles.textWrapper}>
                <Text style={styles.userInfoTextA}>Click Play!
                    
                </Text>
            </View>
            <View style={styles.rewardContainer}>
                <TouchableOpacity style={styles.rewardWrapper} onPress={handlePlayPress}>
                    <FontAwesomeIcon icon={faPlay} color="white" size={25} />
                </TouchableOpacity>
                <CustomButton title="Go Back" onPress={goBack} />
            </View>
            <View style={styles.textWrapper}>
                <Text style={styles.userInfoTextA}>Earn some extra Hydrix and build Hydrix liquidity
                    at the same time!
                </Text>
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
                    <Text style={styles.modalTitle}>Congratulations!</Text>
                    
                    <Text style={styles.modalText}>{rewardAmount} {rewardType} has been added to your balance </Text>
                    
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

////////////////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#001B39',
        alignItems: 'center',
        justifyContent: 'center',
    },

    rewardContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 4,
        zIndex: 20,
        paddingBottom: 20,
        paddingTop: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        zIndex: 20,
        marginBottom: 20,
        marginTop: 20,
        },
    
    rewardWrapper: {
        width: '80%',
        height: 200,
        borderWidth: 2,
        borderColor: 'white',
        borderStyle: 'dotted',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 20,
        },

    textWrapper: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 20,
        },

    userInfoTextA: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Inter',
        fontWeight: '600',
        lineHeight: 20,
        },
    
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#001B39', 
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
});

export default RewardAd;