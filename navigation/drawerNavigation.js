import * as React from 'react';
import {Image} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Dashboard from '../screens/dashboard';
import ProfileUser from '../screens/dashboard/profileUser';
import LogOut from '../screens/auth/logOutScreen';
import DrawerHeader from '../component/drawerHeader';

const Drawer = createDrawerNavigator();
const DrawerNavigator = ({navigation}) => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileUser}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Logout"
        component={LogOut}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;
