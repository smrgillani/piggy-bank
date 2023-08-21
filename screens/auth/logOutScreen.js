import React from 'react';
import { View } from 'react-native';
import Hook from '../../lib/hook';

import AsyncStorage from '@react-native-async-storage/async-storage';

const LogOut = ({navigation}) => {
  const [kbHeight] = Hook.useKeyboard();

  React.useEffect(async () => {
    await AsyncStorage.removeItem('@klever_user_session');
    navigation.navigate('SignIn');
  }, []);

  return (<View></View>);
};
export default LogOut;