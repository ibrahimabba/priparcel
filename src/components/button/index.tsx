import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from '../../hooks/useRedux';
import {selectTheme} from '../../store/reducers/app/appSlice';

import Colors from '../../constants/Colors';

interface Props {
  onPress: () => void;
  title: string;
  fontSize: number;
}
export default function Button({onPress, title, fontSize}: Props) {
  const theme = useSelector(selectTheme);
  const bottonColor = {
    color: theme === 'dark' ? Colors.dark.tint : Colors.light.tint,
  };
  return (
    <TouchableOpacity onPress={onPress} style={styles.butStyle}>
      <Text style={[styles.cont, bottonColor, {fontSize}]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cont: {
    fontSize: 22,
    fontWeight: '700',
    margin: 15,
  },
  butStyle: {
    borderWidth: 0.7,
    marginTop: 20,
    borderColor: 'grey',
    borderRadius: 50,
  },
});
