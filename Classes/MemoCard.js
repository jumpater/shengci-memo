import AsyncStorage from '@react-native-async-storage/async-storage';

export default class MemoCard{
    constructor(word=null, description=null){
        #id = this.#generateId();
        #word = word;
        #description = description;
        #favorite = false;
        #createdAt = new Date();
    }
    #generateId(){
        const MemoIdNum = await AsyncStorage.getItem('MemoIdNum');
        return MemoIdNum? MemoIdNum + 1 : 1;
    }
    //a function in order to pass StrageManager
    passer(){
        return {
            id: #id,
            word: #word,
            description: #description,
            favorite: #favorite,
            createdAt: #createdAt,
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
                console.log("a different object is detected")
            }

        return self;
    }
    delete(){
        const json = await AsyncStorage.getItem(this.type);
        if(!json)return;
        const savedAry = JSON.parse(json);
        AsyncStorage.setItem(this.type, savedAry.filter(obj => this.getId() !== obj.id));
    }

    /*getter*/
    getId(){
        return #id;
    }
    getWord(){
        return #word;
    } 
    getDescription(){
        return #Description;
    } 
    getFavorite(){
        return #favorite;
    } 
    getCreatedAt(){
        return #createdAt;
    }

    /*setter*/
    setId(id){
        #Id = id;
        return this;
    }
    setWord(word){
        #word = word;
        return this;
    }
    setDescription(description){
        #description = description;
        return this;
    }
    setFavorite(favorite){
        #favorite = favorite;
        return this;
    }
    setCreatedAt(createdAt){
        #createdAt = createdAt;
        return this;
    }
}