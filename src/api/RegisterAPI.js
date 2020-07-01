import {LOCALHOST} from "../utils/Constants";
export function RegisterApi(user){
    const uri = `${LOCALHOST}/registro`;
    const userAPI = {
        ...user,
        email: user.email.toLowerCase(),
        fechanac: new Date()
    }
    //Eliminar del json el atributo repassword
    delete userAPI.repassword;
    //parametros antes de consumir la API
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userAPI)
    }
    return fetch(uri, params).then(response=>{
        if(response.status >200 && response.status < 300)
            return response.json();
        return {code: response.status, message: "Email no disponible"}
    })
    .then(result => result)
    .catch(error => error);
}
