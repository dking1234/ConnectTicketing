import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Text } from 'react-native';
import MyQRCodeComponent from './MyQRCodeComponent';

const TicketCard = ({ ticketId }) => {
  const [ticketDetails, setTicketDetails] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const response = await fetch(`http://ec2-3-87-76-135.compute-1.amazonaws.com:3000/api/tickets/${ticketId}`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setTicketDetails(data);

        // Fetch the username using userId from ticketDetails
        const usernameResponse = await fetch(`http://ec2-3-87-76-135.compute-1.amazonaws.com:3000/user/user/${data.userId}`);
        const usernameData = await usernameResponse.json();
        setUsername(usernameData.username);
      } catch (error) {
        console.error('Error fetching ticket details:', error);
      }
    };

    fetchTicketDetails();
  }, [ticketId]);

  if (!ticketDetails || !username) {
    return null;
  }

  // Format date and time
  const formattedDepartureDate = new Date(ticketDetails.departureDate).toLocaleDateString();
  const formattedDepartureTime = new Date(ticketDetails.departureTime);
  const formattedTime = formattedDepartureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const amPmIndicator = formattedDepartureTime.getHours() >= 12 ? 'PM' : 'AM';
  const formattedDepartureTimeWithAmPm = `${formattedTime} ${amPmIndicator}`;

  
  return (
    <View style={styles.imageContainer}>
    <ImageBackground 
      source={require('../Images/Subtract.png')} 
      style={styles.subtractBackground}
    >
      <View style={styles.textContainer}>
        <Text style={styles.ticketText}>{username}</Text>
      </View>
      <View style={styles.textContainerRow}>
        <View style={{alignItems: 'flex-end'}}>
        <Text style={styles.ticketText}>{ticketDetails.origin}</Text>
        <Text style={styles.ticketText3}>{formattedDepartureTimeWithAmPm}</Text>
        </View>
        <View style={{alignItems: 'flex-start'}}>
        <Text style={styles.ticketText}>{ticketDetails.destination}</Text>
        <Text style={styles.ticketText3}>{formattedDepartureTimeWithAmPm}</Text>
        </View>
      </View>
      
      <View>
      <View style={styles.ticketDetails}>
      <Text style={styles.ticketText1}>Coach</Text>
      <Text style={styles.ticketText1}>:</Text>
      <Text style={styles.ticketText2}>{ticketDetails.companyName}</Text>
      </View>

      <View style={styles.ticketDetails}>
      <Text style={styles.ticketText1}>Date  of travel</Text>
      <Text style={styles.ticketText1}>:</Text>
      <Text style={styles.ticketText2}>{formattedDepartureDate}</Text>
      </View>

      <View style={styles.ticketDetails}>
      <Text style={styles.ticketText1}>Departure Time</Text>
      <Text style={styles.ticketText1}>:</Text>
      <Text style={styles.ticketText2}>{formattedDepartureTimeWithAmPm}</Text>
      </View>
      
      <View style={styles.ticketDetails}>
      <Text style={styles.ticketText1}>Seats No.</Text>
      <Text style={styles.ticketText1}>:</Text>
      <Text style={styles.ticketText2}>{ticketDetails.seatNumber}</Text>
      </View>
      
      <View style={styles.ticketDetails}>
      <Text style={styles.ticketText1}>Boarding Point</Text>
      <Text style={styles.ticketText1}>:</Text>
      <Text style={styles.ticketText2}>{ticketDetails.origin}</Text>
      </View>

      <View style={styles.ticketDetails}>
      <Text style={styles.ticketText1}>Dropping Point</Text>
      <Text style={styles.ticketText1}>:</Text>
      <Text style={styles.ticketText2}>{ticketDetails.destination}</Text>
      </View>

      <View style={styles.ticketDetails}>
      <Text style={styles.ticketText1}>Ticket Price</Text>
      <Text style={styles.ticketText1}>:</Text>
      <Text style={styles.ticketText2}>{ticketDetails.price} Tsh</Text>
      </View>
      </View>
      <Text style={styles.ticketTextId}>ID 506-53</Text>
      <MyQRCodeComponent style={styles.qrCodePositioning} />
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
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        backgroundColor: 'transparent',
        paddingTop: 75, // Add some padding to move text a bit away from the top edge
      },
      ticketTextId: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        backgroundColor: 'transparent',
        marginTop: 60, // Add some padding to move text a bit away from the top edge
      },
      ticketText1: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        backgroundColor: 'transparent',
        marginBottom: 10
      },
      ticketText2: {
        fontSize: 16,
        fontWeight: '400',
        color: 'black',
        backgroundColor: 'transparent',
        marginLeft: 20
      },
      ticketText3: {
        fontSize: 16,
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
