import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TouchableScale from 'react-native-touchable-scale'; // import this
import BusTripDetails from '../Components/BusTripDetails';

const busTrips = [
  { id: 1, name: 'Trip 1' },
  { id: 2, name: 'Trip 2' },
  { id: 3, name: 'Trip 3' },
  { id: 4, name: 'Trip 4' },
  { id: 5, name: 'Trip 5' },
  // ... other trips
];

const SearchResult = () => {
    const navigation = useNavigation();

    const handlePress = (tripName) => {
      navigation.navigate('SeatSelection', { tripName });
    };

    return (
        <ScrollView style={styles.container}>
        {busTrips.map((trip, index) => (
            <View key={trip.id} style={index === busTrips.length - 1 ? styles.lastTrip : {}}>
                <TouchableScale 
                    activeScale={0.95}  // You can change this value for your own preference
                    tension={50} // This prop will increase the spring effect
                    friction={7} // This prop will make the effect smoother
                    onPress={() => handlePress(trip.name)}
                >
                    <BusTripDetails name={trip.name} />
                </TouchableScale>
            </View>
        ))}
        </ScrollView>
    );
}

// ... styles and export remain the same


const styles = StyleSheet.create({
  container: {
    flex: 1, // Fills the available space
    padding: 2, // Adds some padding around the content
    backgroundColor: '#f5f5f5', // Optional background color for the container
  },
  lastTrip: {
    marginBottom: 20, // Add the desired margin for the last trip
  },
});

export default SearchResult;
