import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

// Icons
import TabBarIcon from '../components/TabBarIcon';
import TabBarIconFeather from '../components/TabBarIconFeather';
import TabBarIconMeeting from '../components/TabBarIconMeeting';

// Style
import colors from '../constants/Colors';

/* 
Screens
*/
import OverviewScreen from '../screens/OverviewScreen';
import AgendaScreen from '../screens/AgendaScreen';
import BuildingsScreen from '../screens/BuildingsScreen';
import MeetingDetailsScreen from '../screens/MeetingDetailsScreen';
import Floorscreen from '../screens/FloorScreen';
import RunningOrderScreen from '../screens/RunningOrderScreen';
import NewsScreen from '../screens/NewsScreen';

// Notifications
import NotificationsScreen from '../screens/NotificationsScreen';

// Settings
import SettingsScreen from '../screens/SettingsScreen';
import PushNotificationScreen from '../screens/PushNotificationScreen';
import HelpCenterScreen from '../screens/HelpCenterScreen';

// New Meeting
import NewMeetingScreen from '../screens/NewMeetingScreen';
import NmTitleScreen from '../screens/NmTitleScreen';
import NmRunningOrderScreen from '../screens/NmRunningOrderScreen';
import NmParticipants from '../screens/NmParticipants';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});


/*
Settings
*/
const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
    PushNotifications: PushNotificationScreen,
    HelpCenter: HelpCenterScreen
  }
);

SettingsStack.navigationOptions = {
  header: null
};

SettingsStack.path = '';

/*
OVerview
*/
const OverviewStack = createStackNavigator(
  {
    Home: OverviewScreen,
    News: NewsScreen,
    AppSettings: SettingsStack,
    Notifications: NotificationsScreen
  },
  config
);

OverviewStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName

  if (routeName == 'AppSettings' || routeName == 'Notifications') {
    tabBarVisible = false
  }

  return {
    tabBarVisible,
    tabBarIcon: ({ focused }) => (
      <TabBarIconFeather
        focused={focused}
        name={Platform.OS === 'ios' ? `home` : 'home'}
      />
    )
  }
}

OverviewStack.path = '';

/*
Agenda
*/
const AgendaStack = createStackNavigator(
  {
    Agenda: AgendaScreen,
    MeetingDetails: MeetingDetailsScreen,
    Route: Floorscreen,
    RunningOrder: RunningOrderScreen,
    AppSettings: SettingsStack,
    Notifications: NotificationsScreen
  },
  config
);

AgendaStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName

  if (routeName == 'MeetingDetails' || routeName == 'Route' || routeName == 'RunningOrder' || routeName == 'AppSettings' || routeName == 'Notifications') {
    tabBarVisible = false
  }

  return {
    tabBarVisible,
    tabBarIcon: ({ focused }) => (
      <TabBarIconFeather
        focused={focused}
        name={Platform.OS === 'ios' ? `calendar` : 'calendar'}
      />
    )
  }
}

AgendaStack.path = '';

/*
Map
*/
const BuildingsStack = createStackNavigator(
  {
    Buildings: BuildingsScreen,
    Floor: Floorscreen,
    AppSettings: SettingsStack,
    Notifications: NotificationsScreen
  },
  config
);


BuildingsStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIconFeather
      focused={focused}
      name={Platform.OS === 'ios' ? `map` : 'map'}
    />
  ),
};

BuildingsStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName

  if (routeName == 'Floor' || routeName == 'AppSettings' || routeName == 'Notifications') {
    tabBarVisible = false
  }

  return {
    tabBarVisible,
    tabBarIcon: ({ focused }) => (
      <TabBarIconFeather
        focused={focused}
        name={Platform.OS === 'ios' ? `map` : 'map'}
      />
    )
  }
}

BuildingsStack.path = '';

const NewMeetingStack = createStackNavigator(
  {
    NewMeeting: NewMeetingScreen,
    MeetingTitle: NmTitleScreen,
    MeetingRunningOrder: NmRunningOrderScreen,
    MeetingParticipants: NmParticipants
  },
  config
);

/*
Meeting
*/
NewMeetingStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIconMeeting
      focused={focused}
      name={Platform.OS === 'ios' ? `zap` : 'zap'}
    />
  ),
};

NewMeetingStack.path = '';

/*
Main TabBar Navigation
*/
const tabNavigator = createBottomTabNavigator({
  OverviewStack,
  AgendaStack,
  BuildingsStack,
  NewMeetingStack
},
  {
    tabBarOptions: {
      showLabel: false,
      style: {
        borderTopWidth: 0,
        shadowOffset: { width: 0, height: -8, },
        shadowColor: 'black',
        shadowOpacity: 0.04,
      }
    }
  }
);

tabNavigator.path = '';

export default tabNavigator;
