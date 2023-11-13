import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../Components/BackButton';
import Button from '../Components/Button';
import CustomTextInput from '../Components/CustomTextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const UserName = () => {

const navigation = useNavigation();

const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [error, setError] = useState('');
const [isLoading, setIsLoading] = useState(false);



const saveUsername = async () => {
  setIsLoading(true);
  try {
    // Retrieve the phoneNumber from AsyncStorage
    const phoneNumber = await AsyncStorage.getItem('phoneNumber');
    
    // Ensure phoneNumber is retrieved
    if (!phoneNumber) {
      throw new Error('Phone number not found. Please log in again.');
    }

    // Call the server endpoint to update the username
    const response = await axios.post('http://172.20.10.3:3000/user/user-name', {
      phoneNumber,
      firstName,
      lastName
    });

    // Check if the username update was successful
    if (response.data.success) {
      // Maybe navigate to another screen or update the state
      navigation.navigate('MainStack', { screen: 'Tab', params: { screen: 'HomeScreen' } });

    } else {
      setError('Failed to update username.');
    }
  } catch (error) {
    setError(error.message || 'An error occurred while updating the username.');
  }finally {
    setIsLoading(false); // Set loading state to false when done
  }
};

  return (
    <SafeAreaView style={styles.container}>
    
    <BackButton/>
<ScrollView>
    <View style={styles.logoContainer}>
        <Image source={require('../Images/Connect.png')} style={styles.logo} />
      </View>
    
    <View style={styles.textContainer}>
    <Text style={styles.headerText}>Enter user name</Text>
    <Text style={styles.descriptText}>Write your name for easy ticket processing</Text>
    </View>
    
    <View style={{alignItems: 'center'}}>
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
      {isLoading ? ( // Render loading indicator if isLoading is true
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
    marginTop: 20
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
    width: '65%'
  },

  input: {
    borderBottomColor: '#14684E',
    borderBottomWidth: 2,
    fontSize: 50,
    color: '#14684E',
    textAlign: 'center',
    width: 50,
    paddingTop: 50,
    marginBottom: 30,
  },

  buttonContainer: {
    marginTop: 20,
    marginBottom: 50,
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkboxText: {
    marginLeft: 10,
  },
  linkText: {
    color: 'blue',
    fontWeight: '500',
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
