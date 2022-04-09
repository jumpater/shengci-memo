import AsyncStorage from '@react-native-async-storage/async-storage';

export default class MemoCard{
    #type;
    #id;
    #word;
    #description;
    #favorite;
    #createdAt;
    constructor(folderId,id=null, word=null, description=null){
        this.#type = "MemoCard" + folderId
        this.#id = id;
        this.#word = word;
        this.#description = description;
        this.#favorite = false;
        this.#createdAt = new Date().getTime();
    }
    static async generateId(type){
        try{
            const MemoIdNum = await AsyncStorage.getItem(type+'IdNum');
            const currentNum = MemoIdNum? Number(MemoIdNum) + 1 : 1;
            await AsyncStorage.setItem(type+'IdNum', `${currentNum}`);
            return currentNum;
        }catch(error){
            console.log(error)
        }
    }
    //a function in order to pass StrageManager
    passer(){
        return {
            type: this.#type,
            id: this.#id,
            word: this.#word,
            description: this.#description,
            favorite: this.#favorite,
            createdAt: this.#createdAt,
        }
    }
    static include(obj,folderId){
            if(typeof obj !== 'object')return;
            const self = new this(folderId);
            try{
                self.setId(obj.id);
                self.setWord(obj.word);
                self.setDescription(obj.description);
                console.log("obj.favorite", obj.favorite)
                self.setFavorite(obj.favorite);
                self.setCreatedAt(obj.createdAt);
            }catch(error){
                console.log(error);
                console.log("a different object is detected");
            }
        return self;
    }
    async delete(){
        try{
            console.log("thisType:",this.#type)
            const json = await AsyncStorage.getItem(this.#type);
            if(!json)return;
            const savedAry = JSON.parse(json);
            await AsyncStorage.setItem(this.#type, JSON.stringify(savedAry.filter(obj => this.#id !== obj.id)));

            const foldersJson = await AsyncStorage.getItem("MemoFolder");
            const folders = foldersJson? JSON.parse(foldersJson): [];
            for(const folder of folders){
                if(this.#type.split("MemoCard")[1] == folder.id){
                    folder.memoNum = savedAry.length - 1
                }
            }
            await AsyncStorage.setItem("MemoFolder",JSON.stringify(folders));
        }catch(error){
            console.log(error)
        }
    }

    /*getter*/
    getType(){
        return this.#type;
    }
    getId(){
        return this.#id;
    }
    getWord(){
        return this.#word;
    } 
    getDescription(){
        return this.#description;
    } 
    getFavorite(){
        return this.#favorite;
    } 
    getCreatedAt(){
        return this.#createdAt;
    }

    /*setter*/
    setType(){
        this.#type = type;
        return this;
    }
    setId(id){
        this.#id = id;
        return this;
    }
    setWord(word){
        this.#word = word;
        return this;
    }
    setDescription(description){
        this.#description = description;
        return this;
    }
    setFavorite(favorite){
        this.#favorite = favorite;
        return this;
    }
    setCreatedAt(createdAt){
        this.#createdAt = createdAt;
        return this;
    }
}