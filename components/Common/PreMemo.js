import React from 'react';
import { LayoutAnimation,StyleSheet, TouchableOpacity, Pressable,View, TextInput} from 'react-native';
import SelfText from './SelfText';

export default function PreMemo(props){
    const [description, setDescription] = React.useState("");
    const [onDetail, setOnDetail] = React.useState(false);
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
                {/* <Text style={[styles.memoDesc, onDetail?{}:{minHeight:0,}]}>ああ</Text> */}
                <TextInput
                    style={[styles.memoDesc, onDetail?{}:{minHeight:0,}]}
                    onChangeText={(newText)=>{
                        setDescription(newText);
                        props.memoObjs.set(props.word,description);
                        props.setMemoObjs(props.memoObjs);
                    }}
                    value={description}
                    placeholder="説明を入力して下さい"
                    multiline={true}
                />
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
    }
})