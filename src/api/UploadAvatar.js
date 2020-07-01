import {LOCALHOST} from "../utils/Constants";
import {getToken} from "./Login";
export function UploadAvatarApi(file){
    const uri = `${LOCALHOST}/subirAvatar`;
    const formData = new FormData();
    formData.append("avatar", file);
    const params = {
        method: "POST",
        headers:{
            Authorization: `Bearer ${getToken()}`
        },
        body: formData
    }
    return fetch(uri, params).then(response => response.json())
    .then(result=> result)
    .catch(error => error)
}