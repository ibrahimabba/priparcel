import {configureStore} from '@reduxjs/toolkit';
import appSlice from './reducers/app/appSlice';
import barcodeSlice from './reducers/barcode/barcodeSlice';

export const store = configureStore({
  reducer: {
    app: appSlice,
    barcode: barcodeSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
