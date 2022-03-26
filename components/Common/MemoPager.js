import React from "react";
import SelfText from "./SelfText";
import { View,StyleSheet,TouchableOpacity,Image } from "react-native";

export default MemoPager=(props)=>{
    let ary=[]
    //以下はページネーションにて、〇 〇 ☆ 〇 〇 という風に出したい時の処理
const getNumBtn = (i)=>{
    return (
        <TouchableOpacity
        key={i}
        style={[styles.numBtn,i===props.listNum?styles.current:{}]}
        onPress={()=>{
            props.setListNum(i);
            }
        }
        >
            <SelfText style={styles.num}>{i}</SelfText>
        </TouchableOpacity>
    )
}

const getGoTopBtn=()=>{
    return (
        <TouchableOpacity
        key={"topBtn"}
        style={styles.goBtn}
        onPress={()=>{
            props.setListNum(1);
            }}>
                <Image
                style={[styles.btnImage, {transform: [{rotate: "180deg"}]}]}
                source={require("../../assets/doubleArrow.png")}  
                />
        </TouchableOpacity>
    )
}

const getGoBottomBtn=()=>{
    return (
        <TouchableOpacity
        key={"bottomBtn"}
        style={styles.goBtn}
        onPress={()=>{
            props.setListNum(props.allListNum);
            }}>
                <Image
                style={styles.btnImage}
                source={require("../../assets/doubleArrow.png")}  
                />
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
        //一番後ろへいくボタン
        ary.push(getGoBottomBtn())
        //現在ページ数+2が総ページ数以上なら上限はallListNum
    }else if(props.listNum+2 >= props.allListNum){
        //先頭ページへいくボタン
        ary.push(getGoTopBtn())
        for(i=props.allListNum-4;i <= props.allListNum;i++){
            ary.push(getNumBtn(i))
        }
         //それ以外なら現在ページ数-2~現在ページ数+2を表示
    }else{
        ary.push(getGoTopBtn())
        for(i=props.listNum-2;i <= props.listNum+2;i++){
            ary.push(getNumBtn(i))
        }
        ary.push(getGoBottomBtn())
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
        marginBottom: 10,
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
    },
    goBtn:{
        height: 40,
        width: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    btnImage:{
        height: 18,
        width: 18,
        resizeMode: 'cover',
    },
})
