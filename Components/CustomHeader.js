import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

const CustomHeader = ({ navigation, trip }) => {
  console.log('Trip data:', trip); // Log the entire trip object
  const { origin, destination, departureDate } = trip;
  console.log('Origin:', origin);
  console.log('Destination:', destination);
  console.log('Departure Date:', departureDate);

  return (
    <View style={styles.headerContainer}>
      {/* Back Icon */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.leftIcon}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.textHeaderView}>
        <Text style={styles.headerTitle}>{`${origin}-${destination}`}</Text>
        <Text style={styles.headerTitle2}>{departureDate ? departureDate : ''}</Text>
      </View>
      
      {/* Share Icon */}
      <TouchableOpacity onPress={() => {/* Handle share functionality */}} style={styles.rightIcon}>
        <Ionicons name="share-social" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    height: 100,
    backgroundColor: '#FF7927',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftIcon: {
    padding: 10,
    marginTop: 10,
    position: 'absolute',
    left: 10,
  },
  rightIcon: {
    marginTop: 10,
    position: 'absolute',
    right: 10,
  },
  headerTitle: {
    marginLeft: 30,
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
  },
  headerTitle2: {
    marginLeft: 30,
    fontWeight: '300',
    fontSize: 14,
    color: '#fff',
  },
  textHeaderView: {
    flexDirection: 'column',
    marginRight: 200,
  },
});

const mapStateToProps = (state) => ({
  trip: state.trip,
});

export default connect(mapStateToProps)(CustomHeader);
