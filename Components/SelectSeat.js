import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const seats = Array.from({ length: 50 }, (_, index) => ({
  id: (index + 1).toString(),
  available: Math.random() < 0.8,
}));

const SeatSelection = () => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleSeatSelection = (seatId) => {
    if (selectedSeat === seatId) {
      setSelectedSeat(null); // Deselect the seat if already selected
      setShowOverlay(false); // Hide overlay if no seat selected
    } else {
      setSelectedSeat(seatId); // Otherwise, select the new seat
      setShowOverlay(true);  // Show overlay if a seat is selected
    }
  };

  const navigation = useNavigation();

  const handleContinue = () => {
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
          {Array.from({ length: seats.length / 4 }, (_, index) => index).map(row => (
            <View style={[
              styles.row,
              row === Math.ceil(seats.length / 4) - 1 ? styles.lastRow : null
            ]} key={row}>
        
            {seats.slice(row * 4, row * 4 + 4).map((seat, colIndex) => (
              <View key={seat.id} style={colIndex === 2 ? styles.rightSeat : null}>
                <TouchableOpacity
                  style={[
                    styles.seat,
                    seat.available ? styles.available : styles.unavailable,
                    seat.id === selectedSeat ? styles.selected : null,
                  ]}
                  onPress={() => {
                    if (seat.available) handleSeatSelection(seat.id);
                  }}
                  disabled={!seat.available}
                >
                  <Text>{seat.id}</Text>
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
