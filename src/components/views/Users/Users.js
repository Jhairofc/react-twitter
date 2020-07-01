/* eslint-disable eqeqeq */
import React, {useState, useEffect} from 'react';
import queryString from "query-string";
import {withRouter} from "react-router-dom";
import {useDebouncedCallback} from "use-debounce";
import {isEmpty} from "lodash";
import {Spinner, Button, ButtonGroup} from "react-bootstrap";
import BasicLayout from "../../../layout/BasicLayout";
import {getFollowers} from "../../../api/Follow";
import ListUsers from "../Users/ListUsers";
import "../../../scss/Users.scss";
const Users = (props) => {
    const {setCheckLogin, location, history} = props;
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState(location.search || "follow");
    const params = queryString.stringify(getParams(location));
    const _params = getParams(location);
    const [onSearch] = useDebouncedCallback((value)=>{
        setUsers(null);
        history.push({
            search : queryString.stringify({ ...getParams(location), search: value, page:1})
        });
    }, 200);
    useEffect(() => {
        getFollowers(params).then(response=>{
            if(_params.page == 1){
                if(isEmpty(response))
                    setUsers([]);
                else
                    setUsers(response)
            }
            else{
                if(!response)
                    setLoading(0);
                else
                    setUsers([...users, ...response])
            }   
        })
        .catch(()=> setUsers([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[location])
    const changeType = type =>{
        setUsers(null);
        if(type)
            setType(type);
        history.push({
            search : queryString.stringify({type: type, page:1})
        });
    }
    const moreUsers = () =>{
        setLoading(true);
        const newPage = parseInt(_params.page) +1;
        history.push({
            search : queryString.stringify({...getParams(location), page:newPage})
        });
    }
    return (
        <BasicLayout className="users" setCheckLogin={setCheckLogin} >
            <div className="users-title">
                <h2>Usuarios</h2>
                <input type="text" onChange={e => onSearch(e.target.value)} placeholder="Buscar usuarios" />
            </div>
            <ButtonGroup className="users-options">
                <Button className={type==="follow" && "active"}
                onClick={()=> changeType("follow") }>Siguiendo</Button>
                <Button className={type==="new" && "active"}
                onClick={()=> changeType("new") }>Seguir</Button>
            </ButtonGroup>
            { !users ? (
                <div className="users-loading">
                    <Spinner variant="info" animation="border"/>
                    Buscando Usuarios
                </div>
            ) : (
                <>
                <ListUsers users={users} />
                <Button onClick={moreUsers} className="load-more">
                    {!loading ? (
                        loading !== 0 && "Cargar más usuarios"
                    ): (
                        <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                    )}
                </Button>
                </>
            )} 
        </BasicLayout>
    );
}
function getParams(location){
    const {type = "follow", page = 1, search} = queryString.parse(location.search);
    return {type, page, search};
}
export default withRouter(Users);