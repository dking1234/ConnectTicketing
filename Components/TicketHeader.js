import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TicketHeader = () => {

  const handleBackPress = () => {
    console.log("Back button pressed!");
    // Add your back navigation logic here.
  };

  const handleSharePress = () => {
    console.log("Share button pressed!");
    // Add your share logic here.
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>

      <Text style={styles.text}>Your Ticket</Text>

      <TouchableOpacity onPress={handleSharePress} style={styles.shareButton}>
        <Ionicons name="share-social" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 10,
  },
  shareButton: {
    padding: 10,
  },
});

export default TicketHeader;
