import React from 'react';
import { TextInput } from 'react-native';

const CustomTextInput = ({ value, placeholder, onChangeText }) => {
  return (
    <TextInput
      value={value}
      placeholder={placeholder}
      placeholderTextColor="gray"
      onChangeText={onChangeText}
      style={{
        borderWidth: 1,
        borderColor: '#FF7927',
        padding: 10,
        borderRadius: 5,
        color: 'gray',
        width: 297,
        height: 54,
        margin: 10,
      }}
    />
  );
};

export default CustomTextInput;
