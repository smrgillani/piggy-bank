import React, {useEffect} from 'react';
import {View, StatusBar, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainNavigator from './navigation/mainNavigation';
import {navigationRef} from './navigation/navHelper';
import Drawer from './navigation/drawerNavigation';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <StatusBar translucent={true} backgroundColor="#000" />
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          <MainNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </View>
  );
};
export default App;
