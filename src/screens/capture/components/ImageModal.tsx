import React from 'react';
import {Image, Modal, StyleSheet, View} from 'react-native';
import Button from '../../../components/button';
import Colors from '../../../constants/Colors';

import {useSelector} from '../../../hooks/useRedux';
import {selectTheme} from '../../../store/reducers/app/appSlice';

interface Props {
  closeModal: () => void;
  modalVisible: boolean;
  pressedImage: string;
}
export default function ImageModal({
  closeModal,
  modalVisible,
  pressedImage,
}: Props) {
  const theme = useSelector(selectTheme);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}>
      <View style={styles.centeredView}>
        <View
          style={[
            styles.modalView,
            {
              backgroundColor:
                theme === 'dark'
                  ? Colors.dark.background
                  : Colors.light.background,
            },
          ]}>
          <Image
            source={{uri: pressedImage}}
            style={{width: 300, height: 300, borderRadius: 20}}
          />
          <Button onPress={closeModal} fontSize={16} title="Hide Me!" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
  },
});
