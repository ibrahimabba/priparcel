import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from '../../../hooks/useRedux';
import {selectTheme} from '../../../store/reducers/app/appSlice';
import {selectBarcode} from '../../../store/reducers/barcode/barcodeSlice';

import Barcode from '@kichiyaki/react-native-barcode-generator';
import Colors from '../../../constants/Colors';

interface Props {
  uri: string;
}
export default function BarcodeGenerator({uri}: Props) {
  const theme = useSelector(selectTheme);
  const barcodeState = useSelector(selectBarcode);
  const textColor = {
    color: theme === 'dark' ? Colors.dark.text : Colors.light.text,
  };
  return (
    <>
      <View style={styles.barcodeView}>
        <Barcode value={uri} />
        <Text style={[styles.sequenceStyle, textColor]}>
          {barcodeState.barcode && barcodeState.barcode.sequence}
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  sequenceStyle: {
    alignSelf: 'center',
    fontSize: 12,
  },
  barcodeView: {
    width: '80%',
  },
});
