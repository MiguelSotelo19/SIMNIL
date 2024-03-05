import PropTypes from 'prop-types';
import { useState } from 'react';

import logo_simnil from '../assets/LogoSimnil.png';
import home from '../assets/casa.png';
import user from '../assets/usuario.png';
import grafica from '../assets/tendencia.png';
import users from '../assets/grupo.png';
import pozo from '../assets/pozo.png';

import '../css/body.css';

export const Menu = () => {
    return(
        <>
        <div id="menu">
        <img src={logo_simnil} width={70} height={70} style={{marginTop: 10}} />
            <p id="nombre">SIMNIL</p>
        </div>
        </>
    );
    
}

export const SideMenu = ({selected}) => {
    const [selectedItem, setSelectedItem] = useState(selected);

    return(
        <>
        <div id="izq">
            <h2 style={{textAlign: 'center', width: '100%'}}>Menú</h2>

                <li className={selectedItem == 1 ? "hover": ""} onClick={() => {
                    window.location ='/Estadisticas';
                }}><img src={grafica} id='icono' /> Estadísticas</li>

                <li className={selectedItem == 2 ? "hover": ""} onClick={() => {
                    window.location = '/Usuarios';
                }}><img src={users} id='icono' /> Usuarios</li>

                <li className={selectedItem == 3 ? "hover": ""} onClick={() => {
                    window.location = '/Pozos';
                }}><img src={pozo} id='icono' /> Pozos</li>

                <li className={selectedItem == 4 ? "hover": ""} onClick={() => {
                    window.location = '/Comunidades';
                }}><img src={home} id='icono' /> Comunidades</li>

                <li className={selectedItem == 5 ? "hover": ""} onClick={() => {
                    window.location = '/Perfil';
                }}><img src={user} id='icono' /> Perfil</li>
        </div>
        </>
    );
}


SideMenu.propTypes = {
    selected: PropTypes.number.isRequired
}