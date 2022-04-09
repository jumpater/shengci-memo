import React,{useState} from 'react';
import { Keyboard, Dimensions, StyleSheet, TouchableOpacity, Pressable, TextInput, View,Alert } from 'react-native';
import StrageClassManager from '../../Classes/StrageClassManager';
import MemoCard from '../../Classes/MemoCard';
import LoadAnim from '../Common/LoadAnim';
import SelfText from '../Common/SelfText';
import Constants from 'expo-constants';

export default function NewMemo({ route, navigation }){
    const {existingMemo} = route.params;
    const [input, setInput] = useState(existingMemo?existingMemo.getWord():"");
    const [textarea, setTextarea] = useState(existingMemo?existingMemo.getDescription():"");
    const [editable, setEditable] = useState(true);
    const [translated, setTranslated] = useState(false);
    return (
    <>
    <LoadAnim loadingNow={!editable}/>
    <Pressable style={styles.container} onPress={()=>{Keyboard.dismiss()}}>
      <View style={{marginTop: 40,}}>
        <SelfText style={{textAlign: "right",marginRight: 15,fontSize: 14,}}><SelfText style={[{fontSize:14,},input.length > 100?{color: "#FF4848",}:{}]}>{input.length}</SelfText>/100</SelfText>
        <TextInput
          style={styles.createInput}
          value={input}
          onChangeText={(text)=> setInput(text)}
          placeholder='単語を入力してください'
          editable={editable}
          >
          </TextInput>
      </View>
      <View>
        <SelfText style={{textAlign:"right",marginRight: 15,fontSize: 14,}}>
          <SelfText style={[{fontSize: 14,},textarea.length > 200?{color: "#FF4848",}:{}]}>{textarea.length}</SelfText>
          /200</SelfText>
        <TextInput
        multiline
        onChangeText={text =>{
          if(translated){
            setTranslated(false);
          }
          setTextarea(text);
        }}
        value={textarea}
        editable={editable}
        style={styles.createTextarea}
        placeholder='説明を入力してください'
        >
        </TextInput>
      </View>
      <TouchableOpacity
      disabled={input === "" || input.length > 100 || translated}
      style={[styles.translateButton, input === "" || input.length > 100 || translated?{opacity: 0.2,}:{}]}
      onPress={async()=>{
            if(input !==""){
              setEditable(false);
              const result = await fetch(`https://api-free.deepl.com/v2/translate?auth_key=${Constants.manifest.extra.translateApikey}&text=${input}&target_lang=JA`);
              const obj = await result.json();
              setTextarea(obj.translations[0].text);
              setTranslated(true);
              setEditable(true);
            }
        }}>
          <SelfText style={{color: "#fff",fontSize: 10,letterSpacing: 1}}>自動翻訳する</SelfText>
      </TouchableOpacity>
      <View style={{justifyContent:'center',alignItems: 'center', marginTop: 30,}}>
        <TouchableOpacity
        style={[styles.createBtn,input=="" || textarea==""?{opacity: 0.2,}:{}]}
        disabled={input=="" || textarea==""}
        onPress={async ()=>{
          console.log("saving");
          if(input.length > 100 || textarea.length > 200){
            Alert.alert("文字数の超過","文字数制限(単語100字, 説明200字)を超過しています。指定文字以内に書き直して下さい",    [
              {
                text: "OK",
                onPress: () =>{},
                style: "default",
              },
            ])
            return;
          }
          setEditable(false);
          const manager = new StrageClassManager("MemoCard"+route.params.id);
          if(existingMemo){
            existingMemo.setWord(input);
            existingMemo.setDescription(textarea);
            await manager.save(existingMemo.passer());
          }else{
            //新規ならid生成
            const id = await MemoCard.generateId("MemoCard"+route.params.id);
            await manager.save(new MemoCard(route.params.id , id, input, textarea).passer())
          }
          setInput("");
          setTextarea("");
          setEditable(true);
          navigation.navigate('WordList',{
            id: route.params.id,
            folderName: route.params.folderName,
          });
        }}
        >
          <SelfText style={styles.createBtnTxt}>保存する</SelfText>
        </TouchableOpacity>
      </View>
    </Pressable>
    </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    createInput:{
        height: 50,
        borderColor: "#B5B5B5",
        borderWidth: 1,
        width: (Dimensions.get('window').width -30),
        padding: 5,
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 15,
      },
      createTextarea:{
        height: 200,
        marginRight: 15,
        marginLeft: 15,
        borderColor: "#B5B5B5",
        borderWidth: 1,
        width:(Dimensions.get('window').width -30),
        padding: 5,
      },
      createBtn:{
        paddingTop: 15,
        paddingBottom: 15,
        paddingRight: 35,
        paddingLeft: 35,
        backgroundColor: '#00BCDA',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      createBtnTxt:{
        fontSize: 18,
        color: "#fff",
      },
      translateButton:{
        marginTop: 10,
        marginRight: 15,
        marginLeft: "auto",
        width: 85,
        height: 28,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#BD00DA",
        borderRadius: 5,
    },
})