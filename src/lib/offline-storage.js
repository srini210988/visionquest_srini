/*LocalStorage Queries */
export const store = {
createData : (key,value) =>{
    store.createIfNoKey(key,value);
},
insertData : (key,value,childeKey) =>{
    let data = JSON.parse(localStorage.getItem(key)) || []; 
   // console.log(data[childeKey]);
   if(childeKey){
        Object.assign(data[childeKey],value);
    }
    else{
        Object.assign(data,value);
    }
    //console.log(data);
    localStorage.setItem(key,JSON.stringify(data));
},
deleteData : (key,value) =>{

},
updateData : (key,value) =>{

},
readData : (key,childKey) =>{
    if (typeof(Storage) !== "undefined") {
    let data = JSON.parse(localStorage.getItem(key)) || [];
    // console.log(data[childeKey]);
    if(childKey){
        if(data.hasOwnProperty(childKey)){
         return data[childKey];
        }
     }
    
     return data;
    }
},
isKeyExist : (key) =>{
    return localStorage.getItem(key) == undefined ? false:true;
},
createIfNoKey : (key,value) => {
    if (typeof(Storage) !== "undefined") {
        if(localStorage.getItem(key) == undefined){
            localStorage.setItem(key,JSON.stringify(value));
            console.log("Key has been created for: "+key);
        }
    } else {
        console.log("Sorry! No Web Storage support..");
    }
    
}
}