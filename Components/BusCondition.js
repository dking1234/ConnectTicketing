import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const BusCondition = ({ busId }) => {
  const [busCondition, setBusCondition] = useState(null);
  const [classType, setClassType]  = useState(null);

  useEffect(() => {
    // Fetch bus details based on busId
    const fetchBusDetails = async () => {
      try {
        const response = await fetch(`http://ec2-3-87-76-135.compute-1.amazonaws.com:80/api/buses/${busId}`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        const { classType, busCondition } = data;
  
        setClassType(classType);
        setBusCondition(busCondition);
      } catch (error) {
        // Log an error message if the fetch fails
        console.error('Error fetching bus details:', error);
      }
    };
  
    fetchBusDetails();
  }, [busId]);

  return (
    <View>
      <View style={styles.passengerDetailsContainer}>
        <View style={styles.marginContainer}>
          <View style={styles.row}>
            <Text style={styles.title}>Bus Condition</Text>
          </View>
          <View style={styles.line} />
        </View>
        <View style={styles.borderBackground}>
          {busCondition && (
            <>
              <Text style={styles.textBold}>{classType} class</Text>

              {busCondition.wifi && (
                <View style={styles.iconContainer}>
                  <FontAwesome name="wifi" size={15} color="#152970" />
                  <Text style={[styles.textClass, { marginLeft: 8 }]}> Free Wi-fi</Text>
                </View>
              )}

              {busCondition.charger && (
                <View style={styles.iconContainer}>
                  <FontAwesome name="plug" size={15} color="#152970" />
                  <Text style={[styles.textClass, { marginLeft: 8 }]}> Power Plugs</Text>
                </View>
              )}

              {busCondition.drinks && (
                <View style={styles.iconContainer}>
                  <FontAwesome name="coffee" size={15} color="#152970" />
                  <Text style={[styles.textClass, { marginLeft: 8 }]}> Free Drink</Text>
                </View>
              )}

                {busCondition.snacks && (
                <View style={styles.iconContainer}>
                <FontAwesome name="cutlery" size={15} color="#152970" />
                  <Text style={[styles.textClass, { marginLeft: 8 }]}> Free Snacks</Text>
                </View>
              )}
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default BusCondition;

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
    marginTop: 10,
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
  textBold: {
    fontWeight: 'bold',
    color: '#152970',
    marginBottom: 5,
  },
  textClass: {
    fontSize: 14,
    color: '#152970',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
});
