import React, {useState} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import {CameraCapturedPicture} from 'expo-camera';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

import Layout from '../../constants/Layout';
import CameraComponent from '../../components/camera';
import BarcodeGenerator from './components/BarcodeGenerator';
import {CaptureScreenProps} from '../../../types';
import WaterMarkedImage from './components/WaterMarkedImage';
import SnapAndFinishButton from './components/SnapAndFinishButton';

export default function Capture({navigation, route}: CaptureScreenProps) {
  const [capturedImage, setCapturedImage] = useState<
    CameraCapturedPicture | undefined
  >();
  const [capturedCount, setCaptureCount] = useState<number>(1);
  const [captureMode, setCapturMode] = useState<
    'mount' | 'continuous' | 'update' | undefined
  >('continuous');

  // captureCount tracks the number of times the warterMarked view is captured because,
  // The view needs to be captured at least two times in order to have a clear watermarked picture
  const onWaterMarkSnap = (uri: string) => {
    if (capturedCount > 2) {
      savePicture(uri);
      setCapturMode('mount');
      setCaptureCount(1);
    } else {
      setCaptureCount(capturedCount + 1);
    }
  };

  const handleCapTuredImage = (img: CameraCapturedPicture) => {
    setCapturedImage(img);
  };

  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  async function savePicture(img: string) {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
    CameraRoll.save(img, {album: 'priparcel'});
  }

  const handleSnapAgain = () => {
    setCapturedImage(undefined);
    setCaptureCount(1);
    setCapturMode('continuous');
  };

  const handleFinish = () => {
    navigation.navigate('Overview');
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <BarcodeGenerator uri={route.params.uri} />
        {!capturedImage ? (
          <CameraComponent handleCapTuredImage={handleCapTuredImage} />
        ) : (
          <WaterMarkedImage
            barcodeUri={route.params.uri}
            capturedImageUri={capturedImage.uri}
            captureMode={captureMode}
            onWaterMarkSnap={onWaterMarkSnap}
          />
        )}
        <SnapAndFinishButton
          handleSnapAgain={handleSnapAgain}
          handleFinish={handleFinish}
          capturedImage={capturedImage ? true : false}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    height: Layout.screenHeight,
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
});
