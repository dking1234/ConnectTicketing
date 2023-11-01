import React from 'react';
import { View, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const MyQRCodeComponent = () => {
  return (
    <View style={styles.container}>
      <QRCode
        value="https://www.example.com"
        size={80}
        color="black"
        backgroundColor="white"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -150
  },
});

export default MyQRCodeComponent;
