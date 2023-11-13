import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import BackButton from '../Components/BackButton';
import Button from '../Components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const OTP = () => {

const navigation = useNavigation();

const [otpValues, setOtpValues] = useState(['', '', '', '']);
const [error, setError] = useState(null); // State variable for error message
const [isLoading, setIsLoading] = useState(false);

const inputRefs = [null, null, null, null];

const handleOtpChange = (value, index) => {
  if (value.length === 1 && index < 3) {
    setOtpValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });
    inputRefs[index + 1].focus();
  } else if (value.length === 0 && index > 0) {
    setOtpValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });
    inputRefs[index - 1].focus();
  } else {
    setOtpValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });
  }
};

const verifyOtp = async () => {
  const otp = otpValues.join('');
  setIsLoading(true);
  try {
    // Retrieve the phoneNumber from AsyncStorage
    const phoneNumber = await AsyncStorage.getItem('phoneNumber');
    
    // Ensure phoneNumber is retrieved
    if (!phoneNumber) {
      throw new Error('Phone number not found');
    }

    const response = await axios.post('http://172.20.10.3:3000/verify/verify-otp', {
      phoneNumber,
      otp,
    });

    // Check if the OTP verification was successful
    if (response.data.success) {
      // If so, navigate to the 'UserName' screen
      navigation.navigate('UserName', { phoneNumber });
    } else {
      // If not, set the error state with the message from the response or a default message
      setError(response.data.message || 'Invalid OTP.');
    }
  } catch (error) {
    // Error handling remains the same...
    // ...
  } finally {
    setIsLoading(false);
  }
};

  return (
    <SafeAreaView style={styles.container}>
    
    <BackButton/>

    <View style={styles.logoContainer}>
        <Image source={require('../Images/Connect.png')} style={styles.logo} />
      </View>
    
    <View style={styles.textContainer}>
    <Text style={styles.headerText}>Verify Phone number</Text>
    <Text style={styles.descriptText}>The verification have been sent to ********83. Enter code to verify</Text>
    </View>
    
    <View style={{alignItems: 'center'}}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '70%' }}>
            {otpValues.map((value, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs[index] = ref)} // Assign the ref to the array
                style={styles.input}
                value={value}
                onChangeText={(text) => handleOtpChange(text, index)}
                keyboardType="numeric"
                maxLength={1}
              />
            ))}
          </View>
          {error && <Text style={styles.errorText}>{error}</Text>}

          <View style={styles.buttonContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <Button
            title={
              <>
                Endelea{' '}
                <Icon name="arrow-right" size={16} color="white" />
              </>
            }
            onPress={verifyOtp}
          />
        )}
      </View>


      <TouchableOpacity>
      <Text style={styles.checkboxText}>
          Didn't get codes,{' '}
          <Text style={styles.linkText}>Resend</Text>.
        </Text>
      </TouchableOpacity>

          </View>

    </SafeAreaView>
  );
};

export default OTP;

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
    width: '50%'
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
