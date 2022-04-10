import React, { useState,useEffect } from 'react';
import { Dimensions,Animated, Easing, StyleSheet, Text } from 'react-native';

export default FirstScreen=({route, navigation})=>{
    useEffect(()=>{
      setTimeout(()=>{
        navigation.reset({
          index: 0,
          routes: [{ name: 'MemoFolders' }],
        });
      },2000);
    },[]);
  return (
    <>
      <Animated.View style={styles.firstScreen}>
        <Text style={styles.firstTxt}>汉语生词备忘录</Text>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
    firstScreen: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 99,
      flex: 1,
      backgroundColor: '#00BCDA',
      alignItems: 'center',
      justifyContent: 'center',
    },
    firstTxt: {
      fontFamily: 'Deng',
      fontSize: 42,
      color: '#fff',
    }
  });