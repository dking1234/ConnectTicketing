import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const SeatSelection = ({ busId }) => {
  console.log('Bus ID:', busId);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [busDetails, setBusDetails] = useState(null);
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const response = await axios.get(`http://192.168.43.21:3000/api/buses/${busId}`);
        setBusDetails(response.data);

        // Initialize seats based on the number of seats in busDetails
        const initializedSeats = Array.from({ length: response.data.numberOfSeats }, (_, index) => ({
          id: (index + 1).toString(),
          available: Math.random() < 0.8, // Adjust this based on your logic
        }));

        setSeats(initializedSeats);
      } catch (error) {
        console.error('Error fetching bus details:', error);
      }
    };

    if (busId) {
      fetchBusDetails();
    }
  }, [busId]);

  const handleSeatSelection = (seatId) => {
    if (selectedSeat === seatId) {
      setSelectedSeat(null);
      setShowOverlay(false);
    } else {
      setSelectedSeat(seatId);
      setShowOverlay(true);
    }
  };

  const navigation = useNavigation();

  const handleContinue = () => {
    console.log("Bus ID:", busId);
    console.log("Seat selected:", selectedSeat);
    
    // Navigate to ClassCondition screen
    navigation.navigate('ClassCondition');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Seat</Text>

      <View style={styles.legendContainer}>
        <View style={styles.legend}>
          <View style={[styles.legendBox, styles.available]}></View>
          <Text>Available</Text>
        </View>
        <View style={styles.legend}>
          <View style={[styles.legendBox, styles.selected]}></View>
          <Text>Selected</Text>
        </View>
        <View style={styles.legend}>
          <View style={[styles.legendBox, styles.unavailable]}></View>
          <Text>Unavailable</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.seatsContainer}>
          {busDetails?.numberOfSeats && Array.from({ length: busDetails.numberOfSeats / 4 }, (_, rowIndex) => (
            <View style={styles.row} key={rowIndex}>
              {Array.from({ length: 4 }, (_, colIndex) => (
                <View key={colIndex} style={colIndex === 2 ? styles.rightSeat : null}>
                  <TouchableOpacity
                    style={[
                      styles.seat,
                      seats[rowIndex * 4 + colIndex]?.available ? styles.available : styles.unavailable,
                      seats[rowIndex * 4 + colIndex]?.id === selectedSeat ? styles.selected : null,
                    ]}
                    onPress={() => {
                      if (seats[rowIndex * 4 + colIndex]?.available) handleSeatSelection(seats[rowIndex * 4 + colIndex]?.id);
                    }}
                    disabled={!seats[rowIndex * 4 + colIndex]?.available}
                  >
                    <Text>{seats[rowIndex * 4 + colIndex]?.id}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      {showOverlay && (
        <TouchableOpacity style={styles.overlayButton} onPress={handleContinue}>
          <Text style={styles.overlayButtonText}>Continue</Text>
        </TouchableOpacity>
      )}

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',

  },
  title: {
    fontWeight: '600',
    alignItems: 'center',
    fontSize: 20,
    marginBottom: 20,
  },
  seatsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  rightSeat: {
    marginLeft: 20,
  },
  seat: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
  },
  available: {
    backgroundColor: '#FF7927',
    borderColor: 'gray',
  },
  unavailable: {
    backgroundColor: 'lightgray',
  },
  selected: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FF7927',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  legendBox: {
    width: 20,
    height: 20,
    marginRight: 5,
    borderRadius: 10,
  },
  lastRow: {
    marginBottom: 10,  // Original margin for consistency; seatsContainer paddingBottom provides the main space
  },
  overlayButton: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    backgroundColor: '#152970',
    paddingVertical: 15,
    borderRadius: 10,
    marginHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8
  },
  overlayButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});


export default SeatSelection;
