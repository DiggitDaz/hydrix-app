import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Easing, Text, ActivityIndicator, ImageBackground } from 'react-native';
import Logo from '../assets/Logo.png';

const Welcome = () => {
    const translateX = useRef(new Animated.Value(300)).current; // Start off-screen right
    const rotate = useRef(new Animated.Value(0)).current; // Start with no rotation
    const textOpacity = useRef(new Animated.Value(0)).current; // Start with invisible text
    const titleOpacity = useRef(new Animated.Value(0)).current;


    useEffect(() => {
        Animated.parallel([
            Animated.timing(translateX, {
                toValue: 0, // End at the center
                duration: 2000,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            }),
            Animated.timing(rotate, {
                toValue: 1, // Rotate 360 degrees
                duration: 2000,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            }),
            Animated.timing(textOpacity, {
                toValue: 1, // Fully visible text
                duration: 1000,
                delay: 500, // Delay to sync with image animation
                useNativeDriver: true,
            }),
            Animated.timing(titleOpacity, {
                toValue: 1, // Fully visible text
                duration: 1000,
                delay: 2250, // Delay to sync with image animation
                useNativeDriver: true,
            }),
        ]).start();
    }, [translateX, rotate, textOpacity, titleOpacity]);

    

    const textAnimatedStyle = {
        opacity: textOpacity,
    };

    const titleAnimatedStyle = {
        opacity: titleOpacity,
    };

    return (
        <View style={styles.container}>
            
                <Animated.Image 
                    source={require('../assets/Logo.png')}
                    style={[styles.image, textAnimatedStyle]} 
                />
            
            

            <Animated.Text style={[styles.hydrix, titleAnimatedStyle]}>HYDRIX</Animated.Text>
            <ActivityIndicator size="large" color="white" />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#09022b',
    },

    image: {
        width: 150,
        height: 150,
    },

    imageContainer: {
        width: 300,
        height: 300,
        backgroundColor: 'white',
        borderRadius: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },

    welcomeText: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'Montserrat-ExtraBold',
        paddingBottom: 25,
    },

    hydrix: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        paddingBottom: 200,
    }
});

export default Welcome;
