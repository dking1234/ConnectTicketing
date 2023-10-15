import { View, Text, StyleSheet } from 'react-native'
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const FareCondition = () => {
  return (
    <View>
        <View style={styles.passengerDetailsContainer}>
          <View style={styles.marginContainer}>
            <View style={styles.row}>
                <Text style={styles.title}>Fare Condition</Text>
            </View>
          <View style={styles.line}/>
          </View>
          <Text style={styles.textReservation}>All reservations are valid for the date and time chosen only</Text>
          <Text style={styles.textReservationDetails}>
  Non-refundable fare. Cancelable up to 1 hour before departure. Balance of the fare will be transferred to the OurBus Account, available for settling with partner buses.
</Text>
        </View>
    </View>
  )
}

export default FareCondition

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
    },
    textReservation:{
        fontWeight: '500',
        marginHorizontal: 10
    },
    textReservationDetails:{
        fontSize: 13,
        fontWeight: '400',
        textAlign: 'auto',
        width: '90%',
        margin: 10
    }
});