import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import WideButton from '../Components/WideButton';
import axios from 'axios';

const VodaPayments = ({route}) => {
    const { companyName, scheduleId, seatNumber, userId } = route.params;

    const [price, setPrice] = useState(null);
    const [total, setTotal] = useState(null);
  
    useEffect(() => {
      const fetchPrice = async () => {
        try {
          const response = await axios.get(`http://ec2-3-87-76-135.compute-1.amazonaws.com/api/bus-schedules/${scheduleId}`);
          setPrice(response.data?.price || 'N/A');
        } catch (error) {
          console.error('Error fetching price:', error);
        }
      };
  
      fetchPrice();
    }, [scheduleId]);
  
    useEffect(() => {
      if (price !== null) {
        // Assuming service fee is 500 Tsh
        const serviceFee = 500;
        const calculatedTotal = price + serviceFee;
        setTotal(calculatedTotal);
      }
    }, [price]);
  
    const navigation = useNavigation();
  
    const handleConfirm = async () => {
        try {
          // Send a POST request to create the ticket
          const response = await axios.post('http://ec2-3-87-76-135.compute-1.amazonaws.com/api/create-tickets', {
            companyName,
            scheduleId,
            seatNumber,
            userId,
            total,
          });
    
          // Check if the ticket creation was successful
          if (response.status === 201) {
            const ticketId = response.data.ticketId; // Extract the ticketId from the response
            console.log('Ticket created successfully. Ticket ID:', ticketId);
    
            // Navigate to ProcessedPayments screen with the total amount and ticketId
            navigation.navigate('ProcessedPayments', { ticketId });
          } else {
            console.error('Error creating ticket:', response.data.error);
            // Handle the error or show an error message to the user
          }
        } catch (error) {
          console.error('Error creating ticket:', error);
          // Handle the error or show an error message to the user
        }
      };
  return (
      <View>
        <Text style={styles.text2}>Payment via Mpesa</Text>
       <View style={styles.passengerDetailsContainer}>
          <View style={styles.marginContainer}>
            <View style={styles.row}>
                <Text style={styles.title}>Business number   :   009009</Text>   
            </View>
        
            <View>
            <Text style={styles.textColor}>1. On your phone, dial *!50*88#</Text>
            <Text style={styles.textColor}>2. Select option 4 (Pay by Mpesa)</Text>
            <Text style={styles.textColor}>3. Select option 4 (Transport)</Text>
            <Text style={styles.textColor}>4. Choose Option 1 (Connect Ticket)</Text>
            <Text style={styles.textColor}>5. Enter Reference Number (<Text style={styles.title}>903000098700</Text>)</Text>
            <Text style={styles.textColor}>6. Enter Amount</Text>
            <Text style={styles.textColor}>7. Enter PIN</Text>
            </View>
          </View>
          </View>
          <Text style={styles.text2}>Payment details</Text>

          <View style={styles.passengerDetailsContainer}>
          <View style={styles.marginContainer}>
            <View style={styles.row}>
                <Text style={styles.textGray}>Seat Price</Text>
                <Text style={styles.textBold}>{price} Tsh</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.textGray}>Service Fee</Text>
                <Text style={styles.textBold}>500 Tsh</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.textGray}><Text style={styles.textBold}>Total</Text> (taxes included) </Text>
                <Text style={styles.textBoldColor}>{total} Tsh</Text>
            </View>
           </View>
        </View>
        <View style={{alignItems: 'center'}}>
        <WideButton title="Confirm" onPress={handleConfirm} />
        </View>
          </View>
         

  )
}

export default VodaPayments

const styles = StyleSheet.create({
    passengerDetailsContainer:{
        backgroundColor: 'white',
        padding: 10
    },
    marginContainer:{
       margin: 10
    },
    title:{
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    line:{
        borderBottomWidth: 0.9,
        borderColor: 'lightgrey',
        width: '100%',
        marginBottom: 10,
    },
    text: {
        marginLeft: 10, 
        fontSize: 14,
        marginVertical: 20,
    },
    text2: {
        marginLeft: 20, 
        fontSize: 12,
        marginVertical: 5
    },
    textColor: {
        fontSize: 14,
        marginVertical: 5

    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rowIcon:{
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
        borderWidth: 1
    },
    textContainer: {
        flexDirection: 'row',    // to position icon and text in a single line
        alignItems: 'center',    // vertically center the items
        justifyContent: 'space-between',
        marginBottom: 10,        // spacing between rows
      },
      textGray: {
        fontSize: 14,
        color: 'gray',
        marginBottom:10
    },
    textBold: {
        fontSize: 14,
        color: '#152970',
        fontWeight: 'bold',
    },
    textBoldColor: {
        fontSize: 16,
        color: '#FF7927',
        fontWeight: 'bold',
    },

})