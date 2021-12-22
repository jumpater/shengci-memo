import React from 'react';
import { TouchableOpacity, Pressable, TextInput, View, Text } from 'react-native';
import MemoCard from '../../Classes/memoCard';

export default function Memo(props){
    const memoCard = MemoCard.include(props.obj);
    const [desc, onChangeDesc] = React.useState(memoCard.getDescription());
    const [rwMode, setRwMode] = React.useState(memoCard.getDescription(false));
    const [deleted, setDeleted] = React.useState(memoCard.getDescription(false));
    return (
        <View style={[styles.memo, deleted?{scale: 0}:{}]}>
            <Pressable>
                <View style={styles.memoHead}><Text>{memoCard.getWord()}</Text></View>
            </Pressable>
            <View>
                <TextInput
                multiline
                onChangeText={text => onChangeDesc(text)}
                style={styles.memoDetail}
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