import React, { useState, useEffect } from 'react';
import {StyleSheet,View,TouchableOpacity,Image,Alert} from 'react-native';
import { Camera } from 'expo-camera';
import SelfText from '../Common/SelfText';
import LoadAnim from '../Common/LoadAnim';

export default ScanScreen=({navigation})=>{
    const [hasPermission, setHasPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [loadingNow, setLoadingNow] = useState(false);
    
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
      <>
      <LoadAnim loadingNow={loadingNow} />
      <View style={styles.container}>
        <Camera style={styles.camera}
         ref={ref=>{
           setCamera(ref)
         }}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={async() => {
               const image = await camera.takePictureAsync({
                 quality: 1.2,
               });
               setLoadingNow(true);
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
                  const json = await result.json();
                  const ary = JSON.parse(json);
                  if(ary.length){
                    navigation.navigate('ReadImage',
                    {
                      predictions:ary,
                    })
                    setLoadingNow(false)
                    camera.resumePreview();
                  }else{
                    setLoadingNow(false)
                    camera.resumePreview();
                    Alert.alert("エラー","中国語を正しく認識出来ませんでした",[
                      {
                          text: "撮り直す",
                          onPress: () =>{},
                          style: "default",
                      }
                  ]);
                  }
               }catch(e){
                  setLoadingNow(false)
                  camera.resumePreview();
                  Alert.alert("エラー","電波環境などをお確かめの上もう一度お試し下さい",[
                    {
                        text: "撮り直す",
                        onPress: () =>{},
                        style: "default",
                    }
                ]);
               }
              }}>
              <Image style={{height:70, width:70,}} source={require("../../assets/shutter-button.png")}/>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={styles.flashButton}
              onPress={() => {
                setIsFlashMode(isFlashMode === Camera.Constants.FlashMode.off?isFlashMode === Camera.Constants.FlashMode.on:Camera.Constants.FlashMode.off) 
              }}>
              <Image source={isFlashMode === Camera.Constants.FlashMode.off?require("../../assets/flash-button.png"):require("../../assets/notflash-button.png")}/>
            </TouchableOpacity> */}
          </View>
        </Camera>
      </View>
      </>
    );
}

const createImageObj = (image)=>{
  let localUri = image.uri;
  let filename = localUri.split('/').pop();
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;
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