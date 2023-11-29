  import React, { useState, useEffect } from 'react';
  import { View, Image, StyleSheet, SafeAreaView, ActivityIndicator, Text, ScrollView } from 'react-native';
  import { useNavigation } from '@react-navigation/native';
  import BookingData from '../Components/BookingData';
  import CitySearch from '../Components/CitySearch';
  import WideButton from '../Components/WideButton';
import MyDateTimePicker from '../Components/MyDateTimePicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AdsSpace from '../Components/AdsSpace';

  const HomeScreen = () => {
    const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

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

    fetchUserFirstName();
  }, []);

  const handleCitySelect = (city, inputType) => {
    if (inputType === 'origin') {
      setSelectedOrigin(city);
      console.log(`Selected ${inputType} city: ${city}`);
    } else if (inputType === 'destination') {
      setSelectedDestination(city);
      console.log(`Selected ${inputType} city: ${city}`);
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
        <CitySearch onCitySelect={handleCitySelect} />
        <View style={styles.datePicker}>
        <MyDateTimePicker onDateSelect={handleDateSelect} />
        </View>
        <BookingData />
        <View style={styles.buttonContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="white" /> // Show loading spinner when isLoading is true
        ) : (
          <WideButton
            title={
              <>
                Search Bus{' '}
              </>
            }
            onPress={handleConfirm}
          />
        )}
      </View>
      <AdsSpace />
      </SafeAreaView>

    );
  }

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
    adsSpace:{
      flexDirection: 'row',
      marginHorizontal: 20
    },
    datePicker:{
      marginHorizontal: 15,
      marginTop: -30,
      marginBottom: 6
    },
    Advert:{
      width: '100%',
      height: 200,
      borderRadius: 10
    },
    HomeImage: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
      marginBottom: 10
    },
    textOnTop: {
      position: 'absolute',
      top: 80,
      left: 30, // Adjust the top position based on your preference
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white'
    },
    Button:{
      alignItems: 'center',
    }
  });

  export default HomeScreen;
