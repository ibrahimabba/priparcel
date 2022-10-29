import React, {useState} from 'react';
import {
  Camera,
  CameraType,
  FlashMode,
  CameraCapturedPicture,
} from 'expo-camera';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Micon from 'react-native-vector-icons/MaterialCommunityIcons';
import Layout from '../../constants/Layout';

interface Props {
  handleCapTuredImage: (img: CameraCapturedPicture) => void;
}
export default function CameraComponent({handleCapTuredImage}: Props) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [flashLightOn, setFlashLightOn] = useState<boolean>(false);
  const [imgSIzes, setImgSizes] = useState<string[]>(['320x240']);
  const [camera, setCamera] = useState<Camera | null>();
  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={styles.perm}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  const toggleCameraType = () => {
    setType(current =>
      current === CameraType.back ? CameraType.front : CameraType.back,
    );
  };
  const toggleFlashLight = () => {
    setFlashLightOn(!flashLightOn);
  };
  const handleImgSize = async () => {
    if (camera) {
      const sizes = await camera.getAvailablePictureSizesAsync('4:3');
      setImgSizes(sizes);
    }
  };
  const handleTakePic = async () => {
    if (camera) {
      const capturedImage = await camera.takePictureAsync();
      handleCapTuredImage(capturedImage);
    }
  };
  return (
    <View style={styles.container}>
      <Camera
        pictureSize={imgSIzes[2]}
        onCameraReady={handleImgSize}
        ref={ref => setCamera(ref)}
        flashMode={flashLightOn ? FlashMode.torch : FlashMode.off}
        style={styles.camera}
        type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Micon name={'camera-flip-outline'} size={24} color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleTakePic}>
            <Text style={[styles.text]}>Capture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleFlashLight}>
            <Micon
              name={flashLightOn ? 'flashlight' : 'flashlight-off'}
              size={24}
              color={'white'}
            />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Layout.screenHeight / 2.3,
    width: Layout.screenWidth,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
    width: '100%',
    paddingBottom: 25,
  },
  button: {
    //flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  perm: {textAlign: 'center'},
});
