import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import {toast} from "react-toastify";
import classnames from "classnames";
import {Close} from "../../utils/Icons";
import {sendTweetApi} from "../../api/Tweet";
import "../../scss/Modal.scss";

const TweetModal = (props) => {
    const {show, setShow} = props;
    const [message, setMessage] = useState("");
    const onSubmit = e =>{
        e.preventDefault();
        if(message.length > 0 && message.length <= 280){
            sendTweetApi(message).then(response=>{
                if(response){
                    if(response.code < 400){
                        toast.success(response.message);
                        setShow(false);
                        window.location.reload();
                    }
                    else
                        toast.warning(response.message);
                }
            })
            .catch(error=> toast.warning(error));
        }
    };
    return (
        <Modal className="tweet-Modal" show={show} onHide={()=>{setShow(false); setMessage(""); }} centered size="lg">
            <Modal.Header>
                <Modal.Title>
                    <Close onClick={()=>{setShow(false); setMessage(""); }} />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Control onChange={e => setMessage(e.target.value)}
                    name="mensaje" rows="6" placeholder="Que estás pensando?" as="textarea" type="text"/>
                    <span className={classnames("count", {error: message.length > 280})}>{message.length}</span>
                    <Button type="submit" disabled={message.length > 280 || message.length < 1} >Tweetear</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
export default TweetModal;