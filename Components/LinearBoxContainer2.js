import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { LinearGradient, Stop, Rect, Text as SvgText } from 'react-native-svg';

const LinearBoxContainer2 = ({ children }) => {
  return (
    <View style={styles.container}>
      <Svg width="100%" height="100%">
        <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="100%" stopColor="#14684E" />
          <Stop offset="0%" stopColor="#57D6A1" />
        </LinearGradient>
        <Rect
          width="100%"
          height="100%"
          fill="url(#grad)"
          rx={10} // Add a borderRadius value (adjust as needed)
        />
        {children && children}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 365,
    height: 130,
  },
});

export default LinearBoxContainer2;
