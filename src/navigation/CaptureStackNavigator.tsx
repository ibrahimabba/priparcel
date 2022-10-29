import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {CaptureStackParamList} from '../../types';

import BarcodeScreen from '../screens/barcode';
import Capture from '../screens/capture';

const Stack = createNativeStackNavigator<CaptureStackParamList>();

export default function CaptureStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Barcode"
        component={BarcodeScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="CaptureScreen"
        component={Capture}
        options={{headerShown: true, title: 'Capture'}}
      />
    </Stack.Navigator>
  );
}
