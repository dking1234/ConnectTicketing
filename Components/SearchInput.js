import React from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the MaterialIcons icon set

const SearchInput = ({ value, placeholder, onChangeText }) => {
  return (
    <View style={{ position: 'relative', width: 360, height: 54, margin: 10 }}>
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
          paddingLeft: 35, // Adjust padding-left to accommodate the icon
          height: '100%',
        }}
      />
      <Icon
        name="search" // Name of the MaterialIcons icon
        size={24}
        color="gray"
        style={{
          position: 'absolute',
          top: 15, // Adjust the top position to center the icon vertically
          left: 10, // Adjust the left position to align the icon with the input field
        }}
      />
    </View>
  );
};

export default SearchInput;
