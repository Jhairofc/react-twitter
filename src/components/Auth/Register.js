import React, {useState} from 'react';
import {Row, Col, Form, Spinner, Button} from "react-bootstrap";
import "../../scss/Register.scss";
import {values, size} from "lodash";
import {toast} from "react-toastify";
import {isEmailValid} from "../../utils/Validations";
import {RegisterApi} from "../../api/RegisterAPI";
const Register = (props) => {
    const {setShow} = props;
    const [data, setData] = useState(defaultData);
    const [spinner, setSpinner] = useState(false);
    const onSubmit = (e)=>{
        e.preventDefault();
        //Contar si todos los campos fueron llenados
        let count = 0;
        values(data).some(value=>{
            value && count++
            return null
        });
        //Validaciones
        if(count !== size(data)) //Campos llenos
            toast.warning("Faltan campos que tienen que ser llenados");
        else if(!isEmailValid(data.email)) //Mail valido
            toast.warning("El correo electrónico no es válido");
            else if(data.password !== data.repassword) //Password iguales
                toast.warning("Las contrasenas no coinciden");
                else if(size(data.password) < 6)// Tamano de la contrasena 
                    toast.warning("La contrasena debe tener al menos 6 caracteres");
                else{
                    //Spinner
                    setSpinner(true);
                    //Consumir el API para registrar el usuario
                    RegisterApi(data)
                    .then(response=>{
                        if(response.code) //Si el campo code tiene valor hubo un error
                            toast.warning(response.message);
                        else{ //Si todo fue OK
                            setShow(false);
                            setData(defaultData)
                            toast.success("Se ha registrado de forma correcta!");
                        }
                    }) //Error en el Catch
                    .catch(error=> toast.error("Ha ocurrido un error, intente más tarde")
                    .finally( ()=> setSpinner(false) )); //Finalizado el consumo cerrar el spinner
                }
    };
    //Obtener los valores del formulario
        //Esta funcion se carga en el onChange del formulario y captura la data de todos los input, si es de otro tipo se tiene que llamar desde el propio evento onChange de cada componente
    const onChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }
    return (
        <div className="register-form">
            <Form onSubmit={onSubmit} onChange={onChange} >
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control name="nombre" defaultValue={data.nombre}
                            type="text" placeholder="Nombres" />
                        </Col>
                        <Col>
                            <Form.Control name="apellido" defaultValue={data.apellido}
                            type="text" placeholder="Apellidos" />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control name="email" defaultValue={data.email}
                            type="email" placeholder="Correo Electrónico" />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control name="password" defaultValue={data.password}
                            type="password" placeholder="Password" />
                        </Col>
                        <Col>
                            <Form.Control name="repassword" defaultValue={data.repassword}
                            type="password" placeholder="Repetir Password" />
                        </Col>
                    </Row>
                </Form.Group>
                <Button variant="primary" type="Submit">
                    {!spinner ? "Registrarse" : <Spinner animation="border" /> }
                </Button>
            </Form>
        </div>
    );
}
export default Register;
function defaultData(){
    return ({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        repassword: ""
        });
}