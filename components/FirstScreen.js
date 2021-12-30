import React, { useState } from 'react';
import { Animated, Easing, StyleSheet, Text } from 'react-native';

export default FirstScreen=()=>{
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  const [fadeFlag, setFadeFlag] = useState(false) 

  React.useEffect(()=>{
    Animated.timing(fadeAnim, {
      toValue: 0,
      easing: Easing.linear(),
      duration: 1000,
      delay: 3000,
      useNativeDriver: true
    }).start(()=>setFadeFlag(true));
  },[])
  return (
    <>
      <Animated.View style={[styles.firstScreen,{opacity: fadeAnim}, fadeFlag? {transform:[{scale: 0}],} : {}]}>
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