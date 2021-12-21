import AsyncStorage from '@react-native-async-storage/async-storage';
import Serializer from './Serializer';

class MemoCard{
    constructor(word=null, description=null){
        this.#id = this.#generateId();
        this.#word = word;
        this.#description = description;
        this.#favorite = false;
        this.#createdAt = new Date();
    }
    #generateId(){
        const existingIds = await AsyncStorage.getItem('existingIds');
        return existingIds? Math.max(...JSON.parse(existingIds)) + 1 : 0;
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