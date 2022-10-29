import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from '../../../hooks/useRedux';
import {selectTheme} from '../../../store/reducers/app/appSlice';

import Colors from '../../../constants/Colors';

interface Props {
  handleSnapAgain: () => void;
  handleFinish: () => void;
  capturedImage: boolean;
}
export default function SnapAndFinishButton({
  handleSnapAgain,
  handleFinish,
  capturedImage,
}: Props) {
  const theme = useSelector(selectTheme);
  const bottonColor = {
    color: theme === 'dark' ? Colors.dark.tint : Colors.light.tint,
  };
  return (
    <>
      {capturedImage && (
        <TouchableOpacity onPress={handleSnapAgain}>
          <Text style={[styles.snap, bottonColor]}>Snap again</Text>
        </TouchableOpacity>
      )}
      {capturedImage && (
        <TouchableOpacity onPress={handleFinish}>
          <Text style={[styles.finish, bottonColor]}>Finish</Text>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  cont: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: '700',
  },
  snap: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '700',
  },
  finish: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: '700',
  },
});
