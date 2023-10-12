import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTab from '../Components/BottomTab';


const Stack = createStackNavigator();

const MainStack = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tab" component={BottomTab} />
      </Stack.Navigator>
  );
};

export default MainStack;
