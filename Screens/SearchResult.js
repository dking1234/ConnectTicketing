import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TouchableScale from 'react-native-touchable-scale';
import BusTripDetails from '../Components/BusTripDetails';
import axios from 'axios';

const SearchResult = ({ route }) => {
  const { origin, destination, departureDate } = route.params;
  const [busTrips, setBusTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://172.20.10.13:3000/api/bus-schedules/search', {
          origin,
          destination,
          date: departureDate,
        });

        setBusTrips(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [origin, destination, departureDate]);

  const handlePress = (companyName, busId, seatArrangement) => {
    console.log('Seat Arrangement:', seatArrangement);
    navigation.navigate('SeatSelection', { companyName, busId, seatArrangement });
  };

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        busTrips.map((trip, index) => (
          <View key={trip._id} style={index === busTrips.length - 1 ? styles.lastTrip : {}}>
            <TouchableScale
              activeScale={0.95}
              tension={50}
              friction={7}
              onPress={() => handlePress(trip.bus?.company?.name || 'Unknown Company', trip.bus?._id, trip.bus?.seatArrangement)}
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
});

export default SearchResult;
