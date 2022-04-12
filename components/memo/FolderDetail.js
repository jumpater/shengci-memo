import React,{useState,useEffect} from 'react';
import {StyleSheet, TouchableOpacity, Pressable,View,Alert } from 'react-native';
import StrageClassManager from '../../Classes/StrageClassManager';
import MemoFolder from '../../Classes/MemoFolder';
import LoadAnim from '../Common/LoadAnim';
import SelfText from '../Common/SelfText';

export default function FolderDetail({ route, navigation }){
    const [createdAt, setCreatedAt] = useState("");
    const [loadingNow, setLoadingNow] = useState(false);
    useEffect(()=>{
        const date = new Date(route.params.createdAt);
        setCreatedAt(`${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`);
    },[])
    return (
        <>
        <LoadAnim loadingNow={loadingNow}></LoadAnim>
        <View style={styles.container}>
            <View style={[styles.boxLine,{flexDirection:"row"}]}> 
                <SelfText style={{paddingRight:10,}}>名前:</SelfText>
                <SelfText style={{flexShrink:1}}>{route.params.folderName}</SelfText>
            </View>
            <View style={[styles.boxLine,{flexDirection:"row"}]}> 
                <SelfText style={{paddingRight:10,}}>単語の数:</SelfText>
                <SelfText style={{flexShrink:1}}>{route.params.memoNum}</SelfText>
            </View>
            <View style={[styles.boxLine,{flexDirection:"row"}]}> 
                <SelfText style={{paddingRight:10,}}>作成日:</SelfText>
                <SelfText style={{flexShrink:1}}>{createdAt}</SelfText>
            </View>
            <Pressable
            style={styles.boxLine}
            onPress={()=>{
                navigation.navigate("NewMemo",{
                    id:route.params.id,
                    existingMemo: null,
                    folderName: route.params.folderName,
                });
            }}
            >
                <SelfText>新しい単語を追加</SelfText>
            </Pressable>
            <Pressable
            style={styles.boxLine}
            onPress={()=>{
                navigation.navigate("WordList",{
                    id: route.params.id,
                    folderName:route.params.folderName
                  })
            }}
            >
                <SelfText>単語一覧へ</SelfText>
            </Pressable>
            <Pressable
            style={styles.boxLine}
            onPress={async()=>{
                Alert.alert("フォルダを削除",`フォルダ"${route.params.folderName}"を削除しますか？単語リストも削除されます`,[
                    {
                        text: "キャンセル",
                        onPress: () =>{},
                        style: "default",
                    },
                    {
                        text: "OK",
                        onPress: async() =>{
                            try{
                                setLoadingNow(true);
                                const folder = new MemoFolder(route.params.id,route.params.folderName,route.params.memoNum);
                                await folder.delete();
                                setLoadingNow(false);
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'MemoFolders' }],
                                  });
                            }catch(e){
                            }
                        },
                        style: "default",
                    }
                ])
            }}
            >
                <SelfText style={{color: "#FF4848",}}>このフォルダーを削除</SelfText>
            </Pressable>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 15,
        paddingVertical: 15,
        flex:1,
    },
    boxLine:{
        borderBottomWidth: 1,
        borderColor: "#B5B5B5",
        paddingVertical: 10,
    },
});