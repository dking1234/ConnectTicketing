import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PhoneNumberReg from '../Screens/PhoneNumberReg';
import OTP from '../Screens/OTPVerification';
import UserName from '../Screens/UserName';




const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Registration Screens */}
      <Stack.Screen name="PhoneNumberReg" component={PhoneNumberReg} />
      <Stack.Screen name="OTP" component={OTP} />
      <Stack.Screen name="UserName" component={UserName} />
    </Stack.Navigator>
  );
};

export default StackNavigator;