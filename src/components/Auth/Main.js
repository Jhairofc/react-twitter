import React, {useState} from 'react';
import BasicModal from "../Modals/BasicModal";
import Register from "./Register";
import Login from "./Login";
import {Container, Row, Col, Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faUsers, faComment} from "@fortawesome/free-solid-svg-icons"
import logo from "../../Assets/logo.png";
import logoWhite from "../../Assets/logoWhite.png";
import "../../scss/Sign.scss";
const Main = (props) => {
    const {setCheckLogin} = props;
    const [show, setShow] = useState(false);
    const [content, setContent] = useState(null);
    const openModal = con =>{
        setShow(true);
        setContent(con);
    }
    return ( 
        <>
            <Container className="sign" fluid>
                <Row>
                    <LeftComponent />
                    <RightComponent openModal={openModal} setShow={setShow} setCheckLogin={setCheckLogin} />
                </Row>
            </Container>
            <BasicModal show={show} setShow={setShow}>
                {content}
            </BasicModal>
        </>
    );
}
export default Main;
function LeftComponent(){
    return (
        <Col className="signLeft" xs={6}>
            <img src={logo} alt="Logo Twiiter" />
            <div>
            <h4>
                <FontAwesomeIcon icon={faSearch}/>
                Sigue lo que te interesa
            </h4>
            <h4>
                <FontAwesomeIcon icon={faUsers}/>
                Entérate de que esta hablando la gente
            </h4>
            <h4>
            <FontAwesomeIcon icon={faComment}/>
                Únete a la conversación
            </h4>
            </div>
        </Col>
    );
}
function RightComponent(props){
    const {openModal, setShow, setCheckLogin} = props;
    return (
        <Col className="signRight" xs={6}>
            <div>
                <img src={logoWhite} alt="Logo blanco" />
                <h5>Mira lo que esta pasando en este momento</h5>
                <h6>Registrate ahora mismo</h6>
                <Button 
                    onClick={()=> openModal(<Register setShow={setShow} />) }
                    variant="primary">
                Regístrate</Button>
                <Button 
                    onClick={()=> openModal(<Login setCheckLogin={setCheckLogin} setShow={setShow} />) }
                    variant="outline-primary">
                Iniciar Sesión</Button>
            </div>
        </Col>
    );
}