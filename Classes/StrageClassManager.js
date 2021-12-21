import AsyncStorage from '@react-native-async-storage/async-storage';

export default class StrageClassManager{
    constructor(Class){
        this.type = typeof Class;
    }
    save(obj){
        //if json has same id then update data otherwise push new data
        if(typeof obj != Object)return; 
        const json = await AsyncStorage.getItem(this.type);
        const savedAry = json? JSON.parse(json): [];
        let exsistFlag = false;
        //check having same id
        if(savedAry !== []){
            for(const saved of savedAry){
                if(obj.id === saved.id){
                    //update
                    for(key in saved)saved[key] = obj[key];
                    exsistFlag = true;
                    break;
                }
            }
        }
        // in case that does not have same id
        if(!exsistFlag){
            saved.push(obj);
            //memoIdNum(Id生成時に使用)を更新
            const MemoIdNum = await AsyncStorage.getItem('MemoIdNum');
            AsyncStorage.setItem('MemoIdNum', MemoIdNum + 1);
        }
        AsyncStorage.setItem(this.type, savedAry);
    }
    query(q, qString) {
        if(typeof q !== "string")return;
        if(typeof (new Function(`return ${qString})`)()) !== "boolean")return;
        const json = await AsyncStorage.getItem(this.type);
        const savedAry = json? JSON.parse(json): [];
        const queriedAry = new Function(param ,`return savedAry.filter(param => ${qString})`)(q);
        return queriedAry;
    }
    queryAll(){
        const json = await AsyncStorage.getItem(this.type);
        const queriedAry = json? JSON.parse(json): [];
        return queriedAry;
    }
}