import AsyncStorage from '@react-native-async-storage/async-storage';

export default class StrageClassManager{
    constructor(ClassName){
        this.type = ClassName;
    }
    async save(obj){
        //if json has same id then update data otherwise push new data
        try{
            if(obj.type !== this.type)return;
            const json = await AsyncStorage.getItem(this.type);
            const savedAry = json? JSON.parse(json): [];
            let exsistFlag = false;

            if(savedAry.length){
                for(const saved of savedAry){
                    if(obj.id === saved.id){
                        //update
                        for(key in saved)saved[key] = obj[key];
                        exsistFlag = true;
                        break;
                    }
                }
            }

            if(!exsistFlag){
                savedAry.push(obj);
                //idNum(Id生成時に使用)を更新
                await AsyncStorage.setItem(`${this.type}IdNum`, `${obj.id}`);
            }
            await AsyncStorage.setItem(this.type, JSON.stringify(savedAry));
        }catch(error){
            console.log(error)
            return null
        }
    }
    async query(q, qString) {
        try{
            if(typeof q !== "string" || typeof qString !== "string")return;
            const json = await AsyncStorage.getItem(this.type);
            if(!json)return [];
            var seachContext = {
                savedAry: JSON.parse(json),
            }
            if(!seachContext.savedAry.length)return [];
            const queriedAry = new Function("savedAry",`return savedAry.filter(${q} => ${qString})`)(seachContext.savedAry);
            return queriedAry;
        }catch(error){
            console.log(error)
            return [];
        }
    }
    async queryAll(){
        try{
            const json = await AsyncStorage.getItem(this.type);
            const queriedAry = json? JSON.parse(json): [];
            return queriedAry;
        }catch(error){
            console.log(error)
            return [];
        }
    }
}