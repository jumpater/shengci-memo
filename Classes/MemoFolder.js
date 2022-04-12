import AsyncStorage from '@react-native-async-storage/async-storage';

export default class MemoFolder{
    #id;
    #type="MemoFolder";
    #name;
    #memoNum;
    #createdAt;
    constructor(id,name,memoNum=0,createdAt=null){
        this.#id = id;
        this.#name = name;
        this.#memoNum = memoNum;
        this.#createdAt = createdAt?createdAt:new Date().getTime();
    }
    static async generateId(){
        try{
            const FolderIdNum = await AsyncStorage.getItem('MemoFolderIdNum');
            const currentNum = FolderIdNum? Number(FolderIdNum) + 1 : 1;
            await AsyncStorage.setItem('MemoFolderIdNum', `${currentNum}`);
            return currentNum;
        }catch(error){
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
            }
        return self;
    }
    async delete(){
        try{
            const json = await AsyncStorage.getItem(this.#type);
            if(!json)return;
            const savedAry = JSON.parse(json);
            await AsyncStorage.setItem(this.#type, JSON.stringify(savedAry.filter(obj => this.#id !== obj.id)));
            if(this.#memoNum!=0){
                await AsyncStorage.removeItem("MemoCard" + this.#id);
                await AsyncStorage.removeItem("MemoCard" +this.#id + "IdNum");
            }
        }catch(error){
        }
    }
}