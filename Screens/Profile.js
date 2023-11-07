import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';


const Profile = () => {
  const navigation = useNavigation();
  
  const handleHalotel = () => {
    // Navigate to ClassCondition screen
    navigation.navigate('Payments');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../Images/Profile.png')} style={styles.HomeImage}/>
      </View>
      <View>
          <View style={styles.passengerDetailsContainer}>
      
      <TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Refundable tickets</Text>
        <MaterialIcons name="keyboard-arrow-right" size={18} color="black" />
      </View>
      </TouchableOpacity>
      
      <View style={styles.line}/>

      <TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Passenger details</Text>
      <MaterialIcons name="keyboard-arrow-right" size={18} color="black" />
      </View>
      </TouchableOpacity>

      <View style={styles.line}/>

      <TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Notifications</Text>
      <MaterialIcons name="keyboard-arrow-right" size={18} color="black" />
      </View>
      </TouchableOpacity>

      <View style={styles.line}/>

    <TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Settings</Text>
      <MaterialIcons name="keyboard-arrow-right" size={18} color="black" />
      </View>
      </TouchableOpacity>

      <TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Customer Services</Text>
      <MaterialIcons name="keyboard-arrow-right" size={18} color="black" />
      </View>
      </TouchableOpacity>
    </View>
          </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  HomeImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  Button:{
    alignItems: 'center',
  },
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
});

export default Profile;
