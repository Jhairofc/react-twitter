import React, {useState, useCallback} from 'react';
import {Form, Row, Col, Button, Spinner} from "react-bootstrap";
import {toast} from "react-toastify";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";
import {useDropzone} from "react-dropzone";

import {LOCALHOST} from "../../../utils/Constants";
import {Camera} from "../../../utils/Icons";
import {UploadBannerApi} from "../../../api/UploadBannerAPI";
import {UploadAvatarApi} from "../../../api/UploadAvatar";
import {UpdateUserApi} from "../../../api/UpdateAPI";
import "../../../scss/UpdateUser.scss";
const UpdateUser = (props) => {
    const {user, setShow, setCheckLogin} = props;
    const [data, setData] = useState(initForm(user));
    const [dataBanner, setDataBanner] = useState(null);
    const [dataAvatar, setDataAvatar] = useState(null);
    const [spinner, setSpinner] = useState(false)
    //Codigo para cambiar el banner y avatar utilizando la libreria useDropZone
    const [banner, setBanner] = useState(
        user?.banner ? `${LOCALHOST}/obtenerBanner?id=${user.id}` : null
    );
    const [avatar, setAvatar] = useState(
        user?.avatar ? `${LOCALHOST}/obtenerAvatar?id=${user.id}` : null
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onDropBanner = useCallback(file =>{
        const _file = file[0];
        if(!_file)
            toast.warning("Solo imágenes en formato png o jpg");
        else{
            setBanner(URL.createObjectURL(_file));
            setDataBanner(_file);
        }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onDropAvatar = useCallback(file =>{
        const _file = file[0];
        if(!_file)
            toast.warning("Solo imágenes en formato png o jpg");
        else{
            setAvatar(URL.createObjectURL(_file));
            setDataAvatar(_file);
        }
    });
    //Banner
    // : getRootBannerProps es un alias al getRootProps
    const {getRootProps:getRootBannerProps, getInputProps: getInputBannerProps} = useDropzone({
        accept: "image/jpg, image/png, image/jpeg",
        multiple: false,
        onDrop: onDropBanner
    });
    //Avatar
    const {getRootProps:getRootAvatarProps, getInputProps: getInputAvatarProps} = useDropzone({
        accept: "image/jpg, image/png, image/jpeg",
        multiple: false,
        onDrop: onDropAvatar
    });
    const onChange = e=>{
        setData({
            ...data, [e.target.name] : e.target.value
        });
    }
    const onSubmit = async e =>{
        e.preventDefault();
        setSpinner(true);
        if(dataBanner){
            await UploadBannerApi(dataBanner).catch(error => 
                toast.error("Ha ocurido un error al actualizar el banner")
            )
        }
        if(dataAvatar){
            await UploadAvatarApi(dataAvatar).catch(error => 
                toast.error("Ha ocurido un error al actualizar el Avatar")
            )
        }
        if(data){
            await UpdateUserApi(data).catch(error => 
                toast.error("Ha ocurrido un error al actualizar el perfil")
            )
            .finally(()=>setCheckLogin(true));
        }
        if(dataBanner  || dataAvatar)
            window.location.reload();
        setSpinner(false);
        setShow(false);
    }
    return (
        <div className="update-user">
            <div className="banner" style={{backgroundImage: `url('${banner}')`}} {...getRootBannerProps()} >
                <input {...getInputBannerProps()} />
                <Camera />
            </div>
            <div className="avatar" style={{backgroundImage: `url('${avatar}')`}} {...getRootAvatarProps()} >
                <input {...getInputAvatarProps()} />
                <Camera />
            </div>
            <Form onSubmit={onSubmit} onChange={onChange}> 
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control name="nombre" placeholder="Nombres" type="text" defaultValue={data.nombre} />
                        </Col>
                        <Col>
                            <Form.Control name="apellido" placeholder="Apellidos" type="text" defaultValue={data.apellido} />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Form.Control as="textarea" placeholder="Ingresa tu biograía" type="text" row="3" 
                    name="biografia" defaultValue={data.biografia} />
                </Form.Group>
                <Form.Group>
                    <Form.Control name="sitioweb" placeholder="Sitio web" type="text" defaultValue={data.sitioweb} />
                </Form.Group>
                <Form.Group>
                    <DatePicker placeholder="Fecha de Nacimiento" locale={es} 
                    selected={new Date(data.fechanac)} 
                    onChange = {value => setData({...data, fechanac : value }) } />
                </Form.Group>
                <Button className="btn-submit" variant="primary" type="submit">
                    {spinner && <Spinner animation="border" size="sm" />}Actualizar
                </Button>
            </Form>
        </div>
    );
}
export default UpdateUser;
function initForm(user){
    return {
        nombre: user.nombre || "",
        apellido: user.apellido || "",
        biografia: user.biografia || "",
        sitioweb: user.sitioweb || "",
        fechanac: user.fechanac || ""
    }
}