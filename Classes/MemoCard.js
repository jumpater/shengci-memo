import AsyncStorage from '@react-native-async-storage/async-storage';

export default class MemoCard{
    #type="MemoCard";
    #id;
    #word;
    #description;
    #favorite;
    #createdAt;
    constructor(id=null, word=null, description=null){
        this.#id = id;
        this.#word = word;
        this.#description = description;
        this.#favorite = false;
        this.#createdAt = new Date();
    }
    static async generateId(){
        try{
            const MemoIdNum = await AsyncStorage.getItem('MemoIdNum');
            const currentNum = MemoIdNum? `${Number(MemoIdNum) + 1}` : 1;
            await AsyncStorage.setItem('MemoIdNum', `${currentNum}`);
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
    static include(obj){
            if(typeof obj !== 'object')return;
            const self = new this();
            try{
                self.setId(obj.id);
                self.setWord(obj.word);
                self.setDescription(obj.description);
                self.setFavorite(obj.favorite);
                self.setCreatedAt(obj.createdAt);
            }catch(error){
                console.log(error);
                console.log("a different object is detected");
            }
            console.log("self:",self);
        return self;
    }
    async delete(){
        try{
            console.log("thisType:",this.#type)
            const json = await AsyncStorage.getItem(this.#type);
            if(!json)return;
            const savedAry = JSON.parse(json);
            await AsyncStorage.setItem(this.#type, JSON.stringify(savedAry.filter(obj => this.#id !== obj.id)));
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