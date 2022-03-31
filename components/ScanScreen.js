import React, { useState, useEffect } from 'react';
import {StyleSheet,View,TouchableOpacity,Image} from 'react-native';
import { Camera } from 'expo-camera';
import SelfText from './Common/SelfText';

export default ScanScreen=({navigation})=>{
    const [hasPermission, setHasPermission] = useState(null);
    const [camera, setCamera] = useState(null)
    const [isFlashMode, setIsFlashMode] = useState(Camera.Constants.FlashMode.off)
    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      return <SelfText>カメラへのアクセスが出来ませんでした。</SelfText>;
    }
    return (
      <View style={styles.container}>
        <Camera style={styles.camera}
         flashMode={isFlashMode}
         ref={ref=>{
           setCamera(ref)
         }}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={async() => {
               const image = await camera.takePictureAsync({
                 quality: 1.0,
                 base64: true,
                 exif: true,
               });
               camera.pausePreview();
               let formData = new FormData();
               formData.append('file', createImageObj(image));
               try{
                  const result = await fetch('https://obscure-fjord-44952.herokuapp.com/hanzi-ocr/', {
                    method: 'POST',
                    body: formData,
                    headers: {
                      'content-type': 'multipart/form-data',
                    }
                  })
                  console.log(result)
                  const json = await result.json();
                  const ary = JSON.parse(json);
                  if(ary){
                    navigation.navigate('ReadImage',
                    {
                      predictions:ary
                    })
                  }else{
                    console.log("画像の読み込みに失敗しました")
                  }
               }catch(e){
                  console.log(e)
                  console.log("api was failed")
               }
               camera.resumePreview();
              }}>
              <Image style={{height:70, width:70,}} source={require("../assets/shutter-button.png")}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.flashButton}
              onPress={() => {
                setIsFlashMode(isFlashMode === Camera.Constants.FlashMode.off?isFlashMode === Camera.Constants.FlashMode.on:Camera.Constants.FlashMode.off) 
              }}>
              <Image source={isFlashMode === Camera.Constants.FlashMode.off?require("../assets/flash-button.png"):require("../assets/notflash-button.png")}/>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
}

const createImageObj = (image)=>{
  let localUri = image.uri;
  console.log(localUri);
  let filename = localUri.split('/').pop();
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;
  console.log(type)
  return { uri: localUri, name: filename, type };
}

const styles = StyleSheet.create({
    container:{
      flex:1,
    },
    camera:{
        flex:1,
    },
    buttonContainer: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      justifyContent: "center",
      alignItems: 'flex-end',
      margin: 20,
      position:"relative",
    },
    flashButton:{
      position:"absolute",
      bottom: 70,
      right: 0, 
    },
});