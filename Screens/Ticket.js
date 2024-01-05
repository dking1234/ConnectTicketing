import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const Ticket = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState(true);

  const navigation = useNavigation();

  const formatDepartureDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isTicketActive = (departureDate) => {
    const currentDateTime = new Date();
    const departureDateTime = new Date(departureDate);
    return departureDateTime > currentDateTime;
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserIdAndTickets = async () => {
        try {
          const userId = await AsyncStorage.getItem('userId');
          if (userId) {
            const response = await fetch(`https://connect-ticketing.work.gd/api/tickets/user/${userId}`);

            if (!response.ok) {
              throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Ticket Data:', data);
            setTickets(data);
          }
        } catch (error) {
          console.error('Error fetching tickets:', error);
          setError('Error fetching tickets. Please try again.');
        } finally {
          setLoading(false);
        }
      };

      fetchUserIdAndTickets();
    }, [])
  ); // Empty dependency array to ensure this effect runs only once on mount

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF7927" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>{error}</Text>
      </View>
    );
  }

  if (tickets.length === 0) {
    return (
      <View style={styles.noTicketsContainer}>
        <Image source={require('../Images/Tickets.png')} style={styles.ticketIcon} />
        <Text style={styles.message}>You don’t have any {activeFilter ? 'active' : 'expired'} tickets</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Tickets</Text>
      </View>

      <FlatList
        data={tickets}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <TouchableScale
          activeScale={0.95}
          tension={50}
          friction={7}
          onPress={() => navigation.navigate('TicketScreen', { ticketId: item._id })}
          style={styles.touchableContainer}
        >
          <View style={styles.ticketContainer}>
             <View style={styles.ticketCard}>
             
             <View style={styles.DateAndStatus}>
                <Text style={styles.ticketInfoDate}>{formatDepartureDate(item.departureDate)}</Text>
                <Text style={isTicketActive(item.departureDate) ? styles.active : styles.expired}>
                  {isTicketActive(item.departureDate) ? 'Active' : 'Expired'}
                </Text>
              </View>
              
              <View>
                <View style={styles.layout}>
                  <View>
                    <Text style={styles.busStation}>From Bus Station</Text>
                    <Text style={styles.origin}>{item.origin}</Text>
                  </View>
                  <View>
                    <Text style={styles.busStation}>Departure</Text>
                    <Text style={styles.origin}> {new Date(item.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                  </View>
                </View>
              </View>

              <View>
                <View style={styles.layout}>
                  <View>
                    <Text style={styles.busStation}>To Bus Station</Text>
                    <Text style={styles.origin}>{item.destination}</Text>
                  </View>
                  <View>
                    <Text style={styles.busStation2}>Arrival</Text>
                    <Text style={styles.origin2}> {new Date(item.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.layout}>
              <Text style={styles.ticketInfo1}>Bus Name:</Text>
              <Text style={styles.ticketInfo}>{item.companyName}</Text>
              </View>
              <View style={styles.layout}>
              <Text style={styles.ticketInfo1}>Seat Number:</Text>
              <Text style={styles.ticketInfo}>{item.seatNumber}</Text>
              </View>
            </View>
          </View>
          </TouchableScale>
        )}
      />
    </View>
  );
};
// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#FF7927',
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  filterButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#FF7927',
    marginRight: 10,
  },
  expiredButton: {
    backgroundColor: 'lightgray',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  ticketIcon: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  noTicketsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  ticketContainer: {
    paddingVertical: 5,
    paddingHorizontal: 15
  },
  ticketTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ticketStatus: {
    fontSize: 16,
    color: 'gray',
  },
  ticketCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.10,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 16,
    marginBottom: 10,
  },
  
  ticketInfo: {
    fontSize: 16,
    color: '#333333',
    fontWeight: 'bold',
    marginTop: 10,
  },
  ticketInfo1: {
    fontSize: 16,
    color: '#333333',
    marginTop: 10,
  },
  ticketInfoDate:{
    fontSize: 18,
    color: '#333333',
    fontWeight: 'bold'
  },
  origin:{
    fontSize: 20,
    color: '#333333',
    fontWeight: 'bold'
  },
  origin2:{
    fontSize: 20,
    color: '#333333',
    fontWeight: 'bold'
  },
  DateAndStatus:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  busStation:{
    marginTop: 20,
    marginBottom: 10,
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'left'
  },
  busStation2:{
    marginRight: 15,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'right'
  },
  layout:{
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between' 
  },
  active:{
    padding: 10,
    backgroundColor: '#FF7927',
    borderRadius: 10,
    color: '#FFF',
    fontWeight: '500'
  },
  expired: {
    padding: 10,
    backgroundColor: 'gray',
    borderRadius: 10,
    color: '#FFF',
    fontWeight: '500',
  },
});

export default Ticket;
