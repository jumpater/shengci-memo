import React,{useState} from 'react';
import { Keyboard, Dimensions, StyleSheet, TouchableOpacity, Pressable, TextInput, View,Alert } from 'react-native';
import StrageClassManager from '../../Classes/StrageClassManager';
import MemoFolder from '../../Classes/MemoFolder';
import LoadAnim from '../Common/LoadAnim';
import SelfText from '../Common/SelfText';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NewFolder({ route, navigation }){
    const [input, setInput] = useState("");
    const [editable, setEditable] = useState(true);
    return (
    <>
    <LoadAnim loadingNow={!editable}/>
    <Pressable style={styles.container} onPress={()=>{Keyboard.dismiss()}}>
      <View style={{marginTop: 40,}}>
        <SelfText style={{textAlign: "right",marginRight: 15,fontSize: 14,}}><SelfText style={[{fontSize:14,},input.length > 50?{color: "#FF4848",}:{}]}>{input.length}</SelfText>/50</SelfText>
        <TextInput
          style={styles.createInput}
          value={input}
          onChangeText={(text)=> setInput(text)}
          placeholder='フォルダ名を入力してください'
          editable={editable}
          >
          </TextInput>
      </View>
      <View style={{justifyContent:'center',alignItems: 'center', marginTop: 30,}}>
        <TouchableOpacity
        style={[styles.createBtn,input === ""?{opacity: 0.2,}:{}]}
        disabled={input==""}
        onPress={async ()=>{
          if(input.length > 50){
            Alert.alert("文字数の超過","文字数制限(50字)を超過しています。指定文字以内に書き直して下さい",    [
              {
                text: "OK",
                onPress: () =>{},
                style: "default",
              },
            ])
            return;
          }
          setEditable(false);
          //debug
          await AsyncStorage.clear();
          const manager = new StrageClassManager("MemoFolder");
          const id = await MemoFolder.generateId();
          await manager.save(new MemoFolder(id, input).passer())
          setInput("");
          setEditable(true);
          navigation.navigate('MemoFolders');
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