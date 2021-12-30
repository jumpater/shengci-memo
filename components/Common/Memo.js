import React from 'react';
import { LayoutAnimation,StyleSheet, TouchableOpacity, Pressable,View, Text} from 'react-native';
import MemoCard from '../../Classes/MemoCard';

export default function Memo(props){
    const memoCard = MemoCard.include(props.obj);
    console.log("props.obj:",props.obj);
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
            <View style={[styles.memoHead, onDetail?{maxHeight: '100%',}:{}]}><Text numberOfLines={onDetail?0:1} style={{fontSize: 18,}}>{memoCard.getWord()}</Text></View>
            <View style={[styles.memoDetail, onDetail?{}:{height: 0,paddingTop: 0,paddingBottom: 0,}]}>
                <Text style={[styles.memoDesc, onDetail?{}:{minHeight:0,}]}>{memoCard.getDescription()}</Text>
                <View style={styles.memoBtns}>
                    <TouchableOpacity
                    disabled={dontMash}
                    onPress={async()=>{
                        setDontMash(true);
                        await memoCard.delete();
                        setDeleted(true);
                        setDontMash(false);
                    }}
                    style={{marginRight: 10,}}
                    >
                        <Text>delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    disabled={dontMash}
                    onPress={()=>{
                        setDontMash(true);
                        props.nav.navigate('NewMemo',{existingMemo: memoCard});
                        setDontMash(false);
                    }}
                    >
                        <Text>rewrite</Text>
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
    memoDetail:{
        borderTopWidth: 0,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#B5B5B5",
        padding: 15,
    },
    memoDesc:{
        minHeight: 80,
    },
    memoBtns:{
        justifyContent: 'flex-end',
        flexDirection: 'row',
    }
})