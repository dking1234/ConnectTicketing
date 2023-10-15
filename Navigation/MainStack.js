import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTab from '../Components/BottomTab';
import ClassCondition from '../Screens/ClassCondition';
import CustomHeader from '../Components/CustomHeader';
import SeatSelection from '../Screens/SeatSelection';
import SearchResult from '../Screens/SearchResult';
import SelectPayment from '../Screens/SelectPayment';
import Payments from '../Screens/Payments';
import ProcessedPayments from '../Screens/ProcessedPayments';
import TicketScreen from '../Screens/TicketScreen';


const Stack = createStackNavigator();

const MainStack = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Tab" component={BottomTab} options={{ headerShown: false }} />
        <Stack.Screen name="SearchResult" component={SearchResult} options={{
          header: (props) => <CustomHeader {...props} />
        }} />
        <Stack.Screen name="SeatSelection" component={SeatSelection} options={{
          header: (props) => <CustomHeader {...props} />
        }} />
        <Stack.Screen name="ClassCondition" component={ClassCondition} options={{
          header: (props) => <CustomHeader {...props} />
        }} />
         <Stack.Screen name="SelectPayment" component={SelectPayment} options={{
          header: (props) => <CustomHeader {...props} />
        }} />
         <Stack.Screen name="Payments" component={Payments} options={{
          header: (props) => <CustomHeader {...props} />
        }} />
        
        <Stack.Screen name="ProcessedPayments" component={ProcessedPayments} options={{ headerShown: false }} />
        <Stack.Screen name="TicketScreen" component={TicketScreen} options={{ headerShown: false }} />

      </Stack.Navigator>
    
  );
};

export default MainStack;
