// BookingData.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux'; // Import connect
import { setPassengers } from '../redux/actions/passengerActions';

const BookingData = ({ setPassengers }) => {

  const [passengers, setPassengersLocal] = useState(1);

  const handlePassengerChange = (newPassengerCount) => {
    setPassengersLocal(newPassengerCount);
    // Dispatch the action to update the state in Redux
    setPassengers(newPassengerCount);
  };

  return (
    <View style={styles.passengerRow}>
      <View style={styles.passengerIcon}>
        <Text style={styles.passengerText}>Passengers:</Text>
        <View style={styles.icon}>
          {passengers === 1 && <Ionicons name="md-person" size={18} color="black" />}
          {passengers > 1 && <Ionicons name="md-people" size={24} color="black" />}
        </View>
      </View>
      <View style={styles.counter}>
      <TouchableOpacity onPress={() => handlePassengerChange(Math.max(1, passengers - 1))}>
        <Text style={styles.counterButton}>-</Text>
      </TouchableOpacity>
      <Text style={styles.numberText}>{passengers}</Text>
      <TouchableOpacity onPress={() => handlePassengerChange(passengers + 1)}>
        <Text style={styles.counterButton}>+</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bookingContainer: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  dateContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  dateButton: {
    flex: 1,
    marginRight: 5,
    borderWidth: 1,
    borderColor: 'orange',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  returnButton: {
    flex: 1,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: 'orange',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchButton: {
    backgroundColor: 'orange',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  dropdownText: {
    color: 'black',
  },
  passengerText:{
    fontSize: 16,
    fontWeight: '500'
  },
  numberText:{
    fontSize: 16
  },
  returnText: {
    color: 'gray',
  },
  passengerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: -10,
  },
  counterButton: {
    fontSize: 25,
    fontWeight: 'bold',
    marginHorizontal: 20,
    color: '#FF7927'
  },
  counter:{
    borderWidth: 1,
    borderRadius: 5,
    width: 175,
    height: 40,
    borderColor: '#FF7927',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  passengerIcon:{
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon:{
    marginLeft: 50
  }
});

export default connect(null, { setPassengers })(BookingData);

