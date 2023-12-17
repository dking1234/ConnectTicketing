import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Ticket = () => {
  const [tickets, setTickets] = useState([]);
  const [activeFilter, setActiveFilter] = useState(true);

  useEffect(() => {
    // Fetch userId from AsyncStorage
    const fetchUserId = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          // Fetch tickets based on userId
          fetchTickets(userId);
        }
      } catch (error) {
        console.error('Error fetching userId from AsyncStorage:', error);
      }
    };

    fetchUserId();
  }, []); // Empty dependency array to ensure this effect runs only once on mount

  const fetchTickets = async (userId) => {
    try {
      const response = await fetch(`http://3.87.76.135/api/tickets/user/${userId}`);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setTickets(data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const filteredTickets = () => {
    if (activeFilter) {
      return tickets.filter((ticket) => ticket.status === 'active');
    } else {
      return tickets.filter((ticket) => ticket.status === 'expired');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Tickets</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter ? styles.activeButton : styles.expiredButton]}
          onPress={() => setActiveFilter(true)}
        >
          <Text style={styles.buttonText}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter ? styles.expiredButton : styles.activeButton]}
          onPress={() => setActiveFilter(false)}
        >
          <Text style={styles.buttonText}>Expired</Text>
        </TouchableOpacity>
      </View>

      {filteredTickets().length > 0 ? (
        // Render your list of filtered tickets here
        // Example: map through filteredTickets and display ticket information
        <View>
          {filteredTickets().map((ticket) => (
            <Text key={ticket.id}></Text>
          ))}
        </View>
      ) : (
        <View style={{ justifyContent: 'center', marginTop: 200 }}>
          <Image source={require('../Images/Tickets.png')} style={styles.ticketIcon} />
          <Text style={styles.message}>You don’t have any {activeFilter ? 'active' : 'expired'} tickets</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#FF7927',
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    marginLeft: 10,
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 40,
    padding: 20,
  },
  filterButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
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
  },
  ticketIcon: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
  },
});

export default Ticket;
