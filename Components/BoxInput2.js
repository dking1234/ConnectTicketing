import React from 'react';
import { TextInput, View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const BoxInput = ({ value, placeholder, onChangeText }) => {
  return (
    <View style={{
      borderWidth: 1,
      borderColor: '#FF7927',
      borderRadius: 5,
      marginTop: 10,
      width: 370,
      height: 60,
      position: 'relative',
    }}>
      
      {/* Location Icon */}
      <Ionicons name="location-outline" size={24} color="#B0B0B0" style={{ position: 'absolute', left: 15, top: 18 }} />
      
      <TextInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#B0B0B0"
        onChangeText={onChangeText}
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          padding: 10,
          paddingLeft: 40, // make space for the left icon
          paddingRight: 40, // make space for the right icon
          borderRadius: 5,
          color: 'gray',
          fontSize: 16,
          marginLeft: 10,
        }}
      />
    </View>
  );
};

export default BoxInput;
