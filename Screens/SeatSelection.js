import React from 'react';
import { View } from 'react-native';
import SelectSeat from '../Components/SelectSeat';
import { StyleSheet } from 'react-native';

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
