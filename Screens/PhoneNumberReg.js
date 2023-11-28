import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native'; // Import Alert from 'react-native'
import CheckBox from 'react-native-check-box';
import CustomTextInput from '../Components/CustomTextInput';
import Button from '../Components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const PhoneNumberReg = () => {
  const navigation = useNavigation();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = (newValue) => {
    setIsChecked(newValue);
  };
  const handleConfirm = () => {
    // Navigate to ClassCondition screen
    navigation.navigate('OTP');
  };
  
  const handleRegistration = async () => { // Mark the function as async
    if (!phoneNumber) {
      Alert.alert('Angalizo', 'Tafadhali weka namba ya simu.');
      return;
    }
  
    if (isChecked) {
      setIsLoading(true); // Set loading to true
      try {
        const response = await axios.post('http://192.168.43.21:3000/user/phone-number', { phoneNumber });
        console.log(response.data.message);
        
        // Save phoneNumber to AsyncStorage
        await AsyncStorage.setItem('phoneNumber', phoneNumber);
        
        // Navigate to the OTP screen with the phoneNumber
        navigation.navigate('OTP', { phoneNumber: phoneNumber });
      } catch (error) {
        console.error('Error during registration:', error);
        Alert.alert('Registration Error', 'There was an issue registering your phone number.');
      } finally {
        setIsLoading(false); // Set loading to false on error or success
      }
    } else {
      Alert.alert('Angalizo', 'Kubali Vigezo na Masharti Kuendelea.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../Images/Connect.png')} style={styles.logo} />
      </View>

      <View style={styles.header}>
        <Text style={styles.headerText}>Register your account</Text>
      </View>

      <View style={styles.textInput}>
      <CustomTextInput
        value={phoneNumber}
        placeholder="Enter Phone Number"
        onChangeText={(text) => setPhoneNumber(text)}
        keyboardType="phone-pad"
      />
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          isChecked={isChecked}
          onClick={() => handleCheck(!isChecked)} // Use onClick to handle the click event
        />
        <TouchableOpacity>
        <Text style={styles.checkboxText}>
          I have accept{' '}
          <Text style={styles.linkText}>Terms and conditions</Text>.
        </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="white" /> // Show loading spinner when isLoading is true
        ) : (
          <Button
            title={
              <>
                Continue{' '}
                <Icon name="arrow-right" size={16} color="white" />
              </>
            }
            onPress={handleRegistration}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default PhoneNumberReg;

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
    marginTop: 30,
    resizeMode: 'contain',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: -20,
  },
  textInput: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
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
  buttonContainer: {
    marginTop: 20,
  },
});
