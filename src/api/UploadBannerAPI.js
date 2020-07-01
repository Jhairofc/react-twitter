import {LOCALHOST} from "../utils/Constants";
import {getToken} from "./Login";
export function UploadBannerApi(file){
    const uri = `${LOCALHOST}/subirBanner`;
    const formData = new FormData();
    formData.append("banner", file);
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