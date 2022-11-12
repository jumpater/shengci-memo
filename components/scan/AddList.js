import React, { useState, useEffect } from 'react';
import {StyleSheet, ScrollView, View,TouchableOpacity,Alert, Dimensions,Pressable} from 'react-native';
import SelfText from '../Common/SelfText';
import PreMemo from '../Common/PreMemo';
import StrageClassManager from '../../Classes/StrageClassManager';
import MemoCard from '../../Classes/MemoCard';
import LoadAnim from '../Common/LoadAnim';
import Constants from 'expo-constants';
import {Picker} from '@react-native-picker/picker';
import ModalCore from '../Common/ModalCore';
import { CommonActions } from '@react-navigation/native'

export default AddList=({ route, navigation })=>{
    const [cards, setCards] = useState(null);
    const [memoObjs, setMemoObjs] = useState(new Map(Object.entries(JSON.parse(route.params.words))));
    const [loadingNow, setLoadingNow] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [selectedFolderName, setSelectedFolderName] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [folders,setFolders] = useState([]);
    const [refs, setRefs] = useState([])
    const [allTranslated, setAllTranslated] = useState(false);

    //配列と単語メモのマップ⇒描画
    useEffect(()=>{
      (async()=>{
        const ary = [];
        const refArr = [];
        let i = 0;
        for(let key of memoObjs.keys()){
            const ref = React.createRef();
            ary.push(<PreMemo ref={ref} key={i} word={key} memoObjs={memoObjs} setMemoObjs={setMemoObjs} setLoadingNow={setLoadingNow}></PreMemo>);
            refArr.push(ref);
            i++;
        }
        setRefs(refArr); 
        setCards(ary);
        //get folder
        const manager = new StrageClassManager("MemoFolder");
        const folders = await manager.queryAll();
        if(folders.length){
          setFolders(folders.map(folder=><Picker.Item key={folder.id} label={folder.name} value={folder.id}/>))
        }
      })();
    },[]);

    return (
      <View style={[{flex:1},modalVisible?{backgroundColor: "rgba(0,0,0,0.15)",}:{}]}>
            <LoadAnim loadingNow={loadingNow}/>
            <ModalCore
            wrapStyle={styles.folderModalWrapper}
            style={styles.folderModal}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            >
              <Pressable style={{flex: 7,width: '100%',}}
              onPress={()=>{
                if(selectedFolder !== null && selectedFolderName !== ""){
                  Alert.alert(`メモを追加`,`フォルダー"${selectedFolderName}"にメモを追加しますか？`,[
                    {
                      text: "キャンセル",
                      onPress: () =>{
                        setModalVisible(false);
                      },
                      style: "default",
                    },
                    {
                      text: "OK",
                      onPress: async() =>{
                        setModalVisible(false);
                        if(memoObjs!==[]){
                          setLoadingNow(true);
                          const manager = new StrageClassManager("MemoCard"+selectedFolder);
                          for(let [key,value] of memoObjs){
                            const id = await MemoCard.generateId("MemoCard"+selectedFolder);
                            await manager.save(new MemoCard(selectedFolder,id, key, value).passer())
                          }
                          setLoadingNow(false);
                          navigation.navigate("MemoFolders");
                        }
                      },
                      style: "default",
                    },
                  ])       
                }
                setModalVisible(false);
              }}></Pressable>
              <View style={{flex: 3,width: '100%',backgroundColor: '#fff', alignItems: 'center',justifyContent: 'center',}}>
                <FolderPicker selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder} folders={folders} setSelectedFolderName={setSelectedFolderName}/>
              </View>
            </ModalCore>
            <View style={styles.topBtns}>
              <TouchableOpacity
              disabled={allTranslated}
              style={[styles.translateButton,allTranslated?{opacity: 0.2,}:{}]}
              onPress={async()=>{
                      Alert.alert("全ての単語を自動翻訳","全ての単語の説明を自動翻訳で補いますか？(手入力した説明は全て上書きされます)",[
                        {
                          text: "キャンセル",
                          onPress: () =>{},
                          style: "default",
                        },
                        {
                          text: "OK",
                          onPress: async() =>{
                            setLoadingNow(true);
                            let url = `https://api-free.deepl.com/v2/translate?auth_key=${Constants.manifest.extra.translateApikey}&source_lang=ZH`;
                            for(let key of memoObjs.keys()){
                              url+=`&text=${key}`;
                            }
                            url += "&target_lang=JA";
                            const result = await fetch(url);
                            const obj = await result.json();
                            let i = 0;
                            for(let key of memoObjs.keys()){
                              memoObjs.set(key,obj.translations[i].text);
                              console.log(refs[i]);
                              refs[i].current.changeTextarea(obj.translations[i].text);
                              console.log(refs[i]);
                              refs[i].current.changeTraslated(true);
                              i++;
                            }
                            setAllTranslated(true);
                            setMemoObjs(memoObjs);
                            setLoadingNow(false);
                            try{
                              // let url = `https://api-free.deepl.com/v2/translate?auth_key=${Constants.manifest.extra.translateApikey}&source_lang=ZH`;
                              // for(let key of memoObjs.keys()){
                              //   url+=`&text=${key}`;
                              // }
                              // url += "&target_lang=JA";
                              // const result = await fetch(url);
                              // const obj = await result.json();
                              // let i = 0;
                              // for(let key of memoObjs.keys()){
                              //   memoObjs.set(key,obj.translations[i].text);
                              //   refs[i].current.changeTextarea(obj.translations[i].text);
                              //   refs[i].current.changeTraslated(true);
                              //   i++;
                              // }
                              // setAllTranslated(true);
                              // setMemoObjs(memoObjs);
                              // setLoadingNow(false);
                            }catch(e){
                              setLoadingNow(false);
                              Alert.alert("エラー","電波環境などをお確かめの上もう一度お試し下さい",[                        {
                                text: "OK",
                                onPress: () =>{},
                                style: "default",
                              }])
                            }
                          },
                          style: "default",
                        },
                      ])
                }}>
                <SelfText style={{color: "#fff",fontSize: 10,letterSpacing: 1,}}>全て自動翻訳する</SelfText>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.cards}>
              {cards}
            </ScrollView>
            <View style={styles.addButtonContainer}>
                <TouchableOpacity style={styles.addButton}
                onPress={async()=>{
                  if(folders.length){
                    setModalVisible(true);
                  }else{
                    Alert.alert(
                      "フォルダーが作成されていません",
                      "単語を格納するフォルダーを作成する必要があります。",
                      [
                        {
                          text: "フォルダー作成画面へ",
                          onPress: () =>{
                            navigation.navigate("NewFolder");
                          },
                          style: "default",
                        },
                      ]
                    )
                  }
                  }}>
                    <SelfText style={{color: "#fff",}}>保存先を選択</SelfText>
                </TouchableOpacity>
            </View>
      </View>
    )
}

const FolderPicker=(props)=>{
  return(
    <Picker
    style={styles.folderPicker}
    selectedValue={props.selectedFolder}
    onValueChange={(itemValue, itemIndex)=>{
      props.setSelectedFolder(itemValue)
      props.setSelectedFolderName(props.folders[itemIndex].props.label)
    }}>
      {props.folders}
    </Picker>
  )
}


const styles = StyleSheet.create({
    cards:{
      flex:1,
      marginBottom: 20,
      marginTop: 10,
      borderTopColor: "#000",
    },
    addButton:{
      width: 150,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#00DA83",
      borderRadius: 10,
  },
  addButtonContainer:{
      marginTop: 20,
      paddingBottom: 20,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
  },
  topBtns:{
    marginHorizontal: 15,
    alignItems: "flex-end",
  },
  translateButton:{
    marginVertical: 10,
    width: 95,
    height: 26,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#BD00DA",
    borderRadius: 5,
    },
    folderPicker:{
      width: Dimensions.get('window').width -70,
    },
    folderModal:{
      borderRadius: 0,
      height: '100%',
      margin: 0,
      padding: 0,
      backgroundColor: 'transparent',
    },
    folderModalWrapper:{
      // justifyContent: 'flex-end',
    },
  });