import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkUserRegistration = async () => {
      try {
        // Check if user data is available in storage
        const userData = await AsyncStorage.getItem('phoneNumber');

        if (userData) {
          // User is registered, navigate to home page
          navigation.replace('Home'); // Replace with the actual home screen name
        } else {
          // User is not registered, navigate to registration screen
          navigation.replace('Registration'); // Replace with the actual registration screen name
        }
      } catch (error) {
        console.error('Error checking user registration:', error);
        // Handle error as needed
      }
    };

    // Check user registration on component mount
    checkUserRegistration();
  }, [navigation]);

  return (
    <View>
      <Text>Loading...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default SplashScreen;
