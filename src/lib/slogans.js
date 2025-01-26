let slogans = null;

export const getSlogans = async () => { 
    if(!slogans){
        const response = await fetch(process.env.PATH+"/conf/slogan.json");
        slogans = await response.json();
    }
    return slogans;
}