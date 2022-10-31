import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {CaptureStackParamList} from '../../types';

import {useSelector} from '../hooks/useRedux';
import {selectTheme} from '../store/reducers/app/appSlice';

import BarcodeScreen from '../screens/barcode';
import Capture from '../screens/capture';
import {Image} from 'react-native';

const Stack = createNativeStackNavigator<CaptureStackParamList>();

export default function CaptureStackNavigator() {
  const theme = useSelector(selectTheme);

  const headerLeftSource =
    theme === 'dark'
      ? require('../../assets/Icons/PriParcel-home-dark.png')
      : require('../../assets/Icons/PriParcel-home-light.jpg');
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Barcode"
        component={BarcodeScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerLeft: () => (
            <Image source={headerLeftSource} style={{width: 170, height: 30}} />
          ),
        }}
      />
      <Stack.Screen
        name="CaptureScreen"
        component={Capture}
        options={{headerShown: true, title: 'Capture'}}
      />
    </Stack.Navigator>
  );
}
