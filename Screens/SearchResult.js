import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TouchableScale from 'react-native-touchable-scale';
import BusTripDetails from '../Components/BusTripDetails';
import axios from 'axios';

const SearchResult = ({ route }) => {
  const { origin, destination, departureDate } = route.params;
  const [busTrips, setBusTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://connect-ticketing.work.gd/api/bus-schedules/search',
          {
            origin,
            destination,
            date: departureDate,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
        setBusTrips(response.data);
        setIsLoading(false);
        setHasError(response.data.length === 0); // Check if there are no results
      } catch (error) {
        console.error('Error fetching search results:', error);
        setIsLoading(false);
        setHasError(true);
      }
    };
  
    fetchData();
  }, [origin, destination, departureDate]);

  const handlePress = (companyName, busId, seatArrangement, scheduleId) => {
    console.log('Seat Arrangement:', seatArrangement, scheduleId);
    navigation.navigate('SeatSelection', { companyName, busId, seatArrangement, scheduleId });
  };  

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="black" />
      ) : hasError ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}> !OOPS , No bus trips available for the selected route and date.</Text>
        </View>
      ) : (
        busTrips.map((trip, index) => (
          <View key={trip._id} style={index === busTrips.length - 1 ? styles.lastTrip : {}}>
            <TouchableScale
              activeScale={0.95}
              tension={50}
              friction={7}
              onPress={() => handlePress(
                trip.bus?.company?.name || 'Unknown Company',
                trip.bus?._id,
                trip.bus?.seatArrangement,
                trip._id  // Pass the scheduleId here
              )}
            >
              <BusTripDetails
                companyName={trip.bus?.company?.name || 'Unknown Company'}
                classType={trip.bus?.classType}
                origin={trip.origin}
                destination={trip.destination}
                departureTime={trip.departureTime}
                arrivalTime={trip.arrivalTime}
                price={trip.price}
              />
            </TouchableScale>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: '#f5f5f5',
  },
  lastTrip: {
    marginBottom: 20,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center', // Center the text
    width: '60%',
    marginTop: 300, // Add margin to the top if needed
  },
});

export default SearchResult;
