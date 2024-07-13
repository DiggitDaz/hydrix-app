import { View, StyleSheet, Text, Image,  ScrollView, Linking, TouchableHighlight } from 'react-native';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFileLines, 
    faBuildingFlag, 
    faCircleQuestion, 
    faHandshakeSimple,
    faShield,
    faChevronLeft,
    faEllipsis,
    faEnvelope,
    faArrowRightToBracket} from '@fortawesome/free-solid-svg-icons/';
import Footer from '../../components/Footer';
import { useAuth } from '../utils/AuthContext';


const User = () => {

    const { logout } = useAuth();

    const handleLogout = async () => {
        try {
            console.log('Attempting Logout');
            logout();
            navigate('/');


        } catch (error) {
            error(error);
        }
    };


    const openLink = (url) => {
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    console.log("Don't know how to open URI: " + url);
                }
            })
            .catch((err) => console.error('An error occurred', err));
      };
      
      const handlePressWhitepaper = () => {
        openLink('https://drive.google.com/file/d/1aBYwOoAaSDyh3AcMPMo4sIIsPPKvT0SB/view?usp=drive_link');
      };

   
    return (

        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.navRow}>
                <Link to="/">
                    <View style={styles.navRowIconContainer}>
                        <FontAwesomeIcon icon={faChevronLeft} color="#8e8e8e" size={30} />
                    </View>
                </Link>
                <Text style={styles.navsubtitle}>Resources</Text>
                <View style={styles.navRowIconContainer}>
                    <FontAwesomeIcon icon={faEllipsis} color="#8e8e8e" size={30} />
                </View>
            </View>
        
        
        <View style={styles.masterContainer}>
            <View style={styles.dataContainerRow}>
            <View style={styles.dataComponent1}>
                        
                            <View style={styles.iconContainer1}>
                                <FontAwesomeIcon icon={faFileLines} color="#02a2ad" size={20} />


                            </View>
                            <Text style={styles.componentText}>Whitepaper</Text>
                            <Text style={styles.componentText2}>Read the Docs!</Text>



                        
                        <View style={styles.dataComponentMiddleRow}>
                            <FontAwesomeIcon icon={faArrowRightToBracket} color="rgba(0, 0, 0, 1)" size={20} />
                            

                        </View>

                    </View>
                    <View style={styles.dataComponent1}>
                        
                            <View style={styles.iconContainer2}>
                                <FontAwesomeIcon icon={faShield} color="#02a2ad" size={20} />


                            </View>
                            <Text style={styles.componentText}>KYC</Text>
                            <Text style={styles.componentText2}>Coming Soon!</Text>



                        
                        <View style={styles.dataComponentMiddleRow}>
                            <FontAwesomeIcon icon={faArrowRightToBracket} color="rgba(0, 0, 0, 1)" size={20} />
                            

                        </View>

                    </View>
        </View>
        <View style={styles.dataContainerRow}>
            <View style={styles.dataComponent1}>
                        
                            <View style={styles.iconContainer}>
                                <FontAwesomeIcon icon={faHandshakeSimple} color="#02a2ad" size={20} />


                            </View>
                            <Text style={styles.componentText}>Bonus</Text>
                            <Text style={styles.componentText2}>Increase Earnings</Text>



                        
                        <View style={styles.dataComponentMiddleRow}>
                            <FontAwesomeIcon icon={faArrowRightToBracket} color="rgba(0, 0, 0, 1)" size={20} />
                            

                        </View>

                    </View>
                    <View style={styles.dataComponent1}>
                        
                            <View style={styles.iconContainer1}>
                                <FontAwesomeIcon icon={faCircleQuestion} color="#02a2ad" size={20} />


                            </View>
                            <Text style={styles.componentText}>FAQ</Text>
                            <Text style={styles.componentText2}>Common Answers</Text>



                        
                        <View style={styles.dataComponentMiddleRow}>
                            <FontAwesomeIcon icon={faArrowRightToBracket} color="rgba(0, 0, 0, 1)" size={20} />
                            

                        </View>

                    </View>
        </View>
                <View style={styles.dataContainerRow}>
                <View style={styles.dataComponent1}>
                        
                            <View style={styles.iconContainer2}>
                                <FontAwesomeIcon icon={faEnvelope} color="#02a2ad" size={20} />


                            </View>
                            <Text style={styles.componentText}>Contact</Text>
                            <Text style={styles.componentText2}>Get in Touch!</Text>



                        
                        <View style={styles.dataComponentMiddleRow}>
                            <FontAwesomeIcon icon={faArrowRightToBracket} color="rgba(0, 0, 0, 1)" size={20} />
                            

                        </View>

                    </View>
                    <View style={styles.dataComponent1}>
                        
                            <View style={styles.iconContainer}>
                                <FontAwesomeIcon icon={faBuildingFlag} color="#02a2ad" size={20} />


                            </View>
                            <Text style={styles.componentText}>Embassy</Text>
                            <Text style={styles.componentText2}>Coming Soon!</Text>


                        
                        <View style={styles.dataComponentMiddleRow}>
                            <FontAwesomeIcon icon={faArrowRightToBracket} color="rgba(0, 0, 0, 1)" size={20} />
                            

                        </View>

                    </View>
        </View>
    </View>
    

            <TouchableHighlight
                style={styles.button}
                onPress={handleLogout}
            >
                <Text style={styles.ButtonText}>LOGOUT</Text>
            </TouchableHighlight>
            
            
                
                <Footer />
        </ScrollView>


    );
};

const styles = StyleSheet.create({

    container: {
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        justifyContent: 'center',
    },

    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25, // Remove quotes
        backgroundColor: 'rgba(9, 2, 43, 1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        marginLeft: 15,
    },

    forgotText: {
        fontFamily: 'Montserrat-Bold',
        color: 'rgba(0, 0, 0, 1)',
    },
    

    lineContainer: {
        width: '35%',
        borderWidth: 1,
        borderBottomColor: 'black',
    },

    iconContainer1: {
        width: 50,
        height: 50,
        borderRadius: 25, // Remove quotes
        backgroundColor: 'rgba(9, 2, 43, 1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15,
        marginTop: 25,
        
    },

    iconContainer2: {
        width: 50,
        height: 50,
        borderRadius: 25, // Remove quotes
        backgroundColor: 'rgba(9, 2, 43, 1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15,
        marginTop: 25,
        
    },


    image: {
        width: 300,
        height: 300,
    },

    navRow: {
        flexDirection: 'row',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 75,
        marginBottom: 25,

    },

    navRowIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },

    miningInnerContainer: {
        width: '90%',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(100, 248, 253, 0.1)',
        height: 300,
        borderRadius: 20,
    },

    miningInnerContainerRow: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },

    dataComponent1: {
        width: '47.5%',
        height: 175,
        borderRadius: 7.5,
        margin: 10,
        justifyContent: 'space-between',
        backgroundColor: 'rgba(9, 2, 43, 0.1)', 
        elevation: 5,
        shadowColor: 'rgba(255, 255, 255, 1)',

    },

    dataComponentIconWrapper1: {
        margin: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },

    masterContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
    },

    dataContainerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
    },

    dataComponentTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
    },

    dataComponentMiddleRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        width: '90%',
        paddingBottom: 15,

    },

    dataComponentIconWrapper2: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(100, 248, 253, 0.8)',
        margin: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },


    ResourceContainer: {
        flexDirection: 'column',
        width: '90%',
        height: 400,
    },

    resourceRow: {
        flexDirection: 'column',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,

    },

    // Join our community Container ///////////////////////////////////////////////////////////////////

    communityContainer: {
        flexDirection: 'column',
        width: '90%',
        height: 175,
        backgroundColor: 'rgba(30, 38, 188, 1)',
        borderRadius: 20,
        marginTop: 40,
        alignItems: 'center',
        
    },

    communityText: {
        fontSize: 24,
        fontWeight: '800',
        color: 'white',
        marginTop: 25,
    },

    communityContainerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '90%',
    },

    communityContainerRow2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '90%',
        marginTop: 50,
    },

    communityOuterButton: {
        flexDirection: 'row',
        width: '40%',
        height: 50,
        backgroundColor: '#b80c76',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 20,
    },


    communityIconContainer: {
        flexDirection: 'column',
        paddingRight: 15,
    },

    



    resourceRow1: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',

    },

    resourceComponent: {
        width: 110,
        height: 110,
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        borderRadius: 20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    MiningText: {
        fontSize: 10,
        fontWeight: '600',
        color: 'white',
        paddingTop: 15,
        
    },

    dataComponentMiddleText: {
        fontSize: 28,
        color: 'white',
        fontWeight: '600',
    },

    MiningTitleContainer: {
        flexDirection: 'row',
        width: '90%',
    },

    navsubtitle: {
        color: 'black',
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        marginTop: 30,
        paddingLeft: 0,
        paddingBottom: 15,
    },

    subtitle: {
        color: 'white',
        fontFamily: 'sans-serif',
        fontSize: 24,
        fontWeight: '600',
        marginTop: 30,
        paddingLeft: 0,
        paddingBottom: 50,
    },

    userTitle: {
        fontSize: 26,
        color: 'rgba(0, 0, 0, 1)',
        fontFamily: 'Montserrat-Bold',
        textShadowColor: '#eee',
        marginTop: 30,
    },
    
    userSubtitle: {
        color: 'rgba(0, 0, 0, 1)',
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        marginTop: 10,
    },

    MiningContainer: {
        flexDirection: 'column',
        backgroundColor: 'rgba(15, 13, 32, 1)',
        width: '100%',
        height: 400,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    topRow: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 75,
    },

    topRowLeft: {
        flexDirection: 'row',
        width: '60%',
        marginTop: 'auto', // Adjust alignment
        marginBottom: 'auto', // Adjust alignment
        paddingLeft: 15,
    },

    dataComponentTopText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        paddingLeft: 15,
        paddingTop: 15,
    },

    socialsTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '90%',
    },

    componentText: {
        fontSize: 16,
        color: '#09022b',
        fontFamily: 'Montserrat-Bold',
        marginLeft: 25,
    },

    componentText2: {
        fontSize: 14,
        fontFamily: 'Montserrat-Regular',
        color: 'rgba(0, 0, 0, 1)',
        marginLeft: 25,
    },

    SeparationContainer: {
        borderBottomWidth: 0.4,
        borderBottomColor: '#eee',
        width: '90%',
        height: 25,
    },

    dataContainer: {
        height: 50,
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
        width: '90%',
        borderBottomWidth: 0.4,
        borderBottomColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    data: {
        backgroundColor: 'rgba(18, 22, 27, 1)',
        borderRadius: 12,
        borderWidth: 0,
        color: '#eee',
        fontSize: 18,
        height: '100%',
        padding: '4px 20px 0',
        width: '100%',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    dataText: {
        color: 'white',
        fontFamily: 'sans-serif',
        fontSize: 18,
        fontWeight: '600',
        paddingTop: 15,
    
    },

    socialContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    dataComponent3: {
        width: '47.5%',
        height: 175,
        borderRadius: 20,
        margin: 10,
        justifyContent: 'space-between',
    },

    button: {
        width: '90%',
        borderRadius: 30,
        backgroundColor: '#09022b',
        height: 50,
        marginTop: 50,
        marginBottom: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#09022b',
    },

    ButtonText: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        letterSpacing: 1,
    },



});

{/*<LinearGradient colors={['#b80c76', '#5f063d', '#2d031d' ]} style={styles.communityContainer}>
                    <View style={styles.communityContainerRow}>
                        <Text style={styles.communityText}>
                            Join the Community
                        </Text>
                    </View>
                    <View style={styles.communityContainerRow2}>
                        <TouchableOpacity style={styles.communityOuterButton}>
                            <Text style={styles.communityButtonText}>
                                Join
                            </Text>
                            <View style={styles.communityIconContainer}>
                                <FontAwesomeIcon icon={faArrowRightToBracket} color="#5f1487" size={20} />
                            </View>
                        </TouchableOpacity>
                    </View>

</LinearGradient> */}

export default User;