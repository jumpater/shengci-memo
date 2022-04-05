import React from 'react';
import { LayoutAnimation,StyleSheet, TouchableOpacity, Pressable,View, TextInput} from 'react-native';
import SelfText from './SelfText';
import Constants from 'expo-constants';

export default function PreMemo(props){
    const [editable, setEditable] = React.useState(true);
    const [textarea, setTextarea] = React.useState("");
    const [onDetail, setOnDetail] = React.useState(false);
    const [translated, setTranslated] = React.useState(false);
    return (
        <Pressable
        style={[styles.memo]}
        onPress={()=>{
            LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
                );  
            setOnDetail(!onDetail);
        }}
        >
            <View style={[styles.memoHead, onDetail?{maxHeight: '100%',}:{}]}>
                <SelfText numberOfLines={onDetail?0:1} style={styles.memoHeadText}>{props.word}</SelfText>
            </View>
            <View style={[styles.memoDetail, onDetail?{}:{height: 0,paddingTop: 0,paddingBottom: 0,}]}>
                <TextInput
                    editable={editable}
                    style={[styles.memoDesc, onDetail?{}:{minHeight:0,}]}
                    onChangeText={(newText)=>{
                        setTextarea(newText);
                        props.memoObjs.set(props.word,newText);
                        props.setMemoObjs(props.memoObjs);
                    }}
                    value={textarea}
                    placeholder="説明を入力して下さい"
                    multiline={true}
                />
                <View style={styles.memoBtns}>
                    <TouchableOpacity
                    disabled={props.word.length > 100 || translated}
                    style={[styles.translateButton, onDetail?{}:{height: 0,},props.word.length > 100 || translated?{opacity: 0.2,}:{}]}
                    onPress={async()=>{
                            if(props.word !==""){
                                try{
                                    setEditable(false);
                                    props.setLoadingNow(true);
                                    const result = await fetch(`https://api-free.deepl.com/v2/translate?auth_key=${Constants.manifest.extra.translateApikey}&source_lang=ZH&text=${props.word}&target_lang=JA`);
                                    const obj = await result.json();
                                    setTextarea(obj.translations[0].text);
                                    props.memoObjs.set(props.word,obj.translations[0].text);
                                    props.setMemoObjs(props.memoObjs);
                                    setTranslated(true);
                                    setEditable(true);
                                    props.setLoadingNow(false);
                                }catch(e){
                                    Alert.alert("エラー","電波環境などをお確かめの上もう一度お試し下さい",[                        {
                                        text: "OK",
                                        onPress: () =>{},
                                        style: "default",
                                      }])
                                }
                            }
                        }}>
                        <SelfText style={{color: "#fff",fontSize: 10,letterSpacing: 1}}>自動翻訳する</SelfText>
                    </TouchableOpacity>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    memo: {
        marginRight: 15,
        marginLeft: 15,
        marginTop: 10,
    },
    memoHead:{
        borderWidth: 1,
        borderColor: "#B5B5B5",
        alignItems: 'center',
        flexDirection: 'row',
        width: "100%",
        padding: 15,
        maxHeight: 60,
        minHeight: 60,
    },
    memoHeadText:{
        width: '90%',
        fontSize: 18,
        fontFamily: 'NotoSansJP-Regular',
    },
    memoDetail:{
        borderTopWidth: 0,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#B5B5B5",
        padding: 10,
    },
    memoDesc:{
        minHeight: 80,
    },
    memoBtns:{
        justifyContent: 'flex-end',
        flexDirection: 'row',
        position: "relative",
        zIndex: 1,
    },
    translateButton:{
        marginTop: 5,
        width: 85,
        height: 28,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#BD00DA",
        borderRadius: 5,
    },
})