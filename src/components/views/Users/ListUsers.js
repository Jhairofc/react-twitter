import React from 'react';
import {isEmpty, map} from "lodash";
import User from "./User";
import "../../../scss/ListUsers.scss";
const ListUsers = (props) => {
    const {users} = props
    if(isEmpty(users)){
        return(
            <h5>No se encontraron usuarios</h5>
        );
    }
    return (
        <ul className="list-users">
            {map(users, user=>(
                <User key={user.id} user={user} />
            ))}
        </ul>
    ); 
}
export default ListUsers;
