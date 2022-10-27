
import * as React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import CaptureScreen from '../screens/capture/';
import OverviewScreen from '../screens/overview';
import { RootTabParamList, RootTabScreenProps } from '../../types';

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
                options={({ navigation }: RootTabScreenProps<'Capture'>) => ({
                    title: 'Capture',
                    tabBarIcon: ({ }) => <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'red' }} />,
                })}
            />
            <BottomTab.Screen
                name="Overview"
                component={OverviewScreen}
                options={{
                    title: 'Overview',
                    tabBarIcon: ({ }) => <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'red' }} />,
                }}
            />
        </BottomTab.Navigator>
    );
}