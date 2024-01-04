import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const DroppingPoint = ({ route }) => {
  const { scheduleId, companyName, seatNumbers, userId, busId, boardingPoint } = route.params;
  const [destination, setDestination] = useState('');
  const [droppingPoints, setDroppingPoints] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch destination and dropping points from scheduleId
    const fetchScheduleData = async () => {
      try {
        const response = await fetch(`https://connect-ticketing.work.gd/api/bus-schedules/${scheduleId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Assuming destination and droppingPoints are properties in your response data
        setDestination(data.destination || '');
        setDroppingPoints(data.droppingPoints || []);
      } catch (error) {
        console.error('Error fetching schedule data:', error);
      }
    };

    fetchScheduleData();
  }, [scheduleId]);

  const handleSelection = (droppingPoint) => {
    // Navigate to ClassCondition screen with selected dropping point and other data
    navigation.navigate('ClassCondition', {
      scheduleId,
      companyName,
      userId,
      busId,
      seatNumbers,
      boardingPoint,
      droppingPoint,
    });
  };

  return (
    <View>
      <View style={styles.passengerDetailsContainer}>
        <View style={styles.marginContainer}>
          <View style={styles.row}>
            <Text style={styles.title}>Select Dropping Point</Text>
          </View>
        </View>
      </View>
      <Text style={styles.text3}>All Dropping points for {destination}</Text>
      <View style={{ marginTop: 10 }}>
        <View style={styles.boardingPoints}>
          {/* Use the fetched droppingPoints array to populate dropping points */}
          {droppingPoints.map((droppingPoint, index, array) => (
            <View key={index}>
              <TouchableOpacity onPress={() => handleSelection(droppingPoint)}>
                <View style={styles.textContainer}>
                  <View style={styles.BoardingContainer}>
                    <Text style={styles.text}>{droppingPoint}</Text>
                    <Text style={styles.text2}>{droppingPoint}</Text>
                  </View>
                  <MaterialCommunityIcons name="bus-stop" size={24} color="tomato" />
                </View>
              </TouchableOpacity>
              {index < array.length - 1 && <View style={styles.line} />}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};


export default DroppingPoint;

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  passengerDetailsContainer: {
    backgroundColor: 'white',
    padding: 10,
  },
  boardingPoints: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 20, // Added borderRadius
    shadowColor: '#000', // Added shadow properties
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5, // For Android shadow
  },
  BoardingContainer:{
    alignItems: 'baseline',
    justifyContent: 'center',
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
    margin: 10
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight:'500',
    marginTop: 10
  },
  text2: {
    marginLeft: 10,
    fontSize: 12,
  },
  text3: {
    marginLeft: 20,
    fontSize: 12,
    marginTop: 15

  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
  },
});
