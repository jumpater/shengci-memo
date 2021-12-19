import React from 'react';
import { Animated, Easing, StyleSheet, Text, ScrollView, View, SafeAreaView, TextInput, Button } from 'react-native';
import SelfText from './Common/SelfText';
export default WordList=()=>{
    return (
            <ScrollView>
                <SafeAreaView style={{backgroundColor: '#00BCDA',}}>
                    <View style={styles.header}><SelfText style={styles.headerTxt} content="単語リスト" /></View>
                </SafeAreaView>
                <View style={styles.inner}>
                    <View style={styles.plus}>
                        <SelfText content="+ " style={styles.plusMark} />
                        <SelfText content="新しい単語を追加" style={styles.plusTxt} />
                    </View>
                    <View style={styles.search}>
                        <SelfText content="キーワード検索:" />
                        <View style={styles.searchKeyword}>
                            <TextInput style={styles.searchKeywordInput}></TextInput>
                            <Button style={styles.searchKeywordBtn} title='検索'/>
                        </View>
                        <View style={styles.searchSorted}>
                            <SelfText content="並びかえ:" />
                            <SelfText content=" 新しい順" />
                        </View>
                    </View>
                </View>
            </ScrollView>
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
      marginRight: -15,
      marginLeft: -15,
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