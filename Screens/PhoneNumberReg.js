import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity, SafeAreaView } from 'react-native'; // Import Alert from 'react-native'
import CheckBox from 'react-native-check-box';
import CustomTextInput from '../Components/CustomTextInput';
import Button from '../Components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'; 


const PhoneNumberReg = () => {
  const navigation = useNavigation();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = (newValue) => {
    setIsChecked(newValue);
  };

  const handleRegistration = () => {
    // Handle the registration logic here
    if (isChecked) {
      navigation.navigate('OTP');
      // User has agreed to the terms and conditions, proceed with registration
      // ... your registration logic here ...
    } else {
      // Display an error message indicating that the user must agree to the terms and conditions
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
        <Button
          title={
            <>
              Continue{' '}
              <Icon name="arrow-right" size={16} color="white" />{/* Add the arrow icon */}
            </>
          }
          onPress={handleRegistration}
        />
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
