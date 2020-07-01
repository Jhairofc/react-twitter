import {LOCALHOST, TOKEN} from "../utils/Constants";
import jwtDecode from "jwt-decode";
export function LoginApi(login){
    const uri = `${LOCALHOST}/login`;
    const loginAPI = {
        ...login,
        email: login.email.toLowerCase()
    }
    //parametros antes de consumir la API
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginAPI)
    }
    return fetch(uri, params).then(response=>{
        if(response.status >200 && response.status < 300)
            return response.json();

        return {code: response.status, message: "Error al iniciar sesión, usuario i/o contrasena inválidos"}
    })
    .then(result => result)
    .catch(error =>{
        return {code: 500, message: "Ha ocurrido un error, intente más tarde"}
    }); 
}
export function setToken(token){
    localStorage.setItem(TOKEN, token);
}
export function getToken(){
    return localStorage.getItem(TOKEN);
}
export function logOut(){
    localStorage.removeItem(TOKEN);
}
export function isLogged(){
    //Verificamos si hay token
    const token = getToken();
    if(!token){
        logOut();
        return null;
    }
    //Verificamos si el token ha expirado
    if(isTokenExpired(token)){
        logOut();
        return null;
    }
    //Si el token sigue activo se retorna el token decodificado
    return jwtDecode(token);
}
export function isTokenExpired(token){
    const {exp} = jwtDecode(token);
    const timeToken = exp * 1000; //Se pasa la fecha del token a miliseconds
    const timeout = timeToken - Date.now(); 
    if(timeout < 0)
        return true; //Token caducado */
    return false;
}