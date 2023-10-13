import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import Profile from '../Screens/Profile';
import Notification from '../Screens/Notification';
import Ticket from '../Screens/Ticket';
import HomeScreen from '../Screens/HomeScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
    <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
);

const TicketStack = () => (
    <Stack.Navigator initialRouteName="Ticket">
        <Stack.Screen name="Ticket" component={Ticket} options={{ headerShown: false }} />
    </Stack.Navigator>
);

const NotificationsStack = () => (
    <Stack.Navigator initialRouteName="Notifications">
        <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
    </Stack.Navigator>
);

const ProfileStack = () => (
    <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen name="Setting" component={Profile} options={{ headerShown: false }} />
    </Stack.Navigator>
);

const BottomTab = () => {
  return (
      <Tab.Navigator
          screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                  let iconName, IconComponent = Ionicons;
                  switch(route.name) {
                      case 'Home':
                          iconName = focused ? 'search' : 'search-outline';
                          break;
                      case 'Tickets':
                          iconName = focused ? 'ticket-confirmation' : 'ticket-confirmation-outline';
                          IconComponent = MaterialCommunityIcons;
                          break;
                      case 'Notifications':
                          iconName = focused ? 'notifications' : 'notifications-outline';
                          break;
                      case 'Profile':
                          iconName = focused ? 'account' : 'account-outline';
                          IconComponent = MaterialCommunityIcons;
                          break;
                  }
                  return <IconComponent name={iconName} size={size} color={color} />;
              },
              tabBarLabel: '',
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
              tabBarLabelStyle: {
                  fontSize: 12,
              },
              tabBarItemStyle: {
                  paddingVertical: 5,
              },
              tabBarStyle: [
                  {
                      display: 'flex',
                      backgroundColor: '#f2f2f2',
                      borderTopColor: '#d1d1d1',
                      height: 60,
                      alignItems: 'center',
                  },
                  null
              ],
          })}
        >
            <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
            <Tab.Screen name="Tickets" component={TicketStack} options={{ headerShown: false }} />
            <Tab.Screen name="Notifications" component={NotificationsStack} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={ProfileStack} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}

export default BottomTab;
