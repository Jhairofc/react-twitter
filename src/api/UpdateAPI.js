import {LOCALHOST} from "../utils/Constants";
import {getToken} from "./Login";
export function UpdateUserApi(user){
    const uri = `${LOCALHOST}/actualizar`;
    const _user = user;
    const params = {
        method: "PUT",
        headers : {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        },
        body : JSON.stringify(_user)
    }
    return fetch(uri, params).then(response =>{
        if(response.status >= 400)
            return {code: response.status, message:"No se ha podido actualizar los datos del usuario"}
        console.log("OK");
        return response.json();
    })
    .then(result => result)
    .catch(error => error);
}