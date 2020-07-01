import React,{useState} from 'react';
import {Button, Form, Spinner} from 'react-bootstrap';
import '../../scss/Login.scss';
import {values, size} from "lodash";
import {toast} from "react-toastify";
import {isEmailValid} from "../../utils/Validations";
import {LoginApi, setToken} from "../../api/Login";
const Login = (props) => {
    const {setShow, setCheckLogin} = props;
    const [spinner, setSpinner] = useState(false);
    const [data, setData] = useState(defaultData)
    const onSubmit = e => {
        e.preventDefault();
        //validar campos
        let count = 0;
        values(data).some(value=>{
            value && count++
            return null
        })
        if(count !== size(data))
            toast.warning("Todos los campos deben ser llenados");
            else if (!isEmailValid(data.email))
                toast.warning("El correo electrónico no es válido");
                else{
                    setSpinner(true);
                    LoginApi(data).then(response=>{
                        if(response.code){
                            if(response.code !== 500)
                                toast.warning(response.message);
                            else 
                                toast.error(response.message);
                        }else{
                            setCheckLogin(true);
                            setToken(response.token);
                            setShow(false); 
                        }
                    })
                    .catch(error => error)
                    .finally(()=> setSpinner(false) )
                }
    };
    const onChange = e =>{
        setData({...data, [e.target.name]: e.target.value});
    }
    return (
        <div className="login">
            <h3>Iniciar Sesión</h3>
            <Form onSubmit={onSubmit} onChange={onChange} >
                <Form.Group>
                    <Form.Control name="email" defaultValue={data.email}
                    type="email" placeholder="Correo Electrónico"></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Control name="password" defaultValue={data.password}
                    type="password" placeholder="Password"></Form.Control>
                </Form.Group>
                <Button type="Submit" variant="primary">
                    {!spinner ? "Iniciar Sesión" : <Spinner animation="border" /> }
                </Button>
            </Form>
        </div>
    );
}
export default Login;
function defaultData(){
    return {
        email: "",
        password: ""
    }
}