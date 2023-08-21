import React, {Fragment, useEffect} from 'react';
import {
  createNativeStackNavigator,
  HeaderBackButton,
} from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/auth/welcomeScreen';
import SignUp from '../screens/auth/signUpScreen';
import SignIn from '../screens/auth/signInScreen';
import ScanBarCode from '../screens/scanScreen';
import ProfileUser from '../screens/dashboard/profileUser';
import EditProfileUser from '../screens/dashboard/editProfileUser';
import fontFamily from '../constants/fontFamily';
import AddChild from '../screens/child/addChild';
import ChildAccount from '../screens/child/childAccount';
import AddChoreWitReward from '../screens/child/addChoreWitReward';
import SavingAccount from '../screens/child/savingAccount';
import Dashboard from '../screens/dashboard';
import Video from '../screens/dashboard/video';
import DrawerNavigator from './drawerNavigation';

const Stack = createNativeStackNavigator();
const MainNavigator = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Fragment>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ScanBarCode"
          component={ScanBarCode}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VideoScreen"
          component={Video}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="EditProfileUser"
          component={EditProfileUser}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddChild"
          component={AddChild}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChildAccount"
          component={ChildAccount}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddChoreWitReward"
          component={AddChoreWitReward}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SavingAccount"
          component={SavingAccount}
          options={{
            headerShown: false,
          }}
        />
      </Fragment>
    </Stack.Navigator>
  );
};
export default MainNavigator;
