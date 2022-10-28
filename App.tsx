import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';

import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Navigation from './src/navigation';

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
        <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <Navigation colorScheme={colorScheme} />
        </SafeAreaView>
    );
  }
};

export default App;
