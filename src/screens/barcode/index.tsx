import React, {useCallback, useState} from 'react';
import {View, StyleSheet} from 'react-native';

import Layout from '../../constants/Layout';
import BarcodeComponent from './components/Barcode';
import ContinueButton from './components/ContinueButton';
import {BarcodeScreenProps} from '../../../types';

export default function BarcodeScreen({navigation}: BarcodeScreenProps) {
  const [barcodeImage, setBarcodeImage] = useState<string>('');

  const onBarcodeSnap = useCallback((uri: string) => {
    setBarcodeImage(uri);
  }, []);

  const navigateTOCaptureScreen = () => {
    if (barcodeImage) {
      navigation.navigate('CaptureScreen', {uri: barcodeImage});
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <BarcodeComponent onBarcodeSnap={onBarcodeSnap} />
        <ContinueButton onPress={navigateTOCaptureScreen} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Layout.screenHeight,
  },
  content: {
    alignItems: 'center',
    alignSelf: 'center',
  },
});
