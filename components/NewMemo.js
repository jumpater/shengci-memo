import React,{useState} from 'react';
import { Keyboard, Dimensions,LayoutAnimation, StyleSheet, TouchableOpacity, Pressable, TextInput, View, Text } from 'react-native';
import StrageClassManager from '../Classes/StrageClassManager';
import MemoCard from '../Classes/MemoCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NewMemo({ route, navigation }){
    const {existingMemo} = route.params;
    console.log('new:',existingMemo)
    const [input, setInput] = useState(existingMemo?existingMemo.getWord():"");
    const [textarea, setTextarea] = useState(existingMemo?existingMemo.getDescription():"");
    const [editable, setEditable] = useState(true);
    const [dontMash, setDontMash] = useState(false);
    return (
    <Pressable style={styles.container} onPress={()=>{Keyboard.dismiss()}}>
      <View style={{marginTop: 40,}}>
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
        <TextInput
        multiline
        onChangeText={text => setTextarea(text)}
        value={textarea}
        editable={editable}
        style={styles.createTextarea}
        placeholder='説明を入力してください'
        >
        </TextInput>
      </View>
      <View style={{justifyContent:'center',alignItems: 'center', marginTop: 15,}}>
        <TouchableOpacity
        style={styles.createBtn}
        disabled={input=="" || textarea==""}
        onPress={async ()=>{
          //save new
          // await AsyncStorage.clear()
          console.log("hello")
          console.log("saving");
          setEditable(false);
          const manager = new StrageClassManager("MemoCard");
          //id生成
          if(existingMemo){
            console.log("passed:", existingMemo.passer())
            existingMemo.setWord(input);
            existingMemo.setDescription(textarea);
            await manager.save(existingMemo.passer())
          }else{
            const id = await MemoCard.generateId();
            await manager.save(new MemoCard(id, input, textarea).passer())
          }

          setInput("");
          setTextarea("");
          navigation.navigate('WordList');
        }}
        >
          <Text style={styles.createBtnTxt}>保存する</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
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
        height: 100,
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
})