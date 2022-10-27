import {useEffect, useState} from 'react';
import RNBootSplash from 'react-native-bootsplash';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await RNBootSplash.getVisibilityStatus();
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        RNBootSplash.hide({fade: true});
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
