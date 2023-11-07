import React, { useState } from 'react';
import { View, Button, Platform, StyleSheet, TouchableOpacity, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const MyDateTimePicker = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
            <View style={styles.dateContainer}>
        <TouchableOpacity onPress={showDatepicker} style={styles.dateButton}>
          <Text style={styles.dropdownText}>Departure: {departureDate || 'Choose Date'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={showDatepicker} style={styles.returnButton}>
          <Text style={styles.returnText}>{returnDate || '+ Add return'}</Text>
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default MyDateTimePicker;

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