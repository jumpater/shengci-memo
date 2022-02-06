import React from "react";
import SelfText from "./SelfText";
import { View,StyleSheet,TouchableOpacity } from "react-native";

export default MemoPager=(props)=>{
    let ary=[]
    //以下はページネーションにて、〇 〇 ☆ 〇 〇 という風に出したい時の処理
const getNumBtn = (i)=>{
    return (
        <TouchableOpacity
        style={[styles.numBtn,i===props.listNum?styles.current:{}]}
        onPress={()=>{
            props.setListNum(i);
            }
        }
        >
            <SelfText key={i} style={styles.num}>{i}</SelfText>
        </TouchableOpacity>
    )
}
    //総ページ数5以下なら普通に出す
    if(props.allListNum <=5){
        for(i=1;i <= props.allListNum;i++){
            ary.push(getNumBtn(i))
        }
        //総ページ数5より大きいかつ現在3ページ目以下なら5ページ目まで出す
    }else if(props.listNum <= 3){
        for(i=1;i <= 5;i++){
            ary.push(getNumBtn(i))
        }
        //現在ページ数+2が総ページ数以上なら上限はallListNum
    }else if(props.listNum+2 >= props.allListNum){
        for(i=props.listNum-2;i <= props.allListNum;i++){
            ary.push(getNumBtn(i))
        }
         //それ以外なら現在ページ数-2~現在ページ数+2を表示
    }else{
        for(i=props.listNum-2;i <= props.listNum+2;i++){
            ary.push(getNumBtn(i))
        }
    }

    return (
        <View style={styles.container}>
            {ary}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 5,
    },
    numBtn:{
        width: 40,
        height: 40,
        // padding: ,
    },
    num:{
        paddingTop: 5,
        fontSize: 20,
        textAlign: "center",
    },
    current:{
        backgroundColor: "#E4E4E4",
        borderRadius: 5,
    }
})
