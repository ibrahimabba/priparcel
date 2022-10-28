import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Micon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import CaptureScreen from '../screens/capture/';
import OverviewScreen from '../screens/overview';
import {RootTabParamList, RootTabScreenProps} from '../../types';

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Capture"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="Capture"
        component={CaptureScreen}
        options={() => ({
          title: 'Capture',
          tabBarIcon: ({color, size}) => (
            <Micon name={'home'} size={size} color={color} />
          ),
        })}
      />
      <BottomTab.Screen
        name="Overview"
        component={OverviewScreen}
        options={{
          title: 'Overview',
          tabBarIcon: ({color, size}) => (
            <Micon name={'view-dashboard'} size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
