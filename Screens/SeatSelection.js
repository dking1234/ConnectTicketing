import React from 'react';
import { View, StyleSheet } from 'react-native';
import SelectSeat from '../Components/SelectSeat';

const SeatSelection = ({ route }) => {
  // Destructure the necessary properties from route.params
  const { companyName ,busId, seatArrangement, scheduleId } = route?.params || {};

  return (
    <View style={styles.container}>
      {/* Pass busId and seatArrangement as props to the SelectSeat component */}
      <SelectSeat busId={busId} 
                  seatArrangement={seatArrangement} 
                  scheduleId={scheduleId}
                  companyName={companyName} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SeatSelection;
