import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from '../../../hooks/useRedux';
import {selectTheme} from '../../../store/reducers/app/appSlice';

import Colors from '../../../constants/Colors';
import {selectBarcode} from '../../../store/reducers/barcode/barcodeSlice';

interface Props {
  handleSaveAndNext: () => void;
  handleSaveAndQuit: () => void;
  handleQuitWithoutSaving: () => void;
}
export default function FooterButtons({
  handleQuitWithoutSaving,
  handleSaveAndNext,
  handleSaveAndQuit,
}: Props) {
  const [pressedButton, setPressButton] = useState('');
  const theme = useSelector(selectTheme);
  const barcodeState = useSelector(selectBarcode);
  const bottonColor = {
    color: theme === 'dark' ? Colors.dark.tint : Colors.light.tint,
  };
  return (
    <View style={styles.buttContainer}>
      <TouchableOpacity
        style={styles.but}
        onPress={() => {
          setPressButton('handleSaveAndNext');
          handleSaveAndNext();
        }}>
        {barcodeState.uplodadStatus === 'loading' &&
        pressedButton === 'handleSaveAndNext' ? (
          <ActivityIndicator
            color={theme === 'dark' ? '#D0B29D' : '#686868'}
            size="small"
          />
        ) : (
          <Text style={[styles.butText, bottonColor]}>Save and next</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.but}
        onPress={() => {
          setPressButton('handleSaveAndQuit');
          handleSaveAndQuit();
        }}>
        {barcodeState.uplodadStatus === 'loading' &&
        pressedButton === 'handleSaveAndQuit' ? (
          <ActivityIndicator
            color={theme === 'dark' ? '#D0B29D' : '#686868'}
            size="small"
          />
        ) : (
          <Text style={[styles.butText, bottonColor]}>Save and quit</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.but}
        onPress={() => {
          setPressButton('handleQuitWithoutSaving');
          handleQuitWithoutSaving();
        }}>
        {barcodeState.uplodadStatus === 'loading' &&
        pressedButton === 'handleQuitWithoutSaving' ? (
          <ActivityIndicator
            color={theme === 'dark' ? '#D0B29D' : '#686868'}
            size="small"
          />
        ) : (
          <Text style={[styles.butText, bottonColor]}>Quit without saving</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttContainer: {
    alignItems: 'center',
  },
  but: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderTopColor: 'grey',
    borderBottomColor: 'grey',
    borderWidth: 0.25,
    width: '100%',
  },
  butText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
