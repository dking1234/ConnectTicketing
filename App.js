import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native'; // Import StatusBar
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import store from './redux/store';
import RegistrationNav from './Navigation/RegistrationNav';
import MainStack from './Navigation/MainStack';
import SplashScreen from './Screens/SplashScreen';

const Stack = createStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState('Registration');
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const checkSignInStatus = async () => {
      try {
        const phoneNumber = await AsyncStorage.getItem('phoneNumber');
        if (phoneNumber) {
          setInitialRoute('MainStack');
        }
      } catch (error) {
        console.error('Error checking sign-in status:', error);
      } finally {
        setShowSplash(false);
      }
    };

    checkSignInStatus();
  }, []);

  useEffect(() => {
    if (showSplash) {
      const splashTimer = setTimeout(() => {
        setShowSplash(false);
      }, 3000);

      return () => clearTimeout(splashTimer);
    }
  }, [showSplash]);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* Add StatusBar component with desired properties */}
        <StatusBar
          backgroundColor="#FF7927" // Set the background color of the status bar
          barStyle="light-content" // Set the text color of the status bar (options: 'default', 'light-content', 'dark-content')
          translucent={false} // Set to true if you want the status bar to be translucent
        />

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
    </Provider>
  );
}
