import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';

const calculateDuration = (departureTime, arrivalTime) => {
  const departureMoment = moment(departureTime);
  const arrivalMoment = moment(arrivalTime);

  const duration = moment.duration(arrivalMoment.diff(departureMoment));

  const hours = duration.hours();
  const minutes = duration.minutes();

  // Format the duration in a more readable way
  const formattedDuration = [];
  if (hours > 0) {
    formattedDuration.push(`${hours}h`);
  }
  if (minutes > 0) {
    formattedDuration.push(`${minutes}min`);
  }

  const result = formattedDuration.join(' ');


  return result;
};

const BusTripDetails = ({ companyName, origin, destination, departureTime, arrivalTime, price, classType }) => {
  const duration = calculateDuration(departureTime, arrivalTime);
  const capitalizedCompanyName = companyName.toUpperCase();
  const capitalizedClassType = classType.toUpperCase();

  return (
    <View style={styles.container}>
      <Text style={styles.textClassType}>{capitalizedClassType}</Text>
      {/* <Image source={require('../Images/abood.png')} style={styles.HomeImage} /> */}
       <Text style={styles.text}>{capitalizedCompanyName}</Text>
      <View style={styles.departureTime}>
        <Text style={styles.textBold}>{moment(departureTime).format('h:mm A')}</Text>
        <View style={styles.line}></View>
        <Text style={styles.textCenter}>{duration}</Text>
        <View style={styles.line}></View>
        <Text style={styles.textBold}>{moment(arrivalTime).format('h:mm A')}</Text>
      </View>

      <View style={styles.routeDetails}>
        <Text>{origin}</Text>
        <Text>{destination}</Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
        <View style={styles.moreDetails}>
          <Text>View details</Text>
          <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
        </View>
        <View>
          <Text style={styles.textBold}>{price} Tsh</Text>
          <Text>One way</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
    elevation: 3,
  },
  HomeImage: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 10,
    fontWeight: '500',
    color: '#040334',
    marginTop: -2,
  },
  textClassType: {
    fontSize: 12,
    fontWeight: '500',
    color: '#01C673',
    marginBottom: 10
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    marginTop: -10,
  },
  textSmall: {
    fontSize: 14,
    color: 'black',
    marginTop: -10,
  },
  textCenter: {
    fontSize: 14,
    color: 'gray',
    marginTop: -10,
  },
  departureTime: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    width: '50%',
  },
  line: {
    width: 20,
    height: 1,
    backgroundColor: 'gray',
    marginBottom: 5,
    marginHorizontal: 5,
  },
  routeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '88%',
    marginTop: 10,
    marginBottom: 20,
  },
  moreDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFCCA8',
    borderRadius: 10,
    width: 150,
    height: 25,
  },
});

export default BusTripDetails;
