import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BookingData from '../Components/BookingData';
import { SafeAreaView } from 'react-native-safe-area-context';
import WideButton from '../Components/WideButton';

const HomeScreen = () => {
  const navigation = useNavigation();
  
  const handleSearch = () => {
    navigation.navigate('SearchResult');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../Images/Top.png')} style={styles.HomeImage}/>
      </View>
      <BookingData handleSearch={handleSearch} />
      <View style={styles.Button}>
      <WideButton title= "Search Bus" onPress={handleSearch} />
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
    marginBottom: 10
  },
  Button:{
    alignItems: 'center',
  }
});

export default HomeScreen;
