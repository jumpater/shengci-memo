import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import FirstScreen from './components/Common/FirstScreen';
import SelfText from './components/Common/SelfText';
import NewMemoButton from './components/Common/NewMemoButton';
import NewFolderButton from './components/Common/NewFolderButton';
import FolderDetail from './components/memo/FolderDetail';
import WordList from './components/memo/WordList';
import MemoFolders from './components/memo/MemoFolders';
import NewMemo from './components/memo/NewMemo';
import NewFolder from './components/memo/NewFolder';
import AddList from './components/scan/AddList';
import ScanScreen from './components/scan/ScanScreen';
import ReadImage from './components/scan/ReadImage';
import {Platform, UIManager,Image,Pressable} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


const Home = ()=>{
  const Stack = createNativeStackNavigator();
  return(
    <Stack.Navigator
    initialRouteName='MemoFolders'
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
      <Stack.Screen name="MemoFolders" component={MemoFolders} options={({route, navigation})=>({
        title: "単語フォルダー",
        headerRight:()=>{
          return (
          <NewFolderButton navigation={navigation}/>
          )
        },
        headerBackButtonMenuEnabled: false,
        headerBackVisible: false,
      })} />
      <Stack.Screen name="NewFolder" component={NewFolder} options={{title: "新しいフォルダーを作成",}} />
      <Stack.Screen name="FolderDetail" component={FolderDetail} options={({route, navigation})=>({
        title: `フォルダー: ${route.params.folderName}`,
      })} />
      <Stack.Screen name="WordList" component={WordList} options={({route, navigation})=>({
        title: `単語リスト: ${route.params.folderName}`,
        headerLeft:()=>{
          return (
            <Pressable style={{width: 44,height: 44, justifyContent:"center",alignItems:"flex-start",}}
            onPress={()=>{navigation.navigate("MemoFolders")}}
            >
              <Image style={{width: 20,height: 20,resizeMode: "contain",}} source={require("./assets/back-arrow.png")}/>
            </Pressable>
          )
        },
        headerRight:()=>{
          return (
          <NewMemoButton navigation={navigation} route={route}/>
          )
        }
        })} />
      <Stack.Screen name="NewMemo" component={NewMemo} options={({route, navigation})=>({title: `新しいメモを作成`})} />
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
      <Stack.Screen name="ScanScreen" component={ScanScreen} options={({navigation})=>({
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
        <Tab.Screen name="Memo" component={Home} options={({route})=>({
          title: 'メモ',
          tabBarLabel:({focused})=><SelfText style={[{fontSize: 10,fontFamily: 'NotoSansJP-Regular',fontWeight: 'bold',},focused?{color: "#DADA00",}:{color: "#fff",}]}>メモ</SelfText>,
          tabBarIcon:({focused})=><Image source={focused?require("./assets/icon-memo-active.png"):require("./assets/icon-memo.png")} style={{height: "100%", resizeMode: "contain",marginBottom: 5,}}/>,
          })}/>
        <Tab.Screen name="Scan" component={Scan} options={{
          title: "画像をスキャン",
          tabBarLabel:({focused})=><SelfText style={[{fontSize: 10,fontFamily: 'NotoSansJP-Regular',fontWeight: 'bold'},focused?{color: "#DADA00",}:{color: "#fff",}]}>画像をスキャン</SelfText>,
          tabBarIcon:({focused})=><Image source={focused?require("./assets/icon-scanner-active.png"):require("./assets/icon-scanner.png")} style={{height: "100%",resizeMode: "contain",marginBottom: 5,}}/>,
          unmountOnBlur: true,
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


