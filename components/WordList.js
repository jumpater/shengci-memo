import React, { useState } from 'react';
import { Animated, Easing, StyleSheet, Text, ScrollView, View, SafeAreaView, TextInput, Button, Pressable } from 'react-native';
import SelfText from './Common/SelfText';
export default WordList=()=>{
  const [enterdText, setEnterdText] = useState(null)
    return (
      <>
        <SafeAreaView style={{backgroundColor: '#00BCDA',}}>
            <View style={styles.header}><SelfText style={styles.headerTxt}>単語リスト</SelfText></View>
        </SafeAreaView>
        <Pressable onPress={()=> console.log('hello')}>
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
        </ScrollView>
      </>
    )
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
    }
  });