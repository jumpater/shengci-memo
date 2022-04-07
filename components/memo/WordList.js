import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, TouchableOpacity, StyleSheet, ScrollView, View, TextInput, Pressable, Button, } from 'react-native';
import SelfText from '../Common/SelfText';
import StrageClassManager from '../../Classes/StrageClassManager';
import Memo from '../Common/Memo';
import ModalCore from '../Common/ModalCore';
import {Picker} from '@react-native-picker/picker';
import LoadAnim from '../Common/LoadAnim';
import MemoPager from '../Common/MemoPager';
import {useIsFocused} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default WordList=({ route,navigation })=>{
  const isFocused = useIsFocused();
  const [cards, setCards] = useState(null);
  const [enterdText, setEnterdText] = useState("");
  const [sort, setSort] = useState('新しい順');
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [loadingNow, setLoadingNow] = useState(false);
  const [listNum, setListNum] = useState(1);
  const [pager, setPager] = useState(null);
  const isInitialMount = useRef(true);
  //検索機能によるキーワードによる絞り込みを含んだデータ取得
  const queryCards = async (q="",qString="")=>{
    setLoadingNow(true);
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
  const sortCards = (cardAry, listNum)=>{
    switch(sort){
      case '新しい順':
        cardAry.sort((a,b)=> {return b.createdAt - a.createdAt;});
      break;
      case '古い順':
        cardAry.sort((a,b)=> {return a.createdAt - b.createdAt});
      break;
      case 'お気に入り':
        cardAry = cardAry.filter((card)=>card.favorite);
      break;
    }
    //小数点切り上げで10ずづで区切った時のリストの数
    const allListNum = Math.ceil(cardAry.length / 10)
    console.log(`allListNum:${allListNum}`)
    console.log(`listNum:${listNum}`)
    if(allListNum > 1){
      console.log("pager set")
      //ページ遷移用ページャセット
      setPager(<MemoPager listNum={listNum} allListNum={allListNum} setListNum={setListNum}></MemoPager>);
      //カードセット
      // cardAry = cardAry.slice((listNum-1)*1,listNum*1)
      cardAry = cardAry.slice((listNum-1)*10,listNum*10)
    }else{
      //ページ数1以下ならページネーションの存在価値なし
      setPager(null);
    }
    return cardAry;
  }

  //配列と単語メモのマップ⇒描画
  const setUpCards = (cardAry)=>{
    if(!cardAry.length){
      setCards(<SelfText style={styles.notfoundText}>メモが見つかりません(T-T)</SelfText>);
      setLoadingNow(false);
      return;
    }
    //favFuncはお気に入り登録した後データを再読み込みするための関数
    setCards(cardAry.map(el=>{return <Memo nav={navigation} key={el.id} obj={el} favFunc={async()=>{
      const result = await queryCards('q', enterdText? `q.word.indexOf("${enterdText}") !== -1 || q.description.indexOf("${enterdText}") !== -1`:"");
      setUpCards(sortCards(result, listNum));
    }}/>}));
    setLoadingNow(false);
  }
    //絞り込み条件が変わった時1ページ目に戻りたい
    React.useEffect(async()=>{
      if(isInitialMount.current){
        isInitialMount.current=false
      }else{
        if(listNum!==1){
          setListNum(1);
        }else{
          if(enterdText !== ""){
            const result = await queryCards('q', `q.word.indexOf("${enterdText}") !== -1 || q.description.indexOf("${enterdText}") !== -1`);
            setUpCards(sortCards(result, listNum));
          }else{
          const result = await queryCards();
          setUpCards(sortCards(result, listNum));
          }
        } 
      }
    },[sort]);
  
    React.useEffect(async()=>{
      if(isFocused){
        if(enterdText !== ""){
          const result = await queryCards('q', `q.word.indexOf("${enterdText}") !== -1 || q.description.indexOf("${enterdText}") !== -1`);
          setUpCards(sortCards(result, listNum));
        }else{
        const result = await queryCards();
        setUpCards(sortCards(result, listNum));
        }
      }
    },[listNum, isFocused]);

    return (
      <>
      <LoadAnim loadingNow={loadingNow}/>
      <SortModal
      modalVisible={sortModalVisible}
      setModalVisible={setSortModalVisible}
      setSort={setSort}
      />
            <View style={styles.inner}>
                <View style={styles.search}>
                    <View style={styles.searchKeyword}>
                        <TextInput 
                        style={styles.searchKeywordInput}
                        value={enterdText}
                        returnKeyType='done'
                        placeholder='キーワードを入力してください'
                        onChangeText={(text)=> setEnterdText(text)}
                        onEndEditing={async ()=>{
                          if(listNum!==1){
                            //ページ変更でuseEffectによりリロード
                            setListNum(1);
                          }else{
                            //1ページ目ならuseEffectが発火しないため手動でリロード
                              if(enterdText !== ""){
                                  const result = await queryCards('q', `q.word.indexOf("${enterdText}") !== -1 || q.description.indexOf("${enterdText}") !== -1`);
                                  setUpCards(sortCards(result, listNum));
                              }else{
                                const result = await queryCards();
                                setUpCards(sortCards(result, listNum));
                              }
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
                          <View style={styles.sortTxt}>
                            <SelfText style={{fontSize: 12, color: "#fff",}}>
                              {sort}
                            </SelfText>
                          </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView style={styles.cards}>
              {cards}
            </ScrollView>
            {pager}
      </>
    )
}

const SortModal = (props)=>{
  const [newSort, setNewSort] = useState("新しい順");
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
    search:{
      marginTop: 10,
    },
    searchKeyword:{
      marginTop: 0,
    },
    searchKeywordInput:{
      width: Dimensions.get('window').width -25,
      height: 35,
      backgroundColor: "#E4E4E4",
      borderRadius: 100,
      paddingRight: 10,
      paddingLeft: 10,
    },
    searchSorted: {
        marginTop: 15,
        flexDirection: 'row',
    },
    sortTxt:{
      backgroundColor: "#00BCDA",
      borderRadius: 100,
      paddingRight: 5,
      paddingLeft: 5,
      marginLeft: 8,
      paddingTop:2,
      paddingBottom: 2,
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
    cards:{
      flex:1,
      marginBottom: 20,
      marginTop: 10,
      borderTopColor: "#000",
    }
  });