// CitySearch.js

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, FlatList, Modal } from 'react-native';
import CitySuggestions from './CitySuggestions';

const CitySearch = ({ onCitySelect, setIsCitySearchFilled }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [originResults, setOriginResults] = useState([]);
  const [destinationResults, setDestinationResults] = useState([]);
  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showOriginModal, setShowOriginModal] = useState(false);
  const [showDestinationModal, setShowDestinationModal] = useState(false);

  const accessToken = 'pk.baa9b8c945f3a7c491e2dd99b817f193';
  const apiUrl = 'https://us1.locationiq.com/v1/autocomplete.php';

  useEffect(() => {
    const searchCities = async (query, setResults) => {
      try {
        const params = new URLSearchParams({
          key: accessToken,
          q: query,
          format: 'json',
          countrycodes: 'TZ',
          tag: 'place:city',
          limit: 10,
        });

        const response = await axios.get(`${apiUrl}?${params.toString()}`);

        const tanzaniaCities = response.data
          .map((city) => city.display_name.split(',')[0].trim());

        setResults(tanzaniaCities);
      } catch (error) {
        console.error('Error fetching city suggestions', error);
      }
    };

    // Debounce the searchCities function to limit the rate of requests
    const debounce = (func, delay) => {
      let timeout;
      return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
      };
    };

    const debouncedSearchCities = debounce(searchCities, 500);

    if (origin) {
      debouncedSearchCities(origin, setOriginResults);
    } else {
      setOriginResults([]);
    }

    if (destination) {
      debouncedSearchCities(destination, setDestinationResults);
    } else {
      setDestinationResults([]);
    }
  }, [origin, destination]);

  const handleCitySelection = (city, inputType) => {
    if (inputType === 'origin') {
      setSelectedOrigin(city);
      setOrigin(city);
      setOriginResults([]);
    } else if (inputType === 'destination') {
      setSelectedDestination(city);
      setDestination(city);
      setDestinationResults([]);
    }

    // Dispatch the action to update Redux store (if needed)

    // Call the prop function to pass the selected city to the parent
    if (onCitySelect) {
      onCitySelect(city, inputType);
      setIsCitySearchFilled(true); // Set the state variable
    }

    // Close the modal
    if (inputType === 'origin') {
      setShowOriginModal(false);
    } else if (inputType === 'destination') {
      setShowDestinationModal(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setShowOriginModal(true)}
      >
        <Text>{selectedOrigin ? `From: ${selectedOrigin}` : 'Select origin'}</Text>
      </TouchableOpacity>

      <CitySuggestions
        isVisible={showOriginModal}
        onClose={() => setShowOriginModal(false)}
        onCitySelect={(city) => handleCitySelection(city, 'origin')}
        results={originResults}
        searchCities={(text) => setOrigin(text)}
      />

      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setShowDestinationModal(true)}
      >
        <Text>{selectedDestination ? `To: ${selectedDestination}` : 'Select destination'}</Text>
      </TouchableOpacity>

      <CitySuggestions
        isVisible={showDestinationModal}
        onClose={() => setShowDestinationModal(false)}
        onCitySelect={(city) => handleCitySelection(city, 'destination')}
        results={destinationResults}
        searchCities={(text) => setDestination(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#FF7927',
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10,
    height: 45,
    justifyContent: 'center',
    paddingLeft: 10,
  },
});

export default CitySearch;
