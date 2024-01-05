import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import BookingsScreen from '../screens/BookingsScreen';
import SalonDetails from '../screens/SalonDetails';
import FormModal from '../components/FormModal';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#f73f07',
          headerShown: true,
          tabBarStyle: { backgroundColor: '#fff', height: 61, paddingBottom: 10 },
        }}>
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
            title: 'Salons',
            headerTitleAlign: 'center'
          }}
        />
        <Tab.Screen
          name="My Bookings"
          component={BookingsScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="library-books" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeStack} />
      <Stack.Screen
        name="SalonDetails"
        component={SalonDetails}
        options={({ route }) => ({
          title: route.params.salonData.name,
          headerShown: true,
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#272c36',
        })}
      />
      <Stack.Screen name="FormModal" component={FormModal}/>
    </Stack.Navigator>
  );
};