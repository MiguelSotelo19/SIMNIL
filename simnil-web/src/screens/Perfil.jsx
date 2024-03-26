import { Menu, SideMenu } from '../components/Menu'
import { Header } from '../components/Header_'
import Flex from '@react-css/flex'

//CSS
import '../css/main.css';
import '../css/header.css';
import '../css/body.css';
import { useEffect, useState } from 'react';

export const Perfil = () => {
  const [ usuario, setUsuario ] = useState('');
  const [ puesto, setPuesto ] = useState('');
  const [ contacto, setContacto ] = useState('');
  const [ correo, setCorreo ] = useState('');

    return(
        <>
        <Flex row id='container'>
        <div id='elements'>
          <Menu />
          <Header usuario='Administrador' />
        </div>

        <div id='main'>
          <SideMenu selected={5} />
          <div id="der">
            <div id="der-main">
              <div id="info">
                <h1>Perfil</h1>
                <h1>Miguel Angel Sotelo Contreras</h1>
              </div>
              <hr />

              <h1 style={{color: 'black'}}>Datos Personales</h1>
              <form>
                <div className="info-personal" >
                  <div id="info-1" style={{display: 'flex', flexFlow: 'row', justifyContent: 'space-between', marginTop: '5%'}}>
                    <div className="field">
                      <span className='labInp' style={{fontSize: '30px'}}>Usuario</span>
                      <input disabled style={{width: '60%', fontSize: '30px'}} type='text' placeholder='Usuario' value={usuario} />
                    </div>

                    <div className="field">
                      <span className='labInp' style={{fontSize: '30px'}}>Puesto</span>
                      <input disabled style={{width: '60%', fontSize: '30px'}} type='text' placeholder='Puesto' value={puesto} />
                    </div>
                  </div>
                

                <div id="info-1" style={{display: 'flex', flexFlow: 'row', justifyContent: 'space-between', marginTop: '6%'}}>
                  <div className="field">
                    <span className='labInp' style={{fontSize: '30px'}}>Contacto</span>
                    <input disabled style={{width: '60%', fontSize: '30px'}} type='text' placeholder='Contacto' value={contacto} />
                  </div>

                  <div className="field">
                    <span className='labInp' style={{fontSize: '30px'}}>Correo</span>
                    <input disabled  style={{width: '60%', fontSize: '30px'}} type='text' placeholder='Correo' value={correo} />
                  </div>
                </div>
                
                </div>
              </form>       

            </div>
          </div>
        </div>
      </Flex>
        </>
    );
}