import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Image} from 'react-native';
import AddIcon from '../components/Icons/AddIcon';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import {typeVariants} from '../theme/theme';
import {useTheme} from '../theme/useTheme';
import TabBarLabel from './TabBarLabel';

const HomeIcon = require('../assets/icons/home.png');
const SummaryIcon = require('../assets/icons/summary.png');

const HomeFocusedIcon = require('../assets/icons/home_focus.png');
const SummaryFocusedIcon = require('../assets/icons/summary_focus.png');

// Icons for Bottom Tab Navigatrion
const homeIcon = ({focused}: {focused: boolean}) => (
  <Image
    source={focused ? HomeFocusedIcon : HomeIcon}
    width={50}
    height={50}
    alt="Home Icon"
  />
);
const addIcon = () => <AddIcon width={36} height={36} color={'#918DAC'} />;
const summaryIcon = ({focused}: {focused: boolean}) => (
  <Image
    source={focused ? SummaryFocusedIcon : SummaryIcon}
    width={50}
    height={50}
    alt="Summary Icon"
  />
);

// Root Navigation
// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function homeTabBarLabel({focused}: {focused: boolean}, theme: any) {
  return <TabBarLabel label="Home" focused={focused} theme={theme} />;
}

function summaryTabBarLabel({focused}: {focused: boolean}, theme: any) {
  return <TabBarLabel label="Summary" focused={focused} theme={theme} />;
}

export default function RootNavigation() {
  const {theme} = useTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: theme.cardBg,
            height: 120,
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
            paddingTop: 20,
          },
          headerStyle: {
            backgroundColor: theme.cardBg,
            height: 120,
            borderBottomEndRadius: 20,
          },
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: typeVariants.titleLarge.fontFamily,
            fontSize: 18,
            color: theme.primary,
            fontWeight: 'bold',
          },
          tabBarShowLabel: true,
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: homeIcon,
            tabBarLabel: (props: {focused: boolean}) =>
              homeTabBarLabel(props, theme),
          }}
        />
        <Tab.Screen
          name="NetworkExample"
          component={Home}
          options={{
            tabBarIcon: addIcon,
            tabBarLabel: '',
          }}
        />
        <Tab.Screen
          name="Summary"
          component={Settings}
          options={{
            tabBarIcon: summaryIcon,
            tabBarLabel: (props: {focused: boolean}) =>
              summaryTabBarLabel(props, theme),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
