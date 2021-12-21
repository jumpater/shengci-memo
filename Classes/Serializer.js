class Serializer{
    constructor(types){this.types = types;}
    serialize(object) {
        let equalFlag = this.types.name === object.constructor.name;
        if (!equalFlag) throw `type ${object.constructor.name} not initialized`;
        return JSON.stringify(Object.entries(object));
    }
    deserialize(jstring) {
        let preObject = JSON.parse(jstring);
        let object = new this.types();
        for(let [key, value] of preObject){
            //#とアルファベットの頭文字を消して大文字を付ける
            key = key.charAt(0).toUpperCase() + key.slice(2)
            if( typeof object[`set${key}`]){
                object[`set${key}`](value);
            }
        }
        return object;
    }
}