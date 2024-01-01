import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    const fetchUserFirstName = async () => {
      try {
        const storedFirstName = await AsyncStorage.getItem('firstName');
        if (storedFirstName) {
          setFirstName(storedFirstName);
        }
      } catch (error) {
        console.error('Error fetching user first name:', error);
      }
    };

    fetchUserFirstName();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../Images/Profile.png')} style={styles.homeImage} />
        <Text style={styles.textOnTop}>Hello! {firstName}</Text>
      </View>
      <View>
        <View style={styles.passengerDetailsContainer}>
          <TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Refundable tickets</Text>
              <MaterialIcons name="keyboard-arrow-right" size={18} color="black" />
            </View>
          </TouchableOpacity>

          <View style={styles.line} />

          <TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Passenger details</Text>
              <MaterialIcons name="keyboard-arrow-right" size={18} color="black" />
            </View>
          </TouchableOpacity>

          <View style={styles.line} />

          <TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Settings</Text>
              <MaterialIcons name="keyboard-arrow-right" size={18} color="black" />
            </View>
          </TouchableOpacity>

          <View style={styles.line} />

          <TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Customer Services</Text>
              <MaterialIcons name="keyboard-arrow-right" size={18} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  textOnTop: {
    position: 'absolute',
    top: 80,
    left: 30,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  passengerDetailsContainer: {
    backgroundColor: 'white',
    padding: 10,
  },
  line: {
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
});

export default Profile;
