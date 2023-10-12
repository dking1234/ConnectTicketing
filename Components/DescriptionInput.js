import React from 'react';
import { TextInput } from 'react-native';

const DescriptionInput = ({ value, placeholder, onChangeText }) => {
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
        height: 120,
        margin: 10,
        textAlignVertical: 'top', // Set text alignment to top
      }}
    />
  );
};

export default DescriptionInput;
