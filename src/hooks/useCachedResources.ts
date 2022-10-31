import {useEffect, useState} from 'react';
import {ColorSchemeName} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from './useRedux';
import {switchTheme} from '../store/reducers/app/appSlice';
import {
  Barcode,
  saveCachedBarcode,
} from '../store/reducers/barcode/barcodeSlice';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const dispatch = useDispatch();
  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await RNBootSplash.getVisibilityStatus();

        const barcodeJSON = await AsyncStorage.getItem('@barcode');
        if (barcodeJSON) {
          const barcode = JSON.parse(barcodeJSON);
          dispatch(saveCachedBarcode(barcode as Barcode));
        }

        const theme = await AsyncStorage.getItem('@theme');
        if (theme) {
          dispatch(switchTheme(theme as ColorSchemeName));
        }
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        RNBootSplash.hide({fade: true});
      }
    }

    loadResourcesAndDataAsync();
  }, [dispatch]);

  return isLoadingComplete;
}
