/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Image, TouchableOpacity, StyleSheet} from 'react-native';
import GradientView from '../components/GradientView';
import AddIcon from '../components/Icons/AddIcon';
import SettingIcon from '../components/Icons/SettingIcon';
import Home from '../screens/Home';
import NewNote from '../screens/NewNote';
import Settings from '../screens/Settings';
import Summary from '../screens/Summary';
import {typeVariants} from '../theme/theme';
import TabBarLabel from './TabBarLabel';

const HomeIcon = require('../assets/icons/home.png');
const SummaryIcon = require('../assets/icons/summary.png');

const HomeFocusedIcon = require('../assets/icons/home_focus.png');
const SummaryFocusedIcon = require('../assets/icons/summary_focus.png');

// Create navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Icons for Bottom Tab Navigation
const homeIcon = ({focused}: {focused: boolean}) => (
  <Image
    source={focused ? HomeFocusedIcon : HomeIcon}
    width={50}
    height={50}
    alt="Home Icon"
  />
);

const summaryIcon = ({focused}: {focused: boolean}) => (
  <Image
    source={focused ? SummaryFocusedIcon : SummaryIcon}
    width={50}
    height={50}
    alt="Summary Icon"
  />
);

function homeTabBarLabel({focused}: {focused: boolean}) {
  return <TabBarLabel label="Home" focused={focused} />;
}

function summaryTabBarLabel({focused}: {focused: boolean}) {
  return <TabBarLabel label="Summary" focused={focused} />;
}

// Tab Navigator Component
function AddTabBarButton({
  onPress,
}: React.ComponentProps<typeof TouchableOpacity> & {onPress: () => void}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.addButton}>
      <AddIcon width={36} height={36} color={'#918DAC'} />
    </TouchableOpacity>
  );
}

function TabNavigator() {
  return (
    <GradientView
      customGradient={{
        colors: ['#1B284F', '#351159', '#421C45', '#3B184E'],
        locations: [0.14, 0.49, 0.75, 1.0],
        angle: 155.28,
      }}
      style={styles.gradientSection}>
      <Tab.Navigator
        screenOptions={{
          sceneStyle: {
            backgroundColor: 'transparent',
          },
          tabBarStyle: {
            backgroundColor: '#1C0B37',
            height: 100,
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
            paddingTop: 20,
          },
          headerStyle: {
            backgroundColor: '#1C0B37',
            height: 120,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
          },
          headerTitleAlign: 'left',
          headerTitleStyle: {
            fontFamily: typeVariants.titleLarge.fontFamily,
            fontSize: 24,
            color: '#FFFFFF',
            fontWeight: 'bold',
          },
          tabBarShowLabel: true,
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={({navigation}) => ({
            tabBarIcon: homeIcon,
            tabBarLabel: (props: {focused: boolean}) => homeTabBarLabel(props),
            headerShown: true,
            headerTitle: 'Home',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Settings')}
                style={styles.headerRightButton}>
                <SettingIcon width={24} height={24} />
              </TouchableOpacity>
            ),
          })}
        />
        <Tab.Screen
          name="AddButton"
          component={NewNote}
          options={({navigation}) => ({
            tabBarIcon: () => null,
            tabBarLabel: '',
            tabBarButton: () => (
              <AddTabBarButton
                onPress={() => navigation.navigate('CreateNote')}
              />
            ),
          })}
          listeners={({navigation}) => ({
            tabPress: e => {
              e.preventDefault();
              navigation.navigate('CreateNote');
            },
          })}
        />
        <Tab.Screen
          name="Summary"
          component={Summary}
          options={{
            tabBarIcon: summaryIcon,
            tabBarLabel: (props: {focused: boolean}) =>
              summaryTabBarLabel(props),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </GradientView>
  );
}

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen
          name="CreateNote"
          component={NewNote}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  gradientSection: {
    flex: 1,
  },
  addButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRightButton: {
    padding: 12,
    marginRight: 8,
  },
});
