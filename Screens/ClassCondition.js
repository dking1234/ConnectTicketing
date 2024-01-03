import { View, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import PassengerContainer from '../Components/PassengerContainer';
import BusCondition from '../Components/BusCondition';
import FareCondition from '../Components/FareCondition';
import TicketNo from '../Components/TicketNo';
import WideButton from '../Components/WideButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ClassCondition = ({ route }) => {
  const { companyName, busId, seatNumbers, scheduleId } = route.params;
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error('Error fetching userId from AsyncStorage:', error);
      }
    };

    fetchUserId();
  }, []);

  const handleContinue = () => {
    // Navigate to SelectPayment screen with userId as a parameter
    navigation.navigate('SelectPayment', {
      scheduleId: scheduleId,
      companyName,
      seatNumbers,
      userId, // Pass userId to SelectPayment
    });
  };

  return (
    <ScrollView>
      <PassengerContainer />
      <View style={styles.container}>
        <BusCondition busId={busId} />
      </View>
      <View style={styles.container}>
        <FareCondition />
      </View>
      <View style={styles.container}>
        <TicketNo seatNumbers={seatNumbers} scheduleId={scheduleId} />
      </View>
      <View style={{ alignItems: 'center', marginTop: 30 }}>
        <WideButton title="Proceed" onPress={handleContinue} />
      </View>
    </ScrollView>
  );
};

export default ClassCondition;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
});
