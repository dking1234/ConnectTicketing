import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const PassengerContainer = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Fetch phone number from AsyncStorage
    const fetchPhoneNumber = async () => {
      try {
        const storedPhoneNumber = await AsyncStorage.getItem('phoneNumber');
        if (storedPhoneNumber) {
          setPhoneNumber(storedPhoneNumber);
          
          // Call the backend API to get the username based on the phone number
          fetchUsername(storedPhoneNumber);
        }
      } catch (error) {
        console.error('Error fetching phone number from AsyncStorage:', error);
      }
    };

    fetchPhoneNumber();
  }, []);
  const fetchUsername = async (phoneNumber) => {
    try {
      // Replace 'http://localhost:3000' with your AWS EC2 endpoint
      const response = await fetch(`http://ec2-3-87-76-135.compute-1.amazonaws.com/user/username/${phoneNumber}`);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const fetchedUsername = data.username;
      setUsername(fetchedUsername);
      
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  return (
    <View>
      <View style={styles.passengerDetailsContainer}>
        <View style={styles.marginContainer}>
          <View style={styles.row}>
            <Text style={styles.title}>Passenger Details</Text>
            <TouchableOpacity>
              <Text style={styles.textColor}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.line} />
          <View style={styles.row}>
            <Text style={styles.text}>{username}</Text>
            <Text style={styles.text}>Adult</Text>
          </View>
        </View>
        <View style={styles.borderBackground}>
          <View style={styles.rowIcon}>
            <Icon name="ticket" size={20} color="#000" style={{ marginHorizontal: 10 }} />
            <Text style={{ fontSize: 13 }}>Your ticket information will be sent to: {phoneNumber}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PassengerContainer;

  const styles = StyleSheet.create({
      passengerDetailsContainer:{
          backgroundColor: 'white',
          padding: 10
      },
      marginContainer:{
        margin: 10
      },
      title:{
          fontSize: 18,
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
          fontSize: 14,
          marginTop: 10,
      },
      textColor: {
          fontSize: 14,
          color: '#FF7927',
          marginVertical: 10,

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
      }
  });