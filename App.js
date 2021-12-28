import React, { useState,} from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import FirstScreen from './components/FirstScreen'
import WordList from './components/WordList';

export default function App() {
  let [fontsLoaded] = useFonts({
    'Deng': require('./assets/fonts/Deng.otf'),
    'NotoSansJP-Light': require('./assets/fonts/NotoSansJP-Light.otf'),
    'NotoSansJP-Regular': require('./assets/fonts/NotoSansJP-Regular.otf'),
  });
  if(!fontsLoaded){ return <AppLoading /> }
  return (
    <>
    <FirstScreen />
    <WordList />
    </>
  );
};


