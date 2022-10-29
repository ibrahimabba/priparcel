import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../store';
import {fetchBarcodeAsync} from './barcodeThunks';

export interface Barcode {
  sequence?: string;
  storage_location?: string;
  arrival_date?: string;
  created_at?: string;
  date?: string;
  formatted_created_date?: string;
  id?: number;
  parcelbox_id?: any;
  state?: number;
  updated_at?: string;
  waiting_for_decision?: boolean;
  weight?: number;
}

interface initiateStateProps {
  barcode: Barcode;
  status: 'idle' | 'loading' | 'failed';
  error: string;
}

const initialState: initiateStateProps = {
  barcode: {},
  status: 'idle',
  error: '',
};

const barcodeSlice = createSlice({
  name: 'barcode',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBarcodeAsync.pending, state => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(
        fetchBarcodeAsync.fulfilled,
        (state, action: PayloadAction<Barcode | undefined>) => {
          state.status = 'idle';
          state.error = '';
          state.barcode = action.payload || {};
        },
      )
      .addCase(fetchBarcodeAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '';
      });
  },
});

export const selectBarcode = (state: RootState) => state.barcode;

export default barcodeSlice.reducer;
