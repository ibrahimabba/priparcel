import React, {useCallback, useState} from 'react';
import {View, StyleSheet} from 'react-native';

import Layout from '../../constants/Layout';
import BarcodeComponent from './components/Barcode';
import {BarcodeScreenProps} from '../../../types';
import Button from '../../components/button';

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
        <Button
          fontSize={22}
          title="Continue"
          onPress={navigateTOCaptureScreen}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: Layout.screenHeight,
  },
  content: {
    alignItems: 'center',
    alignSelf: 'center',
  },
});
