import AsyncStorage from '@react-native-async-storage/async-storage';

export default class MemoCard{
    constructor(word=null, description=null){
        this.#id = this.#generateId();
        this.#word = word;
        this.#description = description;
        this.#favorite = false;
        this.#createdAt = new Date();
    }
    #generateId(){
        const MemoIdNum = await AsyncStorage.getItem('MemoIdNum');
        return MemoIdNum? MemoIdNum + 1 : 1;
    }
    //a function in order to pass StrageManager
    passer(){
        return {
            id: this.#id,
            word: this.#word,
            description: this.#description,
            favorite: this.#favorite,
            createdAt: this.#createdAt,
        }
    }

    /*getter*/
    getId(){
        return this.#id;
    }
    getWord(){
        return this.#word;
    } 
    getDescription(){
        return this.#Description;
    } 
    getFavorite(){
        return this.#favorite;
    } 
    getCreatedAt(){
        return this.#createdAt;
    }

    /*setter*/
    setId(id){
        this.#Id = id;
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