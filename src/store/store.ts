import {configureStore} from '@reduxjs/toolkit';
import appSlice from './reducers/app/appSlice';

export const store = configureStore({
  reducer: {
    app: appSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
