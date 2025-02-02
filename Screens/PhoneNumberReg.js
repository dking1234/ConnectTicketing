import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import CustomPhoneInput from '../Components/CustomPhoneInput';
import Button from '../Components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const PhoneNumberReg = () => {
  const navigation = useNavigation();

  const [selectedCountry, setSelectedCountry] = useState({
    cca2: 'TZ', // ISO country code for Tanzania
    callingCode: '+255', // International dialing code for Tanzania
  });
  const [phoneNumber, setPhoneNumber] = useState(selectedCountry.callingCode); // Initialize with default country code
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = (newValue) => {
    setIsChecked(newValue);
  };

  const handleRegistration = async () => {
    if (!phoneNumber || phoneNumber.length <= selectedCountry.callingCode.length) {
      Alert.alert('Angalizo', 'Tafadhali weka namba ya simu.');
      return;
    }

    if (isChecked) {
      setIsLoading(true);

      try {
        // Combine country code and phone number
        const fullPhoneNumber = `${selectedCountry.callingCode}${phoneNumber.substring(selectedCountry.callingCode.length)}`;

        // Send OTP to the fullPhoneNumber
        const response = await axios.post('https://connect-ticketing.work.gd/notification/send-notification', { phoneNumber: fullPhoneNumber });
        console.log(response.data.message);

        // Navigate to OTP screen and pass fullPhoneNumber as route param
        navigation.navigate('OTP', { phoneNumber: fullPhoneNumber });
        console.log('Full Phone Number:', fullPhoneNumber);
      } catch (error) {
        console.error('Error sending OTP:', error);
        Alert.alert('Error', 'There was an issue sending the OTP.');
      } finally {
        setIsLoading(false);
      }
    } else {
      Alert.alert('Angalizo', 'Kubali Vigezo na Masharti Kuendelea.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingContainer}
        >
          <View style={styles.logoContainer}>
            <Image source={require('../Images/Connect.png')} style={styles.logo} />
          </View>

          <View style={styles.header}>
            <Text style={styles.headerText}>Register your account</Text>
          </View>

          <View style={styles.textInput}>
            <CustomPhoneInput
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
              onCountryChange={(country) => setSelectedCountry(country)}
              countryCode={selectedCountry?.cca2}
            />
          </View>

          <View style={styles.checkboxContainer}>
            <CheckBox
              isChecked={isChecked}
              onClick={() => handleCheck(!isChecked)}
            />
            <TouchableOpacity>
              <Text style={styles.checkboxText}>
                I have accepted{' '}
                <Text style={styles.linkText}>Terms and conditions</Text>.
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator size="large" color="white" />
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
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PhoneNumberReg;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  keyboardAvoidingContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
