import { View, TextInput, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faEllipsis, faUserPlus, faSearch, faCircleQuestion, faFileCircleQuestion, faQuestionCircle, faQuestion } from '@fortawesome/free-solid-svg-icons/';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-native';

const Team = () => {

    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [dailyRate, setDailyRate] = useState(0);
    const [searchText, setSearchText] = useState('');

    const teamMembers = userData && userData.team_members ? userData.team_members.split(',') : [];
    const contribution = teamMembers.length * 20;

    const handleSearch = (text) => {
        // Handle search logic here
        console.log('Search text:', text);
        setSearchText(text);
    };

    useEffect(() => {
        fetchUserData();
        const intervalId = setInterval(() => {
            fetchUserData();
        }, 30000);
        return () => clearInterval(intervalId);
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://77.68.102.168:4000/user'); 
            setUserData(response.data.userData);
            setDailyRate(response.data.userData.multiplier * 24); 
            console.log(response.headers.authorization); 
            setError(null); 
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.navRow}>
                <Link to="/">
                    <View style={styles.navRowIconContainer}>
                        <FontAwesomeIcon icon={faChevronLeft} color="#8e8e8e" size={30} />
                    </View>
                </Link>
                <Text style={styles.navsubtitle}>Team</Text>
                <View style={styles.navRowIconContainer}>
                    <FontAwesomeIcon icon={faEllipsis} color="#8e8e8e" size={30} />
                </View>
            </View>
            
            <View style={styles.MiningTitleContainer}>
                <Text style={styles.largeText}>Team</Text>
            </View>

            <View style={styles.MiningContainer}>
                <View style={styles.miningContainerRow}>
                    <Text style={styles.largeText}>Your team size is:</Text>
                    <Text style={styles.bottomText1}>{teamMembers.length}</Text>
                </View>
                <View style={styles.miningContainerRow}>
                    <Text style={styles.largeText}>Team contribution:</Text>
                    <Text style={styles.bottomText1}>{contribution} %</Text>
                </View>
                <View style={styles.miningContainerRowAlt}>
                    <TouchableOpacity style={styles.inviteDiv}>
                        <Text style={styles.inviteDivText}>Invite</Text>
                    </TouchableOpacity>
                    <FontAwesomeIcon icon={faQuestion} size={20} color='#8e8e8e' />

                </View>
            </View>

            
            <View style={styles.MasterDataContainer}>
            {userData && userData.team_members ? (
                    userData.team_members.split(',').map((item, index) => (
                        <View key={index} style={styles.dataRow}>
                            <View style={styles.dataRowRow}>
                                <View style={styles.dataColumn1}>
                                    <Text style={styles.largeText}>{item}</Text>
                                    <Text style={styles.bottomText1}>Team Member</Text>
                                </View>
                            </View>
                            <View style={styles.dataColumn}>
                                <FontAwesomeIcon icon={faUserPlus} size={35} color="#8e8e8e" />
                            </View>
                        </View>
                    ))
                ) : (
                    <Text style={styles.bottomText1}>No user data available.</Text>
                )}
            </View>
                <Footer />
            </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 1)',
        },

    memberContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 100,
        backgroundColor: ''
    },

    dataRow: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: '90%',
        borderRadius: 7.5,
        height: 100,
        margin: 15,
        borderWidth: 1,
        borderTopColor: 'rgba(252, 3, 107, 1)',
        borderBottomColor: 'rgba(252, 3, 107, 1)',
        borderRightColor: 'rgba(252, 3, 107, 1)',
        borderLeftColor: 'rgba(252, 3, 107, 1)',
        elavation: 10,
        shadowColor: 'rgba(255, 255, 255, 1)',
    },

    MiningContainer: {
        height: 'auto',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 30,
        borderRadius: 10,
        overflow: 'hidden',
        width: '90%',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#101112',
        elevation: 5,
        shadowColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1,
        borderTopColor: 'rgba(252, 3, 107, 1)', 
    },

    miningContainerRow: {
        flexDirection: 'row',
        width: '80%',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '5%',
        },
    
    miningContainerRowAlt: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '80%',
        marginBottom: 25,
    },

    inviteDiv: {
        flexDirection: 'row',
        width: '40%',
        height: 40,
        borderRadius: 7.5,
        borderWidth: 1,
        borderColor: 'rgba(252, 3, 107, 1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,

    },

    inviteDivText: {
        fontSize: 14,
        color: 'rgba(252, 3, 107, 1)',
        fontFamily: 'Montserrat-Regular' 
    },


    dataRowRow: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        width: '50%',

    },

    dataColumn: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        paddingRight: 15,
    },

    dataColumn1: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingLeft: 15,
    },

    iconContainer1: {
        width: 70,
        height: 70,
        borderRadius: 35, 
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 25,
        
    },

    input: {
        height: 50,
        width: '90%',
        borderWidth: 1,
        paddingLeft: '5%',
        paddingRight: '5%',
        borderRadius: 20,
        paddingHorizontal: 10,
        marginBottom: 40,
        backgroundColor: 'black',
        fontFamily: 'Montserrat-Regular',
        
      },

    MasterDataContainer: {
        width: '90%',
        minHeight: 550,
        flexDirection: 'column',
        
        
        borderRadius: 30,
        marginTop: 30,
        marginBottom: 30,
        paddingBottom: 30,
        elavation: 5,
        shadowColor: 'rgba(255, 255, 255, 1)',
    },


    navRow: {
        flexDirection: 'row',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 75,
        marginBottom: 15,

    },

    navRowIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },

    largeText: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'Montserrat-Regular',
    },

    refer1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: 100,
        borderRadius: 20,
        backgroundColor: 'rgba(244, 253, 100, 0.1)',
        borderWidth: 3, 
        borderColor: 'rgba(244, 253, 100, 0.8)', 
        marginTop: 50,
    },

    MiningTitleContainer: {
        flexDirection: 'row',
        width: '90%',
        marginTop: 5,
    },

    icon: {
        position: 'absolute',
        right: 10,
        top: 15,
      },

    UnderMiningTitleContainer: {
        flexDirection: 'row',
        width: '90%',
        height: 250,
        borderRadius: 20,
        alignItems: 'center',
    },


    bottomText1: {
        fontSize: 16,
        fontFamily: 'Montserrat-Regular',
        color: '#8e8e8e',
    },

    bottomText2: {
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'notoserif',
        color: 'white',
    },

    topContainer: {
        width: '90%',
        height: 250,
        borderRadius: 20,
        elevation: 10,
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: 'center',
        marginBottom: 25,
        
    },

    textInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        jutsifyContent: 'flex-end',
    },


    topContainerRow: {
        flexDirection: 'row',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 25,
    },

    topContainerRow1: {
        flexDirection: 'row',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 25,
    },

    topContainerTitleText: {
        fontSize: 26,
        color: 'black',
        fontWeight: '800',
        fontFamily: 'Raleway-Black',
        marginLeft: 15,
    },

    topContainerText: {
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.8)',
        fontWeight: '500',

    },

    topContainerTextContainer:{
        width: '70%',
        marginLeft: 15,
        
    },

    topContainerButton: {
        width: 175,
        height: 60,
        borderColor: 'white',
        borderWidth: 1,
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 20,
    },

    topContainerButtonText: {
        fontSize: 18,
        color: '#8e8e8e',
        paddingLeft: 15,
        fontWeight: '800',

    },

    topContainerIconContainer: {
        flexDirection: 'column',
        paddingRight: 15,
    },

    refer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: 80,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(30, 38, 188, 1)', 
        backgroundColor: '#eee',
        marginBottom: 10,
        marginTop: 10,
        elevation: 5,
    },

    referRowTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },

    dataComponentIconWrapper1: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 25,
    },

    dataText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
        paddingRight: 25,
    },

    SeparationContainer: {
        borderBottomWidth: 0.4,
        borderBottomColor: '#eee',
        width: '90%',
        height: 25,
    },

    subtitle: {
        color: '#eee',
        fontSize: 24,
        fontFamily: 'Raleway-Black',
        fontWeight: '600',
        marginTop: 30,
        paddingLeft: 0,
        paddingBottom: 15,
    },

    navsubtitle: {
        color: '#8e8e8e',
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        marginTop: 30,
        paddingLeft: 0,
        paddingBottom: 15,
    },


    subsubtitle: {
        color: '#eee',
        fontSize: 32,
        fontWeight: '600',
        paddingLeft: 10,
        textAlign: 'center',
        marginBottom: 25,
        fontFamily: 'Poppins-Bold',
    },

    TeamMemberMasterContainer: {
        flexDirection: 'column',
        width: '90%',
        marginTop: 20,
        marginBottom: 30,
    },

    TeamMemberMasterContainerRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },

    TeamMemberContainer: {
        width: 110,
        height: 110,
        borderRadius: 55,
        flexDirection: 'column',
        alignItems: 'center',
    },

    TeamMemberNameContainer: {
        width: '85%',
        height: 25,
        borderRadius: 20,
        marginTop: 85,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: '#F56040',

    },

    nameText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 14,
        color: 'white',

    },

    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#F56040',
    },

    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
      },

    RightContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        width: 150,
    },
    
    shadowContainer: {
        elevation: 5, 
        shadowColor: 'rgba(0, 0, 0, 1)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.75,
        shadowRadius: 3.84,
        },
      
    
    slideText: {
        fontSize: 24,
        color: '#eee',
        marginTop: 10,
      },

    name: {
        color: '#8e8e8e',
        fontFamily: 'sans-serif',
        fontSize: 14,
        fontWeight: '600',
    },


    dataText1: {
        color: '#eee',
        fontFamily: 'sans-serif',
        fontSize: 20,
        fontWeight: '600',
        paddingLeft: 25,
    },


    refer1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: 60,
        borderRadius: 20,
        backgroundColor: 'transparent',
        marginBottom: 350,
        borderWidth: 3, 
        borderColor: '#F56040', 
    },


});

export default Team;
