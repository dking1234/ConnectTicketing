import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CitySearch = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [originResults, setOriginResults] = useState([]);
  const [destinationResults, setDestinationResults] = useState([]);
  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showOriginModal, setShowOriginModal] = useState(false);
  const [showDestinationModal, setShowDestinationModal] = useState(false);

  const accessToken = "pk.baa9b8c945f3a7c491e2dd99b817f193";
  const apiUrl = "https://us1.locationiq.com/v1/autocomplete.php";

  useEffect(() => {
    if (origin) {
      searchCities(origin, setOriginResults);
    } else {
      setOriginResults([]);
    }
  }, [origin]);

  useEffect(() => {
    if (destination) {
      searchCities(destination, setDestinationResults);
    } else {
      setDestinationResults([]);
    }
  }, [destination]);

  const searchCities = (query, setResults) => {
    const params = new URLSearchParams({
      key: accessToken,
      q: query,
      format: "json",
      countrycodes: "TZ",
      tag: "place:city",
      limit: 10,
    });

    fetch(`${apiUrl}/autocomplete?${params}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0 && data[0].display_name) {
          const cityNames = data.map(city => city.display_name.split(',')[0].trim());
          setResults(cityNames);
        } else {
          setResults([]);
        }
      })
      .catch(error => console.error('Error:', error));
  };

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
  };

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);

    setSelectedOrigin(selectedDestination);
    setSelectedDestination(selectedOrigin);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setShowOriginModal(true)}
      >
        <Ionicons
          name="md-locate"
          size={24}
          color="gray"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder={`Enter origin city${selectedOrigin ? ` (Selected: ${selectedOrigin} - Origin)` : ''}`}
          value={origin}
          onChangeText={text => setOrigin(text)}
        />
      </TouchableOpacity>

      <Modal
        visible={showOriginModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <FlatList
            data={originResults}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleCitySelection(item, 'origin')}>
                <Text style={styles.resultText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={() => setShowOriginModal(false)}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setShowDestinationModal(true)}
      >
        <Ionicons
          name="location-outline"
          size={24}
          color="gray"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder={`Enter destination city${selectedDestination ? ` (Selected: ${selectedDestination} - Destination)` : ''}`}
          value={destination}
          onChangeText={text => setDestination(text)}
        />
      </TouchableOpacity>

      <Modal
        visible={showDestinationModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <FlatList
            data={destinationResults}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleCitySelection(item, 'destination')}>
                <Text style={styles.resultText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={() => setShowDestinationModal(false)}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <FlatList
        data={originResults}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCitySelection(item, 'origin')}>
            <Text style={styles.resultText}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      <FlatList
        data={destinationResults}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCitySelection(item, 'destination')}>
            <Text style={styles.resultText}>{item}</Text>
          </TouchableOpacity>
        )}
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
    position: 'relative',
    zIndex: 1,
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 5,
    color: 'gray',
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
    position: 'absolute',
    left: 15,
    top: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'tomato',
  },
  resultText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default CitySearch;
