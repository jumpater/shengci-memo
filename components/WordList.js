import React, { useState, useEffect } from 'react';
import { Dimensions, TouchableOpacity, StyleSheet, ScrollView, View, TextInput, Pressable, Button, } from 'react-native';
import SelfText from './Common/SelfText';
import StrageClassManager from '../Classes/StrageClassManager';
import Memo from './Common/Memo';
import ModalCore from '../components/Common/ModalCore';
import {useIsFocused} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';


export default WordList=({ navigation })=>{
  const isFocused = useIsFocused();
  const [cards, setCards] = useState(null);
  const [enterdText, setEnterdText] = useState("");
  const [sort, setSort] = useState('新しい順');
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const queryCards = async (q="",qString="")=>{
    try{
      const manager = new StrageClassManager('MemoCard');
      let result = null;
      if(q!=="" && qString!==""){
        result = await manager.query(q, qString);
      }else{
        result = await manager.queryAll();
      }
      return result;
    }catch(error){
      console.log(error);
      return [];
    }
  }
  const setUpCards = (cardAry)=>{
    if(!cardAry.length){
      setCards(<SelfText style={styles.notfoundText}>メモが見つかりません(T-T)</SelfText>);
      return;
    }
    switch(sort){
      case '新しい順':
        cardAry.sort((a,b)=> {console.log("date computed:",b.createdAt - a.createdAt);return b.createdAt - a.createdAt;});
      break;
      case '古い順':
        cardAry.sort((a,b)=> {console.log("date computed:",a.createdAt - b.createdAt);return a.createdAt - b.createdAt});
      break;
      case 'お気に入り':
        cardAry = cardAry.filter((card)=>card.favorite);
      break;
    }
    console.log('setUpAfter:',cardAry);
    if(!cardAry.length){
      setCards(
      <SelfText style={styles.notfoundText}>メモが見つかりません(T-T)</SelfText>
      );
      return;
    }
    setCards(cardAry.map(el=>{return <Memo nav={navigation} key={el.id} obj={el}/>}));
  }
  React.useEffect(async()=>{
    console.log("sort:", sort);
    const result = await queryCards('q', enterdText? `q.word.indexOf("${enterdText}") !== -1 || q.description.indexOf("${enterdText}") !== -1`:"");
    setUpCards(result);
  },[isFocused, sort])

    return (
      <>
      <SortModal
      modalVisible={sortModalVisible}
      setModalVisible={setSortModalVisible}
      setSort={setSort}
      />
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
                        onEndEditing={async ()=>{
                          if(enterdText !== ""){
                              const result = await queryCards('q', `q.word.indexOf("${enterdText}") !== -1 || q.description.indexOf("${enterdText}") !== -1`);
                              setUpCards(result);
                          }else{
                            const result = await queryCards();
                            setUpCards(result);
                          }
                        }}
                        >
                        </TextInput>
                    </View>
                    <View style={styles.searchSorted}>
                        <SelfText style={{fontSize: 14,}}>並びかえ:</SelfText>
                        <TouchableOpacity
                        onPress={()=>{
                          setSortModalVisible(true);
                        }}>
                          <SelfText style={{fontSize: 14,}}>
                             {sort}
                          </SelfText>
                        </TouchableOpacity>
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

const SortModal = (props)=>{
  const [newSort, setNewSort] = useState("newer");
    return (
      <ModalCore
      modalVisible={props.modalVisible}
      wrapStyle={styles.sortModalWrapper}
      style={styles.sortModal}
      setModalVisible={props.setModalVisible}
      >
        <Pressable style={{flex: 7,width: '100%',}} onPress={()=>{props.setSort(newSort);props.setModalVisible(false);}}></Pressable>
        <View style={{flex: 3,width: '100%',backgroundColor: '#fff', alignItems: 'center',justifyContent: 'center',}}>
          <Picker
              style={styles.sortPicker}
              itemStyle={styles.sortPickerItem}
              selectedValue={newSort}
              onValueChange={(itemValue, itemIndex) =>
                setNewSort(itemValue)
              }>
              <Picker.Item label="新しい順" value="新しい順" />
              <Picker.Item label="古い順" value="古い順" />
              <Picker.Item label="お気に入り" value="お気に入り" />
          </Picker>
        </View>
      </ModalCore>
    );
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
    sortModal:{
      borderRadius: 0,
      height: '100%',
      margin: 0,
      padding: 0,
      backgroundColor: 'transparent',
    },
    sortModalWrapper:{
      // justifyContent: 'flex-end',
    },
    sortPicker:{
      width: Dimensions.get('window').width -70,
    },
    notfoundText:{
      fontFamily: 'NotoSansJP-Regular',
      width: '100%',
      textAlign: 'center',
      height: 200,
      paddingTop: 90,
      color: '#B5B5B5',
    },
    // sortPickerItem:{
    //   height: 150, 
    //   width: '100%',
    // },
  });