import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../../../components/button';

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
  return (
    <View style={styles.buttonsContainer}>
      {capturedImage && (
        <Button onPress={handleSnapAgain} title="Snap again" fontSize={16} />
      )}
      {capturedImage && (
        <Button onPress={handleFinish} title="Finish" fontSize={16} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: '700',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%'
  }
});
