import React, {useState, useEffect} from 'react';
import {Button, Spinner} from "react-bootstrap";
import BasicLayout from '../../../layout/BasicLayout';
import Tweets from "../Profile/Tweets";
import {getTweetsFollowers} from "../../../api/Tweet";
import "../../../scss/Home.scss";
const Home = (props) => {
    const {setCheckLogin} = props;
    const [tweets, setTweets] = useState(null);
    const [page, setPage] = useState(1);
    const [loading, SetLoading] = useState(false);
    useEffect(() => {
        getTweetsFollowers(page).then(response=> {
            if(!tweets && response)
                setTweets(formatTweets(response));
            else{
                if(!response)
                    SetLoading(0);
                else{
                    setTweets([...tweets, ...formatTweets(response)])
                    SetLoading(false);
                }
            }
        }).catch(()=>{});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[page]);
    const moraData = () =>{
        SetLoading(true);
        setPage(page +1);
    };
    return (
        <BasicLayout setCheckLogin={setCheckLogin} className="home">
            <div className="home-title">
                <h2>Inicio</h2>
            </div>
            <Tweets tweets={tweets} />
            <Button className="load-more" onClick={moraData}>
                {!loading ? (
                    loading !== 0 ? "Más Tweets" : "No hay Tweets"
                ) : (
                    <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                )}
            </Button>
        </BasicLayout>
    );
}
export default Home;
function formatTweets(tweets){
    const _tweets = [];
    tweets.forEach(tweet => {
        _tweets.push({
            id: tweet.id,
            userID: tweet.followingID,
            mensaje: tweet.Tweets.mensaje,
            fecha: tweet.Tweets.fecha,
        });
        console.log(_tweets);
    });
    return _tweets;
}
