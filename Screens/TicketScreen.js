import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomShape from '../Components/CustomShape ';

const TicketScreen = () => {
  return (
    <View style={styles.outerContainer}>
      <CustomShape>
        <Text style={styles.headerText}>Your Ticket</Text>
        <Text>Wilhelmo Thomas</Text>
        <Text>Dar 05:30 AM - Mwanza 08:25 PM</Text>
        {/* ... Rest of your ticket details ... */}
        <Text>ID 506-53</Text>
        <Text style={styles.footerText}>Download Ticket</Text>
      </CustomShape>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 18,
    color: 'orange',
  },
});

export default TicketScreen;
