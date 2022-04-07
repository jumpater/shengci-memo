import React from 'react';
import {Text, StyleSheet} from 'react-native';

export default SelfText=(props)=>{
    return (
        <Text numberOfLines={props.numberOfLines?props.numberOfLines:0} ellipsizeMode={props.ellipsizeMode?props.ellipsizeMode:"tail"} style={[styles.text,props.style]}>{props.children}</Text>
    );
}

const styles = StyleSheet.create({
    text:{
        color: '#000',
        fontFamily: 'NotoSansJP-Light',
        fontSize: 16, 
    }
})