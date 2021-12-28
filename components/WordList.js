import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, ScrollView, View, SafeAreaView, TextInput, Button, Pressable, } from 'react-native';
import SelfText from './Common/SelfText';
import StrageClassManager from '../Classes/StrageClassManager';
import Memo from './Common/Memo';
import ModalCore from '../components/Common/ModalCore';
import MemoCard from '../Classes/MemoCard';


export default WordList=()=>{
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
        if(!queried)return null;
          setCards(queried.map(el=>{return <Memo obj={el}/>}));
      });
    }else{
      manager.queryAll().then(queried=>{
        console.log("queried:",queried);
        if(!queried)return null;
          setCards(queried.map(el=>{return <Memo key={el.id} obj={el}/>}));
      });
    }
  }
  React.useEffect(()=>{queryCards()},[])

    return (
      <>
        <ModalCore modalVisible={creating} setModalVisible={setCreating}>
            <CreateModalContent creating={creating} setCreating={setCreating} queryCards={queryCards}></CreateModalContent>
        </ModalCore>
        <SafeAreaView style={{backgroundColor: '#00BCDA',}}>
            <View style={styles.header}><SelfText style={styles.headerTxt}>単語リスト</SelfText></View>
        </SafeAreaView>
        <Pressable onPress={()=>{setCreating(true);console.log(creating);}}>
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
                        onChangeText={(text)=> setEnterdText(text)}
                        >
                        </TextInput>
                        <Button style={styles.searchKeywordBtn} title='検索'/>
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

const CreateModalContent=(props)=>{
  const [input, setInput] = useState("");
  const [textarea, setTextarea] = useState("");
  const [editable, setEditable] = useState(true);
  return(
    <>
      <View>
        <TextInput
          style={styles.createInput}
          value={input}
          onChangeText={(text)=> setInput(text)}
          placeholder='単語を入力してください'
          editable={editable}
          >
          </TextInput>
      </View>
      <View>
        <TextInput
        multiline
        onChangeText={text => setTextarea(text)}
        value={textarea}
        editable={editable}
        style={styles.createTextarea}
        placeholder='説明を入力してください'
        >
        </TextInput>
      </View>
      <View style={{flexDirection: 'row',}}>
        <TouchableOpacity
        onPress={()=>{
          setInput("");
          setTextarea("");
          props.setCreating(!props.creating);
        }}
        >
          <Text>キャンセル</Text>
        </TouchableOpacity>
        <TouchableOpacity
        disabled={input=="" || textarea==""}
        onPress={async ()=>{
          console.log("saving");
          setEditable(false);
          const manager = new StrageClassManager("MemoCard");
          const id = await MemoCard.generateId();
          await manager.save(new MemoCard(id, input, textarea).passer())
          setInput("");
          setTextarea("");
          props.setCreating(!props.creating);
          props.queryCards();
        }}
        >
          <Text>保存</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

function queryCards(q="",qString=""){
  const manager = new StrageClassManager('MemoCard');
  if(q!=="" && qString!==""){
    manager.query(q, qString).then(queried=>{
      console.log(queried);
      if(queried){
        setCards(queried.map(el=>{return <Memo obj={el}/>}));
      }
      return;
    });
  }else{
    manager.queryAll().then(queried=>{
      console.log(queried);
      if(queried){
        setCards(queried.map(el=>{return <Memo obj={el}/>}));
      }
      return;
    });
  }
}



const styles = StyleSheet.create({
    header: {
      height: 40,  
      backgroundColor: '#00BCDA',
    },
    headerTxt: {
      fontFamily: 'NotoSansJP-Regular',
      fontSize: 20,
      color: '#fff',
      textAlign: 'center',
    },
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
      flexDirection:'row',
      marginTop: 10,
    },
    searchKeywordInput:{
      width: 250,
      height: 35,
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
      margin: 20,
      backgroundColor: "green",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    createInput:{
      height: 50,
      borderColor: "#000",
      borderWidth: 1,
      width: 300,
    },
    createTextarea:{
      height: 100,
      borderColor: "#000",
      borderWidth: 1,
      width:300,
    },
  });