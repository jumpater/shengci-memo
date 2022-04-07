import React,{useState, useEffect} from 'react';
import { StyleSheet, Pressable,View,Image,ScrollView} from 'react-native';
import StrageClassManager from '../../Classes/StrageClassManager';
import MemoFolder from '../../Classes/MemoFolder';
import SelfText from '../Common/SelfText';
import LoadAnim from '../Common/LoadAnim';
import {useIsFocused} from "@react-navigation/native";


export default function MemoFolders({ route, navigation }){
    const isFocused = useIsFocused();
    [foldersEl, setFoldersEl] = useState(null);
    [loadingNow, setLoadingNow] = useState(false);
    useEffect(async()=>{
        const manager = new StrageClassManager('MemoFolder');
        const memoFolders = await manager.queryAll();
        console.log(memoFolders);
        if(memoFolders.length){
            setFoldersEl(memoFolders.map((folder)=><Folder key={folder.id} name={folder.name} navigation={navigation} />));
        }
        console.log(foldersEl);
    },[isFocused])
    return (
        <>
        <LoadAnim loadingNow={loadingNow}></LoadAnim>
        <View style={[styles.container,]}>
            {foldersEl?<ScrollView>{foldersEl}</ScrollView>:
            <View style={{flex:1,justifyContent: "center",alignItems: "center",}}>
                <SelfText style={{textAlign: "center",color: '#B5B5B5',fontFamily: 'NotoSansJP-Regular',}}>単語フォルダーが見つかりません(T-T)</SelfText>
            </View>}
        </View>
        </>
    )
}

function Folder(props){
    return (
        <Pressable
        style={styles.memoFolder}
        onPress={()=>{
            props.navigation.navigate("WordList",{
                folderName:props.name
              })
        }}>
            <SelfText style={styles.memoFolderText}>{props.name}</SelfText>
            <Pressable
            style={{height: "100%",justifyContent: "center",}}
            onPress={()=>{
                props.navigation.navigate("FolderDetail",{
                    folderName:props.name
                  })
            }}
            >
                <Image style={{height: 6,width: 24,}} source={require("../../assets/icon-detail.png")} />
            </Pressable>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 15,
        paddingVertical: 15,
        flex:1,
    },
    memoFolder:{
        height: 60,
        borderWidth: 1,
        borderColor: "#B5B5B5",
        marginTop: 10,
        alignItems: "center",
        padding: 15,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    memoFolderText:{
        width: '90%',
        fontSize: 18,
        fontFamily: 'NotoSansJP-Regular',
    }
})