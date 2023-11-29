// Import necessary dependencies
import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types'; // Import PropTypes for type checking

const SplashScreen = () => {

return (
<View style={styles.container}>
<View style={styles.logoContainer}>
<Image source={require('../Images/Connect.png')} style={styles.logo} />
</View>
<ActivityIndicator size="large" />
</View>
);
};

SplashScreen.propTypes = {
navigation: PropTypes.object, // Type check for navigation prop
};

const styles = StyleSheet.create({
container: {
flex: 1,
alignItems: 'center',
},
logoContainer: {
alignItems: 'center',
},
logo: {
width: 300,
height: 300,
marginTop: 250,
resizeMode: 'contain',
},
});

export default SplashScreen;