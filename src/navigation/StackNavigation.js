import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SignIn from '../screens/SignIn';

import BottomTabNavigation from './BottomTabNavigation';
import {useSelector} from 'react-redux';
import AddWork from '../screens/AddWork';
import AddClient from '../screens/AddClient';
import AddCategory from '../screens/AddCategory';
import AddPaymentLink from '../screens/AddPaymentLink';
import AllCategoryClients from '../screens/AllCategoryClients';
import ClientWorks from '../screens/ClientWorks';
import Remarks from '../screens/Remarks';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const user = useSelector(state => state.works.user);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: '#f8f8f8'},
        }}
        initialRouteName={user ? 'BottomTabs' : 'SignIn'}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Add Work" component={AddWork} />
        <Stack.Screen name="Add Payment Link" component={AddPaymentLink} />
        <Stack.Screen name="Add Client" component={AddClient} />
        <Stack.Screen name="Add Category" component={AddCategory} />
        <Stack.Screen
          name="All Category Clients"
          component={AllCategoryClients}
        />
        <Stack.Screen name="Client Works" component={ClientWorks} />
        <Stack.Screen name="Remarks" component={Remarks} />
        <Stack.Screen name="BottomTabs" component={BottomTabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
