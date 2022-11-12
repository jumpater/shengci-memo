import React from 'react';
import { LayoutAnimation,StyleSheet, TouchableOpacity, Pressable,View, TextInput} from 'react-native';
import SelfText from './SelfText';
import Constants from 'expo-constants';

export default class PreMemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: true,
            textarea: props.memoObjs.get(props.word),
            onDetail: false,
            translated: false,
            ifIncert: false,
        };
      }

    changeTraslated(bool){
        this.setState({translated: bool});
        console.log(this.state.translated);
    }
    changeTextarea(text){
        this.setState({textarea: text});
    }

    render(){
        return (<Pressable
            style={[styles.memo]}
            onPress={()=>{
                LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut
                    );  
                this.setState({onDetail: !this.state.onDetail});
            }}
            >
                <View style={[styles.memoHead, this.state.onDetail?{maxHeight: '100%',}:{}]}>
                    <SelfText numberOfLines={this.state.onDetail?0:1} style={styles.memoHeadText}>{this.props.word}</SelfText>
                </View>
                <View style={[styles.memoDetail, this.state.onDetail?{}:{height: 0,paddingTop: 0,paddingBottom: 0,}]}>
                    <TextInput
                        editable={this.state.editable}
                        style={[styles.memoDesc, this.state.onDetail?{}:{minHeight:0,}]}
                        onChangeText={(newText)=>{
                            this.setState({textarea: newText});
                            this.props.memoObjs.set(this.props.word,newText);
                            this.props.setMemoObjs(this.props.memoObjs);
                        }}
                        value={this.state.textarea}
                        placeholder="説明を入力して下さい"
                        multiline={true}
                    />
                    <View style={styles.memoBtns}>
                        <TouchableOpacity
                        disabled={this.props.word.length > 100 || this.state.translated}
                        style={[styles.translateButton, this.state.onDetail?{}:{height: 0,},this.props.word.length > 100 || this.state.translated?{opacity: 0.2,}:{}]}
                        onPress={async()=>{
                                if(this.props.word !==""){
                                    try{
                                        this.setState({editable: false});
                                        this.props.setLoadingNow(true);
                                        const result = await fetch(`https://api-free.deepl.com/v2/translate?auth_key=${Constants.manifest.extra.translateApikey}&source_lang=ZH&text=${this.props.word}&target_lang=JA`);
                                        const obj = await result.json();
                                        this.setState({textarea: obj.translations[0].text});
                                        this.props.memoObjs.set(this.props.word,obj.translations[0].text);
                                        this.props.setMemoObjs(this.props.memoObjs);
                                        this.setState({translated: true});
                                        this.setState({editable: true});
                                        this.props.setLoadingNow(false);
                                    }catch(e){
                                        Alert.alert("エラー","電波環境などをお確かめの上もう一度お試し下さい",[{
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