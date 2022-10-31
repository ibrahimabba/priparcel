import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Micon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import OverviewScreen from '../screens/overview';
import {RootTabParamList} from '../../types';
import CaptureStackNavigator from './CaptureStackNavigator';
import {Image} from 'react-native';

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const headerLeftSource =
    colorScheme === 'dark'
      ? require('../../assets/Icons/PriParcel-home-dark.png')
      : require('../../assets/Icons/PriParcel-home-light.jpg');
  return (
    <BottomTab.Navigator
      initialRouteName="Capture"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="Capture"
        component={CaptureStackNavigator}
        options={() => ({
          title: 'Capture',
          tabBarIcon: ({color, size}) => (
            <Micon name={'home'} size={size} color={color} />
          ),
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="Overview"
        component={OverviewScreen}
        options={{
          headerTitle: '',
          headerLeft: () => (
            <Image
              source={headerLeftSource}
              style={{width: 170, height: 30, marginLeft: 16}}
            />
          ),
          tabBarIcon: ({color, size}) => (
            <Micon name={'view-dashboard'} size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
