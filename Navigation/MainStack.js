import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTab from '../Components/BottomTab';
import ClassCondition from '../Screens/ClassCondition';
import CustomHeader from '../Components/CustomHeader';
import SeatSelection from '../Screens/SeatSelection';
import SearchResult from '../Screens/SearchResult';
import SelectPayment from '../Screens/SelectPayment';
import HaloPayments from '../Screens/HaloPayments';
import ProcessedPayments from '../Screens/ProcessedPayments';
import TicketScreen from '../Screens/TicketScreen';
import TigoPayments from '../Screens/TigoPayments';
import VodaPayments from '../Screens/VodaPayments';
import AirtelPayments from '../Screens/AirtelPayments';
import BoardingPoint from '../Screens/BoardingPoint';
import DroppingPoint from '../Screens/DroppingPoint';


const Stack = createStackNavigator();

const MainStack = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Tab" component={BottomTab} options={{ headerShown: false }} />
        <Stack.Screen
        name="SearchResult"
        component={SearchResult}
        options={({ route }) => ({
          header: (props) => (
            <CustomHeader
              {...props}
              origin={route.params?.origin}
              destination={route.params?.destination}
              departureDate={route.params?.departureDate}
            />
          ),
        })}
      />
        <Stack.Screen name="SeatSelection" component={SeatSelection}  options={({ route }) => ({
          header: (props) => (
            <CustomHeader
              {...props}
              origin={route.params?.origin}
              destination={route.params?.destination}
              departureDate={route.params?.departureDate}
            />
          ),
        })}
      />
       <Stack.Screen name="BoardingPoint" component={BoardingPoint} options={{
          header: (props) => <CustomHeader {...props} />
        }} />

       <Stack.Screen name="DroppingPoint" component={DroppingPoint} options={{
          header: (props) => <CustomHeader {...props} />
        }} />

        <Stack.Screen name="ClassCondition" component={ClassCondition} options={{
          header: (props) => <CustomHeader {...props} />
        }} />
         <Stack.Screen name="SelectPayment" component={SelectPayment} options={{
          header: (props) => <CustomHeader {...props} />
        }} />
         <Stack.Screen name="HaloPayments" component={HaloPayments} options={{
          header: (props) => <CustomHeader {...props} />
        }} />

        <Stack.Screen name="TigoPayments" component={TigoPayments} options={{
          header: (props) => <CustomHeader {...props} />
        }} />

         <Stack.Screen name="VodaPayments" component={VodaPayments} options={{
          header: (props) => <CustomHeader {...props} />
        }} />

         <Stack.Screen name="AirtelPayments" component={AirtelPayments} options={{
          header: (props) => <CustomHeader {...props} />
        }} />
        
        <Stack.Screen name="ProcessedPayments" component={ProcessedPayments} options={{ headerShown: false }} />
        <Stack.Screen name="TicketScreen" component={TicketScreen} options={{ headerShown: false }} />

      </Stack.Navigator>
    
  );
};

export default MainStack;
