import logo_simnil from '../assets/LogoSimnil.png';
import '../css/login.css';

export const Login = () => {
    return(
        <>
        <div id="container">
            <div id="left">
            <img src={logo_simnil} style={{width: '80%'}} />
            </div>

            <div id="right">
                <h1 style={{fontSize: 40}}>Bienvenido a SIMNIL</h1>
                <p style={{fontSize: 30}}>Inicia sesión con tu cuenta</p>

                <input type='text' name='usuario' id='usuario' placeholder='Usuario' />
                <input type='password' name='password' id='password' placeholder='Contraseña' />
                <button id='btn_login'>Iniciar Sesión</button>
                <a href=''>¿Olvidaste tu contraseña?</a>
            </div>
        </div>
        </>
    );
}