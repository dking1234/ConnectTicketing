import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux';
import { setTripDetails } from '../redux/actions/tripActions';

const MyDateTimePicker = ({ dispatch, onDateSelect, onReturnDateSelect, origin, destination, setIsDateTimePickerFilled }) => {

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [showReturnPicker, setShowReturnPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    // Format the selected date as a string (you can adjust the format as needed)
    const formattedDate = currentDate.toLocaleDateString('en-US');
    setDepartureDate(formattedDate);

    dispatch(setTripDetails(origin, destination, formattedDate));
    // Call the prop function to pass the selected date to the parent
    onDateSelect(formattedDate, 'departureDate');// Updated line
    setIsDateTimePickerFilled(true); // Set the state variable
  };

  const onChangeReturn = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowReturnPicker(Platform.OS === 'ios');
    setDate(currentDate);

    // Format the selected date as a string (you can adjust the format as needed)
    const formattedReturnDate = currentDate.toLocaleDateString('en-US');
    setReturnDate(formattedReturnDate);

    dispatch(setTripDetails({ origin, destination, returnDate: formattedReturnDate }));
    // Call the prop function to pass the selected return date to the parent
    onReturnDateSelect(formattedReturnDate);
    setIsDateTimePickerFilled(true); // Set the state variable
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showReturnDatepicker = () => {
    setShowReturnPicker(true);
  };

  return (
    <View style={styles.bookingContainer}>
      <View style={styles.dateContainer}>
        <TouchableOpacity onPress={showDatepicker} style={styles.dateButton}>
          <Text style={styles.dropdownText}>Departure: {departureDate || 'Choose Date'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={showReturnDatepicker} style={styles.returnButton}>
          <Text style={styles.returnText}>Return: {returnDate || 'Choose Date'}</Text>
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
      {showReturnPicker && (
        <DateTimePicker
          testID="returnDateTimePicker"
          value={new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeReturn}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bookingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '110%',
  },
  dateButton: {
    flex: 1,
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#FF7927',
    padding: 12,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  returnButton: {
    flex: 1,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: '#FF7927',
    padding: 12,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdownText: {
    color: 'black',
  },
  returnText: {
    color: 'black',
  },
});

export default connect()(MyDateTimePicker);
