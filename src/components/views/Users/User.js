import React, {useState, useEffect} from 'react';
import {Media, Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import {ProfileApi} from "../../../api/ProfileAPI";
import {LOCALHOST} from "../../../utils/Constants";
import noFound from "../../../Assets/noFound.png";
import "../../../scss/ListUsers.scss";
const User = (props) => {
    const {user} = props;
    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
        ProfileApi(user.id).then(response=>{
            setUserInfo(response);
        }).catch(()=>setUserInfo(null))
    },[user])
    return (
        <Media as={Link} to={`/${user.id}`} className="list-users-user">
            <Image width={64} height={64} roundedCircle className="mr-3" 
            src={userInfo?.avatar ? `${LOCALHOST}/obtenerAvatar?id=${user.id}` : noFound}
            alt={`${user.nombre} ${user.apellido}`} />
        <Media.Body>
            <h5>{user.nombre} {user.apellido}</h5>
            <p>{userInfo?.biografia}</p>
        </Media.Body>
        </Media>
    );
}
export default User;
