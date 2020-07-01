import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import '../../scss/Menu.scss';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome, faUsers, faUser, faPowerOff} from "@fortawesome/free-solid-svg-icons";
import logoWhite from '../../Assets/logoWhite.png';
import {logOut as logOutApi} from "../../api/Login";
import useAuth from "../../hooks/useAuth";
import TweetModal from "../Modals/TweetModal";
const Menu = (props) => {
    const [show, setShow] = useState(false);
    const {setCheckLogin} = props;
    const user = useAuth();
    const logOut = () =>{
        setCheckLogin(true);
        logOutApi();
    }
    return (
        <div className="menu">
            <img className="logo" src={logoWhite} alt="Logo Menu" />
            <Link to="/">
                <FontAwesomeIcon icon={faHome} /> Inicio
            </Link>
            <Link to="/users">
                <FontAwesomeIcon icon={faUsers} /> Usuarios
            </Link>
            <Link to={`/${user?.id}`}> {/* Es igual hacer esto: {user ? user.id : ''} */}
                <FontAwesomeIcon icon={faUser} /> Perfil
            </Link>
            <Link to="" onClick={logOut} >
                <FontAwesomeIcon icon={faPowerOff} /> Cerrar Sesión
            </Link>
            <Button variant="primary" onClick={()=> setShow(true)} >Tweetear</Button>
            <TweetModal show={show} setShow={setShow} />
        </div>
    );
}
export default Menu;