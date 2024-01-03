// CitySuggestions.js

import React from 'react';
import { View, TextInput, FlatList, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const CitySuggestions = ({ isVisible, onClose, onCitySelect, results, searchCities }) => {
  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.modalInput}
            placeholder="Search for a city"
            onChangeText={(text) => searchCities(text)}
          />
          <FlatList
            data={results}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.resultItem}
                onPress={() => onCitySelect(item)}
              >
                <Text style={styles.resultText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => onClose()}
          >
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    height: '100%', // Set the height to fill the entire screen
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
  },
  modalInput: {
    fontSize: 16,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  resultItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  resultText: {
    fontSize: 16,
  },
  closeButton: {
    padding: 15,
    backgroundColor: 'tomato',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default CitySuggestions;
