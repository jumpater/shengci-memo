import React, { useState, useEffect } from 'react';
import {TouchableOpacity, StyleSheet, ScrollView, View, TextInput, Pressable, Button, } from 'react-native';
import SelfText from './Common/SelfText';
import PreMemo from './Common/PreMemo';
import StrageClassManager from '../Classes/StrageClassManager';
import MemoCard from '../Classes/MemoCard';


export default AddList=({ route, navigation })=>{
    const [cards, setCards] = useState(null);
    const [memoObjs, setMemoObjs] = useState(new Map());
    //配列と単語メモのマップ⇒描画
    // const words = route.params.words;
    useEffect(()=>{
        const words = new Map([["好",1],["点心",5],["上课",9]]);
        const ary = [];
        for(let [key,value] of words){
            ary.push(<PreMemo key={value} word={key} memoObjs={memoObjs} setMemoObjs={setMemoObjs}></PreMemo>)
        }
        setCards(ary)
    },[])
    return (
      <>
            <ScrollView style={styles.cards}>
              {cards}
            </ScrollView>
            <View style={styles.addButtonContainer}>
                <TouchableOpacity style={styles.addButton}
                onPress={async()=>{
                  const manager = new StrageClassManager("MemoCard");
                  console.log(memoObjs)
                  for(let [key,value] of memoObjs){
                    const id = await MemoCard.generateId();
                    await manager.save(new MemoCard(id, key, value).passer())
                  }
                  navigation.navigate("WordList");
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
  },
  });