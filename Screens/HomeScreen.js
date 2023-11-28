  import React, { useState } from 'react';
  import { View, Image, StyleSheet, SafeAreaView, ActivityIndicator, Text, ScrollView } from 'react-native';
  import { useNavigation } from '@react-navigation/native';
  import BookingData from '../Components/BookingData';
  import CitySearch from '../Components/CitySearch';
  import WideButton from '../Components/WideButton';
import MyDateTimePicker from '../Components/MyDateTimePicker';

  const HomeScreen = () => {
    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState(false);
    
    const handleConfirm = () => {
      // Navigate to ClassCondition screen
      navigation.navigate('SearchResult');
    };

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require('../Images/Top.png')} style={styles.HomeImage}/>
          <Text style={styles.textOnTop}>Wellcome!</Text>
        </View>
        <CitySearch />
        <View style={styles.datePicker}>
        <MyDateTimePicker />
        </View>
        <BookingData />
        <View style={styles.buttonContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="white" /> // Show loading spinner when isLoading is true
        ) : (
          <WideButton
            title={
              <>
                Search Bus{' '}
              </>
            }
            onPress={handleConfirm}
          />
        )}
      </View>
       <View style={styles.adsSpace}>
        <ScrollView >
       <Image source={require('../Images/Top.png')} style={styles.Advert}/>
       <Image source={require('../Images/Top.png')} style={styles.Advert}/>
      <Image source={require('../Images/Top.png')} style={styles.Advert}/>
      </ScrollView>
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
    buttonContainer: {
      marginTop: 10,
      alignItems: 'center',
    },
    adsSpace:{
      flexDirection: 'row',
      marginHorizontal: 20
    },
    datePicker:{
      marginHorizontal: 15,
      marginTop: -30,
      marginBottom: 6
    },
    Advert:{
      width: '100%',
      height: 200,
      borderRadius: 10
    },
    HomeImage: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
      marginBottom: 10
    },
    textOnTop: {
      position: 'absolute',
      top: 20, // Adjust the top position based on your preference
      fontSize: 18,
      fontWeight: 'bold',
    },
    Button:{
      alignItems: 'center',
    }
  });

  export default HomeScreen;
