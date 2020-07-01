import React from 'react';
import {Container, Col, Row} from "react-bootstrap";
import Menu from "../components/Menu/Menu";
import "../scss/BasicLayout.scss";
const BasicLayout = (props) => {
    const {children, className, setCheckLogin} = props; //ClassName hereda las clases de las paginas hijas
    return (
        <Container className={`basic-layout ${className}`}>
            <Row>
                <Col xs={3} className="basic-layout-menu">
                    <Menu  setCheckLogin={setCheckLogin} />
                </Col>
                <Col xs={9} className="basic-layout-content">
                    {children}
                </Col>
            </Row>
        </Container>
    );
}
export default BasicLayout;