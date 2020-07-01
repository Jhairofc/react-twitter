import React from 'react';
import {Link} from "react-router-dom";
import error404 from "../../../Assets/error-404.png";
import logo from "../../../Assets/logo.png";
import "../../../scss/Error.scss";
const Error = () => {
    return (
        <div className="error">
            <img src={logo} alt="twitter" />
            <img src={error404} alt="error 404" />
            <Link to="/">Inicio</Link>
        </div>
    );
}
export default Error;