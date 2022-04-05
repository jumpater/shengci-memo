import React from 'react';
import {ActivityIndicator, View, StyleSheet, Text} from 'react-native';

export default LoadAnim = (props)=>{
    console.log("loadingNow:",props.loadingNow)
    return (
        <View style={[styles.container, typeof props.wrapStyle === 'undefined'?props.wrapStyle:{}, props.loadingNow?{}:{transform:[{scale: 0}]}]}>
            <ActivityIndicator style={[styles.loader, typeof props.style === 'undefined'?props.style:{}]} size="large" color="#00BCDA" animating={props.loadingNow}/>
        </View>
    );
}

const styles= StyleSheet.create({
    container:{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 98,
        backgroundColor: '#fff',
        opacity: 0.7,
    },
    loader:{
        position: 'relative',
        zIndex: 99,
    }
});