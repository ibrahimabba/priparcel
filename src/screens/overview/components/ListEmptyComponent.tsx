import React from 'react';
import {View, Text} from 'react-native';
import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';

import {useSelector} from '../../../hooks/useRedux';
import {selectTheme} from '../../../store/reducers/app/appSlice';

export default function ListEmptyComponent() {
  const theme = useSelector(selectTheme);
  const textColor = {
    color: theme === 'dark' ? Colors.dark.text : Colors.light.text,
  };
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: Layout.screenHeight / 1.5,
      }}>
      <Text style={[{fontSize: 20, fontWeight: '700'}, textColor]}>
        Nothing To show, Gallery Empty
      </Text>
    </View>
  );
}
