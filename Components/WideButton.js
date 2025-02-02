import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const WideButton = ({ title, onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF7927',
    padding: 10,
    width: 365,
    height: 54,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    shadowColor: 'lightgray',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4, // Add elevation for Android
  },
  disabledButton: {
    backgroundColor: 'rgba(255, 121, 39, 0.5)', // Change the opacity as needed
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default WideButton;
