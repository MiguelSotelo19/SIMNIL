import { Menu, SideMenu } from '../components/Menu'
import { Header } from '../components/Header_'
import Flex from '@react-css/flex'

//CSS
import '../css/main.css';
import '../css/header.css';
import '../css/body.css';

export const Perfil = () => {
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
              <div id="info-personal">
                <label>Usuario: 
                    <input type='text' placeholder='Usuario' />
                </label>

                <label>Puesto: 
                    <input type='text' placeholder='Puesto' />
                </label>

              </div>

              <div id="info-personal">
                <label>Contacto: 
                    <input type='text' placeholder='Contacto' />
                </label>

                <label>Correo: 
                    <input type='text' placeholder='Correo' />
                </label>
              </div>
              

            </div>
          </div>
        </div>
      </Flex>
        </>
    );
}