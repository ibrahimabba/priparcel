import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';

import { Provider } from 'react-redux';
import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Navigation from './src/navigation';
import { store } from './src/store/store';

const App = () => {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1
  };

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <Provider store={store}>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <Navigation colorScheme={colorScheme} />
        </SafeAreaView>
      </Provider>
    );
  }
};

export default App;
