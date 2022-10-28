import {ColorSchemeName} from 'react-native';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../store';

export interface IAppState {
  user: {
    token: string;
  };
  theme: ColorSchemeName;
  appIdentifier: 'priparcel-ios' | 'priparcel-android' | null;
}

const initialState: IAppState = {
  appIdentifier: null,
  theme: 'dark',
  user: {
    token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiNDRlOWU3MWI4NTI1NjJmNGMxZDI5ZjI3ZGZlYjU3M2E1Mjc5ZWQwODJhZWJhOTRhNTRlN2QyOTBkYmRkNmZjZTMzNTNlOTdiMjhlNmZlYWEiLCJpYXQiOjE2NjYzNTEyMDguNDI4OTgyLCJuYmYiOjE2NjYzNTEyMDguNDI4OTg2LCJleHAiOjE2OTc4ODcyMDguNDE0MDI5LCJzdWIiOiI4Iiwic2NvcGVzIjpbXX0.lZQF9Yc2oH2BqTuRnfuXrlsLqMOj0xNErLuF4hiz1F0Xk6mCWZj-ErHBpwdkAnmN3baw_VfGx7_68FkRt4iy2F9lvGUU2RWCIIn2NnhRz4QfDTWoI_iJ5jVpV6caMKocasG0etef2cSXKaJupMe1f4YJyB0Pin6WeVmC1TMu185t5Ka3kNeJH8deMVk80xDA4WR_wW2kg2AyB2OEKPGcGBufZMEfjRjMUnk6D31gFxX3UNXJjCrJFuQnSUHlBV0UCRHX5W_KCY2hRiQNCY9yhy3ZARcP6twdEGCSjtsiTR3V_S4iGa6Pzrjj8FuUUCBXseE7ljuvjWXUKG8DdFNwuuOcpDhd-6ip7nxZLWUPEdW3kQb1VZuC-s_VtME18BcC5ErBHENU1dR2279rN06HrWWrc9why31-7m_tz6vWGc2Y6bUfCz9ffFiEbwCsLQD-7MUmL6W702JoPpYHm2arklNtShAI9-SV46w_eS-87sJ0nNcPSM85DfoiyQJxT9Vfzxxz8hV31LcqlZHkxObDrieNmZK3mVTyUcUu87eaa2XmLPkiwX2rid0QzfC6LtC-PKFo0BR2jqSJ792pob8fjg2SBbkA_impQ0NhrppUdj6DW4tWoGafzwaC0-8FSCqIi8uHJSIcD7owtce1skdbBga4viVtWNbIPuwJ5Jqe4jg',
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    switchTheme: (state, action: PayloadAction<IAppState['theme']>) => {
      state.theme = action.payload;
    },
    appIdentifier: (
      state,
      action: PayloadAction<IAppState['appIdentifier']>,
    ) => {
      state.appIdentifier = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {appIdentifier, switchTheme} = appSlice.actions;

export const selectTheme = (state: RootState) => state.app.theme;

export default appSlice.reducer;
