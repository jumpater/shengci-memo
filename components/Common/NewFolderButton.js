import React from 'react';
import {StyleSheet, View, Pressable,Modal,TextInput} from 'react-native';
import SelfText from './SelfText';

export default NewFolderButton=(props)=>{
    return (
        <Pressable onPress={()=>{
            props.navigation.navigate('NewFolder')
        }}>
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