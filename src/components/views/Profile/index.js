import React, {useState, useEffect} from 'react';
import BasicLayout from "../../../layout/BasicLayout";
import {withRouter} from "react-router-dom";
import {Button, Spinner} from "react-bootstrap";
import {toast} from "react-toastify";
import {ProfileApi} from "../../../api/ProfileAPI";
import BannerAvatar from "../../BannerAvatar/BannerAvatar"
import useAuth from "../../../hooks/useAuth";
import InfoUser from "../User/InfoUser";
import {getTweets} from "../../../api/Tweet";
import Tweets from "./Tweets";
import "../../../scss/Profile.scss";
const Profile = (props) => {
    const {match, setCheckLogin} = props;
    const {params} = match;
    const [user, setUser] = useState();
    const [tweets, setTweets] = useState(null);
    const [loadingTweets, setLoadingTweets] = useState(null);
    const [page, setPage] = useState(1);
    const loggedUser = useAuth();
    const moreTweets = e =>{
        const pageTemp = page +1;
        setLoadingTweets(true);
        getTweets(params.id, pageTemp).then(response=>{
            if(!response)
                setLoadingTweets(0);
            else{
                setTweets([...tweets, ...response]);
                setPage(pageTemp);
                setLoadingTweets(false);
            }
        })
    }
    useEffect(() => {
        ProfileApi(params.id).then(response=>{
            if(!response)
                toast.error("No se ha podido encontrar el perfil del usuario");
            setUser(response);
        })
        .catch(error=> toast.error("Ha ocurrido un error, intente más tarde"));
    },[params]);
    useEffect(() => {
        getTweets(params.id, 1).then(response=> setTweets(response))
        .catch(()=> setTweets([]))
    },[params])
    return (
        <BasicLayout setCheckLogin={setCheckLogin} className="profile">
            {/* <div className="profile-title">
                <h3>{user ? `${user.nombre} ${user.apellido}` : "" }</h3>
            </div> */}
            <BannerAvatar user={user} loggedUser={loggedUser} setCheckLogin={setCheckLogin} />
            <InfoUser user={user} />
            <div className="profile-tweets">
                {tweets && <Tweets tweets={tweets} /> }
            <Button onClick={moreTweets} >
                {!loadingTweets ? (
                    loadingTweets !== 0 && "Más tweets") : (
                    <Spinner as="span" animation="grow" size="sm" role="status" arian-hidden="true" />
                )}
            </Button>
            </div>
        </BasicLayout>
    );
}
export default withRouter(Profile);
