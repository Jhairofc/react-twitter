import React, {useState, useEffect} from 'react';
import {Button} from "react-bootstrap";
import {toast} from "react-toastify";
import {LOCALHOST} from "../../utils/Constants";
import noFound from "../../Assets/noFound.png";
import ConfigModal from "../Modals/ConfigModal";
import UpdateUser from "../views/User/UpdateUser";
import {isFollowApi, FollowApi, UnfollowApi} from "../../api/Follow";
import "../../scss/BannerAvatar.scss";
const BannerAvatar = (props) => {
    const {user, loggedUser, setCheckLogin} = props;
    const bannerURI = user?.banner ? `${LOCALHOST}/obtenerBanner?id=${user.id}` : null;
    const avatarURI = user?.avatar ? `${LOCALHOST}/obtenerAvatar?id=${user.id}` : `${noFound}`;
    const [show, setShow] = useState(false);
    const [follow, setFollow] = useState(null);
    const [reload, setReload] = useState(null);
    useEffect(() => {
        isFollowApi(user?.id).then(response=>{
            setReload(false);
            if(response?.status)
                setFollow(true)
            else
                setFollow(false);
        })
        .catch(error => console.log(error));
    }, [user, reload]);
    const onFollow = () =>{
        FollowApi(user.id).then(response=> setReload(true))
        .catch(error => toast.error("Ha ocurrido un error, intente más tarde"))
    };
    const onUnfollow = () =>{
        UnfollowApi(user.id).then(response=> setReload(true))
        .catch(error => toast.error("Ha ocurrido un error, intente más tarde"))
    };
    return (
        <div className="banner" style={{backgroundImage: `url('${bannerURI}')` }}>
            <div className="avatar" style={{backgroundImage: `url('${avatarURI}')` }}></div>
            {/* Comprueba si la variable user existe */}
            {user && (
                <div className="options">
                    {user.id === loggedUser.id && <Button onClick={()=> setShow(true)}>Editar Perfil</Button> }
                    {user.id !== loggedUser.id && 
                        follow !== null && (
                            follow ? (<Button className="siguiendo" onClick={onUnfollow} >Siguiendo</Button>) 
                            :
                            (<Button className="seguir" onClick={onFollow} >Seguir</Button>) 
                        ) 
                    }
                </div>
            )}
            <ConfigModal show={show} setShow={setShow} title="Editar Perfil">
                <UpdateUser user={user} setCheckLogin={setCheckLogin} setShow={setShow} />
            </ConfigModal>
        </div>
    );
}
export default BannerAvatar;