import React, {useState, useEffect} from 'react';
import {map} from "lodash";
import {Image} from "react-bootstrap";
import moment from "moment";
import {ProfileApi} from "../../../api/ProfileAPI";
import noFound from "../../../Assets/noFound.png";
import {LOCALHOST} from "../../../utils/Constants";
import {replaceURLWithHTMLLinks} from "../../../utils/Validations";
import "../../../scss/Tweets.scss";
const Tweets = (props) => {
    const {tweets} = props;
    return (
        <div className="tweets">
            <h3>Tweets</h3>
            {map(tweets, (tweet, index)=>(
                <Tweet key={index} tweet={tweet} />
            ))}
        </div>
    );
}
export default Tweets;
function Tweet(props){
    const { tweet } = props;
    const [infoUser, setInfoUser] = useState(null);
    const [avatar, setAvatar] = useState(null);
    useEffect(() => {
        ProfileApi(tweet.userID).then(response=>{
            if(response)
                setInfoUser(response);
            //Obtener el Avatar del usuario
            setAvatar(response?.avatar ? `${LOCALHOST}/obtenerAvatar?id=${response.id}` : noFound);
        }).catch(()=> setInfoUser({}))
    },[tweet])
    return(
        <div className="tweet">
            <Image className="avatar" src={avatar} roundedCircle />
            <div>
                <div className="name">
                    {infoUser?.nombre} {infoUser?.apellido}
                    <span>{moment(tweet.fecha).calendar()}</span>
                </div>
                <div dangerouslySetInnerHTML={{__html:replaceURLWithHTMLLinks(tweet.mensaje) }} />
            </div>
        </div>
    );
}