import {LOCALHOST} from "../utils/Constants";
import {getToken} from "./Login";
export function ProfileApi(id){
    const uri = `${LOCALHOST}/perfil?id=${id}`;
    const params = {
        method: "GET",
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`
        }
    };
    return fetch(uri, params).then(response=>{
        // eslint-disable-next-line no-throw-literal
        if(response.status >= 400) throw null;
        return response.json();
    })
    .then(result => result)
    .catch(error => error );
}