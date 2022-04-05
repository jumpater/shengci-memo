import React, { useState, useEffect } from 'react';
import {StyleSheet, ScrollView, View,TouchableOpacity,Alert} from 'react-native';
import SelfText from '../Common/SelfText';
import PreMemo from '../Common/PreMemo';
import StrageClassManager from '../../Classes/StrageClassManager';
import MemoCard from '../../Classes/MemoCard';
import LoadAnim from '../Common/LoadAnim';
import Constants from 'expo-constants';

export default AddList=({ route, navigation })=>{
    const [cards, setCards] = useState(null);
    const [memoObjs, setMemoObjs] = useState(new Map(Object.entries(JSON.parse(route.params.words))));
    const [loadingNow, setLoadingNow] = useState(false);
    //配列と単語メモのマップ⇒描画
    useEffect(()=>{
      console.log(memoObjs);
      const ary = [];
      let i = 0;
      for(let key of memoObjs.keys()){
          ary.push(<PreMemo key={i} word={key} memoObjs={memoObjs} setMemoObjs={setMemoObjs} setLoadingNow={setLoadingNow}></PreMemo>);
          i++;
      }
      setCards(ary)
    },[])

    return (
      <>
            <LoadAnim loadingNow={loadingNow}/>
            <View style={styles.topBtns}>
            <TouchableOpacity
            style={[styles.translateButton]}
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
                            try{
                              let url = `https://api-free.deepl.com/v2/translate?auth_key=${Constants.manifest.extra.translateApikey}&source_lang=ZH`;
                              for(let key of memoObjs.keys()){
                                url+=`&text=${key}`;
                              }
                              url += "&target_lang=JA";
                              const result = await fetch(url);
                              const obj = await result.json();
                              console.log(obj);
                              let i = 0;
                              const manager = new StrageClassManager("MemoCard");
                              for(let key of memoObjs.keys()){
                                const id = await MemoCard.generateId();
                                await manager.save(new MemoCard(id, key, obj.translations[i].text).passer())
                                i++
                              }
                              setLoadingNow(false);
                              navigation.navigate("WordList");
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
                  if(memoObjs!==[]){
                    const manager = new StrageClassManager("MemoCard");
                    for(let [key,value] of memoObjs){
                      const id = await MemoCard.generateId();
                      await manager.save(new MemoCard(id, key, value).passer())
                    }
                    navigation.navigate("WordList");
                  }
                  }}>
                    <SelfText style={{color: "#fff",}}>メモを作成</SelfText>
                </TouchableOpacity>
            </View>
      </>
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
  });