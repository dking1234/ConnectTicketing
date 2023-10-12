import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SelectButton2 = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: 'lightgray',
    width: 162,
    height: 35,
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
    color: '#14684E',
    fontSize: 16,
    fontWeight: '400',
  },
});

export default SelectButton2;
