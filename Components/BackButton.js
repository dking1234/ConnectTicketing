import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const BackButton = () => {

const navigation = useNavigation();

  return (
   
     <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.arrowContainer}>
        <Text>
        <AntDesign name="arrowleft" size={24} color="black" /> {/* Add the arrow icon */}
        </Text>
        </View>
      </TouchableOpacity>
   
  );
};

export default BackButton;

const styles = StyleSheet.create({
  arrowContainer: {
    padding: 5,
    width: 70,
    height: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
});
