import React from 'react';
import { LayoutAnimation,StyleSheet, TouchableOpacity, Pressable,View, Text, Alert, Image} from 'react-native';
import MemoCard from '../../Classes/MemoCard';
import SelfText from './SelfText';
import StrageClassManager from '../../Classes/StrageClassManager';

export default function Memo(props){
    const memoCard = MemoCard.include(props.obj,props.folderId);
    const [deleted, setDeleted] = React.useState(false);
    //連打禁止
    const [dontMash,setDontMash] = React.useState(false);
    const [onDetail, setOnDetail] = React.useState(false);
    return (
        <Pressable
        style={[styles.memo, deleted?{transform:[{scale: 0}], height: 0,}:{}]}
        onPress={()=>{
            LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
                );  
            setOnDetail(!onDetail);
        }}
        >
            <View style={[styles.memoHead, onDetail?{maxHeight: '100%',}:{}]}>
                <SelfText numberOfLines={onDetail?0:1} ellipsizeMode="tail" style={styles.memoHeadText}>{memoCard.getWord()}</SelfText>
                <TouchableOpacity
                style={{width: "10%",}}
                disabled={dontMash}
                onPress={async()=>{
                    setDontMash(true);
                    memoCard.setFavorite(!memoCard.getFavorite());
                    const manager = new StrageClassManager('MemoCard'+props.folderId);
                    await manager.save(memoCard.passer());
                    await props.favFunc();
                    setDontMash(false);
                }}
                >
                    <Image style={{height:20,width: 20,}} source={memoCard.getFavorite()?require("../../assets/star02.png"):require("../../assets/star01.png")}/>
                </TouchableOpacity>
            </View>
            <View style={[styles.memoDetail, onDetail?{}:{height: 0,paddingTop: 0,paddingBottom: 0,}]}>
                <SelfText style={[styles.memoDesc, onDetail?{}:{minHeight:0,}]}>{memoCard.getDescription()}</SelfText>
                <View style={styles.memoBtns}>
                    <TouchableOpacity
                    disabled={dontMash}
                    style={[styles.deleteButton,onDetail?{}:{height: 0,}]}
                    onPress={()=>{
                        Alert.alert("メモを削除",
                        `\"${memoCard.getWord()}\"`,
                        [
                            {
                                text:"キャンセル",
                                onPress:()=>{},
                            },
                            {
                                text: "削除",
                                onPress:async()=>{
                                    setDontMash(true);
                                    await memoCard.delete();
                                    setDeleted(true);
                                    setDontMash(false);
                                },
                            },
                        ])
                    }
                    }
                    >
                        <SelfText style={{fontSize: 12, color:"#fff",}}>削除</SelfText>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={[styles.rewriteButton, onDetail?{}:{height: 0,}]}
                    disabled={dontMash}
                    onPress={()=>{
                        setDontMash(true);
                        props.nav.navigate('NewMemo',{existingMemo: memoCard,id: props.folderId,});
                        setDontMash(false);
                    }}
                    >
                        <SelfText style={{fontSize: 10, color:"#fff",}}>書き直す</SelfText>
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
        paddingTop:15,
        paddingHorizontal:15,
        paddingBottom: 5,
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
    deleteButton:{
        backgroundColor: "#FF4848",
        width: 60,
        height: 24,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginRight: 10,
    },
    rewriteButton:{
        backgroundColor: "#00DA83",
        width: 60,
        height: 24,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
})