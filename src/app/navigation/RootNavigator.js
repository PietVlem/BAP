import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MainTabNavigator from './MainTabNavigator';

const config = Platform.select({
    web: { headerMode: 'screen' },
    default: {},
});


const RootStack = createStackNavigator(
    {
        Login: LoginScreen,
        App: MainTabNavigator,
    },
    config
);

RootStack.navigationOptions = {
    header: null,
    headerMode: "none"
};

export default RootStack;
