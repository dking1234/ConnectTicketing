import { View, Text, Image } from 'react-native';
import React, { useState } from 'react';
import styles from '../Components/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import BoxInput from '../Components/BoxInput';
import BoxInput2 from '../Components/BoxInput2';
import BoxInput3 from '../Components/BoxInput3';
import { useNavigation } from '@react-navigation/native';
import WideButton from '../Components/WideButton';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  const navigation = useNavigation();
  
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const handleSearch = () => {
    // Handle the registration logic here

      navigation.navigate('SearchResult');
   
  };


  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image source={require('../Images/Top.png')} style={styles.HomeImage}/>
        <View>
          <BoxInput
            value={fromCity}
            placeholder="From City"
            onChangeText={(text) => setFromCity(text)}
          />
          <BoxInput2
            value={toCity}
            placeholder="To City"
            onChangeText={(text) => setToCity(text)}
          />
            
          <View style={styles.inputDateRow}>
            <BoxInput3
              value={departureDate}
              placeholder="Fri 6 Oct"
              onChangeText={(text) => setDepartureDate(text)}
            />
            <BoxInput3
              value={returnDate}
              placeholder="Add Return Date"
              onChangeText={(text) => setReturnDate(text)}
            />
          </View>
            
          <View style={styles.inputDateRow}>
            <Text style={styles.passengerText}>Passenger</Text>
            <Ionicons name="person-outline" size={24} color="#B0B0B0" />
          </View>
         
           <WideButton title="Search" onPress={handleSearch}/>

        </View>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen;
