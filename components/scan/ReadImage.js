import React, { useState, useEffect } from 'react';
import {StyleSheet,ScrollView,Pressable,Image,View,TouchableOpacity,Alert} from 'react-native';
import SelfText from '../Common/SelfText';

export default ReadImage=(route,navigation)=>{
    const [cards, setCards] = useState(null);
    const [willSave, setWillSave] = useState(new Map());
    useEffect(()=>{
        (async()=>{
            let {predictions} = route.route.params;
            predictions = Array.from(new Set(predictions));
            setCards(predictions.map((value,index)=>{
                return (
                    <PredictedCard key={index} index={index} value={value} willSave={willSave} setWillSave={setWillSave}></PredictedCard>
                )
            }))
        })();
    },[])
    return (
        <View style={styles.entireScreen}>
            <SelfText style={{marginBottom:10,fontSize:14,marginLeft: 15,}}>メモに追加する単語を選択して下さい。</SelfText>
            <ScrollView style={{paddingRight: 15,paddingLeft: 15,}}>
                {cards}
            </ScrollView>
            <View style={styles.addButtonContainer}>
                <TouchableOpacity style={styles.addButton}
                onPress={()=>{
                    if(willSave.size!==0){
                        route.navigation.navigate('AddList',
                        {
                          words:JSON.stringify(Object.fromEntries(willSave))
                        })
                    }else{
                        Alert.alert("追加する単語がありません。","一つ以上追加する単語を選択して下さい",[
                            {
                                text: "OK",
                                onPress: () =>{},
                                style: "default",
                            }
                        ])
                    }
                }}>
                    <SelfText style={{color: "#fff",}}>次へ</SelfText>
                </TouchableOpacity>
            </View>
        </View>   
    )
}

const PredictedCard =(props)=>{
    const [selected, setSelected] = useState(false);
    useEffect(()=>{
        if(selected){
            props.willSave.set(props.value,"");
        }else{
            if(props.willSave.has(props.value)){
                props.willSave.delete(props.value)
            }
        }
        props.setWillSave(props.willSave);
    },[selected])
    return (
        <Pressable style={[styles.card]}
        onPress={()=>{
            setSelected(!selected);
        }}
        >
            <SelfText style={styles.cardTxt}>{props.value}</SelfText>
            {
                selected?
                <Image style={styles.cardStatsMark} source={require('../../assets/check-mark.png')} />:
                <Image style={[styles.cardStatsMark,{width: 17,height: 17,}]} source={require('../../assets/plus-mark2.png')}/>
            }
        </Pressable>
    )
}

const styles = StyleSheet.create({
    card:{
        paddingTop: 3,
        paddingBottom: 3,
        borderBottomColor: "#B5B5B5",
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardTxt:{
        fontSize: 26,
        textAlignVertical: 'center',
    },
    cardStatsMark:{
        height: 26,
        width: 26,
        marginRight: 10,
        opacity: 1,
    },
    entireScreen:{
        paddingTop: 30,
        flex:1,
    },
    addButton:{
        width: 100,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00DA83",
        borderRadius: 10,
    },
    addButtonContainer:{
        marginTop: 20,
        paddingBottom: 20,
        alignItems: "center",
    }
});