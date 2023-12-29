import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const TicketNo = ({ seatNumber, scheduleId }) => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(`https://connect-ticketing.work.gd/api/bus-schedules/${scheduleId}`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        // Replace the following line based on the actual structure of your API response
        setPrice(data?.price || 'N/A');
      } catch (error) {
        console.error('Error fetching price:', error);
      }
    };
  
    fetchPrice();
  }, [scheduleId]);

  return (
    <View>
      <View style={styles.passengerDetailsContainer}>
        <View style={styles.marginContainer}>
          <View style={styles.row}>
            <Text style={styles.textGray}>Tickets (1 passenger)</Text>
            <Text style={styles.textBold}>Seat No.{seatNumber}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.textGray}>
              <Text style={styles.textBold}>Bus Fare Price</Text>
            </Text>
            <Text style={styles.textBold}>{price} Tsh</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  passengerDetailsContainer: {
    backgroundColor: 'white',
    padding: 10,
  },
  marginContainer: {
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  line: {
    borderBottomWidth: 0.9,
    borderColor: 'lightgrey',
    width: '100%',
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
  },
  textGray: {
    fontSize: 14,
    color: 'gray',
  },
  textBold: {
    fontSize: 14,
    color: '#152970',
    fontWeight: 'bold',
  },
  textColor: {
    fontSize: 14,
    color: '#FF7927',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    alignItems: 'center',
  },
  borderBackground: {
    backgroundColor: '#FFDFC8',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    borderColor: '#FF7927',
    borderWidth: 1,
  },
  textReservation: {
    fontWeight: '500',
    marginHorizontal: 10,
  },
  textReservationDetails: {
    fontSize: 13,
    fontWeight: '400',
    textAlign: 'auto',
    width: '90%',
    margin: 10,
  },
});

export default TicketNo;
