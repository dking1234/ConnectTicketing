import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import CustomTextInput from './CustomTextInput';

const CustomPhoneInput = ({ onChangeText, onCountryChange, value, countryCode }) => {
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [callingCode, setCallingCode] = useState('');

  useEffect(() => {
    // You may need to fetch the calling code based on the selected country code
    // For simplicity, I'll use a switch statement here, but you should replace it with your logic
    switch (countryCode) {
      case 'TZ':
        setCallingCode('+255');
        break;
      // Add more cases for other country codes
      default:
        setCallingCode('');
    }
  }, [countryCode]);

  const handleCountryChange = (country) => {
    setCallingCode(country.callingCode[0]); // Assuming callingCode is an array
    onCountryChange(country);
    setShowCountryPicker(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowCountryPicker(true)}>
        <CountryPicker
          withFlag
          withFilter
          withCountryNameButton={false} // Hide country name
          withAlphaFilter
          onSelect={(country) => handleCountryChange(country)}
          countryCode={countryCode}
          visible={showCountryPicker}
          onClose={() => setShowCountryPicker(false)}
          containerButtonStyle={styles.countryPickerContainer}
        />
      </TouchableOpacity>

      <CustomTextInput
        value={value}
        placeholder="Enter Phone Number"
        onChangeText={onChangeText}
        keyboardType="phone-pad"
        containerStyle={styles.textInput}
        prefix={callingCode} // Use callingCode instead of countryCode
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  countryPickerContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
});

export default CustomPhoneInput;
