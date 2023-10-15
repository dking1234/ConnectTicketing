import { View, Text, StyleSheet } from 'react-native'
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const TicketNo = () => {
  return (
    <View>
        <View style={styles.passengerDetailsContainer}>
          <View style={styles.marginContainer}>
            <View style={styles.row}>
                <Text style={styles.textGray}>Tickets (1 passenger)</Text>
                <Text style={styles.textBold}>Seat No.14</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.textGray}><Text style={styles.textBold}>Total</Text> (taxes included) </Text>
                <Text style={styles.textBold}>75,000 Tsh</Text>
            </View>
           </View>
        </View>
    </View>
  )
}

export default TicketNo

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
    },
    textGray: {
        fontSize: 14,
        color: 'gray'
    },
    textBold: {
        fontSize: 14,
        color: '#152970',
        fontWeight: 'bold',
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