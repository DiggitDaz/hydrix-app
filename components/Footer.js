import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { Link } from "react-router-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons/faPeopleGroup';
import { faFileLines } from '@fortawesome/free-solid-svg-icons/faFileLines';
import { faGear, faLink, faUserPlus } from "@fortawesome/free-solid-svg-icons";








const Footer = () => {
    return (
        <View style={styles.Container}>
          <View style={styles.innerContainer}>
          <Link to="/Home">
            <View style={styles.iconwrapper}>
                <FontAwesomeIcon icon={ faHouse } color="#524C42" size={35} />
            </View>
          </Link>
          
          <Link to="/TeamList">
            <View style={styles.iconwrapper}>
                <FontAwesomeIcon icon={ faUserPlus } color="#524C42" size={35} />
            </View>
          </Link>
          <Link to="/QuickLinks">
            <View style={styles.iconwrapper}>
                <FontAwesomeIcon icon={ faLink } color="#524C42" size={35} />
            </View>
          </Link>
          <Link to="/Settings">
            <View style={styles.iconwrapper}>
                <FontAwesomeIcon icon={ faGear } color="#524C42" size={35} />
            </View>
          </Link>
          </View>
        </View>

    );
};

const styles = StyleSheet.create({

    Container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      width: '100%',
      marginTop: 10,
      position: 'absolute',
      bottom: 0,
      
      
    },

    innerContainer: {
      width: '90%',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      height: 70,
      borderRadius: 30,

    
    },

    refer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%',
      height: 100,
      borderRadius: 20,
      backgroundColor: 'rgba(18, 22, 27, 1)',
      
    },

    iconwrapper: {
      width: 75,
      height: 75,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 25,
    },

    referColumn: {
      flexDirection: 'column',
      width: '90%',
      paddingLeft: 25,

    },

    title: {
      color: '#eee',
      fontFamily: 'Sans-serif',
      fontSize: 36,
      fontWeight: '500',
      marginTop: 30,
      paddingLeft: 10,
    },

    name: {
      color: '#eee',
      fontFamily: 'sans-serif',
      fontSize: 24,
      fontWeight: '600',

    },

    emailPhone: {
      color: '#303245',
      fontFamily: 'sans-serif',
      fontSize: 16,
      fontWeight: '600',

    },



    subtitle: {
      color: '#eee',
      fontFamily: 'sans-serif',
      fontSize: 24,
      fontWeight: '600',
      marginTop: 30,
      paddingLeft: 0,
      paddingBottom: 15,

    },

    subsubtitle: {
      color: '#eee',
      fontFamily: 'sans-serif',
      fontSize: 20,
      fontWeight: '600',
      paddingLeft: 10,

    },

    dataContainer: {
      height: 50,
      width: '100%',
      marginTop: 20,
      marginBottom: 20,
      width: '90%',
      borderBottomWidth: 0.4, 
      borderBottomColor: '#eee',
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
      justifyContent: 'center',
      alignItems: 'flex-start',
      
    },

    dataText: {
      color: '#8e8e8e',
      fontFamily: 'sans-serif',
      fontSize: 16,
      fontWeight: '600',
      paddingLeft: 10,

    },

});

export default Footer;

