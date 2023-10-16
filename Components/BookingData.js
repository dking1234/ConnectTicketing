import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BoxInput from './BoxInput';
import BoxInput2 from './BoxInput2';
import CalendarPicker from 'react-native-calendar-picker';

const BookingData = ({ handleSearch }) => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);

  const handleDatePress = () => {
    // Trigger calendar popup here
  };

  return (
    <View style={styles.bookingContainer}>
      <BoxInput value={fromCity} onChangeText={setFromCity} placeholder="From City" style={styles.input} />
      <BoxInput2 value={toCity} onChangeText={setToCity} placeholder="To City" style={styles.input} />
      <View style={styles.dateContainer}>
        <TouchableOpacity onPress={handleDatePress} style={styles.dateButton}>
          <Text style={styles.dropdownText}>Departure: {departureDate || 'Choose Date'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDatePress} style={styles.returnButton}>
          <Text style={styles.returnText}>{returnDate || '+ Add return'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.passengerRow}>
      <View style={styles.passengerIcon}>
                <Text style={styles.passengerText}>Passengers:</Text>
                <View style={styles.icon}>
                {passengers === 1 && <Ionicons name="md-person" size={18} color="black" />}
                {passengers > 1 && <Ionicons name="md-people" size={24} color="black" />}
                </View> 
            </View>
        <View style={styles.counter}>
          <TouchableOpacity onPress={() => setPassengers(prev => Math.max(1, prev - 1))}>
            <Text style={styles.counterButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.numberText}>{passengers}</Text>
          <TouchableOpacity onPress={() => setPassengers(prev => prev + 1)}>
            <Text style={styles.counterButton}>+</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 20
  },
  returnText: {
    color: 'gray',
  },
  passengerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

export default BookingData;
