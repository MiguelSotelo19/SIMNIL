import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import logo_simnil from '../assets/LogoSimnil.png';
import ojo from '../assets/ojo.png';
import { show_alerta } from '../js/functions';
import '../css/login.css';

const customStyles = {
    content: {
      width: '42%',
      height: '42vh',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderWidth: 2,
      borderColor: 'blue',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
};

Modal.setAppElement('#root');

export const Login = () => {
    const url='http://localhost:8080/api/simnil/persona/';
    const [usuarios, setUsuarios] = useState([]);
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contrasenia, setContrasenia] = useState('');3

    useEffect( () => {
        getUsuarios();
    }, []);
  
    const getUsuarios = async () => {
    const respuesta = await axios.get(url);
    setUsuarios(respuesta.data.data);
    }

    const validar = () => {
        getUsuarios();
        let aux = true;

        for (let i = 0; i < usuarios.length; i++) {
            let usuario = usuarios[i];
            console.log(usuario);
            if (usuario.nombreUsuario == nombreUsuario && usuario.contrasenia == contrasenia && usuario.rolBean.rol == "Administrador" && usuario.estatus==true) {             
                aux=false;

                window.location = '/SIMNIL/Estadisticas';                                
                break;
            }
        }

        if(aux){
            show_alerta('Usuario y/o Contraseña Incorrectos', 'error');
        }

    }

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    function mostrarPassword(){
        var cambio = document.getElementById("password");
        if(cambio.type == "password"){
          cambio.type = "text";
          $('.icon').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
        }else{
          cambio.type = "password";
          $('.icon').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
        }
      } 

    return(
        <>
        <div id="container">
            <div id="left">
            <img src={logo_simnil} style={{width: '80%'}} />
            </div>

            <div id="right">
                <h1 style={{fontSize: 40}}>Bienvenido a SIMNIL</h1>
                <p style={{fontSize: 30}}>Inicia sesión con tu cuenta</p>

                <input className='Login' type='text' name='usuario' id='usuario' placeholder='Usuario' onChange={(e) => setNombreUsuario(e.target.value)} />
                <div className="field">
                  <span className='labInp'>Contraseña</span>
                  <div className="input-group" style={{width: '46%'}}>
                  <input className='Login' type='password' style={{fontSize: '25px'}} name='password' id='password' placeholder='Contraseña' onChange={(e) => setContrasenia(e.target.value)} />
                    <div style={{paddingTop: '23px'}}>
                      <button id="show_password" className="btn btn-primary" type="button" style={{height: '100%'}} onClick={() => mostrarPassword()}> <img className='showPassword2' src={ojo} /> </button>
                    </div>
                  </div>                  
                </div>
                
                <button id='btn_login' onClick={() => validar()}>Iniciar Sesión</button>
                <a onClick={openModal} style={{color: 'blue'}}>¿Olvidaste tu contraseña?</a>

                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Login Modal"
                >
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{color: 'black'}}>Recuperar Contraseña</h2>
                    <form style={{
                        width: '90%',
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center'}}>
                    <input style={{
                        fontSize: 25, 
                        width: '80%', 
                        marginBottom: '8%',
                        backgroundColor: 'white',
                        color: 'black',
                        padding: '1%',
                        borderRadius: '8px',
                        textAlign: 'center'
                        }} type='text' placeholder='Correo Electrónico' />
                    <button id='recu'>Recuperar Contraseña</button>
                    <button id='cancelar' className='cancelar' onClick={closeModal}>Cancelar</button>
                    </form>
                </Modal>
            </div>
        </div>
        </>
    );
}