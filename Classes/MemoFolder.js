import AsyncStorage from '@react-native-async-storage/async-storage';

export default class MemoFolder{
    #id;
    #type="MemoFolder";
    #name;
    #memoNum;
    #createdAt;
    constructor(name){
        this.#name = name;
        this.#createdAt = new Date().getTime();
    }
    static async generateId(){
        try{
            const FolderIdNum = await AsyncStorage.getItem('FolderIdNum');
            const currentNum = FolderIdNum? Number(FolderIdNum) + 1 : 1;
            await AsyncStorage.setItem('FolderIdNum', `${currentNum}`);
            return currentNum;
        }catch(error){
            console.log(error)
        }
    }
    passer(){
        return {
            id: this.#id,
            type: this.#type,
            name: this.#name,
            memoNum: this.#memoNum,
            createdAt: this.#createdAt,
        }
    }
    static include(obj){
            if(typeof obj !== 'object')return;
            const self = new this();
            try{
                self.setId(obj.id);
                self.setName(obj.name);
                self.setMemoNum(obj.memoNum)
                self.setCreatedAt(obj.createdAt);
            }catch(error){
                console.log(error);
                console.log("a different object is detected");
            }
        return self;
    }
    async delete(){
        try{
            console.log("thisName:",this.#type);
            const json = await AsyncStorage.getItem(this.#type);
            if(!json)return;
            const savedAry = JSON.parse(json);
            await AsyncStorage.setItem(this.#type, JSON.stringify(savedAry.filter(obj => this.#id !== obj.id)));
        }catch(error){
            console.log(error)
        }
    }
}