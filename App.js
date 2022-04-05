import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import FirstScreen from './components/Common/FirstScreen';
import NewMemoButton from './components/Common/NewMemoButton';
import WordList from './components/memo/WordList';
import NewMemo from './components/memo/NewMemo';
import AddList from './components/scan/AddList';
import ScanScreen from './components/scan/ScanScreen';
import ReadImage from './components/scan/ReadImage';
import {Platform, UIManager,} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Home = ()=>{
  const Stack = createNativeStackNavigator();
  return(
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
      <Stack.Screen name="WordList" component={WordList} options={({navigation})=>({
        title: "単語リスト",
        headerRight:()=>{
          return (
          <NewMemoButton navigation={navigation} />
          )
        }
        })} />
      <Stack.Screen name="NewMemo" component={NewMemo} options={{title: "新しいメモを作成",}} />
    </Stack.Navigator>
  );
}

const Scan = ()=>{
  const Stack = createNativeStackNavigator();
  return(
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
      <Stack.Screen name="camera" component={ScanScreen} options={({navigation})=>({
        title: "画像を読み取る",
        })} />
      <Stack.Screen name="ReadImage" component={ReadImage} options={{title: "読み取った単語を選択",}} />
      <Stack.Screen name="AddList" component={AddList} options={{title: "メモを作成",}} />
    </Stack.Navigator>
  );
}

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Tab = createMaterialBottomTabNavigator();
export default function App() {
  let [fontsLoaded] = useFonts({
    'Deng': require('./assets/fonts/Deng.otf'),
    'NotoSansJP-Light': require('./assets/fonts/NotoSansJP-Light.otf'),
    'NotoSansJP-Regular': require('./assets/fonts/NotoSansJP-Regular.otf'),
  });
  if(!fontsLoaded){ return <AppLoading /> }
  return (
    <NavigationContainer>
      <Tab.Navigator
      initialRouteName='Memo'
      backBehavior="none"
      barStyle={{
        backgroundColor: "#00BCDA",
        height: 80,
      }}>
        <Tab.Screen name="Memo" component={Home} options={{title: 'メモ'}}/>
        <Tab.Screen name="Scan" component={Scan} options={{title: "画像をスキャン",}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


