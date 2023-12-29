import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, SafeAreaView, ActivityIndicator, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BookingData from '../Components/BookingData';
import CitySearch from '../Components/CitySearch';
import WideButton from '../Components/WideButton';
import MyDateTimePicker from '../Components/MyDateTimePicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AdsSpace from '../Components/AdsSpace';
import { connect } from 'react-redux';

const HomeScreen = ({ passengers }) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [isCitySearchFilled, setIsCitySearchFilled] = useState(false);
  const [isDateTimePickerFilled, setIsDateTimePickerFilled] = useState(false);
  const [userId, setUserId] = useState(null); 
  
  useEffect(() => {
    // Fetch user's first name from AsyncStorage
    const fetchUserFirstName = async () => {
      try {
        const storedFirstName = await AsyncStorage.getItem('firstName');
        if (storedFirstName) {
          setFirstName(storedFirstName);
        }
      } catch (error) {
        console.error('Error fetching user first name:', error);
      }
    };

    // Fetch phoneNumber from AsyncStorage
    const fetchPhoneNumber = async () => {
      try {
        const storedPhoneNumber = await AsyncStorage.getItem('phoneNumber');
        return storedPhoneNumber;
      } catch (error) {
        console.error('Error fetching phone number:', error);
      }
    };

    // Fetch userId from the backend using the phoneNumber
    const fetchUserIdFromPhoneNumber = async () => {
      try {
        const phoneNumber = await fetchPhoneNumber();

        if (!phoneNumber) {
          console.error('Phone number not found in AsyncStorage');
          return;
        }

        const response = await fetch(`https://connect-ticketing.work.gd/user/userId/${phoneNumber}`);
        const data = await response.json();

        if (data.userId) {
          setUserId(data.userId);
          await AsyncStorage.setItem('userId', data.userId);
        }
      } catch (error) {
        console.error('Error fetching userId:', error);
      }
    };

    fetchUserFirstName();
    fetchUserIdFromPhoneNumber();
  }, []);

  const handleCitySelect = (city, inputType) => {
    if (inputType === 'origin') {
      setSelectedOrigin(city);
    } else if (inputType === 'destination') {
      setSelectedDestination(city);
    }
  };

  // Function to handle date selection
  const handleDateSelect = (date, type) => {
    if (type === 'departureDate') {
      setSelectedDate(date);
    }
  };

  const handleConfirm = () => {
    // Navigate to ClassCondition screen
    navigation.navigate('SearchResult', {
      origin: selectedOrigin,
      destination: selectedDestination,
      departureDate: selectedDate,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../Images/Top.png')} style={styles.HomeImage}/>
        <Text style={styles.textOnTop}>Welcome! {firstName}</Text>
      </View>
      <CitySearch onCitySelect={handleCitySelect} setIsCitySearchFilled={setIsCitySearchFilled} />
      <View style={styles.datePicker}>
        <MyDateTimePicker
          onDateSelect={handleDateSelect}
          origin={selectedOrigin}
          destination={selectedDestination}
          setIsDateTimePickerFilled={setIsDateTimePickerFilled}
        />
      </View>
      <BookingData />
      <View style={styles.buttonContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="white" /> // Show loading spinner when isLoading is true
        ) : (
          <WideButton
          title="Search Bus"
          onPress={handleConfirm}
          disabled={!isCitySearchFilled || !isDateTimePickerFilled}
        />
        )}
      </View>
      <AdsSpace />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  adsSpace: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  datePicker: {
    marginHorizontal: 15,
    marginTop: -30,
    marginBottom: 6,
  },
  Advert: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  HomeImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  textOnTop: {
    position: 'absolute',
    top: 80,
    left: 30, // Adjust the top position based on your preference
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  Button: {
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => ({
  passengers: state.passengers,
});

export default connect(mapStateToProps)(HomeScreen);
