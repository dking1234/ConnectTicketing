import React, { useState } from 'react';
import { TextInput, View, ScrollView, FlatList, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const Geocoding = ({ onChangeText }) => {
  const [data, setData] = useState([]);

  const fetchSuggestions = async (input) => {
    try {
      // Replace 'YOUR_API_KEY' with your actual LocationIQ API key
      const apiKey = 'pk.baa9b8c945f3a7c491e2dd99b817f193';
      const response = await axios.get(
        `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${encodeURIComponent(input)}&format=json`
      );

      // Extract suggestions from the response
      const suggestions = response.data.map((item) => item.display_name);

      setData(suggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleInputChange = async (input) => {
    onChangeText(input);
    await fetchSuggestions(input);
  };

  const handleCitySelection = (selectedCity) => {
    onChangeText(selectedCity);
    setData([]);
  };

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: '#FF7927',
        borderRadius: 5,
        marginTop: 10,
        width: 370,
        height: 60,
        position: 'relative',
        zIndex: 1,
      }}
    >
      <Ionicons
        name="location-outline"
        size={24}
        color="#B0B0B0"
        style={{ position: 'absolute', left: 15, top: 18, zIndex: 2 }}
      />
      <TextInput
        placeholder="Enter a location"
        placeholderTextColor="#B0B0B0"
        onChangeText={handleInputChange}
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          padding: 10,
          paddingLeft: 40,
          paddingRight: 40,
          borderRadius: 5,
          color: 'gray',
          fontSize: 16,
          marginLeft: 10,
          zIndex: 2,
        }}
      />
      {data.length > 0 && (
        <ScrollView
          style={{
            position: 'absolute',
            top: 60,
            left: 0,
            right: 0,
            zIndex: 3,
            backgroundColor: 'white',
            elevation: 5,
            borderRadius: 5,
            marginHorizontal: 10,
            maxHeight: 150, // Set a maximum height for the scroll view
          }}
        >
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleCitySelection(item)}>
                <Text
                  style={{
                    padding: 10,
                    backgroundColor: 'white',
                    borderWidth: 1,
                    borderColor: '#FF7927',
                    borderRadius: 5,
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.toString()}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default Geocoding;
