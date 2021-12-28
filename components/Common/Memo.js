import React from 'react';
import { StyleSheet, TouchableOpacity, Pressable, TextInput, View, Text } from 'react-native';
import MemoCard from '../../Classes/MemoCard';

export default function Memo(props){
    const memoCard = MemoCard.include(props.obj);
    console.log("props.obj:",props.obj);
    const [desc, onChangeDesc] = React.useState(undefined);
    const [rwMode, setRwMode] = React.useState(false);
    const [deleted, setDeleted] = React.useState(false);
    return (
        <View style={[styles.memo, deleted?{scale: 0}:{}]}>
            <Pressable>
                <View style={styles.memoHead}><Text>{memoCard.getWord()}</Text></View>
            </Pressable>
            <View>
                <TextInput
                multiline
                onChangeText={text => {onChangeDesc(text)}}
                style={styles.memoDetail}
                defaultValue={memoCard.getDescription()}
                value={desc}
                editable={rwMode}
                >
                </TextInput>
                <View style={styles.memoBtns}>
                    <TouchableOpacity
                    onPress={()=>{memoCard.delete();setDeleted(true)}}
                    >
                        <Text>delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=>{setRwMode(!rwMode);}}
                    >
                        <Text>rewrite</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    memo: {
        width: "100%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#000",
        marginTop: 10,
    },
    memoHead:{
        flexDirection: 'row',
        width: "100%",
        height: 50,
    },
    memoDetail:{
        padding: 5,
    },
    memoBtns:{
        flexDirection: 'row',
    }
})