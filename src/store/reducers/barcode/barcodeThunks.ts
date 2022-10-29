import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../store';

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
    return resData;
  },
);
