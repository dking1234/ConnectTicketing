import { View, Text, StyleSheet, ScrollView  } from 'react-native'
import React from 'react'
import PassengerContainer from '../Components/PassengerContainer'
import BusCondition from '../Components/BusCondition'
import FareCondition from '../Components/FareCondition'
import TicketNo from '../Components/TicketNo'
import WideButton from '../Components/WideButton'
import { useNavigation } from '@react-navigation/native';

const ClassCondition = () => {

  const navigation = useNavigation();

  const handleContinue = () => {
    // Navigate to ClassCondition screen
    navigation.navigate('SelectPayment');
  };

  return (
    <ScrollView>
     <PassengerContainer />
     <View style={styles.container}>
     <BusCondition />
     </View>
     <View style={styles.container}>
     <FareCondition />
     </View>
     <View style={styles.container}>
     <TicketNo />
     </View>
     <View style={{alignItems: 'center', marginTop: 30}}>
     <WideButton title="Proceed" onPress={handleContinue} />
     </View>
    </ScrollView>
  )
}

export default ClassCondition

const styles = StyleSheet.create({
  container: {
    marginTop:10
  },
})