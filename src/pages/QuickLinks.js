import React from 'react';
import { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, Linking, Text, TouchableOpacity } from 'react-native';
import SideMenu from '../../components/SideMenu';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faBell, faGlobe } from '@fortawesome/free-solid-svg-icons';
import Footer2 from '../../components/Footer2';
import { faFacebook, faMedium, faTelegram, faTiktok, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import RadialGradient from 'react-native-radial-gradient';

////////////////////////////////////////////////////////////////////////////////////////////

const QuickLinks = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const screenWidth = Dimensions.get('window').width;
    const menuWidth = screenWidth * 0.75;
    const translateX = useRef(new Animated.Value(-menuWidth)).current;

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

    const openTwitter = () => {
        const url = 'https://www.x.com/HydrixApp';
        Linking.openURL(url).catch(err => console.error('can not open URL:', err));
    };

    const openWebsite = () => {
        const url = 'https://www.hydrix.me';
        Linking.openURL(url).catch(err => console.error('can not open URL:', err));
    };

    const openTelegram = () => {
        const url = 'https://t.me/LsK-h_Bg4fRjODM0';
        Linking.openURL(url).catch(err => console.error('can not open URL:', err));
    };

////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <TouchableOpacity onPress={openMenu} style={styles.openButton}>
                    <FontAwesomeIcon icon={faBars} size={22.5} color={"#A2A2B5"} />
                </TouchableOpacity>
                <Text style={styles.titleText}>Quick Links</Text>
                <TouchableOpacity style={styles.openButton}>
                    <FontAwesomeIcon icon={faBell} size={22.5} color={"#A2A2B5"} />
                </TouchableOpacity>
            </View>
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
            <View style={styles.linkRow}>
                <TouchableOpacity style={styles.quickLink} onPress={openWebsite}>
                    <View style={styles.iconContainer}>
                        <FontAwesomeIcon icon={faGlobe} size={30} color="white" />
                    </View>
                    <Text style={styles.quickLinkText}>Website</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickLink} onPress={openTwitter}>
                    <View style={styles.iconContainerA}>
                        <FontAwesomeIcon icon={faXTwitter} size={30} color="white" />
                    </View>
                    <Text style={styles.quickLinkText}>X.com</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.linkRow}>
                <TouchableOpacity style={styles.quickLink}>
                    <View style={styles.iconContainerB}>
                        <FontAwesomeIcon icon={faFacebook} size={30} color="white" />
                    </View>
                    <Text style={styles.quickLinkText}>facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickLink}>
                    <View style={styles.iconContainer}>
                        <FontAwesomeIcon icon={faMedium} size={30} color="white" />
                    </View>
                    <Text style={styles.quickLinkText}>Medium</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.linkRow}>
                <TouchableOpacity style={styles.quickLink}>
                    <View style={styles.iconContainerA}>
                        <FontAwesomeIcon icon={faTiktok} size={30} color="white" />
                    </View>
                    <Text style={styles.quickLinkText}>TikTok</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickLink} onPress={openTelegram}>
                    <View style={styles.iconContainerB}>
                        <FontAwesomeIcon icon={faTelegram} size={30} color="white" />
                    </View>
                    <Text style={styles.quickLinkText}>Telegram</Text>
                </TouchableOpacity>
            </View>

            <Footer2 />

            {isMenuOpen && (
                <TouchableOpacity style={styles.overlay} onPress={closeMenu} />
            )}
                <Animated.View style={[styles.sideMenu, { transform: [{ translateX }] }]}>
                    <SideMenu closeMenu={closeMenu} />
                </Animated.View>
        </View>
    );
};

////////////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#001B39',
        justifyContent: 'center',
        },

    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 16,
        backgroundColor: 'rgba(97, 0, 255, 1)',
        alignItems: 'center',
        justifyContent: 'center',
        },

    iconContainerA: {
        width: 50,
        height: 50,
        borderRadius: 16,
        backgroundColor: 'rgba(0, 97, 255, 1)',
        alignItems: 'center',
        justifyContent: 'center',
        },

    iconContainerB: {
        width: 50,
        height: 50,
        borderRadius: 16,
        backgroundColor: '#00FAD9',
        alignItems: 'center',
        justifyContent: 'center',
        },

    openButton: {
        padding: 10,
        borderRadius: 5,
        margin: 10,
        },
      
    topRow: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 0,
        height: 50,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 4,
        zIndex: 20,
        marginTop: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },

    titleText: {
        fontSize: 16,
        color: '#fcfcfc',
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

    sideMenu: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: '75%',
        backgroundColor: 'white',
        zIndex: 9999,
        },

    linkRow: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 7.5,
        },

    quickLink: {
        width: '48%',
        borderRadius: 4,
        flexDirection: 'column',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
        height: 150,
        justifyContent: 'space-between',
        zIndex: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        },

    quickLinkText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#eee',
        marginTop: 20,
        },

    quickLinkTextA: {
        fontSize: 18,
        color: 'white',
        marginTop: 20,
        },
});

export default QuickLinks;