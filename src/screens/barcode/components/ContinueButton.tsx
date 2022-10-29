import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from '../../../hooks/useRedux';
import {selectTheme} from '../../../store/reducers/app/appSlice';

import Colors from '../../../constants/Colors';

interface Props {
  onPress: () => void;
}
export default function ContinueButton({onPress}: Props) {
  const theme = useSelector(selectTheme);
  const bottonColor = {
    color: theme === 'dark' ? Colors.dark.tint : Colors.light.tint,
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.cont, bottonColor]}>Continue</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cont: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: '700',
  },
});
