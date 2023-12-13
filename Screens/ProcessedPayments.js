import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import BackButton from '../Components/BackButton';
import WideButton from '../Components/WideButton';
import { useNavigation } from '@react-navigation/native';

const ProcessedPayments = ({route}) => {
  
  const { ticketId } = route.params;

    const navigation = useNavigation();

    const handleNavigation = () => {
      // Navigate to ClassCondition screen
      navigation.navigate('TicketScreen', {ticketId});
    };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <BackButton />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <Image source={require('../Images/Check.png')} style={styles.logo} />
        </View>
        <Text style={styles.heading}>Your payment is being Processed</Text>
        <Text style={styles.subtext}>
  {`Once the operation is completed,you can \nview the ticket to see more details.`}
</Text>

      </View>
      <WideButton title="View Ticket" onPress={handleNavigation}/>
    </SafeAreaView>
  );
};

export default ProcessedPayments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  topContainer: {
    width: '100%',
    alignItems: 'flex-start', 
    padding: 10, 
  },
  contentContainer: {
    marginTop: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center', 
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: '500',
    margin: 5,
  },
  subtext: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
  },
});
