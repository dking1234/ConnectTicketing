// App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegistrationNav from './Navigation/RegistrationNav';
import MainStack from './Navigation/MainStack';
import SplashScreen from './Screens/SplashScreen';

const Stack = createStackNavigator();

// App.js
// ... (other imports and code)

export default function App() {
const [initialRoute, setInitialRoute] = useState('Registration');
const [showSplash, setShowSplash] = useState(true);

useEffect(() => {
// Check if the user is signed in by retrieving data from AsyncStorage
const checkSignInStatus = async () => {
try {
const phoneNumber = await AsyncStorage.getItem('phoneNumber');
if (phoneNumber) {
// User is signed in, set the initial route to MainStack
setInitialRoute('MainStack');
}
} catch (error) {
console.error('Error checking sign-in status:', error);
} finally {
// Hide the SplashScreen after the check is complete
setShowSplash(false);
}
};

checkSignInStatus();
}, []);

useEffect(() => {
// Delay the navigation to the appropriate screen after showing SplashScreen
if (showSplash) {
const splashTimer = setTimeout(() => {
setShowSplash(false);
}, 100000); // Adjust the duration (in milliseconds) as needed

return () => clearTimeout(splashTimer);
}
}, [showSplash]);

// Wrap your NavigationContainer with a conditional rendering of SplashScreen
return (
<NavigationContainer>
{/* Conditional rendering of SplashScreen */}
{showSplash ? (
<SplashScreen />
) : (
<Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
<Stack.Screen name="Registration" component={RegistrationNav} />
<Stack.Screen name="MainStack" component={MainStack} />
</Stack.Navigator>
)}
</NavigationContainer>
);
}