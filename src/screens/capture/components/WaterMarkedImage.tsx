import React from 'react';
import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native';
import {useSelector} from '../../../hooks/useRedux';
import {selectTheme} from '../../../store/reducers/app/appSlice';
import {selectBarcode} from '../../../store/reducers/barcode/barcodeSlice';

import ViewShot from 'react-native-view-shot';

import Colors from '../../../constants/Colors';

interface Props {
  captureMode: 'mount' | 'continuous' | 'update' | undefined;
  onWaterMarkSnap: (uri: string) => void;
  barcodeUri: string;
  capturedImageUri: string;
}
export default function WaterMarkedImage({
  captureMode,
  onWaterMarkSnap,
  barcodeUri,
  capturedImageUri,
}: Props) {
  const theme = useSelector(selectTheme);
  const barcodeState = useSelector(selectBarcode);

  const textColor = {
    color: theme === 'dark' ? Colors.dark.text : Colors.light.text,
  };
  return (
    <ViewShot
      options={{format: 'jpg', quality: 0.7}}
      style={{marginTop: 50}}
      onCapture={onWaterMarkSnap}
      captureMode={captureMode}>
      <ImageBackground
        imageStyle={{resizeMode: 'cover'}}
        source={{uri: capturedImageUri}}
        style={{width: 300, height: 300}}>
        <View style={{position: 'absolute', top: 230, left: 25}}>
          <Image source={{uri: barcodeUri}} style={{width: 150, height: 50}} />
          <Text style={[styles.sequenceStyle, textColor]}>
            {barcodeState.barcode && barcodeState.barcode.sequence}
          </Text>
        </View>
      </ImageBackground>
    </ViewShot>
  );
}

const styles = StyleSheet.create({
  sequenceStyle: {
    alignSelf: 'center',
    fontSize: 12,
  },
});
