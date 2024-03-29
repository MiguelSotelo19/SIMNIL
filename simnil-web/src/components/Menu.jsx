import PropTypes from 'prop-types';
import { useState } from 'react';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../js/functions';

import logo_simnil from '../assets/LogoSimnil.png';
import home from '../assets/casa.png';
import user from '../assets/usuario.png';
import grafica from '../assets/tendencia.png';
import users from '../assets/grupo.png';
import pozo from '../assets/pozo.png';
import logout from '../assets/cerrar-sesion.png';

import '../css/body.css';

export const Menu = () => {
    return(
        <>
        <div id="menu">
        <img src={logo_simnil} width={70} height={70} />
            <p id="nombre">SIMNIL</p>
        </div>
        </>
    );
    
}

export const SideMenu = ({selected}) => {
    const [selectedItem, setSelectedItem] = useState(selected);


    const cerrarSesion = (id_, name, validar) => {
        let mensaje, tittle, confirm;

        tittle = 'Cerrar Sesión';
        mensaje = '¿Seguro de cerrar la sesión actual?';
        confirm = 'Cerrar Sesión';
  
        const MySawl = withReactContent(Swal);
        MySawl.fire({
          title: tittle,
          icon: 'question', text: mensaje,
          showCancelButton: true, confirmButtonText: confirm, cancelButtonText: 'Cancelar'
        }).then((result) => {
          if(result.isConfirmed){
            window.location = '/SIMNIL';
          } else {
            show_alerta('Cerrar Sesión Cancelado', 'info');
          }
        });
      }

    return(
        <>
        <div id="izq">
            <h2 style={{textAlign: 'center', width: '100%'}}>Menú</h2>

                <li className={selectedItem == 1 ? "hover": ""} onClick={() => {
                    window.location ='/SIMNIL/Estadisticas';
                }}><img src={grafica} id='icono' /> Estadísticas</li>

                <li className={selectedItem == 2 ? "hover": ""} onClick={() => {
                    window.location = '/SIMNIL/Usuarios';
                }}><img src={users} id='icono' /> Usuarios</li>

                <li className={selectedItem == 3 ? "hover": ""} onClick={() => {
                    window.location = '/SIMNIL/Pozos';
                }}><img src={pozo} id='icono' /> Pozos</li>

                <li className={selectedItem == 4 ? "hover": ""} onClick={() => {
                    window.location = '/SIMNIL/Comunidades';
                }}><img src={home} id='icono' /> Comunidades</li>

                <li className={selectedItem == 5 ? "hover": ""} onClick={() => {
                    window.location = '/SIMNIL/Perfil';
                }}><img src={user} id='icono' /> Perfil</li>

                <li onClick={() => cerrarSesion() }><img src={logout} id='icono' /> Cerrar Sesión</li>
        </div>
        </>
    );
}


SideMenu.propTypes = {
    selected: PropTypes.number.isRequired
}