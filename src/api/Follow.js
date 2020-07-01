import {LOCALHOST} from "../utils/Constants";
import {getToken} from "./Login";
export function isFollowApi(id){
    const uri = `${LOCALHOST}/follower?id=${id}`;
    const params = {
        headers:{
            Authorization: `Bearer ${getToken()}`
        }
    }
    return fetch(uri, params).then(response=> response.json())
    .then(result=>result)
    .catch(error=>error);
}
export function FollowApi(id){
    const uri = `${LOCALHOST}/seguir?id=${id}`;
    const params = {
        method: "POST",
        headers:{
            Authorization: `Bearer ${getToken()}`
        }
    }
    return fetch(uri, params).then(response=> response.json())
    .then(result=>result)
    .catch(error=>error);
}
export function UnfollowApi(id){
    const uri = `${LOCALHOST}/unfollow?id=${id}`;
    const params = {
        method: "DELETE",
        headers:{
            Authorization: `Bearer ${getToken()}`
        }
    }
    return fetch(uri, params).then(response=> response.json())
    .then(result=>result)
    .catch(error=>error);
}
export function getFollowers(data){
    const uri = `${LOCALHOST}/users?${data}`;
    const params = {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }
    return fetch(uri, params).then(response=>response.json())
    .then(result=>result)
    .catch(error=>error);
}