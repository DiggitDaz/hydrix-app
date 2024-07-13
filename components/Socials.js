import { Text, View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSquareFacebook, faSquareXTwitter, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

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
  
  const handlePressTwitter = () => {
    openLink('https://www.x.com/HydrixApp');
  };


const Socials = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handlePressTwitter} style={styles.containerRow}>
                <FontAwesomeIcon icon={faSquareXTwitter} color="rgba(52, 66, 199, 1)" size={30} />
                <Text style={styles.containerText}>@HydrixApp</Text>
            </TouchableOpacity>

            <View style={styles.containerRow}>
                <FontAwesomeIcon icon={faSquareFacebook} color="rgba(52, 66, 199, 1)" size={30} />
                <Text style={styles.containerText}>Facebook</Text>
            </View>

            <View style={styles.containerRow}>
                <FontAwesomeIcon icon={faTelegram} color="rgba(52, 66, 199, 1)" size={30} />
                <Text style={styles.containerText}>@Hydrix</Text>
            </View>

            <View style={styles.containerRowAlt}>
                <FontAwesomeIcon icon={faEnvelope} color="rgba(52, 66, 199, 1)" size={30} />
                <Text style={styles.containerText}>contact@hydrix.me</Text>
            </View>

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 50,
        marginBottom: 15,
        backgroundColor: '#eee',
        borderRadius: 7.5,
        paddingTop: 30,
        paddingBottom: 30,
        paddingRight: 15,
        paddingLeft: 15,
    },

    containerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        borderWidth: 1,
        borderBottomColor: 'black',
        borderTopColor: '#eee',
        borderRightColor: '#eee',
        borderLeftColor: '#eee',
        padding: 15,
    },

    containerRowAlt: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        padding: 15,
    },

    containerText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        color: 'black',
        marginTop: 10,
    }
    
});

export default Socials;