import {LOCALHOST} from "../utils/Constants";
import {getToken} from "./Login";
export function sendTweetApi(message){
    const uri = `${LOCALHOST}/tweet`;
    const tweet = {
        mensaje: message
    };
    const params = {
        method: "POST",
        headers:{
            Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(tweet)
    }
    return fetch(uri, params).then(response=>{
        if(response.status >=400)
            return {code: response.status, message: "Error al enviar el tweet, intente más tarde"}
        else
            return {code: response.status, message: "Tweet enviado!"}    
    }).then(result=> result)
    .catch(error=>error);
}
export function getTweets(id, page){
    const uri = `${LOCALHOST}/mytweets?id=${id}&pagina=${page}`;
    const params = {
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`
        }
    }
    return fetch(uri, params).then(response=> response.json())
    .then(result=> result)
    .catch(error=>error);
}
export function getTweetsFollowers(page = 1){
    const uri = `${LOCALHOST}/tweets?page=${page}`;
    const params = {
        headers:{
            "Contenet-Type": "application/json",
            Authorization: `Bearer ${getToken()}`
        }
    }
    return fetch(uri, params).then(response=>response.json())
    .then(result=>result)
    .catch(error=>error);
}