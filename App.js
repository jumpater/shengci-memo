import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import FirstScreen from './components/Common/FirstScreen';
import SelfText from './components/Common/SelfText';
import NewMemoButton from './components/Common/NewMemoButton';
import WordList from './components/memo/WordList';
import NewMemo from './components/memo/NewMemo';
import AddList from './components/scan/AddList';
import ScanScreen from './components/scan/ScanScreen';
import ReadImage from './components/scan/ReadImage';
import {Platform, UIManager,Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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

const Tab = createBottomTabNavigator();
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
      screenOptions={{
        headerShown:false,
        tabBarLabelPosition: "below-icon",
        tabBarShowLabel:true,
        tabBarStyle:{
          backgroundColor: "#00BCDA",
          height: 80,
        },
        tabBarItemStyle:{
          paddingTop: 10,
        },
      }}>
        <Tab.Screen name="Memo" component={Home} options={{
          title: 'メモ',
          tabBarLabel:({focused,color})=><SelfText style={[{fontSize: 10,fontFamily: 'NotoSansJP-Regular',fontWeight: 'bold',},focused?{color: "#DADA00",}:{color: "#fff",}]}>メモ</SelfText>,
          tabBarIcon:({focused,color,size})=><Image source={focused?require("./assets/icon-memo-active.png"):require("./assets/icon-memo.png")} style={{height: "100%", resizeMode: "contain",marginBottom: 5,}}/>,
          }}/>
        <Tab.Screen name="Scan" component={Scan} options={{
          title: "画像をスキャン",
          tabBarLabel:({focused,color})=><SelfText style={[{fontSize: 10,fontFamily: 'NotoSansJP-Regular',fontWeight: 'bold'},focused?{color: "#DADA00",}:{color: "#fff",}]}>画像をスキャン</SelfText>,
          tabBarIcon:({focused,color,size})=><Image source={focused?require("./assets/icon-scanner-active.png"):require("./assets/icon-scanner.png")} style={{height: "100%",resizeMode: "contain",marginBottom: 5,}}/>,
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


