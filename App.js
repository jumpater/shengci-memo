import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import FirstScreen from './components/FirstScreen';
import WordList from './components/WordList';
import NewMemo from './components/NewMemo';
import {Platform, UIManager,} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
  let [fontsLoaded] = useFonts({
    'Deng': require('./assets/fonts/Deng.otf'),
    'NotoSansJP-Light': require('./assets/fonts/NotoSansJP-Light.otf'),
    'NotoSansJP-Regular': require('./assets/fonts/NotoSansJP-Regular.otf'),
  });
  if(!fontsLoaded){ return <AppLoading /> }
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#00BCDA',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: 'NotoSansJP-Regular',
          fontWeight: 'bold',
          fontSize: 18,
        },
      }}>
        <Stack.Screen name="WordList" component={WordList} options={{title: "単語リスト",}} />
        <Stack.Screen name="NewMemo" component={NewMemo} options={{title: "新しいメモを作成",}} />
      </Stack.Navigator>
    </NavigationContainer>
    // <FirstScreen />
  );
};


