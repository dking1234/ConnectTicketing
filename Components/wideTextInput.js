import React from 'react';
import { TextInput } from 'react-native';

const wideTextInput = ({ value, placeholder, onChangeText }) => {
  return (
    <TextInput
      value={value}
      placeholder={placeholder}
      placeholderTextColor="gray"
      onChangeText={onChangeText}
      style={{
        borderWidth: 1,
        borderColor: '#14684E',
        padding: 10,
        borderRadius: 5,
        color: 'gray',
        width: 360,
        height: 54,
        margin: 10,
      }}
    />
  );
};

export default wideTextInput;
