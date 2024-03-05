import React from 'react';
import Modal from 'react-modal';
import { Menu, SideMenu } from '../components/Menu'
import { Header } from '../components/Header_'
import Flex from '@react-css/flex'
import mas from '../assets/anadir.png';

//CSS
import '../css/main.css'
import '../css/header.css'
import '../css/body.css'

const customStyles = {
  content: {
    width: '55%',
    height: '80vh',
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

export const Usuarios = () => {
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

    return(
        <>
        <Flex row id='container'>
        <div id='elements'>
          <Menu />
          <Header usuario='Administrador' />
        </div>

        <div id='main'>
          <SideMenu selected={2} />
          <div id="der">
            <div id="der-main">
              <div id="info">
                <h1>Usuarios</h1>
                <button onClick={openModal} ><img src={mas} />Agregar Usuario</button>
              </div>
              <hr />

              
              
            </div>
          </div> 

          <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Login Modal"
          >
              <h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{color: 'black', fontSize: 35}}>Registrar Usuario</h2>
              <form style={{
                  width: '90%',
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center'}}>

              <div className='info-1'>
                <input type='text' placeholder='Nombre' />
                <input type='text' placeholder='Apellido Paterno' />
              </div>

              <div className='info-1'>
                <input type='text' placeholder='Apellido Materno' />
                <input type='text' placeholder='Número de Teléfono' />
              </div>
                    
              <input type='text' placeholder='Correo Electrónico' />
              <input type='text' placeholder='Usuario' />
              <input type='text' placeholder='Contraseña' />


              <button id='recu'>Crear Usuario</button>
              <button id='cancelar' onClick={closeModal}>Cancelar</button>
              </form>
          </Modal>
        </div>
      </Flex>
        </>
    );
}