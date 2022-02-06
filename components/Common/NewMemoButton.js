import React from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import SelfText from './SelfText';

export default NewMemoButton=(props)=>{
    return (
        <Pressable onPress={()=>{props.navigation.navigate('NewMemo',{existingMemo: null});}}>
        <View style={styles.plus}>
            <SelfText style={styles.plusMark}>+</SelfText>
        </View>
        </Pressable>
    ) 
} 


const styles = StyleSheet.create({
    // plus:{
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     height: 70,
    //     paddingRight: 15,
    //     paddingLeft: 15,
    //     borderColor: '#B5B5B5',
    //     borderWidth: 1,
    //   },
    //   plusTxt:{
    //     lineHeight: 30,
    //     fontSize: 18,
    //   },
      plusMark:{

        color: '#fff',  
        fontSize: 40,
        fontFamily: 'Deng',
        marginRight: 10,
      },
})


