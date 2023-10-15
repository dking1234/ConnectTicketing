import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const BusCondition = () => {
  return (
    <View>
      <View style={styles.passengerDetailsContainer}>
        <View style={styles.marginContainer}>
          <View style={styles.row}>
            <Text style={styles.title}>Class Condition</Text>
          </View>
          <View style={styles.line} />
        </View>
        <View style={styles.borderBackground}>
          <Text style={styles.textBold}>Luxury class</Text>

          <View style={styles.iconContainer}>
            <FontAwesome name="wifi" size={15} color="#152970" />
            <Text style={[styles.textClass, { marginLeft: 8 }]}>Free Wi-fi</Text>
          </View>

          <View style={styles.iconContainer}>
            <FontAwesome name="plug" size={15} color="#152970" />
            <Text style={[styles.textClass, { marginLeft: 8 }]}>Power Plugs</Text>
          </View>

          <View style={styles.iconContainer}>
            <FontAwesome name="coffee" size={15} color="#152970" />
            <Text style={[styles.textClass, { marginLeft: 8 }]}>Free Drink</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default BusCondition;

const styles = StyleSheet.create({
  passengerDetailsContainer: {
    backgroundColor: 'white',
    padding: 10,
  },
  marginContainer: {
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  line: {
    borderBottomWidth: 0.9,
    borderColor: 'lightgrey',
    width: '100%',
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    marginTop: 10,
  },
  textColor: {
    fontSize: 14,
    color: '#FF7927',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowIcon: {
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
    borderWidth: 1,
  },
  textBold: {
    fontWeight: 'bold',
    color: '#152970',
    marginBottom: 5,
  },
  textClass: {
    fontSize: 14,
    color: '#152970',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
});
