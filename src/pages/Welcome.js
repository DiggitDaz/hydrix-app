import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

/////////////////////////////////////////////////////////////////////////////////////

const Welcome = () => {
    return (
        <View style={styles.container}>
            <View>
                <ActivityIndicator animating={true} color={'#8e8e8e'} size={'large'} style={styles.activityContainer} />
            </View>
        </View>
    );
};

///////////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#001B39',
        position: 'relative',
        height: '100%',
        },

    activityContainer: {
        marginTop: 300,
        zIndex: 20,
        }, 
});

export default Welcome;
