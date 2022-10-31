import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Img} from '../../../screens/overview';
import Toast from 'react-native-toast-message';
import * as FileSystem from 'expo-file-system';

const baseUrl = 'https://priparcel-api.priportal.eu';

export const fetchBarcodeAsync = createAsyncThunk(
  'barcode/fetchBarcode',
  async (_, {getState}) => {
    const state = getState() as RootState;
    const response = await fetch(
      baseUrl + '/api/admin/v1/priparcel/parcels/photos',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + state.app.user.token,
        },
      },
    );
    const resData = await response.json();

    await AsyncStorage.setItem('@barcode', JSON.stringify(resData));
    showToast({
      text2: 'Latest Barcode Fetched Successfully 👋',
      text1: 'Fetched',
      type: 'success',
    });
    return resData;
  },
);

export const uploadBarcodePicuresAsync = createAsyncThunk(
  'barcode/uploadBarcode',
  async (
    {
      photos,
      actionType,
    }: {photos: Img[]; actionType: 'Save and next' | 'Save and quit'},
    {getState, dispatch},
  ) => {
    try {
      const state = getState() as RootState;

      const photoUploads = photos.map(ph => uploadPhoto({state, uri: ph.uri}));
      const ds = await Promise.all(photoUploads);
      console.log('all files uploaded', ds);
      showToast({
        text2: 'Photos Successfully uploaded 👋',
        text1: 'Uploaded',
        type: 'success',
      });
      if (actionType === 'Save and next') {
        dispatch(fetchBarcodeAsync());
      }
      return;
    } catch (error) {
      throw new Error('Something went wron trying to upload images');
    }
  },
);

const uploadPhoto = async ({uri, state}: {uri: string; state: RootState}) => {
  let fetchResponse = await fetch(uri);
  let blob = await fetchResponse.blob();

  const response = await fetch(
    baseUrl + '/api/admin/v1/priparcel/parcels/photos',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + state.app.user.token,
      },
      body: JSON.stringify({
        file: blob,
        sequence: state.barcode.barcode?.sequence || '',
      }),
    },
  );
  return response.status;
  // const response = await FileSystem.uploadAsync(
  //   baseUrl + '/api/admin/v1/priparcel/parcels/photos',
  //   uri,
  //   {
  //     fieldName: 'file',
  //     httpMethod: 'POST',
  //     uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //       Authorization: 'Bearer ' + state.app.user.token,
  //     },
  //     parameters: {
  //       sequence: state.barcode.barcode?.sequence || '',
  //     },
  //   },
  // );
  // return JSON.stringify(response, null, 4);
};

const showToast = ({
  type,
  text1,
  text2,
}: {
  type: 'success' | 'error' | 'info';
  text1: string;
  text2: string;
}) => {
  Toast.show({
    type,
    text1,
    text2,
  });
};
