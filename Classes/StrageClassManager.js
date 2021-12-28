import AsyncStorage from '@react-native-async-storage/async-storage';

export default class StrageClassManager{
    constructor(ClassName){
        this.type = ClassName;
    }
    async save(obj){
        // await AsyncStorage.clear()
        //if json has same id then update data otherwise push new data
        try{
            console.log("save start",obj)
            if(obj.type !== this.type)return;
            const json = await AsyncStorage.getItem(this.type);
            const savedAry = json? JSON.parse(json): [];
            console.log("savedAry:",savedAry)
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
            console.log("existFlag:",!exsistFlag)
            if(!exsistFlag){
                console.log("beforesave:",obj)
                savedAry.push(obj);
                console.log("save:",JSON.stringify(savedAry))
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
            if(typeof q !== "string")return;
            if(typeof (new Function(`return ${qString})`)()) !== "boolean")return;
            const json = await AsyncStorage.getItem(this.type);
            const savedAry = json? JSON.parse(json): [];
            const queriedAry = new Function("param" ,`return savedAry.filter(param => ${qString})`)(q);
            return queriedAry;
        }catch(error){
            console.log(error)
            return null;
        }
    }
    async queryAll(){
        try{
            const json = await AsyncStorage.getItem(this.type);
            const queriedAry = json? JSON.parse(json): [];
            return queriedAry;
        }catch(error){
            console.log(error)
            return null;
        }
    }
}