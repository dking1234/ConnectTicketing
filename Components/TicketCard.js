import React from 'react';
import { View, StyleSheet, ImageBackground, Text } from 'react-native';

const TicketCard = () => {
  return (
    <View style={styles.imageContainer}>
    <ImageBackground 
      source={require('../Images/Subtract.png')} 
      style={styles.subtractBackground}
    >
      <View style={styles.textContainer}>
        <Text style={styles.ticketText}>Wilhelmo Thomas</Text>
      </View>
      <View style={styles.textContainerRow}>
        <View style={{alignItems: 'flex-end'}}>
        <Text style={styles.ticketText}>Dar</Text>
        <Text style={styles.ticketText3}>05:30 AM</Text>
        </View>
        <View style={{alignItems: 'flex-start'}}>
        <Text style={styles.ticketText}>Mwanza</Text>
        <Text style={styles.ticketText3}>08:25 PM</Text>
        </View>
      </View>
      
      <View>
      <View style={styles.ticketDetails}>
      <Text style={styles.ticketText1}>Coach</Text>
      <Text style={styles.ticketText1}>:</Text>
      <Text style={styles.ticketText2}>Abood</Text>
      </View>

      <View style={styles.ticketDetails}>
      <Text style={styles.ticketText1}>Date  of travel</Text>
      <Text style={styles.ticketText1}>:</Text>
      <Text style={styles.ticketText2}>16-10-2023</Text>
      </View>

      <View style={styles.ticketDetails}>
      <Text style={styles.ticketText1}>Departure Time</Text>
      <Text style={styles.ticketText1}>:</Text>
      <Text style={styles.ticketText2}>05:30 AM</Text>
      </View>
      
      <View style={styles.ticketDetails}>
      <Text style={styles.ticketText1}>Seats No.</Text>
      <Text style={styles.ticketText1}>:</Text>
      <Text style={styles.ticketText2}>14</Text>
      </View>
      
      <View style={styles.ticketDetails}>
      <Text style={styles.ticketText1}>Boarding Point</Text>
      <Text style={styles.ticketText1}>:</Text>
      <Text style={styles.ticketText2}>Magufuli stand</Text>
      </View>

      <View style={styles.ticketDetails}>
      <Text style={styles.ticketText1}>Dropping Point</Text>
      <Text style={styles.ticketText1}>:</Text>
      <Text style={styles.ticketText2}>Mwanza stand</Text>
      </View>

      <View style={styles.ticketDetails}>
      <Text style={styles.ticketText1}>Ticket Price</Text>
      <Text style={styles.ticketText1}>:</Text>
      <Text style={styles.ticketText2}>75,000 Tsh</Text>
      </View>
      </View>
      <Text style={styles.ticketTextId}>ID 506-53</Text>
    </ImageBackground>
  </View>
  );
};

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,  
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -50
      },
      subtractBackground: {
        width: '100%',  
        height: '90%', 
        resizeMode: 'contain',
        justifyContent: 'flex-start', // Align content to the top of the ImageBackground
        alignItems: 'center',
      },
      textContainerRow: {
        marginTop: -30,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width:'60%'
      },
      ticketText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        backgroundColor: 'transparent',
        paddingTop: 75, // Add some padding to move text a bit away from the top edge
      },
      ticketTextId: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        backgroundColor: 'transparent',
        marginTop: 40, // Add some padding to move text a bit away from the top edge
      },
      ticketText1: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        backgroundColor: 'transparent',
        marginBottom: 10
      },
      ticketText2: {
        fontSize: 18,
        fontWeight: '400',
        color: 'black',
        backgroundColor: 'transparent',
        marginLeft: 20
      },
      ticketText3: {
        fontSize: 14,
        fontWeight: '400',
        color: 'black',
        backgroundColor: 'transparent',
        marginBottom: 20
      },
      ticketDetails:{
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      },
});

export default TicketCard;
