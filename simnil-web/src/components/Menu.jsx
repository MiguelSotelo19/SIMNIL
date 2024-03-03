import logo_simnil from '../assets/LogoSimnil.png';
import home from '../assets/casa.png';
import user from '../assets/usuario.png';
import grafica from '../assets/tendencia.png';
import users from '../assets/grupo.png';
import pozo from '../assets/pozo.png';

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

export const SideMenu = () => {
    return(
        <>
        <div id="izq">
            <h2 style={{textAlign: 'center', width: '100%'}}>Menú</h2>
                <li><img src={grafica} id='icono' /> Estadísticas</li>
                <li><img src={users} id='icono' /> Usuarios</li>
                <li><img src={pozo} id='icono' /> Pozos</li>
                <li><img src={home} id='icono' /> Comunidades</li>
                <li><img src={user} id='icono' /> Perfil</li>
        </div>
        </>
    );
}
