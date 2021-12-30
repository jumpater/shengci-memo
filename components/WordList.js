import React, { useState, useEffect } from 'react';
import { Dimensions, TouchableOpacity, StyleSheet, Text, ScrollView, View, TextInput, Button, Pressable, } from 'react-native';
import SelfText from './Common/SelfText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StrageClassManager from '../Classes/StrageClassManager';
import Memo from './Common/Memo';
import ModalCore from '../components/Common/ModalCore';
import MemoCard from '../Classes/MemoCard';
import {useIsFocused} from '@react-navigation/native'


export default WordList=({ navigation })=>{
  const isFocused = useIsFocused();
  const [cards, setCards] = useState(null);
  const [enterdText, setEnterdText] = useState(null);
  const [creating, setCreating] = useState(false);
  const [q, setQ] = useState("");
  const [qString, setQstring] = useState("");
  //to query
  const queryCards = (q="",qString="")=>{
    const manager = new StrageClassManager('MemoCard');
    if(q!=="" && qString!==""){
      manager.query(q, qString).then(queried=>{
        console.log("queried:", queried)
        if(!queried)return null;
          setCards(queried.map(el=>{return <Memo nav={navigation} key={el.id} obj={el}/>}));
      });
    }else{
      manager.queryAll().then(queried=>{
        // console.log("queried:",queried);
        if(!queried)return null;
          setCards(queried.map(el=>{return <Memo nav={navigation} key={el.id} obj={el}/>}));
      });
    }
  }
  React.useEffect(()=>{queryCards()},[isFocused])

    return (
      <>
        <Pressable onPress={()=>{navigation.navigate('NewMemo',{existingMemo: null});}}>
            <View style={styles.plus}>
                <SelfText style={styles.plusMark}>+ </SelfText>
                <SelfText style={styles.plusTxt}>新しい単語を追加</SelfText>
            </View>
        </Pressable>
        <ScrollView>
            <View style={styles.inner}>
                <View style={styles.search}>
                    <SelfText style={{fontSize: 14,}}>キーワード検索:</SelfText>
                    <View style={styles.searchKeyword}>
                        <TextInput 
                        style={styles.searchKeywordInput}
                        value={enterdText}
                        returnKeyType='done'
                        placeholder='キーワードを入力してください'
                        onChangeText={(text)=> setEnterdText(text)}
                        onEndEditing={()=>{
                          queryCards('q', `q.word.indexOf("${enterdText}") !== -1 || q.description.indexOf("${enterdText}") !== -1`);
                        }}
                        >
                        </TextInput>
                    </View>
                    <View style={styles.searchSorted}>
                        <SelfText style={{fontSize: 14,}}>並びかえ:</SelfText>
                        <SelfText style={{fontSize: 14,}}> 新しい順</SelfText>
                    </View>
                </View>
            </View>
            <View>
              {cards}
            </View>
        </ScrollView>
      </>
    )
}

const styles = StyleSheet.create({
    inner:{
      paddingLeft: 15,
      paddingRight: 15,
    },
    plus:{
      flexDirection: 'row',
      alignItems: 'center',
      height: 70,
      paddingRight: 15,
      paddingLeft: 15,
      borderColor: '#B5B5B5',
      borderWidth: 1,
    },
    plusTxt:{
      lineHeight: 30,
      fontSize: 18,
    },
    plusMark:{
      color: '#00BCDA',  
      fontSize: 30,
      fontFamily: 'Deng',
      marginRight: 10,
    },
    search:{
      marginTop: 40,
    },
    searchKeyword:{
      marginTop: 10,
    },
    searchKeywordInput:{
      width: Dimensions.get('window').width -30,
      height: 40,
      borderWidth: 1,
      paddingRight: 5,
      paddingLeft: 5,
    },
    searchKeywordBtn: {
        backgroundColor: '#00BCDA',
        width: 35,
        height: 45,
    },
    searchSorted: {
        marginTop: 15,
        flexDirection: 'row',
    },
    createModal:{
      borderRadius: 0,
      // shadowRadius: 0,
      height: 300,
    },
    createInput:{
      height: 50,
      borderColor: "#000",
      borderWidth: 1,
      width: 300,
      padding: 5,
      marginBottom: 20,
    },
    createTextarea:{
      height: 100,
      borderColor: "#000",
      borderWidth: 1,
      width:300,
      padding: 5,
    },
  });