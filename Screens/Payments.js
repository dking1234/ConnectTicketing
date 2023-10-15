import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import WideButton from '../Components/WideButton';

const Payments = () => {

    const navigation = useNavigation();

    const handleConfirm = () => {
      // Navigate to ClassCondition screen
      navigation.navigate('ProcessedPayments');
    };
  return (
      <View>
        <Text style={styles.text2}>Payment via Halopesa</Text>
       <View style={styles.passengerDetailsContainer}>
          <View style={styles.marginContainer}>
            <View style={styles.row}>
                <Text style={styles.title}>Business number   :   009009</Text>   
            </View>
        
            <View>
            <Text style={styles.textColor}>1. On your phone, dial *!50*88#</Text>
            <Text style={styles.textColor}>2. Select option 4 (Pay by HaloPesa)</Text>
            <Text style={styles.textColor}>3. Select option 4 (Transport)</Text>
            <Text style={styles.textColor}>4. Choose Option 1 (Connect Ticket)</Text>
            <Text style={styles.textColor}>5. Enter Reference Number (<Text style={styles.title}>903000098700</Text>)</Text>
            <Text style={styles.textColor}>6. Enter Amount</Text>
            <Text style={styles.textColor}>7. Enter PIN</Text>
            </View>
          </View>
          </View>
          <Text style={styles.text2}>Payment details</Text>

          <View style={styles.passengerDetailsContainer}>
          <View style={styles.marginContainer}>
            <View style={styles.row}>
                <Text style={styles.textGray}>Seat Price</Text>
                <Text style={styles.textBold}>75,000 Tsh</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.textGray}>Service Fee</Text>
                <Text style={styles.textBold}>500 Tsh</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.textGray}><Text style={styles.textBold}>Total</Text> (taxes included) </Text>
                <Text style={styles.textBoldColor}>75,500 Tsh</Text>
            </View>
           </View>
        </View>
        <View style={{alignItems: 'center'}}>
        <WideButton title="Confirm" onPress={handleConfirm} />
        </View>
          </View>
         

  )
}

export default Payments

const styles = StyleSheet.create({
    passengerDetailsContainer:{
        backgroundColor: 'white',
        padding: 10
    },
    marginContainer:{
       margin: 10
    },
    title:{
        fontSize: 16,
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
        marginVertical: 5
    },
    textColor: {
        fontSize: 14,
        marginVertical: 5

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
      textGray: {
        fontSize: 14,
        color: 'gray',
        marginBottom:10
    },
    textBold: {
        fontSize: 14,
        color: '#152970',
        fontWeight: 'bold',
    },
    textBoldColor: {
        fontSize: 16,
        color: '#FF7927',
        fontWeight: 'bold',
    },

})