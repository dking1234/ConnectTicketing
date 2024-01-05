import React from 'react';
import { View, StyleSheet } from 'react-native';
import TicketHeader from '../Components/TicketHeader';
import WideButton from '../Components/WideButton';
import TicketCard from '../Components/TicketCard';
import { useNavigation } from '@react-navigation/native';

const TicketScreen = ({route}) => {

  const { ticketId } = route.params;

  const navigation = useNavigation();
  
  const handleDownload = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.outerContainer}>
      <TicketHeader />
      <TicketCard ticketId={ticketId}/>
      <View style={styles.wideButton}>
      <WideButton title="Download Ticket" onPress={handleDownload}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  wideButton:{
    position: 'absolute',  // Set to absolute
    top: 700,             // Set top
    left: 25,             // Set left
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TicketScreen;