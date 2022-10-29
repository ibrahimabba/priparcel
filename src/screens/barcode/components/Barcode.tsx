import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from '../../../hooks/useRedux';
import {selectTheme} from '../../../store/reducers/app/appSlice';
import {selectBarcode} from '../../../store/reducers/barcode/barcodeSlice';
import {fetchBarcodeAsync} from '../../../store/reducers/barcode/barcodeThunks';

import Barcode from '@kichiyaki/react-native-barcode-generator';

import ViewShot from 'react-native-view-shot';

import Colors from '../../../constants/Colors';

interface Props {
  onBarcodeSnap: (uri: string) => void;
}
export default function BarcodeComponent({onBarcodeSnap}: Props) {
  const theme = useSelector(selectTheme);
  const barcodeState = useSelector(selectBarcode);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchLatestBarcode();
  }, []);

  const fetchLatestBarcode = async () => {
    dispatch(fetchBarcodeAsync());
  };
  const textColor = {
    color: theme === 'dark' ? Colors.dark.text : Colors.light.text,
  };
  return (
    <>
      {barcodeState.status === 'loading' ? (
        <View style={styles.barcodeLoading}>
          <ActivityIndicator
            color={theme === 'dark' ? '#D0B29D' : '#686868'}
            size="large"
          />
          <Text style={[styles.barcodeLoadingText, textColor]}>
            Fetching Barcode...
          </Text>
        </View>
      ) : (
        <View style={styles.barcodeView}>
          <ViewShot onCapture={onBarcodeSnap} captureMode="mount">
            <Barcode value={barcodeState.barcode.sequence || 'randstring'} />
          </ViewShot>
          <Text style={[styles.sequenceStyle, textColor]}>
            {barcodeState.barcode.sequence}
          </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  barcodeLoading: {
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: '20%',
  },
  barcodeLoadingText: {
    marginTop: 20,
  },
  sequenceStyle: {
    alignSelf: 'center',
    fontSize: 12,
  },
  barcodeView: {
    width: '80%',
  },
});
