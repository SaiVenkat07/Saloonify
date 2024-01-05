import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';

import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <>
    <SafeAreaView style={{flex: 1}}>
    <NavigationContainer>
      <AppNavigator/>
    </NavigationContainer>
    </SafeAreaView>
    <StatusBar 
      style='auto'
      animated={true}
      backgroundColor="#fff"
      />
    </>
  );
}