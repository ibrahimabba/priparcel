import React from 'react';
import {StyleSheet} from 'react-native';
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
    <>
      {capturedImage && (
        <Button onPress={handleSnapAgain} title="Snap again" fontSize={16} />
      )}
      {capturedImage && (
        <Button onPress={handleFinish} title="Finish" fontSize={30} />
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
});
