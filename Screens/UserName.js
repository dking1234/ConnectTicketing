import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import BackButton from '../Components/BackButton';
import Button from '../Components/Button';
import CustomTextInput from '../Components/CustomTextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const UserName = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Use useEffect to retrieve phoneNumber from the route
  useEffect(() => {
    const { phoneNumber } = route.params;

    if (phoneNumber) {
      setPhoneNumber(phoneNumber);
    }
  }, [route.params]); // Run the effect whenever route.params changes

  const saveUsername = async () => {
    setIsLoading(true);

    try {
      if (!phoneNumber) {
        throw new Error('Phone number not found. Please log in again.');
      }

      const response = await axios.post('https://connect-ticketing.work.gd/user/save-user', {
        phoneNumber,
        firstName,
        lastName,
      });

      const data = response.data;

      if (data.success) {
        // Save the phoneNumber and firstName in AsyncStorage only when the user data is saved successfully
        await AsyncStorage.setItem('phoneNumber', phoneNumber);
        await AsyncStorage.setItem('firstName', firstName);

        navigation.navigate('MainStack', { screen: 'Tab', params: { screen: 'HomeScreen' } });
      } else {
        setError(data.error || 'Failed to update username.');
      }
    } catch (error) {
      setError(error.message || 'An error occurred while updating the username.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <ScrollView>
        <View style={styles.logoContainer}>
          <Image source={require('../Images/Connect.png')} style={styles.logo} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.headerText}>Enter user name</Text>
          <Text style={styles.descriptText}>Write your name for easy ticket processing</Text>
        </View>

        <View style={{ alignItems: 'center' }}>
          <View style={styles.textInput}>
            <CustomTextInput
              value={firstName}
              placeholder="Enter first name"
              onChangeText={(text) => setFirstName(text)}
            />
            <CustomTextInput
              value={lastName}
              placeholder="Enter second name"
              onChangeText={(text) => setLastName(text)}
            />
          </View>

          {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
          {isLoading ? (
            // Render loading indicator if isLoading is true
            <ActivityIndicator size="large" color="#14684E" />
          ) : (
            <View style={styles.buttonContainer}>
              <Button
                title={
                  <>
                    Save{' '}
                  </>
                }
                onPress={saveUsername}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserName;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  arrowContainer: {
    padding: 5,
    width: 70,
    height: 30,
    backgroundColor: '#94BBAD',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    marginTop: 20,
  },

  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: -40,
    marginBottom: 30,
  },

  textContainer: {
    alignItems: 'center',
  },

  descriptText: {
    fontSize: 16,
    textAlign: 'center',
    width: '65%',
  },

  buttonContainer: {
    marginTop: 20,
    marginBottom: 50,
  },

  textInput: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    marginTop: -40,
    resizeMode: 'contain',
  },
});
