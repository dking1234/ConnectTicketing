import React from 'react';
import { View, StyleSheet } from 'react-native';
import SelectSeat from '../Components/SelectSeat';

const SeatSelection = () => {
    return (
      <View style={styles.container}>
        <SelectSeat />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

export default SeatSelection;
