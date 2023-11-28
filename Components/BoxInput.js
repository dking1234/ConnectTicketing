import React, { useState } from 'react';
import { TextInput, View, FlatList, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BoxInput = ({ value, placeholder, onChangeText, style }) => {
  const [data, setData] = useState([]); // Autocomplete suggestions

  const fetchSuggestions = async (input) => {
    // Implement your logic to fetch suggestions (e.g., from an API)
    // Update the 'data' state with the fetched suggestions
    const suggestions = ["Dar es Salaam", 
                         "Mwanza", "Dodoma", 
                         "Mbeya", "Morogoro",
                         "Tanga","Kahama",
                         "Kigoma","Moshi",
                         "Musoma","Songea",
                         "Shinyanga","Iringa",
                         "Singida", "Njombe",
                         "Bukoba", "Kibaha",
                         "Mtwara", "Mpanda",
                         "Tunduma", "Makambako",
                         "Babati", "Handeni",
                         "Lindi", "Korogwe",
                         "Mafinga", "Nansio",
                         "Sumbawanga", "Kasulu",];
    setData(suggestions);
  };

  const handleInputChange = async (input) => {
    onChangeText(input);
    await fetchSuggestions(input);
  };

  const handleCitySelection = (selectedCity) => {
    onChangeText(selectedCity);
    setData([]); // Reset suggestions to close the autocomplete dropdown
  };

  return (
    <View style={{
      width: 370,
      marginBottom: 10,
      position: 'relative',
      zIndex: 1, // Set a higher zIndex for the container
    }}>

      <View style={{
        borderWidth: 1,
        borderColor: '#FF7927',
        borderRadius: 5,
        marginTop: 5,
        height: 60,
        position: 'relative',
        zIndex: 1, // Set a higher zIndex for the input container
      }}>
        {/* Location Icon */}
        <Ionicons
          name="md-locate"
          size={24}
          color="#B0B0B0"
          style={{
            position: 'absolute',
            left: 15,
            top: 18,
          }}
        />

        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#B0B0B0"
          onChangeText={handleInputChange}
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
        <Ionicons
          name="swap-horizontal-outline"
          size={24}
          color="tomato"
          style={{
            position: 'absolute',
            right: 15,
            top: 18,
            transform: [{ rotate: '90deg' }],
          }}
        />
      </View>

      {/* Autocomplete Suggestions */}
      {data.length > 0 && (
        <View style={{
          position: 'absolute',
          top: 60,
          left: 0,
          right: 0,
          zIndex: 1, // Set a higher zIndex for the dropdown
          backgroundColor: 'white',
          elevation: 5,
          borderRadius: 5,
        }}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleCitySelection(item)}>
                <Text style={{ padding: 10 }}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.toString()}
          />
        </View>
      )}
    </View>
  );
};

export default BoxInput;
