import React from 'react';
import { TextInput, View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const BoxInput = ({ value, placeholder, onChangeText }) => {
  return (
    <View style={{
      backgroundColor: '#EAEAEA',
      borderRadius: 5,
      marginTop: 10,
      width: 360,
      height: 60,
      position: 'relative',
      ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
        },
        android: {
          elevation: 4,
        },
      }),
    }}>
      
      {/* Location Icon */}
      <Ionicons 
    name="md-locate" 
    size={24} 
    color="#B0B0B0" 
    style={{ 
        position: 'absolute', 
        left: 15, 
        top: 18
    }} 
/>
      
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

      {/* Exchange Icon */}
      <Ionicons name="swap-horizontal-outline" size={24} color="tomato" style={{ position: 'absolute', 
                                                                                  right: 15, 
                                                                                  top: 18,
                                                                                  transform: [{ rotate: '90deg' }]  }} />
    </View>
  );
};

export default BoxInput;
