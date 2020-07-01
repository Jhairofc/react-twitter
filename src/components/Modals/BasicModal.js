import React from 'react';
import {Modal} from "react-bootstrap";
import logoWhite from "../../Assets/logoWhite.png";
import "../../scss/Modal.scss";
const BasicModal = (props) => {
    const {show, setShow, children} = props;
    return (
        <>
            <Modal className="basic-Modal" show={show} onHide={()=> setShow(false)} centered size="lg">
                <Modal.Header>
                    <Modal.Title>
                        <img src={logoWhite} alt="Logo modal" />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
            </Modal>
        </>
    );
}
export default BasicModal;