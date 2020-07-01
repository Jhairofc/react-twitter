import React from 'react';
import moment from "moment";
import localization from "moment/locale/es-us";
import {Location, Link, Date} from "../../../utils/Icons";
import "../../../scss/InfoUser.scss";
const InfoUser = (props) => {
    const {user} = props;
    return (
        <div className="info-user">
            <h3 className="names">{user?.nombre} {user?.apellido} </h3>
            <p className="email">{user?.email}</p>
            {user?.biografia &&(
                <div className="biography">{user.biografia}</div>
            )}
            <div className="more-info">
                {user?.ubicacion &&(
                    <p>
                        <Location />
                        {user.ubicacion}
                    </p>
                )}
                {user?.sitioweb && (
                    // eslint-disable-next-line react/jsx-no-target-blank
                    <a href={user.sitioweb} alt={user.sitioweb} target="_blank" rel="noopner noreferrer">
                        <Link /> {user.sitioweb}
                    </a>
                )}
                {user?.fechanac && (
                    <p>
                        <Date />
                        {moment(user.fechanac).locale("es-us", localization).format("LL")}
                    </p>
                )}

            </div>
        </div>
    );
}
export default InfoUser;