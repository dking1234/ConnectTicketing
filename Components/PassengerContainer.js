import { View, Text, StyleSheet } from 'react-native'
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const PassengerContainer = () => {
  return (
    <View>
        <View style={styles.passengerDetailsContainer}>
          <View style={styles.marginContainer}>
          <View style={styles.row}>
          <Text style={styles.title}>ClassCondition</Text>
           <Text style={styles.textColor}>Edit</Text>
           </View>
          <View style={styles.line}/>
          <View style={styles.row}>
          <Text style={styles.text}>Wilhemo Thomas</Text>
          <Text style={styles.text}>Adult</Text>
          </View>
          </View>
          <View style={styles.borderBackground}>
            <View style={styles.rowIcon}>
            <Icon name="ticket" size={24} color="#000" />
            <Text>Your ticket information will be sent to: 0620229713</Text>
            </View>
          </View>
        </View>
    </View>
  )
}

export default PassengerContainer

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