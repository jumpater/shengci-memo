import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import FirstScreen from './components/FirstScreen';
import NewMemoButton from './components/Common/NewMemoButton';
import WordList from './components/WordList';
import NewMemo from './components/NewMemo';
import {Platform, UIManager,} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { View,Text } from 'react-native';

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

const Scan= ()=>{
  return(<View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text>Scan</Text></View>)
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
      }}
      screenOptions={{
        

      }}>
        <Tab.Screen name="Memo" component={Home} options={{title: 'メモ'}}/>
        <Tab.Screen name="Scan" component={Scan} options={{title: "画像をスキャン",}} />
      </Tab.Navigator>
    </NavigationContainer>
    // <FirstScreen />
  );
};


