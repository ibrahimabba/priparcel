import React from 'react';
import {Image, SafeAreaView, StatusBar} from 'react-native';
import useColorScheme from '../../hooks/useColorScheme';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default function SplashScreem() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Image source={require('../../../assets/Icons/PriParcel-fav-144.png')} />
    </SafeAreaView>
  );
}
