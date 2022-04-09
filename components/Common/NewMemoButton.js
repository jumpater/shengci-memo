import React from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import SelfText from './SelfText';

export default NewMemoButton=(props)=>{
    return (
        <Pressable onPress={()=>{props.navigation.navigate('NewMemo',{existingMemo: null, id: props.route.params.id, folderName: props.route.params.folderName,});}}>
        <View style={styles.plus}>
            <SelfText style={styles.plusMark}>+</SelfText>
        </View>
        </Pressable>
    ) 
} 


const styles = StyleSheet.create({
      plusMark:{
        color: '#fff',  
        fontSize: 40,
        fontFamily: 'Deng',
        marginRight: 10,
      },
})


