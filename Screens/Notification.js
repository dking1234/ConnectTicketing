import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';

const Notification = () => {
  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.headerText}>My Notification</Text>
        {/* Add your icon here if you have one */}
      </View>
      
  
<View style={{justifyContent: 'center', marginTop: 300}}>
      <Image source={require('../Images/Tickets.png')} style={styles.ticketIcon} />

      <Text style={styles.message}>You don’t have any Notification</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#FF7927',
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    marginLeft: 10,
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 40,
    padding: 20,
  },
  activeButton: {
    flex: 1,
    padding: 15,
    backgroundColor: '#FF7927',
    marginRight: 10,
    borderRadius: 10,
  },
  expiredButton: {
    flex: 1,
    padding: 15,
    backgroundColor: 'lightgray',
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  ticketIcon: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
  },
});

export default Notification;