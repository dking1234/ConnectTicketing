import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SelectButton = ({ title, onPress, selected }) => {
  return (
    <TouchableOpacity
    style={[
      styles.button,
      { backgroundColor: selected ? '#14684E' : 'lightgray' },
    ]}
    onPress={() => onPress(title)} // Pass the title when the button is pressed
  >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 5,
    marginTop: 5,
    width: 90,
    height: 25,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'lightgray',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4, // Add elevation for Android
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
  },
});

export default SelectButton;
