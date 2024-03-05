import React from 'react';
import Modal from 'react-modal';
import { Menu, SideMenu } from '../components/Menu';
import { Header } from '../components/Header_';
import Flex from '@react-css/flex';
import mas from '../assets/anadir.png';

//CSS
import '../css/main.css';
import '../css/header.css';
import '../css/body.css';

const customStyles = {
  content: {
    width: '45%',
    height: '60vh',
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

export const Pozos = () => {
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
          <SideMenu selected={3} />
          <div id="der">
            <div id="der-main">
              <div id="info">
                <h1>Pozos</h1>
                <button onClick={openModal}><img src={mas} />Agregar Pozos</button>
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
            <h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{color: 'black', fontSize: 35}}>Registrar Pozo</h2>
            <form style={{
                width: '90%',
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center'}}>

            <input type='text' placeholder='Nombre del Pozo' />
            <input type='text' placeholder='Asignar Comunidades -- Beta' />

            <div className='info-1'>
              <input type='text' placeholder='Porcentaje de agua' />
              <input type='text' placeholder='Profundidad' />
            </div>

            <button id='recu'>Crear Pozo</button>
            <button id='cancelar' onClick={closeModal}>Cancelar</button>
            </form>
          </Modal>

        </div>
      </Flex>
        </>
    );
}