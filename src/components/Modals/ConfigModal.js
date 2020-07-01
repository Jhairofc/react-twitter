import React from 'react';
import {Modal} from 'react-bootstrap';
import {Close} from "../../utils/Icons";
import "../../scss/Modal.scss";
const ConfigModal = (props) => {
    const {show, setShow, title, children} = props;
    return (
        <Modal className="config-Modal" show={show} onHide={()=> setShow(false)} size="lg" centered >
            <Modal.Header>
                <Modal.Title>
                    <Close onClick={()=> setShow(false)} />
                        <h3>{title}</h3>   
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    );
}
export default ConfigModal;