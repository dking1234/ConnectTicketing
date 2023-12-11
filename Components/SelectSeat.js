import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const SeatSelection = ({ busId, seatArrangement }) => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [busDetails, setBusDetails] = useState({
    seatConfiguration: "2-2", // Default value or null
    numberOfSeats: 0,
  });
  const [seats, setSeats] = useState([]);

  // Log seatArrangement whenever it changes
  useEffect(() => {
  }, [seatArrangement]);

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const response = await axios.get(`http://ec2-3-87-76-135.compute-1.amazonaws.com/api/buses/${busId}`);
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

  useEffect(() => {
    const fetchAvailableSeats = async () => {
      try {
        const response = await axios.get(`http://ec2-3-87-76-135.compute-1.amazonaws.com/api/buses/${busId}/available-seats`);
        const availableSeatIds = response.data.availableSeats;

        // Update the available status of seats based on the server response
        const updatedSeats = seats.map((seat) => ({
          ...seat,
          available: availableSeatIds.includes(seat.id),
        }));

        setSeats(updatedSeats);
      } catch (error) {
        console.error('Error fetching available seats:', error);
      }
    };

    if (busId) {
      fetchAvailableSeats();
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

  const renderSeats = () => {
    const seatConfig = seatArrangement || "2-2";
    const [left, right] = seatConfig.split('-');

    return Array.from({ length: busDetails.numberOfSeats / (parseInt(left) + parseInt(right)) }, (_, rowIndex) => (
      <View style={styles.row} key={rowIndex}>
        {Array.from({ length: parseInt(left) + parseInt(right) }, (_, colIndex) => (
          <View key={colIndex} style={colIndex < parseInt(left) ? styles.leftSeat : styles.rightSeat}>
            <TouchableOpacity
              style={[
                styles.seat,
                seats[rowIndex * (parseInt(left) + parseInt(right)) + colIndex]?.available
                  ? styles.available
                  : styles.unavailable,
                seats[rowIndex * (parseInt(left) + parseInt(right)) + colIndex]?.id === selectedSeat
                  ? styles.selected
                  : null,
              ]}
              onPress={() => {
                const seatIndex = rowIndex * (parseInt(left) + parseInt(right)) + colIndex;
                if (seats[seatIndex]?.available) handleSeatSelection(seats[seatIndex]?.id);
              }}
              disabled={!seats[rowIndex * (parseInt(left) + parseInt(right)) + colIndex]?.available}
            >
              <Text>{seats[rowIndex * (parseInt(left) + parseInt(right)) + colIndex]?.id}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    ));
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
        <View style={styles.seatsContainer}>{renderSeats()}</View>
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
    marginBottom: 10,
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
    opacity: 0.8,
  },
  overlayButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  leftSeat: {
    marginRight: 10,
  },
  rightSeat: {
    marginLeft: 1,
  },
});

export default SeatSelection;
