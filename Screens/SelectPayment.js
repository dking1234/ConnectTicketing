import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SelectPayment = ({ route }) => {
  const { companyName, scheduleId, seatNumber, userId } = route.params;

    const navigation = useNavigation();

    const handleHalotel = () => {
      // Navigate to ClassCondition screen
      navigation.navigate('HaloPayments', {scheduleId: scheduleId, companyName, seatNumber, userId});
    };

    const handleTigo = () => {
      // Navigate to ClassCondition screen
      navigation.navigate('TigoPayments', {scheduleId: scheduleId, companyName, seatNumber, userId});
    };
    
    const handleVodacom = () => {
      // Navigate to ClassCondition screen
      navigation.navigate('VodaPayments', {scheduleId: scheduleId, companyName, seatNumber, userId});
    };

    const handleAirtel = () => {
      // Navigate to ClassCondition screen
      navigation.navigate('AirtelPayments', {scheduleId: scheduleId, companyName, seatNumber, userId});
    };
  return (
    <View>
       <View style={styles.passengerDetailsContainer}>
          <View style={styles.marginContainer}>
            <View style={styles.row}>
                <Text style={styles.title}>Select Payment</Text>
            </View>
          <View style={styles.line}/>
            <View style={styles.row}>
                <Text style={styles.textColor}>Mobile Payment</Text>
            </View>
          </View>
          </View>
         <Text style={styles.text2}>Please select a mobile network</Text>
          <View style={{marginTop: 10}}>
          <View style={styles.passengerDetailsContainer}>
      
      <TouchableOpacity onPress={handleVodacom}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Mpesa</Text>
        <MaterialIcons name="keyboard-arrow-right" size={18} color="black" />
      </View>
      </TouchableOpacity>
      
      <View style={styles.line}/>

      <TouchableOpacity onPress={handleAirtel}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Airtel Money</Text>
      <MaterialIcons name="keyboard-arrow-right" size={18} color="black" />
      </View>
      </TouchableOpacity>

      <View style={styles.line}/>

      <TouchableOpacity onPress={handleTigo}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Tigopesa</Text>
      <MaterialIcons name="keyboard-arrow-right" size={18} color="black" />
      </View>
      </TouchableOpacity>

      <View style={styles.line}/>

    <TouchableOpacity onPress={handleHalotel}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Halopesa</Text>
      <MaterialIcons name="keyboard-arrow-right" size={18} color="black" />
      </View>
      </TouchableOpacity>
    </View>
          </View>
    </View>

  )
}

export default SelectPayment

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
        marginLeft: 10, 
        fontSize: 14,
        marginVertical: 20,
    },
    text2: {
        marginLeft: 20, 
        fontSize: 12,
        marginTop: 5
    },
    textColor: {
        fontSize: 14,

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
    textContainer: {
        flexDirection: 'row',    // to position icon and text in a single line
        alignItems: 'center',    // vertically center the items
        justifyContent: 'space-between',
        marginBottom: 10,        // spacing between rows
      },

})