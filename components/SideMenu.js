// SideMenu.js
import React, { useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import Logo from '../src/assets/Logo.png';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faChevronRight, faGear, faLink, faPhone, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../src/utils/AuthContext';
import { useNavigate } from 'react-router-native';
import { Link } from 'react-router-native';



const SideMenu = () => {

  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

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
        const response = await axios.get('https://chainfree.info:4000/user'); 
        //console.log('userData', data.userData);
        setUserData(response.data.userData);
        console.log(userData);
        setDailyRate(response.data.userData.multiplier * 24 * response.data.userData.bonus); 
        console.log(response.headers.authorization); 
        setError(null); // Reset error state if successful
    } catch (error) {
        setError(error.message);
    }
};


  const getInitials = (name) => {
    if (!name) return '';
    return name[0].toUpperCase();
};
  return (
    <View style={styles.container}>
      <View style={styles.menuRow}>
        <Image 
          source={Logo}
          style={styles.initialContainer}
        />
      </View>
      
      <Link to="/Settings" style={styles.linkStyle}>
        <View style={styles.menuSubRow}>
          <Text style={styles.menuText}>Settings</Text>
          <FontAwesomeIcon icon={faChevronRight} size={15} color={"#A2A2B5"} />
        </View>
      </Link>
      <Link to="/TeamList" style={styles.linkStyle}>
        <View style={styles.menuSubRow}>          
          <Text style={styles.menuText}>Team Info</Text>
          <FontAwesomeIcon icon={faChevronRight} size={15} color={"#A2A2B5"} />
        </View>
      </Link>
      <Link to="/RewardAd" style={styles.linkStyle}>
        <View style={styles.menuSubRow}>
          <Text style={styles.menuText}>Reward Ads</Text>
          <FontAwesomeIcon icon={faChevronRight} size={15} color={"#A2A2B5"} />
        </View>
      </Link>
      <Link to="/Settings" style={styles.linkStyle}>
        <View style={styles.menuSubRow}>
          <Text style={styles.menuText}>Quick Links</Text>
          <FontAwesomeIcon icon={faChevronRight} size={15} color={"#A2A2B5"} />
        </View>
      </Link>
      <Link to="/imageUpload" style={styles.linkStyle}>
        <View style={styles.menuSubRow}>
          <Text style={styles.menuText}>Update Profile Image</Text>
          <FontAwesomeIcon icon={faChevronRight} size={15} color={"#A2A2B5"} />
        </View>
      </Link>
      <Link to="/ForgotPassword" style={styles.linkStyle}>
        <View style={styles.menuSubRow}>
          <Text style={styles.menuText}>Change Password</Text>
          <FontAwesomeIcon icon={faChevronRight} size={15} color={"#A2A2B5"} />
        </View>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05001f', 
    alignItems: 'center',
    zIndex: 9999,
    elevation: 15,
  },

  initialContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    

  },

  initial: {
    fontSize: 62,
    fontWeight: '600',
    color: '#baffd8',
  },

  menuRow: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 25,
  },

  menuSubRow: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#353542',
    paddingBottom: 15,
    paddingTop: 15,
  },

  linkStyle: {
    width: '85%',
  },
 
  menuItem: {
    fontSize: 20,
    marginVertical: 10,
  },

  menuText: {
    fontSize: 16,
    color: '#fcfcfc',
    fontFamily: 'Inter',
  },

  button: {
    width: '80%',
    borderRadius: 30,
    backgroundColor: '#005DFA',
    height: 50,
    marginTop: 320,
    marginBottom: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#005DFA',
  },

ButtonText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Inter',
    
},

});

export default SideMenu;
