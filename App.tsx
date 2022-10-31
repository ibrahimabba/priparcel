import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import Toast from 'react-native-toast-message';
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Navigation from './src/navigation';
import SplashScreen from './src/components/splahscreen';

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  if (!isLoadingComplete) {
    return <SplashScreen />;
  } else {
    return (
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <Navigation colorScheme={colorScheme} />
        <Toast />
      </SafeAreaView>
    );
  }
};

export default App;
